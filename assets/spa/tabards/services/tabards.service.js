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

    function getTabardsPaged(pageNumber) {
      var skipAmount = 15 * pageNumber - 15;

      return $http.get(urlRoot + '/tabard?skip=' + skipAmount)
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
      getTabardsPaged: getTabardsPaged,
      sort: sort
    };
  }

})();
