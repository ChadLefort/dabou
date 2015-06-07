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
  LoginController.$inject = ['_', 'authService', '$state', 'toastr', 'globalData'];

  function LoginController(_, authService, $state, toastr, globalData) {
    var vm = this,
      _csrf = globalData.tokenData._csrf;

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
      vm.user = {_csrf: _csrf};
    }

    function login() {
      authService.login(vm.user)
        .then(function (data) {
          if (data.error) {
            var errors = data.error;
            _.each(errors, function (value, key) {
              toastr.error(errors[key]);
            });
          } else {
            $state.go('index');
          }
        });
    }
  }
})();
