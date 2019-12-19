var ThreeViewer = /** @class */ (function () {
    function ThreeViewer() {
        var _this = this;
        this.start = function (div) {
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
            camera.position.set(0, 1, -3);
            var renderer = (_this.render = new THREE.WebGLRenderer());
            _this.resize();
            div.appendChild(renderer.domElement);
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 1, 0);
            controls.update();
            renderer.setClearColor(0x00ffff, 1);
            renderer.gammaOutput = true;
            var ambient = new THREE.AmbientLight("#85b2cd");
            scene.add(ambient);
            var loader = new THREE.GLTFLoader();
            loader.load("assets/blob/otohime.vrm", function (gltf) {
                var mesh = gltf.scene;
                mesh.scale.set(1, 1, 1);
                scene.add(mesh);
            }, function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            }, function (error) {
                console.warn(error);
            });
            var render = function () {
                requestAnimationFrame(render);
                controls.update();
                renderer.render(scene, camera);
            };
            render();
        };
        this.resize = function () {
            var renderer = _this.render;
            var width = window.innerWidth - (window.innerWidth / 10) * 2;
            var height = width / 1.7;
            renderer.setSize(width, height);
        };
    }
    return ThreeViewer;
}());
export default ThreeViewer;
