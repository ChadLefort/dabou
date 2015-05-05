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
            type: 'string'
        },
        admin: {
            type: 'boolean',
            defaultsTo: 0,
            protected: true
        },
        passports: {
            collection: 'Passport',
            via: 'user'
        },
        profile: {
            model: 'profile'
        }
    }
};

module.exports = User;