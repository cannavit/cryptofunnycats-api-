const mongoose = require("mongoose");

const schemagitlabLogs = mongoose.Schema({
  projectName: String,
  projectNameWithNamespace: String,
  projectId: Number,
  projectDescriptions: String,

  pipelineId: Number,
  pipelineRef: String,
  pipelineStatus: String,
  pipelineWebUrl: String,

  sha: String,
  pipelineUrl: String,

  jobId: Number,
  jobStatus: String,
  jobStage: String,
  jobName: String,
  jobRef: String,

  allow_failure: Boolean,
  created_at: Date,
  started_at: Date,
  duration: Number,
  queued_duration: Number,
  username: String,

  commitMessage: String,
  commitTitle: String,
  commitId: String,
  committedEmail: String,

  runnerId: Number,
  runnerDescription: String,
  runnerIpAddress: String,
  runnerName: String,

  jobLog: String,
});

module.exports.gitlabLogs = mongoose.model("gitlabLogs", schemagitlabLogs);
module.exports.schemagitlabLogs = schemagitlabLogs;
