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

    function buildUrl(baseUrl, params, skipAmount) {
      var url = baseUrl + '?sort=' + params.sortBy + ' ' + params.sortOrder + '&skip=' + skipAmount;

      url += '&where={"name":{"contains":"' + params.search + '"},';
      url += '"quality":{"contains":"' + params.quality + '"},';
      url += '"faction":{"contains":"' + params.faction + '"}}';

      return url;
    }

    function getTabardCount(params) {
      var url = buildUrl('/tabard/count', params);

      return $http.get(urlRoot + url)
        .then(function (response) {
          return response.data;
        });
    }

    function getTabards(params) {
      var skipAmount = 25 * params.pageNumber - 25,
          url = buildUrl('/tabard', params, skipAmount);

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
