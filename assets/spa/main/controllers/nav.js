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
  NavController.$inject = ['authService', '$modal', '$state', 'globalData'];

  function NavController(authService, $modal, $state, globalData) {
    var vm = this,
        user = globalData.userData.user,
        status = globalData.userData.status;

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
      if(status) {
        vm.isLoggedIn = status;
        vm.username = user.username;
        vm.email = user.email;
        vm.gravatar = user.gravatar;
        if(user.displayName) {
          vm.displayName = user.displayName;
        } else if(user.username) {
          vm.displayName = user.username;
        } else {
          vm.displayName = user.email;
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
