/**
 * Profile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Profile = {
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
