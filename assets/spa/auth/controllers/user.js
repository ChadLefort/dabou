(function () {
  'use strict';

  angular
    .module('dabou.auth')
    .controller('UserController', UserController);

  UserController.$inject = ['authService', 'toastr', '$state'];

  /**
   * @ngdoc controller
   * @name dabou.auth.controller:UserController
   * @description
   *
   */
  function UserController(authService, toastr, $state) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.title = 'UserController';
    vm.username = null;
    vm.email = null;
    vm.displayName = '';
    vm.gravatar = '/images/default_avatar.png';
    vm.isLoggedIn = false;
    vm.local = false;
    vm.twitter = false;
    vm.facebook = false;
    vm.google = false;

    // PUBLIC FUNCTIONS
    vm.unlink = unlink;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      authenticated();
      if($state.current.name = 'account') {
        passports();
      }
    }

    function authenticated() {
      authService.authenticated()
        .then(function (data) {
          if(data.status) {
            vm.isLoggedIn = data.status;
            vm.username = data.user.username;
            vm.email = data.user.email;
            vm.gravatar = data.user.gravatar;

            if(data.user.username != ''){
              vm.displayName = data.user.username;
            } else {
              vm.displayName = data.user.email;
            }
          }
        });
    }

    function passports(){
      authService.getPassports()
        .then(function(data) {
          console.log(data);
          vm.passport = data.passport;
          angular.forEach(data.passport, function(value, key) {
            if(data.passport[key].provider == 'twitter') {
              vm.twitter = true;
            } else if (data.passport[key].provider == 'facebook') {
              vm.facebook = true;
            } else if (data.passport[key].provider == 'google') {
              vm.google = true;
            }

            if(data.passport[key].protocol == 'local') {
              vm.local = true;
            }
          });
        });
    }

    function unlink(provider){
      authService.unlinkPassport(provider)
        .then(function(data) {
          if(data.status) {
            if(provider == 'twitter') {
              vm.twitter = false;
            } else if (provider == 'facebook') {
              vm.facebook = false;
            } else if (provider == 'google') {
              vm.google = false;
            }
            toastr.success(provider + ' has been unlinked.')
          } else {
            toastr.error(data.error)
          }
        });
    }
  }
})();
