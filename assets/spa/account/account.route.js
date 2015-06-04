(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name dabou.account
   * @module dabou.account
   * @description
   *
   */
  angular
    .module('dabou.account')
    .config(routeConfig)
    .run(redirect);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  redirect.$inject = ['$rootScope', '$state'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var globalData = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (userData) {
          if (userData.status) {
            authService.csrfToken()
              .then(function (tokenData) {
                deferred.resolve({userData: userData, tokenData: tokenData});
              });
          } else {
            deferred.reject('You must login.');
          }
        });
      return deferred.promise;
    }];

    $stateProvider
      .state('account', {
        url: '/account',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/account/views/account.html',
            controller: 'AccountController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          globalData: globalData
        }
      })
      .state('character', {
        url: '/character',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/account/views/character.html',
            controller: 'CharacterController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          globalData: globalData
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/account/views/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          globalData: globalData
        }
      });
  }

  function redirect($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function () {
      $state.go('login');
    });
  }
})();
