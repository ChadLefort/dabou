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

    function getCharacters(token) {
      return $http.get('https://us.api.battle.net/wow/user/characters?access_token=' + token)
        .then(function (response) {
          return response.data;
        });
    }  
    
    function getToken() {
      return $http.get(urlRoot + '/character/token/')
        .then(function (response) {
          return response.data;
        });
    }
       
    return {
      getCharacters: getCharacters,
      getToken: getToken
    };
  }

})();
