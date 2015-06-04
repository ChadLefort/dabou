(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['accountService', 'globalData'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:ProfileController
   * @description
   *
   */
  function ProfileController(accountService, globalData) {
    var vm = this,
      user = globalData.userData.user;

    // PUBLIC PROPERTIES
    vm.profile = {};

    // PUBLIC FUNCTIONS

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getProfile(user.id);
    }

    function getProfile(userId) {
      accountService.getProfile(userId)
        .then(function (data) {
          if (data.status == 404) {
            vm.noProfile = true;
          } else {
            vm.profile = data;
          }
        });
    }

  }
})();
