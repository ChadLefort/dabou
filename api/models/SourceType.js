/**
 * SourceType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var SourceType = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    value: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    tabard: {
      model: 'Tabard'
    }
  }
};

module.exports = SourceType;
