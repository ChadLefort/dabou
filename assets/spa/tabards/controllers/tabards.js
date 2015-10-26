(function() {
    'use strict';

    angular
        .module('dabou.tabards')
        .controller('TabardsController', TabardsController);

    TabardsController.$inject = ['_', 'tabardsService', 'globalData'];

    /**
     * @ngdoc controller
     * @name dabou.tabards.controller:TabardsController
     * @description
     */

    function TabardsController(_, tabardsService, globalData) {
        var vm = this,
            user = globalData.userData.user,
            status = globalData.userData.status,
            pageNumber = 1,
            params = {
                pageNumber: pageNumber,
                sortBy: 'name',
                sortOrder: 'asc',
                filters: {
                    search: null,
                    quality: null,
                    faction: null,
                    itemLevelStart: null,
                    itemLevelEnd: null,
                    reqLevelStart: null,
                    reqLevelEnd: null
                }
            };

        // PUBLIC PROPERTIES
        vm.factionName = 'All';
        vm.factionState = null;
        vm.filters = {
            search: params.filters.search,
            itemLevelStart: params.filters.itemLevelStart,
            itemLevelEnd: params.filters.itemLevelEnd,
            reqLevelStart: params.filters.reqLevelStart,
            reqLevelEnd: params.filters.reqLevelEnd
        };
        vm.filters.open = true;
        vm.loading = true;
        vm.pageSize = 25;
        vm.sortIcons = [];
        vm.sortOrder = 'asc';
        vm.tableHeaders = [{
            id: 'name',
            name: 'Name'
        }, {
            id: 'quality',
            name: 'Quality'
        }, {
            id: 'itemLevel',
            name: 'Item Level'
        }, {
            id: 'reqLevel',
            name: 'Required Level'
        }, {
            id: 'faction',
            name: 'Faction'
        }];
        vm.tabards = {};
        vm.qualityName = 'All';
        vm.qualityState = null;

        // PUBLIC FUNCTIONS
        vm.changeItemLevel = changeItemLevel;
        vm.changeReqLevel = changeReqLevel;
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

        function changeItemLevel() {
            if (!vm.filters.itemLevelStart) {
                vm.filters.itemLevelStart = null;
                params.filters.itemLevelStart = null;
            }

            if (!vm.filters.itemLevelEnd) {
                vm.filters.itemLevelEnd = null;
                params.filters.itemLevelEnd = null;
            }

            params.filters.itemLevelStart = vm.filters.itemLevelStart;
            params.filters.itemLevelEnd = vm.filters.itemLevelEnd;

            if (vm.filters.itemLevelStart && vm.filters.itemLevelEnd) {
                vm.loading = true;
                getTabards(params);
                getTabardCount(params);
            } else if (!vm.filters.itemLevelStart && !vm.filters.itemLevelEnd) {
                vm.loading = true;
                getTabards(params);
                getTabardCount(params);
            }
        }

        function changeReqLevel() {
            if (!vm.filters.reqLevelStart) {
                vm.filters.reqLevelStart = null;
                params.filters.reqLevelStart = null;
            }

            if (!vm.filters.reqLevelEnd) {
                vm.filters.reqLevelEnd = null;
                params.filters.reqLevelEnd = null;
            }

            params.filters.reqLevelStart = vm.filters.reqLevelStart;
            params.filters.reqLevelEnd = vm.filters.reqLevelEnd;

            if (vm.filters.reqLevelStart && vm.filters.reqLevelEnd) {
                vm.loading = true;
                getTabards(params);
                getTabardCount(params);
            } else if (!vm.filters.reqLevelStart && !vm.filters.reqLevelEnd) {
                vm.loading = true;
                getTabards(params);
                getTabardCount(params);
            }
        }

        function generateSortIconsOrder() {
            _.each(vm.tableHeaders, function() {
                vm.sortIcons.push({
                    asc: false,
                    desc: false
                });
            });
        }

        function getTabardCount(params) {
            tabardsService.getTabardCount(params)
                .then(function(data) {
                    vm.totalCount = data.count;
                });
        }

        function getTabards(params) {
            tabardsService.getTabards(params)
                .then(function(data) {
                    vm.tabards = tabardsService.mapTabardsQualites(data);
                    vm.loading = false;
                });
        }

        function newPage(newPageNumber) {
            params.pageNumber = newPageNumber;
            getTabards(params);
        }

        function search() {
            if (vm.filters.search) {
                vm.loading = true;
                params.filters.search = vm.filters.search;
                getTabards(params);
                getTabardCount(params);
            } else if (!vm.filters.search) {
                vm.filters.search = null;
                params.filters.search = null;
                getTabards(params);
                getTabardCount(params);
            }
        }

        function showFaction(factionState, factionName) {
            if (_.isUndefined(factionState)) {
                vm.factionName = 'All';
                vm.factionState = null;
                params.filters.faction = null;
            } else {
                vm.factionName = factionName;
                vm.factionState = factionState;
                params.filters.faction = factionState;
            }

            getTabards(params);
            getTabardCount(params);
        }

        function showQuality(qualityState, qualityName) {
            if (_.isUndefined(qualityState)) {
                vm.qualityName = 'All';
                vm.qualityState = null;
                params.filters.quality = null;
            } else {
                vm.qualityName = qualityName;
                vm.qualityState = qualityState;
                params.filters.quality = qualityState;
            }

            getTabards(params);
            getTabardCount(params);
        }

        function sort(index, sortOrder) {
            var sortBy = vm.tableHeaders[index].id;

            vm.sortIcons = [];
            generateSortIconsOrder();

            if (sortOrder === 'desc') {
                vm.sortOrder = 'asc';
                vm.sortIcons[index].asc = true;
            } else if (sortOrder === 'asc') {
                vm.sortOrder = 'desc';
                vm.sortIcons[index].desc = true;
            }

            params.sortBy = sortBy;
            params.sortOrder = vm.sortOrder;

            getTabards(params);
        }
    }  
})();
