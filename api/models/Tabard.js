/**
 * Tabard.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Tabard = {
  // Enforce model schema in the case of schemaless databases
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
    faction: {
      type: 'string'
    },
    attainable: {
      type: 'boolean'
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
