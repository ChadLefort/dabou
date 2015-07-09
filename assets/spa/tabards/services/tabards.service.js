(function () {
  'use strict';

  angular
    .module('dabou.tabards')
    .factory('tabardsService', tabardsService);

  tabardsService.$inject = ['_', '$http', 'urlRoot'];

  /**
   * @ngdoc service
   * @name dabou.tabards.service:tabardsService
   * @description
   *
   */
  function tabardsService(_, $http, urlRoot) {

    function buildUrl(baseUrl, params, route) {
      var url = baseUrl,
          whereClause = [],
          hasFilter = false;

      if (!_.isNull(params.filters.search)) {
        whereClause.push('"name":{"contains":"' + params.filters.search + '"}');
      }

      if (!_.isNull(params.filters.quality)) {
        whereClause.push('"quality":' + params.filters.quality);
      }

      if (!_.isNull(params.filters.faction)) {
        whereClause.push('"faction":' + params.filters.faction);
      }

      if (!_.isNull(params.filters.itemLevelStart) && !_.isNull(params.filters.itemLevelEnd)) {
        whereClause.push('"itemLevel":{">=":' + params.filters.itemLevelStart + ',"<=":' + params.filters.itemLevelEnd + '}')
      }

      if (!_.isNull(params.filters.reqLevelStart) && !_.isNull(params.filters.reqLevelEnd)) {
        whereClause.push('"reqLevel":{">=":' + params.filters.reqLevelStart + ',"<=":' + params.filters.reqLevelEnd + '}')
      }

      _.each(params.filters, function (value, key) {
        if (!_.isNull(value)) {
          hasFilter = true;
        }
      });

      if (hasFilter) {
        if (route == 'count') {
          url += '?';
        } else {
          url += '&';
        }

        url += 'where={' + whereClause.join(',') + '}';
      }

      return url;
    }

    function getTabardCount(params) {
      var url = buildUrl('/tabard/count', params, 'count');

      return $http.get(urlRoot + url)
        .then(function (response) {
          return response.data;
        });
    }

    function getTabards(params) {
      var skipAmount = 25 * params.pageNumber - 25,
          url = buildUrl('/tabard?sort=' + params.sortBy + ' ' + params.sortOrder + '&skip=' + skipAmount, params, 'tabard');

      return $http.get(urlRoot + url)
        .then(function (response) {
          return response.data;
        });
    }

    function getTabard(id) {
      return $http.get(urlRoot + '/tabard/' + id)
        .then(function (response) {
          return response.data;
        });
    }

    function mapTabardsQualites(tabards) {
      var qualities = [
        {id: 1, type: 'Common', color: '#8B8B8B'},
        {id: 2, type: 'Uncommon', color: '#1BA608'},
        {id: 3, type: 'Rare', color: '#0354A3'},
        {id: 4, type: 'Epic', color: '#7026A3'},
        {id: 5, type: 'Legendary', color: '#C36608'}
      ];

       return _.map(tabards, function (tabard) {
          return _.merge(tabard, {quality: _.findWhere(qualities, {id: tabard.quality.id})});
      });
    }

    return {
      getTabardCount: getTabardCount,
      getTabards: getTabards,
      getTabard: getTabard,
      mapTabardsQualites: mapTabardsQualites
    };
  }

})();
