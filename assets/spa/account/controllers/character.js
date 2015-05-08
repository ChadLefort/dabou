(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('CharacterController', CharacterController);

  CharacterController.$inject = ['characterService', 'authService', 'toastr', '$state', 'userData'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:CharacterController
   * @description
   *
   */
  function CharacterController(characterService, authService, toastr, $state, userData) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.noBnet = true;
    vm.state = $state.current.name;
    
    // PUBLIC FUNCTIONS

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {      
      getCharacters();
    }
    
    function getCharacters() {
      characterService.getToken()
        .then(function (data){
          if (Object.keys(data).length == 0) {
            vm.noBnet = true;
          } else {
            characterService.getCharacters(data.token)
              .then(function (data) {
                  vm.characters = data.characters;
                  vm.noBnet = false;
              });
          }
        });
    }
  }
})();
