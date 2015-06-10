/**
 * Tabard.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Tabard = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    item: {
      type: 'integer',
      unique: true
    },
    name: {
      type: 'string'
    },
    icon: {
      type: 'string'
    },
    quality: {
      type: 'integer'
    }
  }
};

module.exports = Tabard;
