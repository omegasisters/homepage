var ThreeViewer = /** @class */ (function () {
    function ThreeViewer() {
        var _this = this;
        this.start = function (div) {
            var scene = (_this.scene = new THREE.Scene());
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
            var render = function () {
                requestAnimationFrame(render);
                controls.update();
                renderer.render(scene, camera);
            };
            render();
        };
        this.loadVrm = function (progress) {
            return new Promise(function (r) {
                if (_this.model) {
                    _this.scene.remove(_this.model);
                    _this.model = undefined;
                }
                var loader = new THREE.GLTFLoader();
                loader.load("assets/blob/otohime.vrm", function (gltf) {
                    var mesh = (_this.model = gltf.scene);
                    mesh.scale.set(1, 1, 1);
                    _this.scene.add(mesh);
                    r();
                }, function (xhr) {
                    var now = (xhr.loaded / xhr.total) * 100;
                    progress(now);
                    console.log(now + "% loaded");
                }, function (error) {
                    console.warn(error);
                });
            });
        };
        this.loadFbx = function (progress) {
            return new Promise(function (r) {
                if (_this.model) {
                    _this.scene.remove(_this.model);
                    _this.model = undefined;
                }
                var loader = new THREE.FBXLoader();
                loader.load("assets/blob/unchi_curling.fbx", function (object) {
                    _this.model = object;
                    object.traverse(function (child) {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    _this.scene.add(object);
                    r();
                }, function (xhr) {
                    var now = (xhr.loaded / xhr.total) * 100;
                    progress(now);
                    console.log(now + "% loaded");
                });
            });
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
