import { FunctionalComponent, h } from "/homepage/web_modules/preact.js";
import { useEffect, useRef } from "/homepage/web_modules/preact/hooks.js";

declare const THREE: any;

const App: FunctionalComponent = () => {
  const divRef = useRef<HTMLDivElement>();
  const rendererRef = useRef<any>();

  useEffect(() => {
    const div = divRef.current!;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1.7, 0.1, 1000);
    camera.position.set(0, 1, -3);
    const renderer = ((rendererRef as any).current = new THREE.WebGLRenderer());
    resize();
    div.appendChild(renderer.domElement);

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
      (gltf: any) => {
        const mesh = gltf.scene;
        mesh.scale.set(1, 1, 1);
        scene.add(mesh);
      },
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: any) => {
        console.warn(error);
      }
    );

    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };

    render();
  }, []);

  const resize = () => {
    const renderer = rendererRef.current;
    const width = window.innerWidth - (window.innerWidth / 10) * 2;
    const height = width / 1.7;
    renderer.setSize(width, height);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <p>おとひめ.vrm</p>
      <a
        href="https://3d.nicovideo.jp/works/td41391"
        target="_blank"
        rel="noopener noreferrer"
        style={{ wordWrap: "break-word" }}
      >
        https://3d.nicovideo.jp/works/td41391
      </a>
      <br />
      <br />
      <div ref={divRef} />
    </div>
  );
};

export default App;
