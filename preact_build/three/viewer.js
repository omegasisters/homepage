import { FBXLoader } from "/homepage/web_modules/three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "/homepage/web_modules/three/examples/jsm/loaders/GLTFLoader.js";
var ThreeViewer = /** @class */ (function () {
    function ThreeViewer(scene) {
        var _this = this;
        this.scene = scene;
        this.models = {};
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
                    mesh.scale.set(1, 1, 1);
                    mesh.position.z -= 2;
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
                    object.position.y += 0.5;
                    object.position.z -= 2;
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
