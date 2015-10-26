(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name dabou
     * @module dabou
     * @description
     */
     
    angular.module('dabou', [
        // Angular modules

        // Custom modules
        'dabou.main',
        'dabou.public',
        'dabou.auth',
        'dabou.account',
        'dabou.tabards',

        // 3rd Party Modules
    ]);
})();
