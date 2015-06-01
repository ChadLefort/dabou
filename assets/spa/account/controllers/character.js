(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('CharacterController', CharacterController);

  CharacterController.$inject = ['characterService', 'authService', 'toastr', '$state', 'globalData', '$timeout', '_'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:CharacterController
   * @description
   *
   */
  function CharacterController(characterService, authService, toastr, $state, globalData, $timeout, _) {
    var vm = this,
        user = globalData.userData.user,
        _csrf = globalData.tokenData._csrf;

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

    function createCharacter(viewCharacter) {
      var key = vm.characters.indexOf(viewCharacter),
          character = {
            name: viewCharacter.name,
            realm: viewCharacter.realm,
            region: 'us',
            race: viewCharacter.race,
            gender: viewCharacter.gender,
            thumbnail: viewCharacter.thumbnail,
            _csrf: _csrf
          };

      characterService.createCharacter(character)
        .then(function (data) {
          toastr.success(data.success);
          vm.characters.splice(key, 1);
          vm.characters.unshift(viewCharacter);
          vm.characters[0].preferred = true;
          vm.noCharacter = false;
      });
    }

    function getAccount() {
      characterService.getAccount()
        .then(function(data) {
        if (data.status == 404) {
          vm.noBnet = true;
          vm.loading = false;
        } else {
          var characters = data.characters;
          getCharacter(user.id, characters);
          _.each(characters, function (value, key) {
            vm.characters.push(data.characters[key]);
            data.characters[key].preferred = false;
          });
          vm.noBnet = false;
          vm.loading = false;
        }
      });
    }

    function getCharacter(userId, characters) {
      characterService.getCharacter(user.id)
        .then(function(data) {
        if (data.status == 404) {
          vm.noCharacter = true;
        } else {
          vm.noCharacter = false;
          _.each(characters, function (value, key) {
            if (characters[key].name == data.name && characters[key].realm == data.realm ) {
              vm.characters.splice(key, 1);
              vm.characters.unshift(characters[key]);
              characters[key].preferred = true;
            }
          }); 
        }
      });
    }
    
    function updateCharacter(viewCharacter) {
      var key = vm.characters.indexOf(viewCharacter),
          character = {
            name: viewCharacter.name,
            realm: viewCharacter.realm,
            region: 'us',
            race: viewCharacter.race,
            gender: viewCharacter.gender,
            thumbnail: viewCharacter.thumbnail,
            _csrf: _csrf
          };

      authService.authenticated().then(function (data) {
        characterService.updateCharacter(data.user.character, character)
          .then(function (data) {
            toastr.success(data.success);
            vm.characters.splice(key, 1);
            vm.characters.unshift(viewCharacter);
            vm.characters[0].preferred = true;
            vm.characters[1].preferred = false;
        });
      });
    }
  }
})();
