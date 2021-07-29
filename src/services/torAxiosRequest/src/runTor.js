const { logger } = require("express-winston");
const shell = require("shelljs");
// const { torRunIn } = require("../../../config");
const axios = require("axios"); // Replace or load axios.
var systemctl = require("systemctl");
import { operativeSystem } from "../../../config";

async function runTorService(status) {
  // Use with Mac OS
  if (operativeSystem === "mac") {
    await shell.exec(`brew services ${status} tor`, {
      silent: false,
    });
  }

  //use with linux
  if (operativeSystem === "linux/ubuntu") {
    // await systemctl[status]("service-name").then((output) => console.log);
    await shell.exec(`systemctl ${status} tor`, {
      silent: false,
    });
  }

  // console.log(` 🧅 Tor Run: brew services ${status} tor`);
}

module.exports.runTorService = runTorService;

async function openAxiosTor(options) {
  if (!options) {
    options = {};
  }

  // EXAMPLE VARIABLES:
  //Import Tor Command.

  await runTorService("stop");
  await runTorService("start");

  // Instruction . Execute in one terminal : (tor) or  (tor y) second plan
  //  HIDE_IP=true
  // HIDE_PROXY_HOST_PORT='127.0.0.1:9050'
  const SocksProxyAgent = require("socks-proxy-agent"); //Hide IP with sockets and Tor.
  const proxyOptions = `socks5://${process.env.HIDE_PROXY_HOST_PORT}`;

  const httpsAgent = new SocksProxyAgent(proxyOptions);
  const baseUrl = "127.0.0.1";

  console.log(">>>>>920810209>>>>>");
  console.log(httpsAgent, baseUrl);
  console.log("<<<<<<<<<<<<<<<<<<<");

  let axios2 = await axios.create({ baseUrl, httpsAgent });

  console.log(">>>>>-1709527530>>>>>");
  console.log(axios2);
  console.log("<<<<<<<<<<<<<<<<<<<");

  return axios2;
}

module.exports.openAxiosTor = openAxiosTor;
