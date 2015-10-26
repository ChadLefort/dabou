/**
 * Tabard.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Tabard = {
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
            type: 'string'
        },
        description: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        itemBind: {
            model: 'ItemBind'
        },
        quality: {
            model: 'Quality'
        },
        buyPrice: {
            type: 'integer'
        },
        sellPrice: {
            type: 'integer'
        },
        itemLevel: {
            type: 'integer'
        },
        reqLevel: {
            type: 'integer'
        },
        attainable: {
            type: 'boolean'
        },
        faction: {
            model: 'Faction'
        },
        spell: {
            model: 'Spell'
        },
        minReputation: {
            model: 'Reputation'
        },
        quest: {
            model: 'Quest'
        },
        achievement: {
            model: 'Achievement'
        },
        sourceType: {
            collection: 'SourceType',
            via: 'tabard'
        }
    }
};

module.exports = Tabard;
