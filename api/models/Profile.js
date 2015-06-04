/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Profile = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    name: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    location: {
      type: 'string'
    },
    bio: {
      type: 'string'
    },
    user: {
      model: 'User',
      unique: true
    }
  }
};

module.exports = Profile;
