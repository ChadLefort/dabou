(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .factory('authService', authService);

  authService.$inject = ['$http'];

  /**
   * @ngdoc service
   * @name dabou.auth.service:authService
   * @description
   *
   */
  function authService($http) {

    function authenticated() {
      return $http.get('/auth')
        .then(function (response) {
          return response.data;
        });
    }

    function addLocalUser(user) {
        return $http.post('/auth/local/register', user);
    }

    function login(user) {
        return $http.post('/auth/local', user);
    }

    function logout() {
      return $http.get('/logout');
    }

    function csrfToken() {
      return $http.get('/csrfToken')
        .then(function (response) {
          return response.data;
        });
    }

    function getPassports() {
      return $http.get('/auth/passports')
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
    
    function profile(profile) {
        return $http.post('/user/profile', profile);
    }
    
    function getProfile(userId) {
        return $http.get('/user/profile/' + userId)
        .then(function (response) {
          return response.data;
        });
    }

    return {
      addLocalUser: addLocalUser,
      authenticated: authenticated,
      csrfToken: csrfToken,
      login: login,
      logout: logout,
      getPassports: getPassports,
      unlinkPassport: unlinkPassport,
      profile: profile,
      getProfile: getProfile
    };
  }

})();
