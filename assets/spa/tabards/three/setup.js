(function() {
    'use strict';

    Viewer.Scene = Viewer.Scene || {};

    /**
     * Setup the scene geometry
     * @param {Object} params
     * @constructor
     */
    Viewer.Scene.Setup = function(params) {
        this.context = params.context;
        this.WIDTH = this.context.container.clientWidth;
        this.HEIGHT = this.context.container.clientHeight;
        this.init();
    };

    /**
     *
     */
    Viewer.Scene.Setup.prototype = {

        /**
         * Initialize all of the THREE.JS framework
         */
        init: function() {
            this.setupRenderer();
            this.lights();
        },

        /**
         * Setup the render information.
         */
        setupRenderer: function() {
            this.context.renderer.setSize(this.WIDTH, this.HEIGHT);
            this.context.renderer.setViewport(0, 0, this.WIDTH, this.HEIGHT);
            this.context.jqContainer.fadeIn();
        },

        /**
         * Add light(s) to the scene
         */
        lights: function() {
            var ambient = new THREE.AmbientLight(0xffffff);
            ambient.name = "ambient";
            this.context.scene.add(ambient);
        }
    };

})();
