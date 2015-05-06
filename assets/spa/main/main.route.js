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
    
    var user = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (data) {
            deferred.resolve(data);
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
            templateUrl: '/spa/main/views/index.html'
          }
        },
        resolve: {
          userData: user
        }
      });
  }
})();
