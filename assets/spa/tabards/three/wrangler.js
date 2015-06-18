(function() {
    'use strict';

    Viewer.Wrangler = Viewer.Wrangler || {};

    /**
     * @class This is a resource manager and loads individual models.
     *
     * @struct
     * @constructor
     */
    Viewer.Wrangler = function(params) {
        this.context = params.context;
        this.currentModel = null;
        this.jsLoader = new THREE.JSONLoader();
        this.name = null;
    };

    /**
     *
     */
    Viewer.Wrangler.prototype = {

        init: function() {
            THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
        },

        /**
         * @param {!string} url
         * @param {!string} name
         * @param {!string} path
         */
        loadJSON: function(url, name, path) {
            this.removeFromScene();
            this.name = name;

            this.jsLoader.load(url, function(geometry, materials) {
                var object = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                object.position.y -= 1.1;

                object.name = name;
                this.currentModel = object;
                this.context.scene.add(object);
            }.bind(this), path);
        },

        /**
         * Removes the old object from the scene
         */
        removeFromScene: function() {
            var obj = this.context.scene.getObjectByName(this.name, true);
            this.context.scene.remove(obj);
        }
    };

})();
