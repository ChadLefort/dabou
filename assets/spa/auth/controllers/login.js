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
    LoginController.$inject = [];

    function LoginController() {
        var vm = this;

        // PUBLIC PROPERTIES
        vm.title = 'Login';


        // PUBLIC FUNCTIONS
        vm.doSomething = doSomething;


        // init
        activate();


        //
        // PRIVATE FUNCTIONS

        function activate() { }

        function doSomething() { }
    }
})();
                