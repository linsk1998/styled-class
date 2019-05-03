define(["require", "exports", "styled-class", "color", "mobx"], function (require, exports, styled_class_1, color_1, mobx_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //配置，初始化时用mobx收集依赖，有改变时自动更新样式
    styled_class_1.setStyleInitor(function (data) {
        mobx_1.autorun(function () {
            styled_class_1.refreshStyle(data);
        });
    });
    //主题色，用mobx监视
    var Theme = /** @class */ (function () {
        function Theme() {
            this.primary = color_1.rgb(0x33, 0x7a, 0xb7);
            this.caption = color_1.rgb(0xff, 0xff, 0xff);
            this.text = color_1.rgb(0x33, 0x33, 0x33);
            this.accent = color_1.rgb(0x60, 0x7D, 0x8B);
            this.divider = color_1.rgb(0xcc, 0xcc, 0xcc);
        }
        Object.defineProperty(Theme.prototype, "darkPrimary", {
            get: function () {
                return this.primary.darken(0.15);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Theme.prototype, "lightPrimary", {
            get: function () {
                return this.primary.brighten(0.15);
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            mobx_1.observable //主题色
        ], Theme.prototype, "primary", void 0);
        __decorate([
            mobx_1.computed //主题色-深色
        ], Theme.prototype, "darkPrimary", null);
        __decorate([
            mobx_1.computed //主题色-浅色
        ], Theme.prototype, "lightPrimary", null);
        __decorate([
            mobx_1.observable //标题色
        ], Theme.prototype, "caption", void 0);
        __decorate([
            mobx_1.observable //文本色
        ], Theme.prototype, "text", void 0);
        __decorate([
            mobx_1.observable //突出色
        ], Theme.prototype, "accent", void 0);
        __decorate([
            mobx_1.observable //分割线色
        ], Theme.prototype, "divider", void 0);
        return Theme;
    }());
    var theme = new Theme();
    var PanelStyle = /** @class */ (function () {
        function PanelStyle() {
            this.display = "inline-block";
            this.width = "400px";
            this.color = theme.text;
            this.border = "1px solid " + theme.divider.toString();
            this.header = {
                background: theme.darkPrimary,
                color: theme.caption,
                textAlign: "left"
            };
            this.h3 = {
                background: theme.primary,
                color: theme.caption,
                marginTop: 0
            };
            this.button = {
                background: theme.primary,
                border: "1px solid " + theme.darkPrimary.toString(),
                color: theme.caption
            };
        }
        PanelStyle = __decorate([
            styled_class_1.styled
        ], PanelStyle);
        return PanelStyle;
    }());
    exports.PanelStyle = PanelStyle;
    document.getElementById("div1").className = PanelStyle.toString();
    document.getElementById("themeBtn").onclick = function () {
        theme.primary = color_1.hcl(360 * Math.random(), 0.6, 0.5); //hsy 色相 饱和度 亮度
    };
});
