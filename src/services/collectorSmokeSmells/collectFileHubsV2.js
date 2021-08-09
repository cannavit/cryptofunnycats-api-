const { Octokit } = require("@octokit/rest");
let axios = require("axios");
// const { appendFile } = require("fs-extra");
// var Sentiment = require("sentiment");
const { filesHub } = require("../../apis/filesHub/model");
const { repositoryHub } = require("../../apis/repositoryHub/model");
const { pagesRead } = require("../../apis/pagesRead/model");
const { filesHubCommit } = require("../../apis/filesHubCommit/model");

var dateFormat = require("dateformat");
const { sleep } = require("sleepjs");
const { appendFile } = require("fs-extra");
const { response } = require("express");
var Sentiment = require("sentiment");

import logger from "../logger";
// import logger, { format, transports } from "winston";

//!HIDE IP CONFIGURATION.
const { runTorService } = require("../torAxiosRequest/src/runTor");
if (process.env.HIDE_IP) {
  // EXAMPLE VARIABLES:
  //Import Tor Command.

  runTorService("stop");
  runTorService("start");

  // Instruction . Execute in one terminal : (tor) or  (tor y) second plan
  //  HIDE_IP=true
  // HIDE_PROXY_HOST_PORT='127.0.0.1:9050'
  const SocksProxyAgent = require("socks-proxy-agent"); //Hide IP with sockets and Tor.
  const proxyOptions = `socks5://${process.env.HIDE_PROXY_HOST_PORT}`;
  const httpsAgent = new SocksProxyAgent(proxyOptions);
  const baseUrl = "127.0.0.1";
  axios = axios.create({ baseUrl, httpsAgent });
}

// Know if String have key words, of one of the list
function haveWoldOfBug(str) {
  // List of key words related to bug, fix, error, failure
  let list = [
    "bug",
    "fix",
    "error",
    "failure",
    "fail",
    "fixup",
    "solve",
    "resolve",
    "reparado",
  ];
  for (var i = 0; i < list.length; i++) {
    if (str.includes(list[i])) {
      return true;
    }
  }
  return false;
}

async function rotateGitHubTokens(github, query, lastPagesReference) {
  let projects;
  let pagesNumber = 1;
  let perPageNumber = 1000;
  try {
    logger.info(" Search Projects with Query: " + query);
    projects = await github.search.code({
      q: query,
      sort: "created",
      order: "desc",
      page: pagesNumber,
      per_page: perPageNumber,
    });
  } catch (error) {
    logger.warn(" 🟠 Rotate github Token");
    let tokenList = process.env.TOKEN_LIST.split(";");
    //! Get token list.

    for (const token of tokenList) {
      const github = new Octokit({
        auth: token,
      });

      try {
        projects = await github.search.code({
          q: query,
          sort: "created",
          order: "desc",
          page: pagesNumber,
          per_page: perPageNumber,
        });
      } catch (error) {
        logger.error(" 🛑 ERROR WITH TOKEN: " + token);
      }
    }
  }

  let gitHubObj = {
    github: github,
    projects: projects,
  };
  return gitHubObj;
}
// Use graphql
// https://docs.github.com/en/graphql/overview/explorer

// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess

