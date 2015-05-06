(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .factory('authService', authService);

  authService.$inject = ['$http', 'urlRoot'];

  /**
   * @ngdoc service
   * @name dabou.auth.service:authService
   * @description
   *
   */
  function authService($http, urlRoot) {

    function authenticated() {
      return $http.get('/auth')
        .then(function (response) {
          return response.data;
        });
    }

    function addLocalUser(user) {
        return $http.post('/auth/local/register', user);
    }
    
    function csrfToken() {
      return $http.get('/csrfToken')
        .then(function (response) {
          return response.data;
        });
    }

    function login(user) {
        return $http.post('/auth/local', user);
    }

    function logout() {
      return $http.get('/logout');
    }
    return {
      addLocalUser: addLocalUser,
      authenticated: authenticated,
      csrfToken: csrfToken,
      login: login,
      logout: logout
    };
  }

})();
