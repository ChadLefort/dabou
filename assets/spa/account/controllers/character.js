(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('CharacterController', CharacterController);

  CharacterController.$inject = ['characterService', 'authService', 'toastr', '$state', 'userData', '$timeout'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:CharacterController
   * @description
   *
   */
  function CharacterController(characterService, authService, toastr, $state, userData, $timeout) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.characters = [];
    vm.state = $state.current.name;
    vm.loading = true;
    
    // PUBLIC FUNCTIONS
    vm.createCharacter = createCharacter;
    vm.updateCharacter = updateCharacter;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getAccount();
    }

    function createCharacter(name, realm) {
      authService.csrfToken()
        .then(function (response) {
        var character = {
          name: name,
          realm: realm,
          region: 'us',
          _csrf: response._csrf
        };

        characterService.createCharacter(character)
          .then(function (response) {
          toastr.success(response.data.success);
        });
      });
    }

    function getAccount() {
      characterService.getAccount()
        .then(function (data) {
        if (Object.keys(data).length == 0) {
          vm.noBnet = true;
          vm.loading = false;
        } else {
          var characters = data.characters;
          getCharacter(userData.user.id, characters);
          angular.forEach(characters, function (value, key) {
            vm.characters.push(data.characters[key]);
            data.characters[key].perferred = false;
          });
          vm.noBnet = false;
          vm.loading = false;
        }
      });
    }

    function getCharacter(userId, characters) {
      characterService.getCharacter(userData.user.id)
        .then(function (character) {
        if (Object.keys(character).length == 0) {
          vm.noCharacter = true;
        } else {
          vm.noCharacter = false;
          angular.forEach(characters, function (value, key) {
            if (characters[key].name == character.name && characters[key].realm == character.realm ) {
              vm.characters.splice(key, 1);
              vm.characters.unshift(characters[key]);
              characters[key].perferred = true;
            }
          }); 
        }
      });
    }
    
    function updateCharacter(viewCharacter) {
      var key = vm.characters.indexOf(viewCharacter);
      
      authService.csrfToken()
        .then(function (response) {
        var character = {
          name: viewCharacter.name,
          realm: viewCharacter.realm,
          region: 'us',
          _csrf: response._csrf
        };

        characterService.updateCharacter(character)
          .then(function (response) {
            toastr.success(response.data.success);
            vm.characters.splice(key, 1);
            vm.characters.unshift(viewCharacter);
            vm.characters[0].perferred = true;
            vm.characters[1].perferred = false;
        });
      });
    }
  }
})();
