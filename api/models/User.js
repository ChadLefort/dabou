/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    email: {
      type: 'email',
      unique: true
    },
    gravatar: {
      type: 'string',
      defaultsTo: 'https://localhost:1337/images/default_avatar.png'
    },
    admin: {
      type: 'boolean',
      defaultsTo: false,
      protected: true
    },
    setUsername: {
      type: 'boolean',
      defaultsTo: false
    },
    passports: {
      collection: 'Passport',
      via: 'user'
    },
    profile: {
      model: 'Profile'
    },
    character: {
      model: 'Character'
    }
  },

  /**
   * Callback to be run before creating a User that makes
   * the first user an admin.
   *
   * @param {Object}   user The soon-to-be-created User
   * @param {Function} next
   */
  beforeCreate: function (user, next) {
    sails.models['user'].count().then(function (count) {
      if (count == 0) {
        user.admin = true;
        next(null, user);
      } else {
        next(null, user);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
};

module.exports = User;
