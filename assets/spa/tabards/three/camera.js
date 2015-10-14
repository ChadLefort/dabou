(function() {
    'use strict';

    Viewer.Scene = Viewer.Scene || {};

    /**
     * @namespace  Camera initialization.  Contains setup for both Perspective and Orthographic cameras.
     * @class Creates cameras for the scene.
     */

    Viewer.Scene.Cameras = function(params) {

        this.context = params.context;

        this.liveCam = null;
        this.FOV = 50;

        this.WIDTH = this.context.container.clientWidth;
        this.HEIGHT = this.context.container.clientHeight;
        this.ASPECT_RATIO = this.WIDTH / this.HEIGHT;

        //Perspective camera setup
        this.perpCam = null;
        this.PERP_NEAR_PLANE = 1;
        this.PERP_FAR_PLANE = 2000;

        this.controls = null;

        this.init();
    };

    Viewer.Scene.Cameras.prototype = {

        //Initialize a camera.
        init: function() {
            this.initPerspective();
        },


        //Initialize the perspective camera.
        initPerspective: function() {

            this.perpCam = new THREE.PerspectiveCamera(
                this.FOV,
                this.ASPECT_RATIO,
                this.PERP_NEAR_PLANE,
                this.PERP_FAR_PLANE
            );

            this.perpCam.position.set(0, 0, 3);
            this.perpCam.lookAt(this.context.scene.position);

            this.perpCam.name = 'perp';

            this.liveCam = this.perpCam;
        }
    };
})();
