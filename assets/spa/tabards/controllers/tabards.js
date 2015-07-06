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
          search: null,
          sortBy: 'name',
          sortOrder: 'asc'
      };

    // PUBLIC PROPERTIES
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

    // PUBLIC FUNCTIONS
    vm.clearSearch = clearSearch;
    vm.newPage = newPage;
    vm.search = search;
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
        params.search = null;
        getTabards(params);
        getTabardCount(params);
    }

    function generateSortIconsOrder() {
         _.each(vm.tableHeaders, function(value, key) {
            vm.sortIcons.push({asc: false, desc: false});
        });
     }

    function getTabardCount(params) {
      tabardsService.getTabardCount(params.search)
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
            params.search = null;
            getTabards(params);
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
