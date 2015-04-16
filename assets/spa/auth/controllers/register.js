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
    RegisterController.$inject = [];

    function RegisterController() {
        var vm = this;

        // PUBLIC PROPERTIES
        vm.title = 'Register';


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
                