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
    var vm = this,
      qualities = [
        {id: 0, type: 'Poor', color: '#676767'},
        {id: 1, type: 'Common', color: '#D2D2D2'},
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
          return _.merge(tabard, {quality: _.findWhere(qualities, {id: tabard.quality})});
      });
    }

    function sort(string, order) {
      tabardsService.sort(string, order)
        .then(function (data) {
          vm.tabards = mapTabards(data);
        }) 
    }

  }
})();
