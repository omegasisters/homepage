import { h } from "/web_modules/preact.js";
import { useEffect, useRef } from "/web_modules/preact/hooks.js";
var App = function () {
    var divRef = useRef();
    var rendererRef = useRef();
    useEffect(function () {
        var div = divRef.current;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
        camera.position.set(0, 1, -3);
        var renderer = (rendererRef.current = new THREE.WebGLRenderer());
        resize();
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
    }, []);
    var resize = function () {
        var renderer = rendererRef.current;
        var width = window.innerWidth - (window.innerWidth / 10) * 2;
        var height = width / 1.7;
        renderer.setSize(width, height);
    };
    useEffect(function () {
        window.addEventListener("resize", resize);
        return function () {
            window.removeEventListener("resize", resize);
        };
    }, []);
    return (h("div", { style: { width: "100%" } },
        h("p", null, "\u304A\u3068\u3072\u3081.vrm"),
        h("a", { href: "https://3d.nicovideo.jp/works/td41391", target: "_blank", rel: "noopener noreferrer", style: { wordWrap: "break-word" } }, "https://3d.nicovideo.jp/works/td41391"),
        h("br", null),
        h("br", null),
        h("div", { ref: divRef })));
};
export default App;
