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

  const onOtohime = async () => {
    if (loading) return;
    setLoading(true);
    await viewer.loadVrm(setProgress);
    setLoading(false);
  };

  const onCuring = async () => {
    if (loading) return;
    setLoading(true);
    await viewer.loadFbx(setProgress);
    setLoading(false);
  };

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
      <p>うんちカーリング</p>
      <a
        href="https://omesis-shop.booth.pm/items/1269953"
        target="_blank"
        rel="noopener noreferrer"
        style={{ wordWrap: "break-word" }}
      >
        https://omesis-shop.booth.pm/items/1269953
      </a>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={onOtohime}>おとひめ</button>
        <button onClick={onCuring}>うんちかーりんぐ</button>
      </div>
      {loading && <p>Now Loading {progress}%</p>}
      <div ref={divRef} />
    </div>
  );
};

export default App;
