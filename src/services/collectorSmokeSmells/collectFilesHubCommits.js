const { filesHub } = require("../../apis/filesHub/model");
const axios = require("axios");


// Know if a text mentions good or bad feelings
// Use web service
// import the library sentiment
function textIsBadOrGood(text) {
  //TODO add this how part to analize

  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);

  return result;
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
  let commitsFileList = [];

  for (const key in response.data.files) {
    let file = response.data.files[key];

    if (file.filename.includes(fileExtension)) {
      // SaveInside of the DB. filesHubCommit

      let responseCommit = { ...dataCommitMaster, ...file };

      console.log(">>>>>111447517>>>>>");
      console.log(responseCommit);
      console.log("<<<<<<<<<<<<<<<<<<<");

      console.log("@1Marker-No:_1496321337");
      console.log("@1Marker-No:_1496321337");
      console.log("@1Marker-No:_1496321337");
      console.log("@1Marker-No:_1496321337");

      //! Get commits relationships with file
      let commitData = await getCommitsFile(
        fileHubResponse.commitsUrl,
        fileExtension,
        fileHubResponse
      );

      console.log(">>>>>-1088011463>>>>>");
      console.log(commitData);
      console.log("<<<<<<<<<<<<<<<<<<<");
      // await filesHubCommit.findOneAndUpdate(
      //   { fileHubId: fileHubResponse.fileHubId },
      //   response,
      //   { upsert: true }
      // );
    }

    break;
  }

  // return commitsFileList;
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

      let commitsFileList = await getCommitsFiles2(
        dataCommitMaster.urlCommit,
        fileExtension,
        dataCommitMaster,
        fileHubResponse
      );

      if (count >= 1) {
        break; //TODO LIMIT
      }
    }
    return commitsList;
  });
}

async function collectCommitsOfFiles() {
  console.log("@1Marker-No:_354467327");
  console.log("@1Marker-No:_354467327");

  console.log("@1Marker-No:_354467327");
  console.log("@1Marker-No:_354467327");
  console.log("@1Marker-No:_354467327");

  let filesHubData = await filesHub.find({});

  console.log(">>>>>1406151863>>>>>");
  console.log(filesHubData);
  console.log("<<<<<<<<<<<<<<<<<<<");

  for (const key in filesHubData) {
    let fileHub = filesHubData[key];
    let fileIdMongo = fileHub._id;
    let commits_url = fileHub.commits_url;

    console.log(">>>>>374239238>>>>>");
    console.log(fileHub);
    console.log("<<<<<<<<<<<<<<<<<<<");

    console.log(">>>>>1293116960>>>>>");
    console.log(commits_url);
    console.log(fileIdMongo);
    console.log("<<<<<<<<<<<<<<<<<<<");

    console.log("@1Marker-No:_-1887220185");
    let commitData = await getCommitsFile(commits_url, ".yaml", fileHub);
    console.log("@1Marker-No:_131635770");

    console.log(">>>>>-342210217>>>>>");
    console.log(commitData);
    console.log("<<<<<<<<<<<<<<<<<<<");

    break;
  }
}

module.exports.collectCommitsOfFiles = collectCommitsOfFiles;
