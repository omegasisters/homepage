import * as THREE from "/homepage/web_modules/three.js";

export default class Rotate {
  isRotate = true;

  stop = () => {
    this.isRotate = false;
  };

  update = (model: THREE.Object3D | undefined) => {
    if (model && this.isRotate) {
      model.rotation.y += 0.01;
    }
  };
}
