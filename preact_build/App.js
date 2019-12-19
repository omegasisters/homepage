import { h } from "/homepage/web_modules/preact.js";
import { useEffect, useRef, useState } from "/homepage/web_modules/preact/hooks.js";
import ThreeViewer from "./three/viewer.js";
var App = function () {
    var _a = useState(0), progress = _a[0], setProgress = _a[1];
    var isLoading = progress > 0 && progress < 100;
    var divRef = useRef();
    var viewerRef = useRef(new ThreeViewer());
    var viewer = viewerRef.current;
    useEffect(function () {
        viewer.start(divRef.current);
        viewer.loadFbx(setProgress);
        window.addEventListener("resize", viewer.resize);
        return function () {
            window.removeEventListener("resize", viewer.resize);
        };
    }, []);
    var onOtohime = function () {
        if (!isLoading)
            viewer.loadVrm(setProgress);
    };
    var onCuring = function () {
        if (!isLoading)
            viewer.loadFbx(setProgress);
    };
    return (h("div", { style: { width: "100%" } },
        h("p", null, "\u304A\u3068\u3072\u3081.vrm"),
        h("a", { href: "https://3d.nicovideo.jp/works/td41391", target: "_blank", rel: "noopener noreferrer", style: { wordWrap: "break-word" } }, "https://3d.nicovideo.jp/works/td41391"),
        h("br", null),
        h("div", { style: { display: "flex" } },
            h("button", { onClick: onOtohime }, "\u304A\u3068\u3072\u3081"),
            h("button", { onClick: onCuring }, "\u3046\u3093\u3061\u304B\u30FC\u308A\u3093\u3050")),
        isLoading && h("p", null,
            "Now Loading ",
            progress,
            "%"),
        h("div", { ref: divRef })));
};
export default App;
