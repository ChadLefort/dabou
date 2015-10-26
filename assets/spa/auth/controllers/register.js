(function() {
    'use strict';

    angular
        .module('dabou.auth')
        .controller('RegisterController', RegisterController);

    /**
     * @ngdoc controller
     * @name dabou.auth.controller:RegisterController
     * @description
     */

    RegisterController.$inject = ['_', 'urlS3Bucket', 'authService', '$state', 'toastr', 'globalData'];

    function RegisterController(_, urlS3Bucket, authService, $state, toastr, globalData) {
        var vm = this,
            _csrf = globalData.tokenData._csrf,
            status = globalData.userData.status;

        // PUBLIC PROPERTIES
        vm.isLoggedIn = false;
        vm.title = 'Register';
        vm.user = {};
        vm.state = $state.current.name;
        vm.urlS3Bucket = urlS3Bucket;

        // PUBLIC FUNCTIONS
        vm.addLocalUser = addLocalUser;

        // init
        activate();

        // PRIVATE FUNCTIONS
        function activate() {
            vm.user = {
                _csrf: _csrf
            };
            authenticated();
        }

        function addLocalUser() {
            authService.addLocalUser(vm.user)
                .then(function(data) {
                    if (data.error) {
                        var errors = data.error;
                        _.each(errors, function(value, key) {
                            toastr.error(errors[key]);
                        });
                    } else {
                        $state.go('account');
                        toastr.success('Success.Passport.User.Created');
                    }
                });
        }

        function authenticated() {
            if (status) {
                vm.isLoggedIn = true;
                $state.go('index');
            }
        }
    }
})();
