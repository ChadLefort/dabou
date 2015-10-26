(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name dabou.public
     * @module dabou.public
     * @description
     */

    angular
        .module('dabou.public')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var globalData = ['$q', 'authService', function($q, authService) {
            var deferred = $q.defer();
            authService.authenticated()
                .then(function(userData) {
                    deferred.resolve({
                        userData: userData
                    });
                });
            return deferred.promise;
        }];

        $stateProvider
            .state('user', {
                url: '/user/{username:[a-z0-9.\-_]{3,16}}',
                views: {
                    'nav': {
                        templateUrl: '/spa/main/views/nav.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    'page': {
                        templateUrl: '/spa/public/views/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    globalData: globalData
                }
            });
    }
})();
