(function () {
  'use strict';

  angular
    .module('dabou.tabards')
    .controller('TabardsController', TabardsController);

  TabardsController.$inject = ['tabardsService'];

  /**
   * @ngdoc controller
   * @name dabou.tabards.controller:TabardsController
   * @description
   *
   */
  function TabardsController(tabardsService) {
    var vm = this;

    // PUBLIC PROPERTIES
    vm.loading = true;
    vm.tabards = {};

    // PUBLIC FUNCTIONS

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getTabards();
    }

    function getTabards() {
      tabardsService.getTabards()
        .then(function (data) {
          vm.tabards = data;
          vm.loading = false;
        });
    }

  }
})();
