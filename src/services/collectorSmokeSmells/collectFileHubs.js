const { Octokit } = require('@octokit/rest');
const axios = require('axios');

let options = {
  pull_number: 3,
  // token: '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', // TOKEN cecilio.cannav@gmail.com
  token: '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', // TOKEN smktest
  query: 'keyword:kubernetes extension:.yaml',
  fileExtension: '.yaml',
};

// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess
async function getProjectsUsingFileContent(options, tokenAccess) {
  //
  const github = new Octokit({
    auth: tokenAccess,
  });

  console.log('@1Marker-No:_-1982188349');
  const projects = await github.search.code({
    q: options.query,
    sort: 'stars',
    order: 'desc',
    limit: 100,
  });

  for (const key in projects.data.items) {
    //
    let response = {};
    items = projects.data.items[key];

    response.git_url = items.git_url;
    response.html_url = items.html_url;
    response.fileName = items.name;
    response.node_id = items.repository.node_id;
    response.full_name = items.repository.full_name;
    response.owner = items.repository.owner.login;
    response.description = items.repository.description;
    response.id = items.repository.id;
    response.query = options.query;
    response.dataSource = 'github';
    response.dataType = 'hubFiles';
    response.ownerType = items.repository.owner.type;
    response.url = items.repository.url;
    response.commits_url = items.repository.commits_url;

    //! Get reference commits information.

    console.log('@1Marker-No:_2013871647');
    let dataProject = await getNumberOfStars(response.url);

    response.stargazers_count = dataProject.stargazers_count;
    response.watchers = dataProject.watchers;
    response.default_branch = dataProject.default_branch;
    response.language = dataProject.language;
    response.network_count = dataProject.network_count;
    response.subscribers_count = dataProject.subscribers_count;

    console.log('@1Marker-No:_644159645');

    //! Get commits relationships with file
    let commitData = await getCommitsFile(
      response.commits_url.replace('{/sha}', ''),
      options.fileExtension
    );

    response.fileCommits = commitData;

    console.log('>>>>>1008562407>>>>>');
    console.log(commitData);
    console.log('<<<<<<<<<<<<<<<<<<<');

    break;

    let fileContent;
    try {
      fileContent = await getFilesFromUrl(items.git_url);
    } catch (error) {
      console.log();
      console.log('ERROR ' + error.message);
    }

    response.fileContent = fileContent;

    console.log(response);
    console.log('<<<<<<<<<<<<<<<<<<<');
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
  return new Buffer(base64, 'base64').toString();
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

// Know if a text mentions good or bad feelings
// Use web service
// import the librery sentiment
function textIsBadOrGood(text) {
  //TODO add this how part to analize

  const sentiment = require('sentiment');
  const sentimentResult = sentiment(text);
  console.log(sentimentResult);
  return sentimentResult.score;
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
async function getCommitsFile(url, fileExtension) {
  return axios.get(url).then(async (response) => {
    console.log(response.data[0]);

    let commitsList = [];
    for (const key in response.data) {
      let data = response.data[key];

      let dataCommitMaster = {
        shaCommit: data.sha,
        authorCommit: data.commit.author.name,
        emailCommit: data.commit.author.email,
        dateCommit: data.commit.author.date,
        messageCommit: data.commit.message,
        urlCommit: data.commit.url.replace('/git', ''),
      };

      console.log('@1Marker-No:_-1439546817');
      let commitsFileList = await getCommitsFiles2(
        dataCommitMaster.urlCommit,
        fileExtension,
        dataCommitMaster
      );
      console.log('@1Marker-No:_-768349624');

      commitsList.push(commitsFileList);
      break; //TODO
    }
    return commitsList;
  });
}

//Get commits files from github repository.
// Use axios library.
// inputs commitUrl.
// outputs commits files.
async function getCommitsFiles2(urlCommit, fileExtension, dataCommitMaster) {
  console.log('@1Marker-No:_1686307419');
  //
  let response = await axios.get(urlCommit);

  let commitsFileList = [];
  for (const key in response.data.files) {
    let file = response.data.files[key];

    if (file.filename.includes(fileExtension)) {
      console.log('@1Marker-No:_-770687769');
      commitsFileList.push({ ...dataCommitMaster, ...file });
    }
    break;
  }

  return commitsFileList;
}

getProjectsUsingFileContent(options, options.token);
