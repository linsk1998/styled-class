define(["require", "exports", "react", "react-dom", "styled-class", "color", "chroma"], function (require, exports, React, ReactDOM, styled_class_1, color_1, chroma_1) {
    "use strict";
    exports.__esModule = true;
    var InineBlock = /** @class */ (function () {
        function InineBlock() {
            this.display = "inline-block";
            this.margin = "20px";
            this.padding = "20px";
            this.background = "#99aacc";
        }
        InineBlock = __decorate([
            styled_class_1.styled
        ], InineBlock);
        return InineBlock;
    }());
    var OpacityExample = /** @class */ (function () {
        function OpacityExample() {
            this.color = "white";
            this.margin = "20px";
            this.padding = "20px";
            this.opacity = 0.5;
            this.background = "black";
        }
        OpacityExample = __decorate([
            styled_class_1.styled
        ], OpacityExample);
        return OpacityExample;
    }());
    var RGBAExample = /** @class */ (function () {
        function RGBAExample() {
            this.color = "white";
            this.margin = "20px";
            this.padding = "20px";
            this.background = color_1.rgba(0, 0, 0, 0.5);
        }
        RGBAExample = __decorate([
            styled_class_1.styled
        ], RGBAExample);
        return RGBAExample;
    }());
    var GradientExample = /** @class */ (function () {
        function GradientExample() {
            this.color = 0xffffff;
            this.margin = "20px";
            this.padding = "20px";
            this.background = styled_class_1.gradient(0x3388ff, color_1.rgba(0, 0, 0, 0.8));
        }
        GradientExample = __decorate([
            styled_class_1.styled
        ], GradientExample);
        return GradientExample;
    }());
    var CoverExample = /** @class */ (function () {
        function CoverExample() {
            this.color = chroma_1.rgb(255, 255, 255);
            this.width = "600px";
            this.height = "300px";
            this.background = styled_class_1.cover(new URL("http://www.w3school.com.cn/i/eg_tulip.jpg"));
        }
        CoverExample = __decorate([
            styled_class_1.styled
        ], CoverExample);
        return CoverExample;
    }());
    ReactDOM.render(React.createElement("div", { className: "container" },
        React.createElement("h1", null, "inline-block"),
        React.createElement("div", { className: InineBlock }, "inline-block"),
        React.createElement("div", { className: InineBlock }, "inline-block"),
        React.createElement("div", { className: InineBlock }, "inline-block"),
        React.createElement("div", { className: InineBlock }, "inline-block"),
        React.createElement("h1", null, "opacity"),
        React.createElement("div", { className: OpacityExample }, "opacity:0.5"),
        React.createElement("h1", null, "background:rgba()"),
        React.createElement("div", { className: RGBAExample }, "background:rgba(0,0,0,0.5)"),
        React.createElement("h1", null, "background:gradient()"),
        React.createElement("div", { className: GradientExample }, "background:gradient(0x3388ff,rgba(0,0,0,0.8))"),
        React.createElement("h1", null, "background:cover()"),
        React.createElement("div", { className: CoverExample }, "background:cover(url)")), document.body);
});
