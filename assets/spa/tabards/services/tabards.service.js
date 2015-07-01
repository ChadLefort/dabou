(function () {
  'use strict';

  angular
    .module('dabou.tabards')
    .factory('tabardsService', tabardsService);

  tabardsService.$inject = ['$http', 'urlRoot'];

  /**
   * @ngdoc service
   * @name dabou.tabards.service:tabardsService
   * @description
   *
   */
  function tabardsService($http, urlRoot) {

    function getTabardCount() {
      return $http.get(urlRoot + '/tabard/count')
        .then(function (response) {
          return response.data;
        });
    }

    function getTabardsPaged(pageNumber) {
      var skipAmount = 25 * pageNumber - 25;

      return $http.get(urlRoot + '/tabard?skip=' + skipAmount)
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

    function sort(string, order) {
      return $http.get(urlRoot + '/tabard?sort=' + string + ' ' + order)
        .then(function (response) {
          return response.data;
        });
    }

    return {
      getTabardCount: getTabardCount,
      getTabardsPaged: getTabardsPaged,
      getTabard: getTabard,
      sort: sort
    };
  }

})();
