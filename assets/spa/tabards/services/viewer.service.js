(function() {
    'use strict';

    angular
        .module('dabou.tabards')
        .factory('viewerService', viewerService);

    viewerService.$inject = [];

    /**
     * @ngdoc service
     * @name dabou.viewer.service:viewerService
     * @description
     *
     */
    function viewerService() {

        var home,
            intersected;

        /**
         * Initialize the 3D scene.
         * @param  {!{ canvasId: string, containerId: string }} params
         */
        function init(params) {
            home = new Viewer.Scene(params);
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
         * Load a JavaScript model
         * @param {!{url: string, name: string, path: string, type: string}} info
         */
        function loadJSON(info) {
            console.log(info);
            home.wrangler.loadJSON(info.url, info.name, info.path);
        }

        return {
            init: init,
            loadJSON: loadJSON
        };
    }

})();
