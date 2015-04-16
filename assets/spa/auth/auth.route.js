(function() {
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

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'spa/auth/views/index.html',
                controller: 'IndexController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'spa/auth/views/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'spa/auth/views/register.html',
                controller: 'RegisterController',
                controllerAs: 'vm'
            })
    }
})();
