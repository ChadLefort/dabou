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

    function getTabards() {
      return $http.get(urlRoot + '/tabard?limit=200')
        .then(function (response) {
          return response.data;
        });
    }

    return {
      getTabards: getTabards,
    };
  }

})();
