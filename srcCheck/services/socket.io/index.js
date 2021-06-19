import logger from 'winston';
import _ from 'lodash';
import Promise from 'bluebird';

export default {
	client: null,
	init: function(expressServer) {
		const io = require('socket.io')(expressServer, {});
		const connectedUsers = {};
		this.connectedUsers = connectedUsers;
		this.client = io;

		io.on('connection', function(socket) {
			logger.info('WebSocket: user connected.');
			socket.on('disconnect', socket => {
				logger.info('WebSocket: user disconnected.');
				const disconnectedUserId = _.findKey(connectedUsers, socket.id);
				if (disconnectedUserId) {
					delete connectedUsers[disconnectedUserId];
					userStatus = {
						isConnected: false,
						userId: null
					};
				}
			});

			let userStatus = {
				isConnected: false,
				userId: null
			};
			socket.on('identification', msg => {
				try {
					const jmsg = JSON.parse(msg);
					if (jmsg.userId) {
						if (userStatus.isConnected && userStatus.userId === jmsg.userId) {
							logger.info(
								`WebSocket: user already connected with same id [${
									jmsg.userId
								}] on socket ${socket.id}.`
							);
						} else if (
							userStatus.isConnected &&
							userStatus.userId !== jmsg.userId
						) {
							logger.info(
								`WebSocket: user [${
									jmsg.userId
								}] already connected with different id [${
									userStatus.userId
								}] on socket ${socket.id}.`
							);
						} else if (connectedUsers[jmsg.userId]) {
							logger.info(
								`WebSocket: user [${
									jmsg.userId
								}] already connected on different socket: [${
									connectedUsers[jmsg.userId].id
								}]. Message received on socket ${socket.id}.`
							);
						} else {
							logger.info(
								`New user successfully connected with id ${
									jmsg.userId
								} on socket ${socket.id}.`
							);
							connectedUsers[jmsg.userId] = socket;
							userStatus.isConnected = true;
							userStatus.userId = jmsg.userId;
						}
					}
				} catch (err) {
					logger.error(`Malformed payload: failed to parseJSON: ${msg}`);
				}
			});
		});

		return this.client;
	},
	sendChatroom(chatRoom, message) {
		return Promise.resolve(this.client.emit(chatRoom, message)).return(true);
	},
	sendPrivate(userId, chatRoom, message) {
		if (this.connectedUsers[userId]) {
			this.connectedUsers[userId].emit(chatRoom, message);
			return Promise.resolve(true);
		}
		logger.debug(`Private message sent to unknown user: ${userId}`);
		return Promise.resolve(false);
	},
	connectedUsers: {}
};
