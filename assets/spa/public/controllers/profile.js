(function() {
    'use strict';

    angular
        .module('dabou.public')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['_', 'accountService', 'globalData', '$stateParams'];

    /**
     * @ngdoc controller
     * @name dabou.public.controller:ProfileController
     * @description
     */

    function ProfileController(_, accountService, globalData, $stateParams) {
        var vm = this,
            username = $stateParams.username;

        // PUBLIC PROPERTIES
        vm.profile = {};

        // PUBLIC FUNCTIONS

        // init
        activate();

        // PRIVATE FUNCTIONS
        function activate() {
            getProfile(username);
        }

        /*
         * @private
         * @function
         * @description
         * Get's a user's profile by username
         * @param {String} username - A user's username
         */
        function getProfile(username) {
            accountService.getProfileByUsername(username)
                .then(function(data) {
                    vm.user = data.user;
                    vm.profile = data.profile;
                }).catch(function() {
                    vm.noProfile = true;
                });
        }

    }
})();
