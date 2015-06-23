/**
 * Character.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Character = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name: {
      type: 'string'
    },
    realm: {
      type: 'string'
    },
    region: {
      type: 'string'
    },
    race: {
      model: 'Race'
    },
    gender: {
      type: 'integer'
    },
    thumbnail: {
      type: 'string'
    },
    user: {
      model: 'User',
      unique: true
    }
  }
};

module.exports = Character;
