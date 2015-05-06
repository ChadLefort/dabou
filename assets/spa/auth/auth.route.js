(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name dabou.auth
   * @module dabou.auth
   * @description
   *
   */
  angular
    .module('dabou.auth')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var user = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (data) {
            deferred.resolve(data);
        });
      return deferred.promise;
    }];

    $stateProvider
      .state('errors', {
        url: '/',
        controller: 'StatusController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        views: {
          'nav': {
            resolve: {userData: user},
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/auth/views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'nav': {
            resolve: {userData: user},
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/auth/views/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