async function getProjectsUsingFileContent2() {
  // Options params:
  let incrementDateInDays = 30;
  let referenceConfiguration = "ImportFilesHubsV2";
  let useToken = true;

  // Read Read Configuration.
  let dateNext;

  let lastPagesReference = await pagesRead.findOne({
    reference: referenceConfiguration,
  });

  if (!lastPagesReference) {
    lastPagesReference = {
      pages: 1,
      reference: referenceConfiguration,
      per_page: 1000,
    };
  }

  if (!lastPagesReference.dateFind) {
    var myPastDate = new Date();
    myPastDate = myPastDate.setDate(myPastDate.getDate() - 3700); //1230
    logger.info(myPastDate);
    let dateFind = dateFormat(myPastDate, "yyyy-mm-dd");

    lastPagesReference.dateFind = dateFind;
  }

  lastPagesReference.per_page = process.env.GITHUB_RANGE;
  // 2014-07-27T13
  let options = {
    token:
      process.env.GITHUB_TOKEN_COLLECTOR ||
      "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",
    query: `kubernetes created:> ${lastPagesReference.dateFind}`,
    fileExtension: ".yaml",
    finishIt: false,
    sizeDownlaodLimit: 10000,
    tokensList: process.env.TOKEN_LIST.split(";"),
  };

  let tokenAccess = options.token;

  let github = new Octokit({
    auth: tokenAccess,
  });

  let findNewDateFilter = true;
  let projects;

  lastPagesReference.per_page;

  let dataInit = lastPagesReference.dateFind;
  let gitHubObj;
  // If was closed the last step.
  let initSearch = true;
  if (lastPagesReference.finishIt) {
    logger.info(" 🟢 LAST STATUS finishIt: true");

    while (findNewDateFilter) {
      // Add right format for use filter in github
      let dateFindFormat = dateFormat(
        lastPagesReference.dateFind,
        "yyyy-mm-dd"
      );
      dateFindFormat = String(dateFindFormat);

      // Rotate tokens if is necessary.
      gitHubObj = await rotateGitHubTokens(
        github,
        `kubernetes created:> ${dateFindFormat}`,
        lastPagesReference
      );

      github = gitHubObj.github;
      projects = gitHubObj.projects;

      logger.info(
        " 🆕  🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕 "
      );
      logger.info(` 🐱 GitHub Filter: kubernetes created:> ${dateFindFormat}`);
      logger.info("  📆 DATE ORIGINAL:" + lastPagesReference.dateFind);
      logger.info("  📆 DATE CONVERT:" + dateFindFormat);
      logger.info("  📦 Search new Projects: URL= " + projects.url);
      logger.info("  📦 Search new Projects: status: " + projects.status);
      logger.info(
        "  📦 Search new Projects: total_count: " + projects.data.total_count
      );
      logger.info(
        "  📦 Search new Projects: length data: " + projects.data.items.length
      );

      //! If items == 0, change the date filter.

      if (projects.data.items.length == 0 || initSearch) {
        lastPagesReference.dateFind = new Date(
          lastPagesReference.dateFind.getTime() +
            incrementDateInDays * 1000 * 60 * 60 * 24
        );
        initSearch = false;
      } else {
        //
        if (projects.data.total_count <= 1000) {
          logger.info("👍 PackSize: " + projects.data.total_count);
          logger.info("✅ WAS DETECT ONE PACK FOR PROCESSING");
          logger.info(`📦 QUERY USED: kubernetes created:> ${dateFindFormat}`);
          findNewDateFilter = false;
          // lastPagesReference.dateFind = dataInit; // Reset data
        } else {
          logger.info("🖐 PackSize: " + projects.data.total_count);
          logger.info("🚨 THE PACK IS MORE OF 1000");
          logger.info(`📦 QUERY USED: kubernetes created:> ${dateFindFormat}`);

          if (incrementDateInDays < 1) {
            logger.info("🔥 NO WAS POSSIBLE AUTOCORRECT THE DATA");
            break;
          }
          incrementDateInDays = incrementDateInDays - 4;
          logger.info(
            "Automatic correction: incrementDateInDays= " + incrementDateInDays
          );
        }
      }

      await sleep(1000); // Is important for not to exceed the rate limit github
    }
  } else {
    logger.info(" 🟠 LAST STATUS finishIt: false");
    // Reuse the last data for collect the information.
    let dateFindFormat = dateFormat(lastPagesReference.dateFind, "yyyy-mm-dd");
    dateFindFormat = String(dateFindFormat);

    logger.info(`✅ 2 kubernetes created:> ${dateFindFormat}`);

    // Rotate tokens if is necessary.
    gitHubObj = await rotateGitHubTokens(
      github,
      `kubernetes created:> ${dateFindFormat}`,
      lastPagesReference
    );
    github = gitHubObj.github;
    projects = gitHubObj.projects;
  }

  await pagesRead.findOneAndUpdate(
    { reference: referenceConfiguration },
    {
      pages: nextPage,
      reference: referenceConfiguration,
      per_page: process.env.GITHUB_RANGE,
      dateFind: lastPagesReference.dateFind,
      finishIt: false,
      total_count: projects.data.total_count,
    },
    {
      upsert: true,
    }
  );

  let nextPage = lastPagesReference.pages + 1;
  let count = -1;
  let responseLast;
  for (const key in projects.data.items) {
    count = count + 1;

    //
    logger.info(
      "🆕 Cicle : " +
        count +
        " " +
        "KEY: " +
        key +
        " page:" +
        lastPagesReference.pages +
        "per_page: " +
        lastPagesReference.per_page
    );

    let response = {};

    let items;
    try {
      items = projects.data.items[key];
    } catch (error) {}

    if (items) {
      options.items = items;
      response = await collectItemInfo(options);
    }

    responseLast = response;
  }

  logger.info();
  logger.info("🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢");
  logger.info(" ✅ Complated one full cicle.");
  logger.info();

  let lastRepository = await repositoryHub.find({}).sort({ _id: -1 }).limit(1);

  let created_at;

  try {
    created_at = lastRepository[0].created_at;
  } catch (error) {
    // created_at = responseLast.created_at;
    created_at = lastPagesReference.dateFind;
  }

  await pagesRead.findOneAndUpdate(
    { reference: referenceConfiguration },
    {
      pages: nextPage,
      reference: referenceConfiguration,
      per_page: process.env.GITHUB_RANGE,
      finishIt: true,
    },
    {
      upsert: true,
    }
  );

  return projects;
}

