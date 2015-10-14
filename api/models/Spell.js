/**
 * Spell.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 */

var Spell = {
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