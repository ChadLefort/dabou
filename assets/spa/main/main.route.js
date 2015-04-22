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

    $stateProvider
      .state('index', {
        url: '/index',
        views: {
          'nav': {
            templateUrl: '/spa/main/views/nav.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          },
          'page': {
            templateUrl: '/spa/main/views/index.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
