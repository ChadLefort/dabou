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
    spell: {
      model: 'Spell'
    },
    minReputation: {
      model: 'Reputation'
    },
    sourceType: {
      type: 'string'
    },
    quest: {
      model: 'Quest'
    },
    achievement: {
      model: 'Achievement'
    },
    vendor: {
      type: 'integer'
    }
  }
};

module.exports = Tabard;
