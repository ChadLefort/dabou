(function () {
  'use strict';

  angular
    .module('dabou.account')
    .factory('characterService', characterService);

  characterService.$inject = ['_', '$http', 'urlRoot'];

  /**
   * @ngdoc service
   * @name dabou.account.service:characterService
   * @description
   *
   */
  function characterService(_, $http, urlRoot) {

    function createCharacter(character) {
      return $http.post(urlRoot + '/character/', character)
        .then(function (response) {
          return response.data;
        });
    }

    function getAccount() {
      return $http.get(urlRoot + '/character/account/')
        .then(function (response) {
          return response.data;
        });
    }

    function getCharacter(userId) {
      return $http.get(urlRoot + '/user/' + userId + '/character/')
        .then(function (response) {
          return response.data;
        }).catch(function (response) {
          return response;
        });
    }

    function mapCharacterColors(characters) {
      var classes = [
        {id: 1, class: 'Death Knight', color: '#941C30'},
        {id: 2, class: 'Druid', color: '#BB5C08'},
        {id: 3, class: 'Hunter', color: '#79994C'},
        {id: 4, class: 'Mage', color: '#349DC3'},
        {id: 5, class: 'Monk', color: '#06BE72'},
        {id: 6, class: 'Paladin', color: '#B56E8D'},
        {id: 7, class: 'Priest', color: '#D2D2D2'},
        {id: 8, class: 'Rogue', color: '#CFC219'},
        {id: 9, class: 'Shaman', color: '#0454A3'},
        {id: 10, class: 'Warlock', color: '#6B5E93'},
        {id: 11, class: 'Warrior', color: '#836647'}
      ];

      return _.map(characters, function (character) {
          return _.merge(character, {color: _.findWhere(classes, {class: character.class}).color});
      });
    }

    function mapPreferredCharacter(account, data) {
      var results = [],
          characters = 
          _.map(account, function (character) {
            if (character.name == data.name && character.realm == data.realm) {
              return _.extend({}, character, {preferred: true});
            } else {
              return _.extend({}, character, {preferred: false});
            }
          });

      _.each(characters, function (value, key) {
        var preferredKey = _.indexOf(characters, (_.find(characters, {preferred: true})));

        if (key == preferredKey) {
          results.splice(key, 1);
          results.unshift(characters[key]);
        } else {
          results.push(characters[key]);
        }
      });

      return results;
    }

    function updateCharacter(id, character) {
      return $http.put(urlRoot + '/character/' + id, character)
        .then(function (response) {
          return response.data;
        });
    }

    return {
      getAccount: getAccount,
      createCharacter: createCharacter,
      getCharacter: getCharacter,
      mapCharacterColors: mapCharacterColors,
      mapPreferredCharacter: mapPreferredCharacter,
      updateCharacter: updateCharacter
    };
  }

})();
