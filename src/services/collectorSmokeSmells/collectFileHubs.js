const { Octokit } = require("@octokit/rest");
const axios = require("axios");
var Sentiment = require("sentiment");
const { filesHub } = require("../../apis/filesHub/model");
const { filesHubCommit } = require("../../apis/filesHubCommit/model");
const { GITHUB_TOKEN_COLLECTOR } = require("../../config");

// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess
async function getProjectsUsingFileContent() {
  let options = {
    pull_number: 3,
    // token: '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', // TOKEN cecilio.cannav@gmail.com
    token: process.env.GITHUB_TOKEN_COLLECTOR,
    query: "keyword:kubernetes extension:.yaml",
    fileExtension: ".yaml",
  };
  let tokenAccess = options.token;
  //
  const github = new Octokit({
    auth: tokenAccess,
  });

  const projects = await github.search.code({
    q: options.query,
    sort: "stars",
    order: "desc",
    limit: 100,
  });
  for (const key in projects.data.items) {
    //

    let response = {};

    let items;
    try {
      items = projects.data.items[key];
    } catch (error) {}

    if (items) {
      response.git_url = items.git_url;
      response.html_url = items.html_url;
      response.fileName = items.name;
      response.node_id = items.repository.node_id;
      response.full_name = items.repository.full_name;
      response.owner = items.repository.owner.login;
      response.description = items.repository.description;
      response.fileId = items.repository.id;
      response.query = options.query;
      response.dataSource = "github";
      response.dataType = "hubFiles";
      response.ownerType = items.repository.owner.type;
      response.url = items.repository.url;
      response.commits_url = items.repository.commits_url;

      //! Get reference commits information.

      let dataProject = await getNumberOfStars(response.url);

      response.stargazers_count = dataProject.stargazers_count;
      response.watchers = dataProject.watchers;
      response.default_branch = dataProject.default_branch;
      response.language = dataProject.language;
      response.network_count = dataProject.network_count;
      response.subscribers_count = dataProject.subscribers_count;

      let fileContent;

      try {
        fileContent = await getFilesFromUrl(items.git_url);
      } catch (error) {
        console.log();
        console.log("ERROR " + error.message);
      }

      response.fileContent = fileContent;

      //! Save Inside of the BD fileHub.
      let fileHubResponse = await filesHub.findOneAndUpdate(
        { node_id: response.node_id },
        response,
        { upsert: true }
      );

      //! Get commits relationships with file
      let commitData = await getCommitsFile(
        response.commits_url.replace("{/sha}", ""),
        options.fileExtension,
        fileHubResponse
      );

      // response.fileCommits = commitData;

      // console.log(response);
      // console.log(response.fileCommits);
    }
    break;
  }

  return projects;
}

// Get response of one api using axios and GET request.
function getFilesFromUrl(url) {
  return axios.get(url).then((response) => {
    let fileContent = convertBase64ToString(response.data.content);

    return fileContent;
  });
}

// Convert base64 to string
async function convertBase64ToString(base64) {
  return new Buffer(base64, "base64").toString();
}

// Get one commit message of github repository
// Use octokit library
// Inputs, commit_sha, owner, repo and tokenAccess
// Outputs, commit message

async function getCommitMessage(options) {
  const github = new Octokit({
    auth: tokenAccess,
  });

  const commit = await github.repos.getCommit({
    owner,
    repo,
    sha: commit_sha,
  });

  return commit.data.commit.message;
}

// TODO Read directory content.
// https://api.github.com/repos/strapdata/helm-charts/contents/
// project example https://github.com/zalando/postgres-operator
// http://api.github.com/repos/zalando/postgres-operator

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

//Get number of Stars of one github repository
async function getNumberOfStars(url) {
  return axios.get(url).then((response) => {
    return {
      stargazers_count: response.data.stargazers_count,
      watchers: response.data.watchers,
      default_branch: response.data.default_branch,
      language: response.data.language,
      network_count: response.data.network_count,
      subscribers_count: response.data.subscribers_count,
    };
  });
}

