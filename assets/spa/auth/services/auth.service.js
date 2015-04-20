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

    return {
      addLocalUser: addLocalUser,
      authenticated: authenticated,
      login: login
    };
  }

})();
