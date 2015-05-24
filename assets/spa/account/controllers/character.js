(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('CharacterController', CharacterController);

  CharacterController.$inject = ['characterService', 'authService', 'toastr', '$state', 'globalData', '$timeout'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:CharacterController
   * @description
   *
   */
  function CharacterController(characterService, authService, toastr, $state, globalData, $timeout) {
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
            _csrf: _csrf
          };

      characterService.createCharacter(character)
        .then(function (data) {
          toastr.success(data.success);
          vm.characters.splice(key, 1);
          vm.characters.unshift(viewCharacter);
          vm.characters[0].perferred = true;
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
      characterService.getCharacter(user.id)
        .then(function(data) {
        if (data.status == 404) {
          vm.noCharacter = true;
        } else {
          vm.noCharacter = false;
          angular.forEach(characters, function (value, key) {
            if (characters[key].name == data.name && characters[key].realm == data.realm ) {
              vm.characters.splice(key, 1);
              vm.characters.unshift(characters[key]);
              characters[key].perferred = true;
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
            _csrf: _csrf
          };

      characterService.updateCharacter(user.character, character)
        .then(function (data) {
          toastr.success(data.success);
          vm.characters.splice(key, 1);
          vm.characters.unshift(viewCharacter);
          vm.characters[0].perferred = true;
          vm.characters[1].perferred = false;
      });
    }
  }
})();
