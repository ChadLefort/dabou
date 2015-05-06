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

    var user = ['$q', 'authService', function ($q, authService) {
      var deferred = $q.defer();
      authService.authenticated()
        .then(function (data) {
          if (data.status) {
            deferred.resolve(data);
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
          userData: user
        }
      });
  }

  function redirect($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function () {
      $state.go('login');
    });
  }
})();
