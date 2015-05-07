(function () {
  'use strict';

  angular
    .module('dabou.main')
    .controller('NavController', NavController);

  /**
   * @ngdoc controller
   * @name dabou.main.controller:NavController
   * @description
   *
   */
  NavController.$inject = ['authService', '$modal', '$state', 'userData'];

  function NavController(authService, $modal, $state, userData) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.username = null;
    vm.email = null;
    vm.displayName = '';
    vm.gravatar = '/images/default_avatar.png';
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
      if(userData.status) {
        vm.isLoggedIn = userData.status;
        vm.username = userData.user.username;
        vm.email = userData.user.email;
        vm.gravatar = userData.user.gravatar;
        if(userData.user.displayName) {
          vm.displayName = userData.user.displayName;
        } else if(userData.user.username) {
          vm.displayName = userData.user.username;
        } else {
          vm.displayName = userData.user.email;
        }
      }
    }

    function logout() {
      authService.logout()
        .then(function (data) {
          $state.go('index', {}, {reload: true});
        });
    }
  }
})();
