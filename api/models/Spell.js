/**
 * Spell.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Spell = {
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
    icon: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    castTime: {
      type: 'string'
    },
    tabard: {
      model: 'Tabard'
    }
  }
};

module.exports = Spell;