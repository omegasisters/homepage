import * as THREE from "/homepage/web_modules/three.js";
import { FBXLoader } from "/homepage/web_modules/three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "/homepage/web_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "/homepage/web_modules/three/examples/jsm/controls/OrbitControls.js";
var ThreeViewer = /** @class */ (function () {
    function ThreeViewer(onUpdate) {
        var _this = this;
        this.onUpdate = onUpdate;
        this.render = undefined;
        this.scene = undefined;
        this.models = {};
        this.start = function (div) {
            var scene = (_this.scene = new THREE.Scene());
            var camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
            camera.position.set(0, 1, -3);
            var renderer = (_this.render = new THREE.WebGLRenderer({ alpha: true }));
            _this.resize();
            div.appendChild(renderer.domElement);
            var controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 1, 0);
            controls.update();
            renderer.setClearColor(0x000000, 0);
            renderer.gammaOutput = true;
            var ambient = new THREE.AmbientLight("#85b2cd");
            scene.add(ambient);
            var render = function () {
                requestAnimationFrame(render);
                controls.update();
                renderer.render(scene, camera);
                _this.onUpdate(_this);
            };
            render();
        };
        this.loadVrm = function (progress) {
            return new Promise(function (r) {
                _this.beforeLoad();
                var address = "assets/blob/otohime.vrm";
                _this.model = _this.models[address];
                if (_this.model) {
                    _this.scene.add(_this.model);
                    r();
                    return;
                }
                new GLTFLoader().load(address, function (gltf) {
                    var mesh = (_this.models[address] = _this.model = gltf.scene);
                    mesh.scale.set(1.5, 1.5, 1.5);
                    _this.scene.add(_this.model);
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
                _this.beforeLoad();
                var address = "assets/blob/unchi_curling.fbx";
                _this.model = _this.models[address];
                if (_this.model) {
                    _this.scene.add(_this.model);
                    r();
                    return;
                }
                new FBXLoader().load(address, function (object) {
                    _this.model = _this.models[address] = object;
                    object.scale.set(0.1, 0.1, 0.1);
                    object.traverse(function (child) {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    _this.scene.add(_this.model);
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
        this.resize = function () {
            var renderer = _this.render;
            var width = window.innerWidth - (window.innerWidth / 10) * 2;
            var height = width / 1.7;
            renderer.setSize(width, height);
        };
    }
    ThreeViewer.prototype.beforeLoad = function () {
        if (this.model) {
            this.scene.remove(this.model);
            this.model = undefined;
        }
    };
    return ThreeViewer;
}());
export default ThreeViewer;
