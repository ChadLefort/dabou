(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('IndexController', IndexController);

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:IndexController
   * @description
   *
   */
  IndexController.$inject = ['authService', '$modal', '$state'];

  function IndexController(authService, $modal, $state) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.title = 'Welcome to Dabou!';
    vm.username = null;
    vm.email = null;
    vm.displayName = '';
    vm.isLoggedIn = false;

    // PUBLIC FUNCTIONS
    vm.register = register;

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
            vm.isLoggedIn = data.status;
            vm.username = data.user.username;
            vm.email = data.user.email;
            vm.gravatar = data.user.gravatar;

            if(data.user.username != ''){
              vm.displayName = data.user.username;
            } else {
              vm.displayName = data.user.email;
            }
          }
        });
    }

    function register() {
      $modal.open({
        templateUrl: 'spa/auth/views/register.modal.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      });
    }
  }
})();
