/**
 * Gender.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Gender = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    value: {
      type: 'integer',
      unique: true
    },
    name: {
      type: 'string',
      unique: true
    }
  }
};

module.exports = Gender;
