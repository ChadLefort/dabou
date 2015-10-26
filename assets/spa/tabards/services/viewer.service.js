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
     */

    function viewerService() {
        var home;

        function init(params) {
            home = new Viewer.Scene(params);
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            home.renderer.render(home.scene, home.cameras.liveCam);
            home.controls.update();
        }

        function loadOBJ(info) {
            home.wrangler.loadDefaultFiles(info.s3bucket, info.id, info.race, info.gender);
            home.wrangler.loadOBJ(info.obj, info.name);
        }

        function loadOBJMTL(info) {
            home.wrangler.loadOBJMTL(info.obj, info.mtl, info.name);
        }

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
