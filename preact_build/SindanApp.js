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
import { Component, h } from "/homepage/web_modules/preact.js";
import sindanQuestions from "./sindanQuestions.js";
var SindanApp = /** @class */ (function (_super) {
    __extends(SindanApp, _super);
    function SindanApp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            started: false,
            questionID: -1,
            questionText: "",
            answers: [],
            questions: [],
            questionsCount: 0,
            pointsMap: {}
        };
        _this.readSindan = function () {
            console.log(sindanQuestions);
        };
        _this.setStart = function (start) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ started: start });
                        if (!(start === true)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.setState({ questions: sindanQuestions["questions"] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.setState({ questionsCount: this.state.questions.length })];
                    case 3:
                        _a.sent();
                        this.readNext();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this.setState({ started: false });
                        alert("\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306B\u554F\u984C\u304C\u3042\u308A\u307E\u3059\u3002 " + e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.readNext = function () { return __awaiter(_this, void 0, void 0, function () {
            var question, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.state.questions);
                        console.log(this.state.questionsCount);
                        if (!(this.state.questionID + 1 < this.state.questionsCount)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.setState({ questionID: this.state.questionID + 1 })];
                    case 2:
                        _a.sent();
                        question = this.state.questions[this.state.questionID];
                        this.setState({ questionText: question["text"] });
                        this.setState({ answers: question["answers"] });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.setState({ started: false });
                        this.setState({ questionID: -1 });
                        alert("\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306B\u554F\u984C\u304C\u3042\u308A\u307E\u3059\u3002 " + e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.answer = function (answer) {
            try {
                var target = answer["target"];
                var point = _this.state.pointsMap[target];
                if (point == undefined) {
                    point = 0;
                }
                _this.setState({ pointsMap: (point + answer["value"]) });
                _this.readNext();
            }
            catch (e) {
                _this.setState({ started: false });
                _this.setState({ questionId: -1 });
                alert("\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306B\u554F\u984C\u304C\u3042\u308A\u307E\u3059\u3002 " + e);
            }
        };
        return _this;
    }
    SindanApp.prototype.render = function () {
        // props === this.props
        //state ==== this.state
        var _this = this;
        return (h("div", { className: "preact__container_for_sindan" },
            h("div", { className: "hero__container_for_sindan" },
                h("div", { className: "hero__logo_for_sindan" },
                    h("h1", { className: "logo", style: this.state.started ? "display:none" : "" }, "\u304A\u3081\u304C\u8A3A\u65AD"),
                    h("h1", { className: "logo-sub", style: this.state.started ? "display:none" : "" }, "\u3042\u306A\u305F\u306B\u3074\u3063\u305F\u308A\u306E\u304A\u3081\u304C\u3092\u898B\u3064\u3051\u3088\u3046"),
                    h("h1", { className: "question-logo", style: this.state.started ? "" : "display:none" },
                        "Q",
                        this.state.questionID + 1),
                    h("h1", { className: "logo-sub", style: this.state.started ? "" : "display:none" }, this.state.questionText))),
            h("div", { className: "controle-box" },
                h("div", { className: "start-button", onClick: function () { return _this.setStart(true); }, style: this.state.started ? "display:none" : "" }, "\u306F\u3058\u3081\u308B"),
                this.state.answers.map(function (ans) {
                    return h("div", { className: "start-button", onClick: function () { return _this.answer(ans); } }, ans["text"]);
                }))));
    };
    return SindanApp;
}(Component));
export default SindanApp;
