const { response } = require("express");
const shell = require("shelljs");
const { certifiedTemplates } = require("../../apis/certifiedTemplates/model"); // new

// oc get templates -n openshift -o json

// Eval terminal command using shelljs
// import library
// input is command line
// output is JSON
async function getTemplates(command) {
  var output = await shell.exec(command, { silent: true });
  let json = JSON.parse(output);
  //   let json = JSON.stringify(output);

  //   let json = output;
  return json;
}

async function getOneTemplatesJson(templateName) {
  var output = await shell.exec(
    `oc get template ${templateName} -n openshift -o json`,
    { silent: true }
  );
  let json = JSON.parse(output);

  return json;
}

async function getOneTemplatesYaml(templateName) {
  var output = await shell.exec(
    `oc get template ${templateName} -n openshift -o yaml`,
    { silent: true }
  );

  return output.stdout;
}

options = {
  commands: {
    getAllTemplatesName: "oc get templates -n openshift -o json",
  },
};

async function getCertifiedTemplates(options) {
  console.log("@1Marker-No:_354467327");

  let templateNames = await getTemplates(options.commands.getAllTemplatesName);

  for (let i = 0; i < templateNames.items.length; i++) {
    let response = {};
    let template = templateNames.items[i];
    let templateName = template.metadata.name;

    //! Data template.
    response.dataSource = "openshift";
    response.dataType = "certifiedTemplates";
    response.message = template.message;
    response.namespace = "openshift";
    response.objects = template.objects;

    let templateJson = await getOneTemplatesJson(templateName);
    templateJson = JSON.stringify(templateJson);
    let templateYaml = await getOneTemplatesYaml(templateName);

    response.templateYaml = templateYaml;
    response.templateJson = templateJson;

    // Save request in db.
    return await certifiedTemplates.findOneAndUpdate(
      { templateName: templateName, namespace: response.namespace },
      response,
      { upsert: true }
    );
  }

  return options;
}

getCertifiedTemplates(options);
