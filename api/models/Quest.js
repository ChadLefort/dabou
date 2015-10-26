/**
 * Quest.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Quest = {
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
        category: {
            type: 'string'
        },
        level: {
            type: 'integer'
        },
        tabard: {
            model: 'Tabard'
        }
    }
};

module.exports = Quest;
