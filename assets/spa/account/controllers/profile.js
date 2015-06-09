(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['_', 'accountService', 'globalData', '$stateParams'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:ProfileController
   * @description
   *
   */
  function ProfileController(_, accountService, globalData, $stateParams) {
    var vm = this,
      user = globalData.userData.user,
      username = $stateParams.username;

    // PUBLIC PROPERTIES
    vm.profile = {};

    // PUBLIC FUNCTIONS

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getProfile(username);
    }

    /*
     * @private
     * @function
     * @param {Stromg} username - A user's username
     * @description :: Get's a user's profile by username
     */
    function getProfile(username) {
      accountService.getProfileByUsername(username)
        .then(function (data) {
          vm.user = data.user;
          vm.profile = data.profile;
        }).catch(function (error) {
          vm.noProfile = true;
        });
    }

  }
})();
