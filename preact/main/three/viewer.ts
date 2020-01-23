import * as THREE from 'three';

import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {VRM} from '@pixiv/three-vrm';

export default class ThreeViewer {
  model: any;
  models: {[key: string]: any} = {};
  clock: THREE.Clock = new THREE.Clock();
  currentVrm: any;

  constructor(private scene: THREE.Scene) {}

  beforeLoad() {
    if (this.model) {
      this.scene.remove(this.model);
      this.model = undefined;
    }
  }

  loadVrm = (progress: (progress: number) => void) =>
    new Promise((r) => {
      this.beforeLoad();

      const address = 'assets/blob/otohime.vrm';

      this.model = this.models[address];
      if (this.model) {
        this.scene.add(this.model);
        r();
        return;
      }

      new GLTFLoader().load(
        address,
        (gltf) => {
          VRM.from(gltf).then((vrm: VRM) => {
            const mesh = (this.models[address] = this.model = vrm.scene);
            mesh.scale.set(1, 1, 1);
            this.scene.add(this.model);
            this.currentVrm = vrm;
            r();
          });
        },
        (xhr) => {
          const now = (xhr.loaded / xhr.total) * 100;
          progress(now);
        },
        (error) => {
          console.warn(error);
        },
      );
    });

  loadFbx = (progress: (progress: number) => void) =>
    new Promise((r) => {
      this.beforeLoad();

      const address = 'assets/blob/unchi_curling.fbx';

      this.model = this.models[address];
      if (this.model) {
        this.scene.add(this.model);
        r();
        return;
      }

      new FBXLoader().load(
        address,
        (object) => {
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
        (xhr) => {
          const now = (xhr.loaded / xhr.total) * 100;
          progress(now);
        },
        (error) => {
          console.warn(error);
        },
      );
    });

  animate = () => {
    requestAnimationFrame(this.animate);

    const deltaTime = this.clock.getDelta();

    if (this.currentVrm.humanoid) {
      const s = 0.125 * Math.PI * Math.sin(Math.PI * this.clock.elapsedTime);
      this.currentVrm.humanoid.humanBones.neck[0].node.rotation.z = s * 0.25;
      this.currentVrm.humanoid.humanBones.leftUpperArm[0].node.rotation.z = s;
      this.currentVrm.humanoid.humanBones.rightUpperArm[0].node.rotation.z = s;
      this.currentVrm.update(deltaTime);
    }
  };
}
