(function () {
  'use strict';

  angular
    .module('dabou.tabards')
    .controller('TabardsController', TabardsController);

  TabardsController.$inject = ['tabardsService', 'globalData'];

  /**
   * @ngdoc controller
   * @name dabou.tabards.controller:TabardsController
   * @description
   *
   */
  function TabardsController(tabardsService, globalData) {
    var vm = this,
      user = globalData.userData.user,
      status = globalData.userData.status,
      qualities = [
        {id: 1, type: 'Common', color: '#8B8B8B'},
        {id: 2, type: 'Uncommon', color: '#1BA608'},
        {id: 3, type: 'Rare', color: '#0354A3'},
        {id: 4, type: 'Epic', color: '#7026A3'},
        {id: 5, type: 'Legendary', color: '#C36608'}
      ];

    // PUBLIC PROPERTIES
    vm.loading = true;
    vm.tabards = {};

    // PUBLIC FUNCTIONS
    vm.getTabardsPaged = getTabardsPaged;
    vm.sort = sort;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getTabardsPaged(1);

      if (status && user.setUsername) {
        vm.isLoggedIn = true;
      }
    }

    function getTabardsPaged(newPageNumber) {
      tabardsService.getTabardsPaged(newPageNumber)
        .then(function (data) {          
          vm.tabards = mapTabards(data);
          vm.loading = false;
        });
    }

    function mapTabards(tabards) {
       return _.map(tabards, function (tabard) {
          return _.merge(tabard, {quality: _.findWhere(qualities, {id: tabard.quality.id})});
      });
    }

    function sort(string, order) {
      tabardsService.sort(string, order)
        .then(function (data) {
          vm.tabards = mapTabards(data);
        });
    }

  }
})();
