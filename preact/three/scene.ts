import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {VRButton} from 'three/examples/jsm/webxr/VRButton';

export default class ThreeScene {
  renderer: THREE.WebGLRenderer = undefined as any;
  scene: THREE.Scene = undefined as any;
  camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 10);

  isVR = false;

  constructor(private onUpdate: (viewer: ThreeScene) => void) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true});
  }

  switchVR() {
    this.isVR = !this.isVR;
    if (this.isVR) {
      this.scene.position.set(0, 0, -1);
    } else {
      this.scene.position.set(0, 0, 0);
    }
  }

  start = (div: HTMLDivElement) => {
    const {scene, renderer: renderer} = this;

    this.camera.position.set(0, 1, 2);

    this.resize();
    div.appendChild(renderer.domElement);

    try {
      renderer.vr.enabled = true;
      const vrButton = VRButton.createButton(this.renderer);
      div.appendChild(vrButton);
      vrButton.style.top = '';
      vrButton.style.bottom = '';
      vrButton.addEventListener('click', () => {
        this.switchVR();
      });
    } catch (error) {}

    const controls = new OrbitControls(this.camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    renderer.setClearColor(0x000000, 0);
    renderer.gammaOutput = true;

    const ambient = new THREE.AmbientLight('#85b2cd');
    scene.add(ambient);

    renderer.setAnimationLoop(() => {
      this.onUpdate(this);
      controls.update();
      renderer.render(scene, this.camera);
    });
  };
  resize = () => {
    const renderer = this.renderer;
    const width = window.innerWidth - (window.innerWidth / 10) * 2;
    const height = width / 1.7;
    renderer.setSize(width, height);
  };
}
