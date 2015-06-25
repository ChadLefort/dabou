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
    ViewerController.$inject = ['viewerService', 'tabardsService', '$stateParams'];

    function ViewerController(viewerService, tabardsService, $stateParams) {
        var vm = this,
            tabardId = $stateParams.id;

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

            //loadOBJ(52252, 'worgen', 'female', '/tabards/52252/worgenfemale.obj', 'worgenfemale');
            //loadJSON('/tabards/draeneifemale_hd.js', 'draeneifemale_hd', '/tabards/52252/');
            loadOBJMTL('/tabards/52252/2/0/model.obj', '/tabards/52252/2/0/model.mtl', 'model');
            getTabard(tabardId);
        }

        /*
         * @private
         * @function
         * @param {Integer} id - A tabard's id
         * @description :: Get's a tabard by id
         */
        function getTabard(tabardId) {
          tabardsService.getTabard(tabardId)
            .then(function (data) {
              vm.tabard = data;
            }).catch(function (error) {
              vm.noTabard = true;
            });
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
            loadOBJMTL('/tabards/52252/1/0/model.obj', '/tabards/52252/1/0/model.mtl', 'model');
        }
    }
})();
