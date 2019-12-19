declare const THREE: any;

export default class ThreeViewer {
  render: any;
  scene: any;

  model: any;

  start = (div: HTMLDivElement) => {
    const scene = (this.scene = new THREE.Scene());
    const camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
    camera.position.set(0, 1, -3);
    const renderer = (this.render = new THREE.WebGLRenderer());
    this.resize();
    div.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    renderer.setClearColor(0x00ffff, 1);
    renderer.gammaOutput = true;

    const ambient = new THREE.AmbientLight("#85b2cd");
    scene.add(ambient);

    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };

    render();
  };

  loadVrm = (progress: (progress: number) => void) => {
    if (this.model) {
      this.scene.remove(this.model);
      this.model = undefined;
    }
    const loader = new THREE.GLTFLoader();

    loader.load(
      "assets/blob/otohime.vrm",
      (gltf: any) => {
        const mesh = (this.model = gltf.scene);
        mesh.scale.set(1, 1, 1);
        this.scene.add(mesh);
      },
      (xhr: any) => {
        const now = (xhr.loaded / xhr.total) * 100;
        progress(now);
        console.log(now + "% loaded");
      },
      (error: any) => {
        console.warn(error);
      }
    );
  };

  loadFbx = (progress: (progress: number) => void) => {
    if (this.model) {
      this.scene.remove(this.model);
      this.model = undefined;
    }
    var loader = new THREE.FBXLoader();
    loader.load(
      "assets/blob/unchi_curling.fbx",
      (object: any) => {
        this.model = object;
        object.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(object);
      },
      (xhr: any) => {
        const now = (xhr.loaded / xhr.total) * 100;
        progress(now);
        console.log(now + "% loaded");
      }
    );
  };

  resize = () => {
    const renderer = this.render;
    const width = window.innerWidth - (window.innerWidth / 10) * 2;
    const height = width / 1.7;
    renderer.setSize(width, height);
  };
}
