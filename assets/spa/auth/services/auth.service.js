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
      return $http.get('/user/account')
        .then(function (response) {
          return response.data;
        });
    }

    function unlinkPassport(provider) {
      return $http.get('/user/unlink/' + provider)
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
      unlinkPassport: unlinkPassport
    };
  }

})();
