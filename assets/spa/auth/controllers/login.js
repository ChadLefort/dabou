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
    vm.state = $state.current.name;

    // PUBLIC FUNCTIONS
    vm.login = login;

    // init
    activate();

    // PRIVATE FUNCTIONS

    function activate() {
      authService.csrfToken()
        .then(function (response){
          vm.user = {_csrf: response._csrf};
        });
    }

    function login() {
      authService.login(vm.user)
        .then(function (response) {
          if (response.data.error) {
            var errors = response.data.error;
            angular.forEach(errors, function (value, key) {
              toastr.error(errors[key]);
            });
          } else {
            $state.go('index');
          }
        });
    }
  }
})();
