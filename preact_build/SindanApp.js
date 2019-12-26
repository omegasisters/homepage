var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, h } from "/homepage/web_modules/preact.js";
import sindanQuestions from "./sindanQuestions.js";
var SindanApp = /** @class */ (function (_super) {
    __extends(SindanApp, _super);
    function SindanApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            start: false,
            questionId: 0,
        };
        _this.readSindan = function () {
            console.log(sindanQuestions);
        };
        _this.setStart = function (start) {
            _this.setState({ start: start });
        };
        return _this;
    }
    SindanApp.prototype.render = function () {
        // props === this.props
        // state === this.state
        var _this = this;
        return (h("div", { className: "preact__container_for_sindan" },
            h("div", { className: "hero__container_for_sindan" },
                h("div", { className: "hero__logo" },
                    h("h1", { className: "logo" }, "\u304A\u3081\u304C\u8A3A\u65AD"),
                    h("h1", { className: "logo-sub" }, "\u3042\u306A\u305F\u306E\u597D\u304D\u306A\u8272\u306F\u4F55\u3067\u3059\u304B\uFF1F"))),
            h("div", { className: "controle-box" },
                h("div", { className: "start-button", onClick: function () { return _this.readSindan(); } }, "\u306F\u3058\u3081\u308B"))));
    };
    return SindanApp;
}(Component));
export default SindanApp;
