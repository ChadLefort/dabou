(function () {
  'use strict';

  angular
    .module('dabou.tabards')
    .controller('TabardsController', TabardsController);

  TabardsController.$inject = ['tabardsService', 'globalData', '$timeout'];

  /**
   * @ngdoc controller
   * @name dabou.tabards.controller:TabardsController
   * @description
   *
   */
  function TabardsController(tabardsService, globalData, $timeout) {
    var vm = this,
      user = globalData.userData.user,
      status = globalData.userData.status,
      pageNumber = 1,
      params = {
          pageNumber: pageNumber,
          search: '',
          quality: '',
          faction: '',
          sortBy: 'name',
          sortOrder: 'asc'
      };

    // PUBLIC PROPERTIES
    vm.factionName = 'All';
    vm.factionState = null;
    vm.filters = {
        search: params.search
    };
    vm.filters.open = true;
    vm.loading = true;
    vm.pageSize = 25;
    vm.sortIcons = [];
    vm.sortOrder = 'asc';
    vm.tableHeaders = [
            {id: 'name', name: 'Name'},
            {id: 'quality', name: 'Quality'},
            {id: 'itemLevel', name: 'Item Level'},
            {id: 'reqLevel', name: 'Required Level'},
            {id: 'faction', name: 'Faction'}
        ];
    vm.tabards = {};
    vm.qualityName = 'All';
    vm.qualityState = null;

    // PUBLIC FUNCTIONS
    vm.clearSearch = clearSearch;
    vm.newPage = newPage;
    vm.search = search;
    vm.showFaction = showFaction;
    vm.showQuality = showQuality;
    vm.sort = sort;

    // init
    activate();

    // PRIVATE FUNCTIONS
    function activate() {
      getTabards(params);
      generateSortIconsOrder();
      vm.sortIcons[0].asc = true;
      getTabardCount(params);

      if (status && user.setUsername) {
        vm.isLoggedIn = true;
      }
    }

    function clearSearch() {
        vm.filters.search = null;
        params.search = '';
        getTabards(params);
        getTabardCount(params);
    }

    function generateSortIconsOrder() {
         _.each(vm.tableHeaders, function(value, key) {
            vm.sortIcons.push({asc: false, desc: false});
        });
     }

    function getTabardCount(params) {
      tabardsService.getTabardCount(params)
        .then(function (data) {         
          vm.totalCount = data.count;
        });
    }

    function getTabards(params) {
      tabardsService.getTabards(params)
        .then(function (data) {          
          vm.tabards = tabardsService.mapTabardsQualites(data);
          vm.loading = false;
        });
    }

    function newPage(newPageNumber) {
        params.pageNumber = newPageNumber;
        getTabards(params);
    }

    function search(query) {
        if (!query || query.length == 0) {
            params.search = '';
            getTabards(params);
            getTabardCount(params);
        }

        $timeout(function() {
            if (query == vm.filters.search && query != undefined) {
                vm.loading = true;
                params.search = vm.filters.search;
                getTabards(params);
                getTabardCount(params);
            }
        }, 500);
    }

    function showFaction(factionState, factionName) {
        if (_.isUndefined(factionState)) {
            vm.factionName = 'All';
            vm.factionState = null;
            params.faction = '';
        } else {
            vm.factionName = factionName;
            vm.factionState = factionState;
            params.faction = factionState;
        }

        getTabards(params);
        getTabardCount(params);
    }

    function showQuality(qualityState, qualityName) {
        if (_.isUndefined(qualityState)) {
            vm.qualityName = 'All';
            vm.qualityState = null;
            params.quality = '';
        } else {
            vm.qualityName = qualityName;
            vm.qualityState = qualityState;
            params.quality = qualityState;
        }

        getTabards(params);
        getTabardCount(params);
    }

    function sort(index, sortOrder) {
        var sortBy = vm.tableHeaders[index].id;

        vm.sortIcons = [];
        generateSortIconsOrder();

        if (sortOrder == 'desc') {
            vm.sortOrder = 'asc';
            vm.sortIcons[index].asc = true;
        } else if (sortOrder == 'asc') {
            vm.sortOrder = 'desc';
            vm.sortIcons[index].desc = true;
        }

        params.sortBy = sortBy;
        params.sortOrder = vm.sortOrder;

        getTabards(params);
    }

  }
})();
