/**
 * Created by pigletoos@gmail.com on 4/19/2015.
 */
(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('ErrorController', ErrorController);

  ErrorController.$inject = ['$state', 'toastr'];

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:ErrorController
   * @description
   *
   */
  function ErrorController($state, toastr) {
    var vm = this;

    // PUBLIC PROPERTIES

    // PUBLIC FUNCTIONS
    vm.errors = errors;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      $state.go('index');
    }

    function errors(errors) {
      if (errors){
        toastr.error(errors);
        $state.go('register');
      }
    }
  }
})();
