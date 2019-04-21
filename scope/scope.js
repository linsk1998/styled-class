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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "styled-class"], function (require, exports, styled_class_1) {
    "use strict";
    exports.__esModule = true;
    var BoxStyle = /** @class */ (function () {
        function BoxStyle() {
            this.display = "inline-block";
            this.margin = "20px";
            this.padding = "20px";
        }
        return BoxStyle;
    }());
    var Div1Style = /** @class */ (function (_super) {
        __extends(Div1Style, _super);
        function Div1Style() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.background = "red";
            _this.h3 = {
                color: "white"
            };
            return _this;
        }
        Div1Style = __decorate([
            styled_class_1.styled
        ], Div1Style);
        return Div1Style;
    }(BoxStyle));
    exports.Div1Style = Div1Style;
    var Div2Style = /** @class */ (function (_super) {
        __extends(Div2Style, _super);
        function Div2Style() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.background = "blue";
            _this.h3 = {
                color: "tomato"
            };
            return _this;
        }
        Div2Style = __decorate([
            styled_class_1.styled
        ], Div2Style);
        return Div2Style;
    }(BoxStyle));
    exports.Div2Style = Div2Style;
    document.getElementById("div1").className = Div1Style.toString();
    document.getElementById("div2").className = Div2Style;
});
