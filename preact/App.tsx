import { FunctionalComponent, h } from "/homepage/web_modules/preact.js";
import {
  useEffect,
  useRef,
  useState
} from "/homepage/web_modules/preact/hooks.js";

import Rotate from "./three/rotate.js";
import ThreeScene from "./three/scene.js";
import ThreeViewer from "./three/viewer.js";

const App: FunctionalComponent = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modelType, setModelType] = useState<"otohime" | "curing">("otohime");
  const [button, setButton] = useState("回転停止");

  const divRef = useRef<HTMLDivElement>();
  const rotate = useRef(new Rotate()).current;
  const scene = useRef(
    new ThreeScene(() => {
      rotate.update(viewer.model);
    })
  ).current;
  const viewer = useRef(new ThreeViewer(scene.scene)).current;

  useEffect(() => {
    scene.start(divRef.current!);
    onOtohime();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", scene.resize);
    return () => {
      window.removeEventListener("resize", scene.resize);
    };
  }, []);

  const onOtohime = async () => {
    if (loading) return;
    setModelType("otohime");
    setLoading(true);
    await viewer.loadVrm(setProgress);
    setLoading(false);
  };

  const onCuring = async () => {
    if (loading) return;
    setModelType("curing");
    setLoading(true);
    await viewer.loadFbx(setProgress);
    setLoading(false);
  };

  return (
    <div className="viewer">
      <div className="controller">
        <button
          onClick={onOtohime}
          className={modelType === "otohime" ? "active" : ""}
        >
          おとひめ
        </button>
        <button
          onClick={onCuring}
          className={modelType === "curing" ? "active" : ""}
        >
          うんちかーりんぐ
        </button>
      </div>
      {loading && <p>Now Loading {progress}%</p>}
      {modelType === "otohime" && (
        <div className="description">
          <p>おとひめ.vrm</p>
          <a
            href="https://3d.nicovideo.jp/works/td41391"
            target="_blank"
            rel="noopener noreferrer"
          >
            3d.nicovideo.jp/works/td41391
          </a>
        </div>
      )}

      {modelType === "curing" && (
        <div className="description">
          <p>うんちカーリング</p>
          <a
            href="https://omesis-shop.booth.pm/items/1269953"
            target="_blank"
            rel="noopener noreferrer"
          >
            omesis-shop.booth.pm/items/1269953
          </a>
        </div>
      )}
      <div ref={divRef} />
      <button
        onClick={() => {
          rotate.switch();
          setButton(rotate.isRotate ? "回転停止" : "回転開始");
        }}
      >
        {button}
      </button>
    </div>
  );
};

export default App;
