(function() {
    'use strict';

    Viewer.Wrangler = Viewer.Wrangler || {};

    /**
     * @class This is a resource manager and loads individual models.
     * @struct
     * @constructor
     */

    Viewer.Wrangler = function(params) {
        this.context = params.context;
        this.currentModel = null;
        this.loadingManager = new THREE.LoadingManager();
        this.objMtlLoader = new THREE.OBJMTLLoader(this.loadingManager);
        this.objLoader = new THREE.OBJLoader(this.loadingManager);
        this.imgLoader = new THREE.ImageLoader(this.loadingManager);
        this.jsLoader = new THREE.JSONLoader();
        this.name = null;
        this.imgFiles = {};
    };

    Viewer.Wrangler.prototype = {

        init: function() {
            THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
            this.listeners();
        },

        listeners: function() {
            this.loadingManager.onProgress = function(item, loaded, total) {
                console.log(item, loaded, total);
            };
        },

        loadDefaultFiles: function(s3bucket, id, race, gender) {
            // This is just for worgen's right now. Can't load hair texture and they
            // will only load as obj files not as json.
            var tex = s3bucket + '/tabards/' + id + '/' + race + '/' + gender + '/' + 'model_Body.png';
            this.loadNormalTexture(tex);
        },

        loadOBJMTL: function(obj, mtl, name) {
            this.removeFromScene();
            this.name = name;
            // Load an obj and mtl texture
            this.objMtlLoader.crossOrigin = '';
            this.objMtlLoader.load(obj, mtl, function(object) {
                object.position.y -= 1.1;
                object.name = name;
                this.currentModel = object;
                this.context.scene.add(object);
            }.bind(this));
        },

        loadOBJ: function(obj, name) {
            this.removeFromScene();
            this.name = name;
            // load the OBJapply the UV texture grid
            this.objLoader.load(obj, function(object) {
                var texture;
                if (this.imgFiles[name]) {
                    texture = this.imgFiles[name];
                } else {
                    texture = this.imgFiles['grid'];
                }

                object.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                    }
                });
                object.position.y -= 1.1;
                object.name = name;
                this.currentModel = object;
                this.context.scene.add(object);
            }.bind(this));
        },

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

        loadNormalTexture: function(tex) {
            // Load an image texture to use on an OBJ
            var texture = new THREE.Texture();
            this.imgLoader.crossOrigin = '';
            this.imgLoader.load(tex, function(image) {
                texture.image = image;
                texture.needsUpdate = true;
                this.imgFiles['grid'] = texture;
            }.bind(this));
        },

        // Removes the old object from the scene
        removeFromScene: function() {
            var obj = this.context.scene.getObjectByName(this.name, true);
            this.context.scene.remove(obj);
        }
    };
})();
