"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

var _graphqlCompose = require("graphql-compose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const { Router } = require("express");
// const { makeExecutableSchema } = require('apollo-server');
// const router = new Router();

/**
 * Generate Schema based in based on folders
 *  (exclude folder starting with '_')
 */
// export default async function createQueryAndMutations() {
var readDir = (0, _fs.readdirSync)(__dirname);

for (var key in readDir) {
  var element = readDir[key];

  if (!element.startsWith('_') && element !== 'index.js') {
    // Import Index with schema.
    console.log(' >>> Elements:', element); //! Build the generalSchemas:

    var schemaModels = require("./".concat(element, "/models"));

    var schemaModelsData = schemaModels.queriesAndMutations;
    var queryData = schemaModelsData.entityQuery;
    var mutationData = schemaModelsData.entityMutation;

    _graphqlCompose.schemaComposer.Query.addFields(queryData);

    _graphqlCompose.schemaComposer.Mutation.addFields(mutationData);
  }
}

var graphqlSchema = _graphqlCompose.schemaComposer.buildSchema();

var _default = graphqlSchema;
exports["default"] = _default;