import { FunctionalComponent, h } from "/homepage/web_modules/preact.js";
import {
  useEffect,
  useRef,
  useState
} from "/homepage/web_modules/preact/hooks.js";

import ThreeViewer from "./three/viewer.js";

const App: FunctionalComponent = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modelType, setModelType] = useState("otohime");

  const divRef = useRef<HTMLDivElement>();
  const viewerRef = useRef(new ThreeViewer());
  const viewer = viewerRef.current;

  useEffect(() => {
    const promise = async () => {
      setLoading(true);
      await viewer.loadVrm(setProgress);
      setLoading(false);
    };

    viewer.start(divRef.current!);
    promise();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", viewer.resize);

    return () => {
      window.removeEventListener("resize", viewer.resize);
    };
  }, []);

  const onOtohime = () => {
    if (!isLoading) {
      viewer.loadVrm(setProgress);
      setModelType("otohime");
    }
  };

  const onCuring = () => {
    if (!isLoading) {
      viewer.loadFbx(setProgress);
      setModelType("curing");
    }
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
      {isLoading && <p>Now Loading {progress}%</p>}

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
    </div>
  );
};

export default App;
