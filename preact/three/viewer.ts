import * as THREE from "/homepage/web_modules/three.js";

import { FBXLoader } from "/homepage/web_modules/three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "/homepage/web_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "/homepage/web_modules/three/examples/jsm/controls/OrbitControls.js";

export default class ThreeViewer {
  render: THREE.WebGLRenderer = undefined as any;
  scene: THREE.Scene = undefined as any;

  model: any;
  models: { [key: string]: any } = {};

  constructor(private onUpdate: (viewer: ThreeViewer) => void) {}

  start = (div: HTMLDivElement) => {
    const scene = (this.scene = new THREE.Scene());
    const camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
    camera.position.set(0, 1, -3);
    const renderer = (this.render = new THREE.WebGLRenderer({ alpha: true }));
    this.resize();
    div.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    renderer.setClearColor(0x000000, 0);
    renderer.gammaOutput = true;

    const ambient = new THREE.AmbientLight("#85b2cd");
    scene.add(ambient);

    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
      this.onUpdate(this);
    };

    render();
  };

  beforeLoad() {
    if (this.model) {
      this.scene.remove(this.model);
      this.model = undefined;
    }
  }

  loadVrm = (progress: (progress: number) => void) =>
    new Promise(r => {
      this.beforeLoad();

      const address = "assets/blob/otohime.vrm";

      this.model = this.models[address];
      if (this.model) {
        this.scene.add(this.model);
        r();
        return;
      }

      new GLTFLoader().load(
        address,
        gltf => {
          const mesh = (this.models[address] = this.model = gltf.scene);
          mesh.scale.set(1.5, 1.5, 1.5);
          this.scene.add(this.model);
          r();
        },
        xhr => {
          const now = (xhr.loaded / xhr.total) * 100;
          progress(now);
          console.log(now + "% loaded");
        },
        error => {
          console.warn(error);
        }
      );
    });

  loadFbx = (progress: (progress: number) => void) =>
    new Promise(r => {
      this.beforeLoad();

      const address = "assets/blob/unchi_curling.fbx";

      this.model = this.models[address];
      if (this.model) {
        this.scene.add(this.model);
        r();
        return;
      }

      new FBXLoader().load(
        address,
        object => {
          this.model = this.models[address] = object;
          object.scale.set(0.1, 0.1, 0.1);
          object.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.scene.add(this.model);
          r();
        },
        xhr => {
          const now = (xhr.loaded / xhr.total) * 100;
          progress(now);
          console.log(now + "% loaded");
        },
        error => {
          console.warn(error);
        }
      );
    });

  resize = () => {
    const renderer = this.render;
    const width = window.innerWidth - (window.innerWidth / 10) * 2;
    const height = width / 1.7;
    renderer.setSize(width, height);
  };
}
