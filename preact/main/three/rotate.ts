import * as THREE from 'three';

export default class Rotate {
  isRotate = true;

  switch = () => {
    this.isRotate = !this.isRotate;
  };

  update = (model: THREE.Object3D | undefined) => {
    if (model && this.isRotate) {
      model.rotation.y += 0.01;
    }
  };
}
