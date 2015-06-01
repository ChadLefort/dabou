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
	    .constant('urlRoot', location.protocol + '//' + location.hostname + ':' + location.port + '/api')
        .constant('_', _);
})();
                