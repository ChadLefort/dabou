(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('StatusController', StatusController);

  StatusController.$inject = ['$state', 'toastr'];

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:StatusController
   * @description
   *
   */
  function StatusController($state, toastr) {
    var vm = this;

    // PUBLIC PROPERTIES

    // PUBLIC FUNCTIONS
    vm.error = error;
    vm.redirect = redirect;
    vm.success = success;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      $state.go('index');
    }

    function error(msg) {
      if (msg){
        toastr.error(msg);
      }
    }

    function success(msg) {
      if (msg){
        toastr.success(msg);
      }
    }

    function redirect(state) {
      $state.go(state);
    }
  }
})();
