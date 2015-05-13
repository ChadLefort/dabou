(function () {
  'use strict';

  angular
    .module('dabou.account')
    .factory('accountService', accountService);

  accountService.$inject = ['$http', 'urlRoot'];

  /**
   * @ngdoc service
     * @name dabou.account.service:accountService
   * @description
   *
   */
  function accountService($http, urlRoot) {

    function getPassports(userId) {
      return $http.get(urlRoot + '/user/' + userId + '/passports/')
        .then(function(response) {
          return response.data;
        });
    }
    
    function getProfile(userId) {
      return $http.get(urlRoot + '/user/' + userId + '/profile/')
        .then(function(response) {
          return response.data;
        }, function(error) {
          return error;
        });
    }

    function createProfile(profile) {
      return $http.post(urlRoot + '/profile/', profile)
        .then(function(response) {
          return response.data;
        });
    }
    
    function unlinkPassport(provider) {
      return $http.get('/auth/' + provider + '/disconnect/')
        .then(function (response) {
          return response.data;
        });
    }
    
    return {
      getPassports: getPassports,
      getProfile: getProfile,
      createProfile: createProfile,
      unlinkPassport: unlinkPassport
    };
  }

})();
