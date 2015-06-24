/**
 * Quest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Quest = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      primaryKey: true,
      type: 'integer',
      unique: true
    },
    title: {
      type: 'string'
    },
    reqLevel: {
      type: 'integer'
    },
    tabard: {
      model: 'Tabard'
    }
  }
};

module.exports = Quest;