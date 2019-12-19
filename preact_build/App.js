var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { h } from "/homepage/web_modules/preact.js";
import { useEffect, useRef, useState } from "/homepage/web_modules/preact/hooks.js";
import ThreeViewer from "./three/viewer.js";
var App = function () {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    var _b = useState(0), progress = _b[0], setProgress = _b[1];
    var _c = useState("otohime"), modelType = _c[0], setModelType = _c[1];
    var divRef = useRef();
    var viewerRef = useRef(new ThreeViewer());
    var viewer = viewerRef.current;
    useEffect(function () {
        var promise = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, viewer.loadVrm(setProgress)];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        return [2 /*return*/];
                }
            });
        }); };
        viewer.start(divRef.current);
        promise();
    }, []);
    useEffect(function () {
        window.addEventListener("resize", viewer.resize);
        return function () {
            window.removeEventListener("resize", viewer.resize);
        };
    }, []);
    var onOtohime = function () {
        if (!isLoading) {
            viewer.loadVrm(setProgress);
            setModelType("otohime");
        }
    };
    var onCuring = function () {
        if (!isLoading) {
            viewer.loadFbx(setProgress);
            setModelType("curing");
        }
    };
    return (h("div", { className: "viewer" },
        h("div", { className: "controller" },
            h("button", { onClick: onOtohime, className: modelType === "otohime" ? "active" : "" }, "\u304A\u3068\u3072\u3081"),
            h("button", { onClick: onCuring, className: modelType === "curing" ? "active" : "" }, "\u3046\u3093\u3061\u304B\u30FC\u308A\u3093\u3050")),
        isLoading && h("p", null,
            "Now Loading ",
            progress,
            "%"),
        modelType === "otohime" && (h("div", { className: "description" },
            h("p", null, "\u304A\u3068\u3072\u3081.vrm"),
            h("a", { href: "https://3d.nicovideo.jp/works/td41391", target: "_blank", rel: "noopener noreferrer" }, "3d.nicovideo.jp/works/td41391"))),
        modelType === "curing" && (h("div", { className: "description" },
            h("p", null, "\u3046\u3093\u3061\u30AB\u30FC\u30EA\u30F3\u30B0"),
            h("a", { href: "https://omesis-shop.booth.pm/items/1269953", target: "_blank", rel: "noopener noreferrer" }, "omesis-shop.booth.pm/items/1269953"))),
        h("div", { ref: divRef })));
};
export default App;