async function collectItemInfo(options) {
  // Collect basic information.

  let items = options.items;
  let response = {};

  response.git_url = items.git_url;
  response.html_url = items.html_url;
  response.fileName = items.name;
  response.node_id = items.repository.node_id;
  response.full_name = items.repository.full_name;
  response.owner = items.repository.owner.login;
  response.description = items.repository.description;
  response.repositoryId = items.repository.id;
  // response.query = options.query;
  response.dataSource = "github";
  response.dataType = "hubFiles";
  response.ownerType = items.repository.owner.type;
  response.url = items.repository.url;
  response.commits_url = items.repository.commits_url;

  //! Get reference commits information.

  // Get number of starts
  let resp = await axiosHackGitHub(response.url, options);

  response = {
    ...response,
    stargazers_count: resp.data.stargazers_count,
    watchers: resp.data.watchers,
    default_branch: resp.data.default_branch,
    language: resp.data.language,
    network_count: resp.data.network_count,
    subscribers_count: resp.data.subscribers_count,
    created_at: resp.data.created_at,
    updated_at: resp.data.updated_at,
    pushed_at: resp.data.pushed_at,
  };

  //! Collect files of repostory (Free)
  options.response = response;
  response = await collectFiles(options);

  return response;
}
// Get response of one api using axios and GET request.
async function getFilesFromUrl(url) {
  // let response = await axios.get(url);
  let response = await axiosHackGitHub(url);

  let fileContent = await convertBase64ToString(response.data.content);

  response = {
    shaFile: response.data.sha,
    size: response.data.size,
    url: response.data.url,
    content: response.data.content,
    decodeContent: fileContent,
  };

  return response;
}

// Convert base64 to string
async function convertBase64ToString(base64) {
  let result = new Buffer(base64, "base64").toString();
  return result;
}

//Get number of downloads of one github repository
// Use octokit library
// Inputs, owner, repo and tokenAccess
// Outputs, number of downloads
async function getNumberOfDownloads(options) {
  const github = new Octokit({
    auth: tokenAccess,
  });

  const downloads = await github.repos.getDownloads({
    owner,
    repo,
  });

  return downloads.data.totalCount;
}

// getProjectsUsingFileContent(options, options.token);

//! >>>

//! <<<

async function runCollectorFilesHub() {
  logger.info("🕕 Run Collector of  filesHub");
  let findFiles = true;

  while (findFiles) {
    logger.info("🕕 Try to collect data");

    try {
      await getProjectsUsingFileContent();
    } catch (error) {
      logger.info("🟠 Pass limit of GitHub");
      findFiles = false;
    }
  }
  logger.info("ℹ️  Finish of GitHub");
}

module.exports.getProjectsUsingFileContent2 = getProjectsUsingFileContent2;

