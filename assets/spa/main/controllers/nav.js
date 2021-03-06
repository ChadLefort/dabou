(function() {
    'use strict';

    angular
        .module('dabou.main')
        .controller('NavController', NavController);

    /**
     * @ngdoc controller
     * @name dabou.main.controller:NavController
     * @description
     */

    NavController.$inject = ['_', 'authService', 'characterService', '$modal', '$state', 'globalData'];

    function NavController(_, authService, characterService, $modal, $state, globalData) {
        var vm = this,
            user = globalData.userData.user,
            status = globalData.userData.status;

        // PUBLIC PROPERTIES
        vm.username = null;
        vm.isLoggedIn = false;

        // PUBLIC FUNCTIONS
        vm.logout = logout;

        // init
        activate();

        // PRIVATE FUNCTIONS
        function activate() {
            authenticated();
        }

        function authenticated() {
            if (status && user.setUsername) {
                vm.isLoggedIn = true;
                vm.setUsername = true;
                vm.username = user.username;
                vm.gravatar = user.gravatar;
                if (!_.isNull(_.get(user, 'character'))) {
                    getCharacter();
                } else {
                    vm.username = user.username;
                }
            } else if (status && !user.setUsername) {
                vm.isLoggedIn = true;
                vm.setUsername = false;
                $state.go('username');
            }
        }

        function getCharacter() {
            characterService.getCharacter(user.id)
                .then(function(data) {
                    vm.gravatar = 'https://us.battle.net/static-render/us/' + data.thumbnail + '?alt=/wow/static/images/2d/avatar/' + data.race + '-' + data.gender + '.jpg';
                });
        }

        function logout() {
            authService.logout()
                .then(function() {
                    $state.go('index', {}, {
                        reload: true
                    });
                });
        }
    }
})();
