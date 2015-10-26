/**
 * SourceType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var SourceType = {
    schema: true,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        value: {
            type: 'integer'
        },
        name: {
            type: 'string'
        },
        tabard: {
            model: 'Tabard'
        }
    }
};

module.exports = SourceType;
