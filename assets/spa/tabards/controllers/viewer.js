(function() {
    'use strict';

    angular
        .module('dabou.tabards')
        .controller('ViewerController', ViewerController);

    /**
     * @ngdoc controller
     * @name dabou.tabards.controller:ViewerController
     * @description
     *
     */
    ViewerController.$inject = ['viewerService'];

    function ViewerController(viewerService) {
        var vm = this;

        // PUBLIC PROPERTIES

        // PUBLIC FUNCTIONS
        vm.changeRace = changeRace;

        // init
        activate();

        //
        // PRIVATE FUNCTIONS

        function activate() {
            viewerService.init({
                canvasId: 'viewer',
                containerId: 'viewer-container'
            });

            loadJSON('/tabards/orc_Male.js', 'orc_Male', '/tabards/52252/');
        }

        /**
         * @export
         *
         *  Load a JSON file
         *  https://github.com/mrdoob/three.js/wiki
         */
        function loadJSON(url, name, path) {
	        var info = {
	            url: url,
	            name: name,
                path: path,
	            type: 'JSON'
	        };

	        viewerService.loadJSON(info);
        };

        function changeRace() {
            loadJSON('/tabards/pandaren_Male.js', 'pandaren_Male', '/tabards/52252/');
        }
    }
})();
