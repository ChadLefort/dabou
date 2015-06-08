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
          var account = data.characters;
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
          mapCharacters(account, data);
        });
    }

    function mapCharacters(account, data) {
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
