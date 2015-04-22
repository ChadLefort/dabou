(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('UserController', UserController);

  UserController.$inject = ['authService'];

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:UserController
   * @description
   *
   */
  function UserController(authService) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.title = 'UserController';

    // PUBLIC FUNCTIONS

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      authenticated();
    }

    function authenticated() {
      authService.authenticated()
        .then(function (data) {
          if(data.status) {
            vm.username = data.user.username;
            vm.email = data.user.email;
          }
        });
    }
  }
})();
