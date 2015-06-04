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
  RegisterController.$inject = ['authService', '$state', 'toastr', 'globalData'];

  function RegisterController(authService, $state, toastr, globalData) {
    var vm = this,
      _csrf = globalData.tokenData._csrf;

    // PUBLIC PROPERTIES
    vm.title = 'Register';
    vm.user = {};
    vm.state = $state.current.name;

    // PUBLIC FUNCTIONS
    vm.addLocalUser = addLocalUser;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      vm.user = {_csrf: _csrf};
    }

    function addLocalUser() {
      authService.addLocalUser(vm.user)
        .then(function (data) {
          if (data.error) {
            var errors = data.error;
            angular.forEach(errors, function (value, key) {
              toastr.error(errors[key]);
            });
          } else {
            $state.go('login');
            toastr.success(data.success);
          }
        })
    }
  }
})();
