// @ts-check

const App = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
  camera.position.set(0, 1, -3);
  const renderer = new THREE.WebGLRenderer();

  const resize = () => {
    const width = window.innerWidth - 300;
    const height = width / 1.7;
    renderer.setSize(width, height);
  };
  resize();

  document.getElementById('otohime').appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.update();

  renderer.setClearColor(0x00ffff, 1);
  renderer.gammaOutput = true;

  const ambient = new THREE.AmbientLight("#85b2cd");
  scene.add(ambient);

  const loader = new THREE.GLTFLoader();

  loader.load(
    "assets/blob/otohime.vrm",
    gltf => {
      const mesh = gltf.scene;
      mesh.scale.set(1, 1, 1);
      scene.add(mesh);
    },
    xhr => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    error => {
      console.warn(error);
    }
  );

  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  };

  render();
  window.addEventListener("resize", resize);
};

window.addEventListener("DOMContentLoaded", App);
