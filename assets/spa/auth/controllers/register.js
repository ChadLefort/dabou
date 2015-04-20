(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('RegisterController', RegisterController);

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:RegisterController
   * @description
   *
   */
  RegisterController.$inject = ['authService', '$state', 'toastr'];

  function RegisterController(authService, $state, toastr) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.title = 'Register';
    vm.user = {};

    // PUBLIC FUNCTIONS
    vm.addLocalUser = addLocalUser;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
    }

    function addLocalUser() {
      authService.addLocalUser(vm.user)
        .then(function (response) {
          if (response.data.error) {
            var errors = response.data.error;
            angular.forEach(errors, function (value, key) {
              toastr.error(errors[key]);
            });
          } else {
            $state.go('login');
            toastr.success(response.data.success);
          }
        })
    }
  }
})();
