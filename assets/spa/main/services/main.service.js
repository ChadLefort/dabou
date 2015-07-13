(function () {
  'use strict';

  angular
    .module('dabou.main')
    .factory('mainService', mainService);

  mainService.$inject = ['$http', 'urlRoot'];

  /**
   * @ngdoc service
   * @name dabou.main.service:mainService
   * @description
   *
   */
  function mainService($http, urlRoot) {

    function getLookups() {
      return $http.get(urlRoot + '/lookup')
        .then(function (response) {
          return response.data;
        });
    }

    return {
      getLookups: getLookups
    };
  }

})();
