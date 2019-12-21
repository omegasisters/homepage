import * as THREE from "/homepage/web_modules/three.js";

export default class Rotate {
  model?: THREE.Object3D;
  isRotate = true;

  stop = () => {
    this.isRotate = false;
  };

  update = () => {
    if (this.model && this.isRotate) {
      this.model.rotation.y += 0.01;
    }
  };
}
