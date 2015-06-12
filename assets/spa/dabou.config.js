(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name dabou
   * @module dabou
   * @description
   *
   */
  angular
    .module('dabou')
    .config(configPagination)
    .constant('urlRoot', location.protocol + '//' + location.hostname + ':' + location.port + '/api')
    .constant('_', _);

    configPagination.$inject = ['paginationTemplateProvider'];

    function configPagination(paginationTemplateProvider) {
      paginationTemplateProvider.setPath('/vendor/angular-utils-pagination/html/dirPagination.tpl.html');
    }
})();
