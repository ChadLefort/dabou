(function () {
  'use strict';

  angular
    .module('dabou.account')
    .controller('AccountController', AccountController);

  AccountController.$inject = ['_', 'accountService', 'authService', 'toastr', '$state', 'globalData', '$modal'];

  /**
   * @ngdoc controller
   * @name dabou.account.controller:AccountController
   * @description
   *
   */
  function AccountController(_, accountService, authService, toastr, $state, globalData, $modal) {
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
    
    /*
     * @private
     * @function
     */
    function activate() {
      if (!$state.includes('username')) {
        getProfile(user.id);
        getPassports(user.id);
      }
    }

    /*
     * @public
     * @function
     * 
     * @description :: Create a profile for a user if they don't already have one
     */
    function createProfile() {
      accountService.createProfile(vm.profile)
        .then(function (data) {
          toastr.success(data.msg);
          vm.profile = data.profile;
          vm.profile._csrf = _csrf;
          vm.noProfile = false;
          vm.profileTitle = 'Edit Profile';
        }).catch(function (error) {
          toastr.error(error.data.msg);
        });
    }

    function deleteProfile() {
      $modal.open({
        templateUrl: 'spa/account/views/delete.profile.html'
      });
    }

    function editProfile() {
      authService.authenticated()
        .then(function (data) {
          accountService.updateProfile(data.user.profile, vm.profile)
            .then(function (data) {
              toastr.success(data.msg);
              vm.profile = data.profile;
              vm.profile._csrf = _csrf;
            }).catch(function (error) {
              toastr.error(error.data.msg);
            });
        });
    }

    /*
     * @private
     * @function
     * @param {Interger} userId - The id of the user
     * @description :: Create a profile for a user if they don't already have one
     */
    function getPassports(userId) {
      accountService.getPassports(userId)
        .then(function (data) {
          vm.passport = data;
          _.each(data, function (value, key) {
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
          vm.profile = data;
          vm.profile._csrf = _csrf;
          vm.noProfile = false;
          vm.profileTitle = 'Edit Profile';
        }).catch(function (error) {
          vm.noProfile = true;
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
            if (provider == 'bnet') {
              vm.bnet = false;
            } else if (provider == 'twitter') {
              vm.twitter = false;
            } else if (provider == 'facebook') {
              vm.facebook = false;
            } else if (provider == 'google') {
              vm.google = false;
            }
            toastr.success(data.msg);
        }).catch(function (error) {
          toastr.error(error.data.msg);
        });
    }

    function updateUsername() {
      accountService.updateUsername(user.id, vm.user)
        .then(function (data) {
          toastr.success(data.msg);
          $state.go('index');
        }).catch(function (error) {
          toastr.error(error.data.msg);
        });
    }
  }
})();
