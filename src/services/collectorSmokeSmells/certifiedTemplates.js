const { response } = require('express');
const shell = require('shelljs');
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
    getAllTemplatesName: 'oc get templates -n openshift -o json',
    // getTemplateJsonFromat: `oc get template ${templateName} -n openshift -o json`,
    // getTemplateYamlFormat: `oc get template ${templateName} -n openshift -o yaml`,
  },
};

async function getCertifiedTemplates(options) {
  console.log('@1Marker-No:_354467327');

  let templateNames = await getTemplates(options.commands.getAllTemplatesName);

  for (let i = 0; i < templateNames.items.length; i++) {
    let response = {};
    let template = templateNames.items[i];
    let templateName = template.metadata.name;

    console.log('>>>>>1205677119>>>>>');
    console.log(templateName);
    console.log('<<<<<<<<<<<<<<<<<<<');
    //! Data template.
    response.dataSource = 'openshift';
    response.dataType = 'certifiedTemplates';
    response.message = template.message;
    response.namespace = 'openshift';
    response.formatType = 'json';
    response.objects = template.objects;

    let templateJson = await getOneTemplatesJson(templateName);
    templateJson = JSON.stringify(templateJson);
    let templateYaml = await getOneTemplatesYaml(templateName);

    response.templateYaml = templateYaml;
    response.templateJson = templateJson;

    // TODO.
  }
  console.log('<<<<<<<<<<<<<<<<<<<');

  return options;
}

getCertifiedTemplates(options);
