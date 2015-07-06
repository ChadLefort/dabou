(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('CharacterController', CharacterController);

  CharacterController.$inject = ['_', 'characterService', 'authService', 'toastr', '$state', 'globalData', '$timeout', '$sails'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:CharacterController
   * @description
   *
   */
  function CharacterController(_, characterService, authService, toastr, $state, globalData, $timeout, $sails) {
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
      socket();
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
          toastr.success(data.msg);
          $state.reload();
        }).catch(function (error) {
          toastr.error(error.data.msg);
        });
    }

    function getAccount() {
      characterService.getAccount()
        .then(function (data) {
          var account = characterService.mapCharacterColors(data.characters);
          getCharacter(account);
        }).catch(function (error) {
          if (error.status == 404) {
            vm.noBnet = true;
            vm.loading = false;
          } else {
            toastr.error(error.data.msg);
          }
        });
    }

    function getCharacter(account) {
      characterService.getCharacter(user.id)
        .then(function (data) {
          if (data.status == 404) {
            vm.noCharacter = true;
          } else {
            vm.noCharacter = false;
          }

          vm.noBnet = false;
          vm.loading = false;
          vm.characters = characterService.mapPreferredCharacter(account, data);
        });
    }
    
    function socket() {
      $sails.get('/subscribe');
      if (!$sails.alreadyListening) {
        $sails.alreadyListening = true;
        $sails.on('user', function(response) {
          user = response.data.user;
        });
      }
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
          toastr.success(data.msg);
          $state.reload();
        }).catch(function (error) {
          toastr.error(error.data.msg);
        });
    }
  }
})();
