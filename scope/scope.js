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
