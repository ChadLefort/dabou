(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['accountService', 'authService', 'toastr', '$state', 'globalData', '$modal'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:AccountController
   * @description
   *
   */
  function AccountController(accountService, authService, toastr, $state, globalData, $modal) {
    var vm = this,
      user = globalData.userData.user,
      _csrf = globalData.tokenData._csrf;

    // PUBLIC PROPERTIES
    vm.local = false;
    vm.bnet = false;
    vm.twitter = false;
    vm.facebook = false;
    vm.google = false;
    vm.state = $state.current.name;
    vm.profile = {_csrf: _csrf};
    vm.genders = [
      {value: 'Male'},
      {value: 'Female'},
      {value: 'Undisclosed'}
    ];
    vm.createTab = false;
    vm.profileTitle = 'Create Profile';
    vm.user = {_csrf: _csrf};

    // PUBLIC FUNCTIONS
    vm.createProfile = createProfile;
    vm.deleteProfile = deleteProfile;
    vm.editProfile = editProfile;
    vm.getProfile = getProfile;
    vm.openDatepicker = openDatepicker;
    vm.selectCreateTab = selectCreateTab;
    vm.unlinkPassport = unlinkPassport;
    vm.updateUsername = updateUsername;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getProfile(user.id);
      getPassports(user.id);
    }

    function createProfile() {
      accountService.createProfile(vm.profile)
        .then(function (data) {
          toastr.success(data.success);
          vm.profile = data.profile;
          vm.noProfile = false;
          vm.profileTitle = 'Edit Profile';
        });
    }

    function deleteProfile() {
      $modal.open({
        templateUrl: 'spa/account/views/delete.profile.html'
      });
    }

    function editProfile() {
      accountService.updateProfile(user.profile, vm.profile)
        .then(function (data) {
          toastr.success(data.success);
          vm.profile = data.profile;
        });
    }

    function getPassports(userId) {
      accountService.getPassports(userId)
        .then(function (data) {
          vm.passport = data;
          angular.forEach(data, function (value, key) {
            if (data[key].provider == 'bnet') {
              vm.bnet = true;
            } else if (data[key].provider == 'twitter') {
              vm.twitter = true;
            } else if (data[key].provider == 'facebook') {
              vm.facebook = true;
            } else if (data[key].provider == 'google') {
              vm.google = true;
            }

            if (data[key].protocol == 'local') {
              vm.local = true;
            }
          });
        });
    }

    function getProfile(userId) {
      accountService.getProfile(userId)
        .then(function (data) {
          if (data.status == 404) {
            vm.noProfile = true;
          } else {
            vm.profile = data;
            vm.profile._csrf = _csrf;
            vm.noProfile = false;
            vm.profileTitle = 'Edit Profile';
          }
        });
    }

    function openDatepicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.opened = true;
    }

    function selectCreateTab() {
      vm.createTab = true;
    }

    function unlinkPassport(provider) {
      accountService.unlinkPassport(provider)
        .then(function (data) {
          if (data.status) {
            if (provider == 'bnet') {
              vm.bnet = false;
            } else if (provider == 'twitter') {
              vm.twitter = false;
            } else if (provider == 'facebook') {
              vm.facebook = false;
            } else if (provider == 'google') {
              vm.google = false;
            }
            toastr.success(data.success);
          } else {
            toastr.error(data.error);
          }
        });
    }

    function updateUsername() {
      accountService.updateUsername(user.id, vm.user)
        .then(function (data) {
          if (data.status == 409 || data.status == 400) {
            toastr.error(data.data.error);
          } else {
            toastr.success(data.success);
            $state.go('index');
          }
        });
    }
  }
})();
