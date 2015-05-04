(function () {
  'use strict';

  angular
    .module('dabou.main')
    .controller('IndexController', IndexController);

  /**
   * @ngdoc controller
   * @name dabou.main.controller:IndexController
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
    vm.gravatar = '/images/default_avatar.png';
    vm.isLoggedIn = false;

    // PUBLIC FUNCTIONS
    vm.logout = logout;
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

            if(data.user.username){
              vm.displayName = data.user.username;
            } else {
              vm.displayName = data.user.email;
            }
          }
        });
    }

    function logout() {
      authService.logout()
        .then(function (data) {
          $state.go('index', {}, {reload: true});
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
