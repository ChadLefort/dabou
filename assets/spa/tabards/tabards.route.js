(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name dabou.tabards
   * @module dabou.tabards
   * @description
   *
   */
  angular
    .module('dabou.tabards')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var globalData = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (userData) {
            deferred.resolve({userData: userData});
        });
      return deferred.promise;
    }];

    $stateProvider
      .state('tabards', {
        url: '/tabards',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'NavController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/tabards/views/tabards.html',
            controller: 'TabardsController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          globalData: globalData
        }
      });
  }
})();
