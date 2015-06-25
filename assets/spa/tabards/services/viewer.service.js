(function() {
    'use strict';

    angular
        .module('dabou.tabards')
        .factory('viewerService', viewerService);

    viewerService.$inject = ['$timeout'];

    /**
     * @ngdoc service
     * @name dabou.viewer.service:viewerService
     * @description
     *
     */
    function viewerService($timeout) {

        var home,
            intersected;

        /**
         * Initialize the 3D scene.
         * @param  {!{ canvasId: string, containerId: string }} params
         */
        function init(params) {
            home = new Viewer.Scene(params);
            $timeout(function () {
            }, 1500);
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        /**
         * Renders the THREE.js scene graph.
         */
        function render() {
            home.renderer.render(home.scene, home.cameras.liveCam);
            home.controls.update();
        }

        /**
         * Load OBJ file.
         * @param {!{obj: string, name: string, type: string}} info
         */
        function loadOBJ(info) {
            home.wrangler.loadDefaultFiles(info.id, info.race, info.gender);
            home.wrangler.loadOBJ(info.obj, info.name);
        }

        /**
         * Load OBJ and MTL file
         * @param {!{obj: string, mtl: string, name: string, type: string}} info
         */
        function loadOBJMTL(info){
            home.wrangler.loadOBJMTL(info.obj, info.mtl, info.name);
        }   

        /**
         * Load a JavaScript model
         * @param {!{url: string, name: string, path: string, type: string}} info
         */
        function loadJSON(info) {
            home.wrangler.loadJSON(info.url, info.name, info.path);
        }

        return {
            init: init,
            loadOBJ: loadOBJ,
            loadOBJMTL: loadOBJMTL,
            loadJSON: loadJSON
        };
    }

})();
