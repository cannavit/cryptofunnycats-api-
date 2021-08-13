var axios = require("axios");
const {
  gitlabBearerToken,
  gitlabSaveCollectonInDB,
} = require("../../../config");

const { gitlabLogs } = require("../../../apis/gitlabLogs/model");
const { pagesRead } = require("../../../apis/pagesRead/model");
const { default: logger } = require("../../logger");
var dateFormat = require("dateformat");

// Collect information of gitlab pipelines.

async function collectProjectInfo(options) {
  let projectId = options.projectId;

  options.bearerToken = gitlabBearerToken; //Variable environment
  options.saveInDB = gitlabSaveCollectonInDB;

  let bearerToken = options.bearerToken;
  options.bearerToken = bearerToken;

  var config = {
    method: "get",
    url: `https://gitlab.com/api/v4/projects/${projectId}`,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  //! Get project information
  let response;

  try {
    response = await axios(config);
  } catch (error) {
    logger.error(error.message);
  }

  let schemagitlabLogs = {
    projectName: response.data.name,
    projectNameWithNamespace: response.data.name_with_namespace,
    projectId: response.data.id,
    projectDescriptions: response.data.description,
  };

  options.schemagitlabLogs = schemagitlabLogs;
  options.projects = response.data;

  //! Get job information.
  options = await collectPipelines(options);

  return options;
}

module.exports.collectProjectInfo = collectProjectInfo;

async function collectAllProject(options) {
  // Read page.
  let pages = await pagesRead.findOne({ reference: "importGitLabPublics" });

  // Default value
  let incrementDateInDays = 30;

  if (!pages) {
    pages = {
      pages: 0,
      per_page: 100,
      reference: "importGitLabPublics",
      finishIt: false,
      dateFind: "2013-10-26T15:41:19.479Z",
      total_count: 0,
    };
  }

  let search = true;

  let dateFind = dateFormat(pages.dateFind, "yyyy-mm-dd");
  dateFind = new Date(dateFind);

  if (pages.finishIt) {
    dateFind = new Date(
      dateFind.getTime() + incrementDateInDays * 1000 * 60 * 60 * 24
    );
  }

  logger.info("Search gitlab project created in: " + dateFind);

  while (search) {
    console.log(pages);
    pages.pages = pages.pages + 1;

    let url = `https://gitlab.com/api/v4/projects?page=${pages.pages}&per_page=${pages.per_page}&order_by=created_at&sort=asc&last_activity_before=${pages.dateFind}&limit=${pages.per_page}`;

    var config = {
      method: "get",
      url: url,
      headers: {},
    };

    logger.info(" 📦 Search gitlab project page: " + pages.pages);

    let response = await axios(config);

    if (response.data.length === 0) {
      search = false;
      logger.info(" Finish search cicle");
      break;
    }

    for (const data of response.data) {
      logger.info(" 📄 Import project " + data.id);
      await collectProjectInfo({
        projectId: data.id,
        bearerToken: gitlabBearerToken,
      });
    }

    logger.info(" 📦 Data package length: " + response.data.length);
    logger.info(
      " 📦 Data package date: " + response.data[pages.pages].created_at
    );

    pages.dateFind = response.data[pages.pages].created_at;
  }

  pages.finishIt = true;
  pages.dateFind = dateFind;
  pages.pages = 0;
  //Update control
  logger.info("");
  await pagesRead.findOneAndUpdate(
    {
      reference: "importGitLabPublics",
    },
    pages,
    {
      upsert: true,
    }
  );

  console.log(dateFind);
}

module.exports.collectAllProject = collectAllProject;

// Collect all pipeliens.
async function collectPipelines(options) {
  //! Get pipeline information

  let response = options.projects;
  let schemagitlabLogs = options.schemagitlabLogs;

  let findData = true;
  let count = 0;
  while (findData) {
    count = count + 1;

    var config = {
      method: "get",
      url: `https://gitlab.com/api/v4/projects/${options.projectId}/pipelines?page=${count}&per_page=1000`,
      headers: {
        Authorization: `Bearer ${options.bearerToken}`,
      },
    };

    try {
      response = await axios(config);
    } catch (error) {
      logger.error(error.message);
    }

    if (!response.data) {
      logger.info(" Not exist pipelines in the project: " + options.projectId);
      findData = false;
      break;
    }

    if (response.data.length === 0) {
      logger.info(
        `🖐 Search one new package Count: ${count} and length: ${response.data.length}`
      );
      findData = false;
      break;
    }

    logger.info(
      `🟢 Search one new package Count: ${count} and length: ${response.data.length}`
    );

    console.log();
    console.log();
    console.log();

    for (const data of response.data) {
      // pipelineId: Number,
      schemagitlabLogs.pipelineId = data.id;
      // pipelineRef: String,
      schemagitlabLogs.pipelineRef = data.ref;
      // pipelineStatus: String
      schemagitlabLogs.pipelineStatus = data.status;
      // pipelineWebUrl: String,
      schemagitlabLogs.pipelineWebUrl = data.web_url;
      // sha: String,
      schemagitlabLogs.sha = data.sha;
      // pipelineUrl: String,
      schemagitlabLogs.pipelineUrl = data.web_url;
      options.schemagitlabLogs = schemagitlabLogs;
      options = await collectJobs(options);
      // break;
    }
  }

  return options;
}

async function collectJobs(options) {
  //
  var config = {
    method: "get",
    url: `https://gitlab.com/api/v4/projects/${options.projectId}/pipelines/${options.schemagitlabLogs.pipelineId}/jobs`,
    headers: {
      Authorization: `Bearer ${options.bearerToken}`,
    },
  };

  let response = await axios(config);

  for (const data of response.data) {
    // jobId: Number,
    options.schemagitlabLogs.jobId = data.id;
    // jobStatus: String,
    options.schemagitlabLogs.jobStatus = data.status;
    // jobStage: String,
    options.schemagitlabLogs.jobStage = data.stage;
    // jobName: String,
    options.schemagitlabLogs.jobName = data.name;
    // jobRef: String,
    options.schemagitlabLogs.jobRef = data.ref;

    // allow_failure: Boolean,
    options.schemagitlabLogs.allow_failure = data.allow_failure;
    // created_at: Date,
    options.schemagitlabLogs.created_at = data.created_at;
    // started_at: Date,
    options.schemagitlabLogs.started_at = data.started_at;
    // duration: Number,
    options.schemagitlabLogs.duration = data.duration;
    // queued_duration: Number,
    options.schemagitlabLogs.queued_duration = data.queued_duration;
    // username: String,
    options.schemagitlabLogs.username = data.user.username;

    // commitMessage: String,
    options.schemagitlabLogs.commitMessage = data.commit.message;
    // commitTitle: String,
    options.schemagitlabLogs.commitTitle = data.commit.title;
    // commitId: String,
    options.schemagitlabLogs.commitId = data.commit.id;
    // committedEmail: String,
    options.schemagitlabLogs.committedEmail = data.commit.author_email;

    // runnerId: Number,
    options.schemagitlabLogs.runnerId = data.runner_id;
    // runnerDescription: String,
    options.schemagitlabLogs.runnerDescription = data.runner
      ? data.runner.description
      : "";
    // runnerIpAddress: String,
    options.schemagitlabLogs.runnerIpAddress = data.runner
      ? data.runner.ip_address
      : "";
    // runnerName: String,
    options.schemagitlabLogs.runnerName = data.runner ? data.runner.name : "";

    options = await collectLogs(options);
    // break;
  }

  return options;
}

async function collectLogs(options) {
  //
  var config = {
    method: "get",
    url: `https://gitlab.com/api/v4/projects/${options.projectId}/jobs/${options.schemagitlabLogs.jobId}/trace`,
    headers: {
      Authorization: `Bearer ${options.bearerToken}`,
    },
  };

  let response = await axios(config);
  options.schemagitlabLogs.jobLog = response.data;

  //! Save Data inside of the DB.

  if (options.saveInDB) {
    if (options.schemagitlabLogs.jobStatus === "success") {
      logger.info(
        `🟢 Save logs of project: ${options.schemagitlabLogs.projectName} and job: ${options.schemagitlabLogs.jobStage}/${options.schemagitlabLogs.jobName}`
      );
    } else {
      logger.info(
        `🟠 Save logs of project: ${options.schemagitlabLogs.projectName} and job: ${options.schemagitlabLogs.jobStage}/${options.schemagitlabLogs.jobName}`
      );
    }

    await gitlabLogs.findOneAndUpdate(
      {
        projectId: options.schemagitlabLogs.projectId,
        jobId: options.schemagitlabLogs.jobId,
      },
      options.schemagitlabLogs,
      {
        upsert: true,
      }
    );
  }

  return options;
}
