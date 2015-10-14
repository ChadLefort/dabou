/**
 * Achievement.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Achievement = {
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
        points: {
            type: 'integer'
        },
        description: {
            type: 'string'
        },
        accountWide: {
            type: 'boolean'
        },
        tabard: {
            model: 'Tabard'
        }
    }
};

module.exports = Achievement;
