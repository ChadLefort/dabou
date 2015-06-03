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
      var character = {
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
          $state.reload();
      });
    }

    function getAccount() {
      characterService.getAccount()
        .then(function(data) {
        if (data.status == 404) {
          vm.noBnet = true;
          vm.loading = false;
        } else if (data.status == 500) {
          toastr.error('Battle.net isn\'t responding');
        } else {
          var account = data.characters;
          getCharacter(account);
        }
      });
    }

    function getCharacter(account) {
      characterService.getCharacter(user.id)
        .then(function(data) {
           if (data.status == 404) {
            vm.noCharacter = true;
          } else {
            vm.noCharacter = false;
          }
           
          var characters = _.map(account, function (character) { 
            if (character.name == data.name && character.realm == data.realm) {
              return _.extend({}, character, {preferred: true});
            } else {
              return _.extend({}, character, {preferred: false});
            }
          });
          
          _.each(characters, function (value, key) {
              var preferredKey = _.indexOf(characters, (_.find(characters, {preferred: true})));
                        
              if (key == preferredKey) {
                vm.characters.splice(key, 1);
                vm.characters.unshift(characters[key]);
              } else {
                vm.characters.push(characters[key]);
              }
          }); 
          
          vm.noBnet = false;
          vm.loading = false;
        });
    }
    
    function updateCharacter(viewCharacter) {
      var character = {
            name: viewCharacter.name,
            realm: viewCharacter.realm,
            region: 'us',
            race: viewCharacter.race,
            gender: viewCharacter.gender,
            thumbnail: viewCharacter.thumbnail,
            _csrf: _csrf
          };
          
      characterService.updateCharacter(user.character, character)
        .then(function (data) {
          toastr.success(data.success);
          $state.reload();
      });
    }
  }
})();