async function axiosHackGitHub(url, options) {
  var config = {
    method: "get",
    url: url,
  };

  let response;
  try {
    response = await axios(url);
    logger.info(" 🟢 🐝 🐝 🐝 Success [GET] axios to: " + url);

    // response = response.data;
  } catch (error) {
    try {
      try {
        logger.info(
          " 🚨 1) ERROR GITHUB MESSGE: " + error.response.data.message
        );
      } catch (error) {}

      logger.info(" 🚨 1) ERROR GITHUB MESSGE: " + error);

      logger.info(" 🧅 Try Change Tor IP");
      logger.info(" 🔑 Breaking GITHUB IP Control");
      await runTorService("restart");
      logger.info(" 🕖 Wait 5 seconds");
      await sleep(5000); //! Not change the 5000

      logger.info(" 🟠 🐝 🐝 🐝 Success [GET] axios to: " + url);

      response = await axios(url);
      logger.info(" 🟢 🐝 🐝 🐝 Success [GET] axios to: " + url);
      logger.info(" 🔓 🔫 Pass GitHub Control 🥳 ");
    } catch (error) {
      try {
        logger.info(
          " 🚨 2) ERROR GITHUB MESSGE: " + error.response.data.message
        );
      } catch (error) {}
      logger.info(" 🚨 2) ERROR GITHUB MESSGE: " + error);
      logger.info(" 🧅 Try Change Tor IP");
      logger.info(" 🔑 Breaking GITHUB IP Control");
    }
  }

  return response;
}

async function collectFiles(options) {
  let response = options.response;

  let full_name = response.full_name;

  let files = await axiosHackGitHub(
    `https://api.github.com/repos/${full_name}/git/trees/HEAD`,
    options
  );

  let searchElement = [".yaml", "Dockerfile", ".yml"]; //TODO add environment variable

  if (files) {
    let fileData = {
      familySha: files.data.sha,
      familyUrl: files.data.url,
    };

    // for files.data.items
    for (const item of files.data.tree) {
      for (const extension of searchElement) {
        if (item.path.includes(extension)) {
          logger.info("@1Marker-No:_1730564244");
          //
          fileData = {
            ...fileData,
            sha: item.sha,
            path: item.path,
            url: item.url,
            size: item.size,
            fileType: extension,
            full_name: response.full_name,
          };

          if (options.sizeDownlaodLimit >= item.size) {
            //! SAVE IN DB
            let repositoryHubResponse = await repositoryHub.findOneAndUpdate(
              { repositoryId: response.repositoryId },
              response,
              {
                upsert: true,
              }
            );

            if (!repositoryHubResponse) {
              repositoryHubResponse = await repositoryHub.findOne({
                repositoryId: response.repositoryId,
              });
            }

            // logger.info(item);

            //! Read File
            let fileContent = await getFilesFromUrl(fileData.url);

            fileData = await {
              ...fileData,
              ...fileContent,
            };

            //! Save Files
            delete fileData.content; // Delete encode content.

            //! filesHub...
            logger.info("@1Marker-No:_1531626854");

            let filesHubContent = await filesHub.findOneAndUpdate(
              { repositoryId: repositoryHubResponse._id, path: fileData.path },
              fileData,
              {
                upsert: true,
              }
            );

            if (!filesHubContent) {
              filesHubContent = await filesHub.findOne({
                repositoryId: repositoryHubResponse._id,
                path: fileData.path,
              });
            }

            //! Get commits history.
            logger.info("@1Marker-No:_1256221867");

            let commits = await axiosHackGitHub(
              `http://api.github.com/repos/${response.full_name}/commits?path=${fileData.path}`,
              options
            );

            if (commits) {
              commits = commits.data;

              for (const commit of commits) {
                let messageFeeling = textIsBadOrGood(
                  commit.commit.message.toLowerCase()
                );

                let commitData = {
                  shaCommit: commit.sha,
                  path: fileData.path,
                  full_name: response.full_name,
                  fileType: extension,
                  commiterEmail: commit.commit.committer.email,
                  commiterDate: commit.commit.committer.date,
                  message: commit.commit.message,
                  commentCount: commit.commit.comment_count,
                  isBugCommit: haveWoldOfBug(
                    commit.commit.message.toLowerCase()
                  ),
                  messageFeelingScore: messageFeeling.score,
                  messageFeelingComparative: messageFeeling.comparative,
                };

                let filesHubCommitContent =
                  await filesHubCommit.findOneAndUpdate(
                    {
                      fileHubId: filesHubContent._id,
                      shaCommit: commitData.shaCommit,
                    },
                    commitData,
                    {
                      upsert: true,
                    }
                  );

                logger.info("👍 Success Copy Commit to DB: " + commit.sha);
              }
            }
          }
        }
      }
    }
  }

  return response;
}

//TODO GET ALL COMMITS BY FILE.
// http://api.github.com/repos/:owner/:repo/commits?path=PATH_TO_FILE

function textIsBadOrGood(text) {
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);

  return result;
}
