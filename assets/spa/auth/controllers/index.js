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
          console.log(data);
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
