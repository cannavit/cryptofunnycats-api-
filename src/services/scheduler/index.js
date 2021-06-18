import schedule from 'node-schedule';
import logger from '../logger';
import moment from 'moment';

const log = logger.child({ section: '\x1B[0;35mScheduler:\x1B[0m' });

export const start = function () {
  log.info('Starting...');

  // Server time
  schedule.scheduleJob('0 0 * * *', upsertDayUtenti);
  schedule.scheduleJob('0 0 * * *', upsertDayExpositors);
  schedule.scheduleJob('0 0 * * *', alignFilters);
  schedule.scheduleJob('0 0 * * *', sendNotificationEmail);

  if (pushNotificationEnabled) {
    schedule.scheduleJob('*/30 * * * * *', sendNotifications);
    sendNotifications();
    logger.info('SCHEDULER :FINISH THE NOTIFICATION SERVICE');
  }
  log.info('Starting...', 'DONE');
};

// function upsertUtenti() {
//   require('../mfPortal').importAllCpUsers(moment().subtract(1,'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
// }

function alignFilters() {
  require('../mfPortal').alignFilterOptions(10);
}

function upsertDayUtenti() {
  require('../mfPortal').importDayCpUsers(
    moment().subtract(1, 'days').format('YYYYMMDD')
  ); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
}

// function upsertExpositors() {
//   require('../mfPortal').importAllExpositors(moment().subtract(1,'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
// }

function upsertDayExpositors() {
  require('../mfPortal').importDayExpositors(
    moment().subtract(1, 'days').format('YYYYMMDD')
  ); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
}

async function sendNotificationEmail() {
  const aggregationArray = [
    {
      $match: {
        createdAt: {
          $gte: new Date(moment().format('YYYY-MM-DD')),
        },
      },
    },
    {
      $match: {
        createdAt: {
          $lte: new Date(moment().add(1, 'days').format('YYYY-MM-DD')),
        },
      },
    },
    {
      $group: {
        _id: '$targetUser',
        notifiche: {
          $push: {
            title: '$title',
            mess: '$body',
          },
        },
      },
    },
    {
      $lookup: {
        from: 'userProfiles',
        localField: '_id',
        foreignField: 'userId',
        as: 'utente',
      },
    },
  ];
  const result = await model.aggregate(aggregationArray);

  result.forEach((user) => {
    let body = '<br>  ';
    user.notifiche.forEach((notifica) => {
      body += notifica.title + ' ' + notifica.mess + ' <br>';
    });
    if (user.utente[0].email) {
      mailSender.sendMail({
        fromEmail: 'info@messe.it',
        fromName: 'SPS Italia Contact Place',
        toEmail: user.utente[0] ? user.utente[0].email : '',
        replyTo: 'info@messe.it',
        subject: 'Le notifiche del giorno',
        content: `Gentile ${user.utente[0].fullName} <br>
      Ecco quello che ti sei perso oggi su Contact Place ${body} <br>
      Cordiali Saluti, <br>
      Il Team di SPS Italia`,
        contentType: 'text/html',
      });
    }
  });
}
