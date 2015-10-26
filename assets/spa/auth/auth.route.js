(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name dabou.auth
     * @module dabou.auth
     * @description
     */

    angular
        .module('dabou.auth')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var globalData = ['$q', 'authService', function($q, authService) {
            var deferred = $q.defer();
            authService.authenticated()
                .then(function(userData) {
                    authService.csrfToken()
                        .then(function(tokenData) {
                            deferred.resolve({
                                userData: userData,
                                tokenData: tokenData
                            });
                        });
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
                        templateUrl: '/spa/main/views/nav.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    'page': {
                        templateUrl: '/spa/auth/views/login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    globalData: globalData
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    'nav': {
                        templateUrl: '/spa/main/views/nav.html',
                        controller: 'NavController',
                        controllerAs: 'vm'
                    },
                    'page': {
                        templateUrl: '/spa/auth/views/register.html',
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
