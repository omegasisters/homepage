import { h } from "/homepage/web_modules/preact.js";
import { useEffect, useRef, useState } from "/homepage/web_modules/preact/hooks.js";
import ThreeViewer from "./three/viewer.js";
var App = function () {
    var _a = useState(0), progress = _a[0], setProgress = _a[1];
    var _b = useState('otohime'), modelType = _b[0], setModelType = _b[1];
    var isLoading = progress > 0 && progress < 100;
    var divRef = useRef();
    var viewerRef = useRef(new ThreeViewer());
    var viewer = viewerRef.current;
    useEffect(function () {
        viewer.start(divRef.current);
        viewer.loadVrm(setProgress);
        window.addEventListener("resize", viewer.resize);
        return function () {
            window.removeEventListener("resize", viewer.resize);
        };
    }, []);
    var onOtohime = function () {
        if (!isLoading) {
            viewer.loadVrm(setProgress);
            setModelType('otohime');
        }
    };
    var onCuring = function () {
        if (!isLoading) {
            viewer.loadFbx(setProgress);
            setModelType('curing');
        }
    };
    return (h("div", { className: "viewer" },
        h("div", { className: "controller" },
            h("button", { onClick: onOtohime, className: modelType === 'otohime' ? 'active' : '' }, "\u304A\u3068\u3072\u3081"),
            h("button", { onClick: onCuring, className: modelType === 'curing' ? 'active' : '' }, "\u3046\u3093\u3061\u304B\u30FC\u308A\u3093\u3050")),
        isLoading && h("p", null,
            "Now Loading ",
            progress,
            "%"),
        modelType === 'otohime' && (h("div", { className: "description" },
            h("p", null, "\u304A\u3068\u3072\u3081.vrm"),
            h("a", { href: "https://3d.nicovideo.jp/works/td41391", target: "_blank", rel: "noopener noreferrer" }, "3d.nicovideo.jp/works/td41391"))),
        modelType === 'curing' && (h("div", { className: "description" },
            h("p", null, "\u3046\u3093\u3061\u30AB\u30FC\u30EA\u30F3\u30B0"),
            h("a", { href: "https://omesis-shop.booth.pm/items/1269953", target: "_blank", rel: "noopener noreferrer" }, "omesis-shop.booth.pm/items/1269953"))),
        h("div", { ref: divRef })));
};
export default App;
