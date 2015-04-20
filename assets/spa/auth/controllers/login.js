(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('LoginController', LoginController);

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:LoginController
   * @description
   *
   */
  LoginController.$inject = ['authService', '$state', 'toastr'];

  function LoginController(authService, $state, toastr) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.title = 'Login';
    vm.user = {};

    // PUBLIC FUNCTIONS
    vm.login = login;

    // init
    activate();

    // PRIVATE FUNCTIONS

    function activate() {
    }

    function login() {
      authService.login(vm.user)
        .then(function (response) {
          console.log(response);
          if (response.data.error) {
            var errors = response.data.error;
            angular.forEach(errors, function (value, key) {
              toastr.error(errors[key]);
            });
          } else {
            $state.go('index');
          }
        })
    }
  }
})();
