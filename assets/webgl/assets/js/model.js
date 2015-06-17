var container;
var model;
var speed = 0.01;
var rotation;
var camera, scene, renderer;

init();
animate();

function init() {
    container = document.getElementById('canvas');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 0, 3);

    controls = new THREE.TrackballControls(camera, container);
    controls.rotateSpeed = 25.0;
    controls.zoomSpeed = 5;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var loader = new THREE.JSONLoader();

    loader.load('/webgl/assets/model/orc.js', function(geometry, materials) {
        var material = new THREE.MeshFaceMaterial(materials);
        model = new THREE.Mesh(geometry, material);
        model.position.y -= 1.1;
        scene.add(model);
    }, '/webgl/assets/model/tabard1/');

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(1920, 925, false);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    //model.rotation.y -= speed;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
