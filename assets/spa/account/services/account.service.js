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
        .then(function (response) {
          return response.data;
        });
    }

    function getProfile(userId) {
      return $http.get(urlRoot + '/user/' + userId + '/profile/')
        .then(function (response) {
          return response.data;
        });
    }

    function getProfileByUsername(username) {
      return $http.get('/profile/' + username)
        .then(function (response) {
          return response.data;
        });
    }

    function createProfile(profile) {
      return $http.post(urlRoot + '/profile/', profile)
        .then(function (response) {
          return response.data;
        });
    }

    function unlinkPassport(provider) {
      return $http.get('/auth/' + provider + '/disconnect/')
        .then(function (response) {
          return response.data;
        });
    }

    function updateProfile(id, profile) {
      return $http.put(urlRoot + '/profile/' + id, profile)
        .then(function (response) {
          return response.data;
        });
    }

    function updateUsername(userId, username) {
      return $http.put(urlRoot + '/user/' + userId, username)
        .then(function (response) {
          return response.data;
        });
    }

    return {
      getPassports: getPassports,
      getProfile: getProfile,
      getProfileByUsername: getProfileByUsername,
      createProfile: createProfile,
      unlinkPassport: unlinkPassport,
      updateProfile: updateProfile,
      updateUsername: updateUsername
    };
  }

})();
