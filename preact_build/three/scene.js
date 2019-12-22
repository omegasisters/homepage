import * as THREE from "/homepage/web_modules/three.js";
import { OrbitControls } from "/homepage/web_modules/three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "/homepage/web_modules/three/examples/jsm/webxr/VRButton.js";
var ThreeScene = /** @class */ (function () {
    function ThreeScene(onUpdate) {
        var _this = this;
        this.onUpdate = onUpdate;
        this.renderer = undefined;
        this.scene = undefined;
        this.start = function (div) {
            var _a = _this, scene = _a.scene, renderer = _a.renderer;
            var camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
            camera.position.set(0, 1, 0);
            _this.resize();
            div.appendChild(renderer.domElement);
            try {
                renderer.vr.enabled = true;
                var vrButton = VRButton.createButton(_this.renderer);
                div.appendChild(vrButton);
                vrButton.style.top = "";
                vrButton.style.bottom = "";
            }
            catch (error) { }
            var controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 1, 0);
            controls.update();
            renderer.setClearColor(0x000000, 0);
            renderer.gammaOutput = true;
            var ambient = new THREE.AmbientLight("#85b2cd");
            scene.add(ambient);
            renderer.setAnimationLoop(function () {
                _this.onUpdate(_this);
                controls.update();
                renderer.render(scene, camera);
            });
        };
        this.resize = function () {
            var renderer = _this.renderer;
            var width = window.innerWidth - (window.innerWidth / 10) * 2;
            var height = width / 1.7;
            renderer.setSize(width, height);
        };
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
    }
    return ThreeScene;
}());
export default ThreeScene;
