/**
 * Quality.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Quality = {
    schema: true,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
        id: {
            primaryKey: true,
            type: 'integer',
            unique: true
        },
        name: {
            type: 'string',
            unique: true
        }
    }
};

module.exports = Quality;
