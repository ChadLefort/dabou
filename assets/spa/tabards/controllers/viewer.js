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

            loadOBJ(52252, 'worgen', 'female', '/tabards/52252/worgenfemale.obj', 'worgenfemale');
            //loadJSON('/tabards/draeneifemale_hd.js', 'draeneifemale_hd', '/tabards/52252/');
            //loadOBJMTL('/tabards/52252/taurenfemale_hd.obj', '/tabards/52252/taurenfemale_hd.mtl', 'taurenfemale_hd');
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
        }

        function loadOBJ(id, race, gender, obj, name) {
            var info = {
                id: id,
                race: race,
                gender: gender,
                obj: obj,
                name: name,
                type: 'obj'
            }

            viewerService.loadOBJ(info);
        }

        function loadOBJMTL(obj, mtl, name) {
            var info = {
                obj: obj,
                mtl: mtl,
                name: name,
                type: 'objmtl'
            };

            viewerService.loadOBJMTL(info);
        }

        function changeRace() {
            loadJSON('/tabards/pandaren_Male.js', 'pandaren_Male', '/tabards/52252/');
        }
    }
})();
