(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name dabou.main
   * @module dabou.main
   * @description
   *
   */
  angular
    .module('dabou.main')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var globalData = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (userData) {
          authService.csrfToken()
            .then(function (tokenData) {
              deferred.resolve({userData: userData, tokenData: tokenData});
            });
        });
      return deferred.promise;
    }];

    $stateProvider
      .state('index', {
        url: '/index',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/main/views/index.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          globalData: globalData
        }
      });
  }
})();
