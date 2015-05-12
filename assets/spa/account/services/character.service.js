(function () {
  'use strict';

  angular
    .module('dabou.account')
    .factory('characterService', characterService);

  characterService.$inject = ['$http', 'urlRoot'];

  /**
   * @ngdoc service
     * @name dabou.account.service:characterService
   * @description
   *
   */
  function characterService($http, urlRoot) {

    function createCharacter(character) {
        return $http.post(urlRoot + '/character/', character);
    }

    function getAccount(token) {
      return $http.get(urlRoot + '/character/account/')
        .then(function (response) {
          return response.data;
        });
    } 
    
    function getCharacter(userId) {
        return $http.get(urlRoot + '/user/' + userId + '/character/')
        .then(function (response) {
          return response.data;
        });
    }
    
    function updateCharacter(character) {
        return $http.put(urlRoot + '/character/', character);
    }
         
    return {
      getAccount: getAccount,
      createCharacter: createCharacter,
      getCharacter: getCharacter,
      updateCharacter: updateCharacter
    };
  }

})();