// Get commits_url response of gitlab.
async function getCommitsFile(url, fileExtension, fileHubResponse) {
  return axios.get(url).then(async (response) => {
    console.log(response.data[0]);

    let commitsList = [];
    let count = -1;
    for (const key in response.data) {
      count = count + 1;
      let data = response.data[key];

      let messageFeeling = textIsBadOrGood(data.commit.message);

      //Covert string in lowcase

      let bugWord = haveWoldOfBug(data.commit.message.toLowerCase());

      let dataCommitMaster = {
        shaCommit: data.sha,
        authorCommit: data.commit.author.name,
        emailCommit: data.commit.author.email,
        dateCommit: data.commit.author.date,
        messageCommit: data.commit.message,
        messageFeelingScore: messageFeeling.score,
        messageFeelingComparative: messageFeeling.comparative,
        urlCommit: data.commit.url.replace("/git", ""),
        bugWordCommit: bugWord,
      };

      console.log("@1Marker-No:_-1439546817");

      let commitsFileList = await getCommitsFiles2(
        dataCommitMaster.urlCommit,
        fileExtension,
        dataCommitMaster,
        fileHubResponse
      );

      if (count > 1) {
        break; //TODO LIMIT
      }
    }
    return commitsList;
  });
}

//Get commits files from github repository.
// Use axios library.
// inputs commitUrl.
// outputs commits files.
async function getCommitsFiles2(
  urlCommit,
  fileExtension,
  dataCommitMaster,
  fileHubResponse
) {
  console.log("@1Marker-No:_1686307419");
  //
  let response = await axios.get(urlCommit);
  console.log(">>>>>-1555260547>>>>> RESPONSE ");
  console.log(response);
  // console.log("<<<<<<<<<<<<<<<<<<<");
  // console.log(">>>>>14369272>>>>>");
  // console.log(response.data);
  // console.log("<<<<<<<<<<<<<<<<<<<");
  // let commitsFileList = [];

  // for (const key in response.data.files) {
  //   let file = response.data.files[key];

  //   if (file.filename.includes(fileExtension)) {
  //     // SaveInside of the DB. filesHubCommit

  //     let responseCommit = { ...dataCommitMaster, ...file };

  //     console.log(">>>>>111447517>>>>>");
  //     console.log(responseCommit);
  //     console.log("<<<<<<<<<<<<<<<<<<<");

  //     if (response.commits_url) {
  //       console.log("@1Marker-No:_1496321337");
  //       console.log("@1Marker-No:_1496321337");
  //       console.log("@1Marker-No:_1496321337");
  //       console.log("@1Marker-No:_1496321337");

  //       //! Get commits relationships with file
  //       let commitData = await getCommitsFile(
  //         response.commits_url.replace("{/sha}", ""),
  //         options.fileExtension,
  //         fileHubResponse
  //       );

  //       // await filesHubCommit.findOneAndUpdate(
  //       //   { fileHubId: fileHubResponse.fileHubId },
  //       //   response,
  //       //   { upsert: true }
  //       // );

  //     }
  //   }

  //   break;
  // }

  return commitsFileList;
}

// Know if a text mentions good or bad feelings
// Use web service
// import the library sentiment
function textIsBadOrGood(text) {
  //TODO add this how part to analize

  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);

  return result;
}

// getProjectsUsingFileContent(options, options.token);

//! >>>

//! <<<

// Know if String have key words, of one of the list
function haveWoldOfBug(str) {
  // List of key words related to bug, fix, error, failure
  let list = ["bug", "fix", "error", "failure", "fail", "fixup"];
  for (var i = 0; i < list.length; i++) {
    if (str.includes(list[i])) {
      return true;
    }
  }
  return false;
}

module.exports.getProjectsUsingFileContent = getProjectsUsingFileContent;
