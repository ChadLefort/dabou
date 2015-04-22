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

    var authenticated = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (data) {
          if (data.status) {
            deferred.resolve();
          } else {
            deferred.reject('Not logged in');
          }
        });
      return deferred.promise;
    }];

    $stateProvider
      .state('errors', {
        url: '/',
        controller: 'ErrorController',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'IndexController',
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
            templateUrl: '/spa/main/views/nav.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/auth/views/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        }
      })
      .state('account', {
        url: '/account',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/auth/views/account.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          authenticated: authenticated
        }
      })
  }
})();
