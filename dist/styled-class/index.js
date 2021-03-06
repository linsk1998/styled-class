define("styled-class", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var styleInitor = refreshStyle;
    var index = 0;
    function styled(target) {
        var styleClass = {
            clazz: target,
            className: "scope" + (index++)
        };
        target.toString = function () {
            if (!styleClass.ele) {
                var style = document.createElement('style');
                style.type = 'text/css';
                document.head.appendChild(style);
                styleClass.ele = style;
                styleInitor(styleClass);
            }
            return styleClass.className;
        };
    }
    exports.styled = styled;
    function setStyleInitor(fn) {
        styleInitor = fn;
    }
    exports.setStyleInitor = setStyleInitor;
    function setCssText(style, cssText) {
        if (style.styleSheet) { //IE
            style.styleSheet.cssText = cssText;
        }
        else { //w3c
            if (style.firstChild) {
                style.firstChild.data = cssText;
            }
            else {
                var textNode = document.createTextNode(cssText);
                style.appendChild(textNode);
            }
        }
    }
    function refreshStyle(styleClass) {
        var obj = new styleClass.clazz();
        var cssText = objectToCssText("." + styleClass.className, obj).join("\n");
        setCssText(styleClass.ele, cssText);
    }
    exports.refreshStyle = refreshStyle;
    function objectToCssText(prefix, obj) {
        var cssTexts = [];
        var myobj = {};
        for (var key in obj) {
            var value = obj[key];
            if ((value instanceof Object) && Object.getPrototypeOf(value) === Object.prototype) {
                cssTexts.push.call(cssTexts, objectToCssText(prefix + " " + key, value));
            }
            else {
                myobj[key] = value;
            }
        }
        cssTexts.unshift(ruleToString(prefix, oneObjectToCssRules(myobj)));
        return cssTexts;
    }
    exports.objectToCssText = objectToCssText;
    function oneObjectToCssRules(obj) {
        var r = {
            rules: obj,
            filters: [],
            needLayout: false,
            hasLayout: false
        };
        var result = Object.keys(obj).map(dealCssProperty, r);
        if (!window.atob) {
            if (r.filters.length) {
                r.needLayout = true;
                result.push("filter:" + r.filters.join(" "));
            }
        }
        if (r.needLayout) {
            if (!r.hasLayout) {
                r.hasLayout = true;
                result.push("zoom:1");
            }
        }
        return result;
    }
    exports.oneObjectToCssRules = oneObjectToCssRules;
    function ruleToString(prefix, rules) {
        return prefix + "{" + rules.join("; ") + "}";
    }
    function dealCssProperty(key) {
        var value = this.rules[key];
        key = key.replace(/[A-Z]/, camel2dash);
        if (key == "display" && value == "inline-block") {
            if (!document.querySelector) {
                this.needLayout = true;
                return "display:inline-block;*display:inline";
            }
        }
        if (key == "background") {
            if (value.rgba) {
                var rgba = value.rgba();
                if (window.addEventListener) {
                    return "background:" + toRGBAString(rgba);
                }
                if (rgba[3] < 1) {
                    var background = toARGBHexString(rgba);
                    this.filters.push("progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + background + ",endcolorstr=" + background + ");");
                    return;
                }
            }
            else if (value instanceof Gradient) {
                var start, end, avg = mix(value.start, value.end);
                if (window.atob) {
                    start = toRGBAString(value.start);
                    end = toRGBAString(value.end);
                    return "background:" + avg.toString() + ";"
                        + "background:-webkit-gradient(linear," + (value.toRight ? "left" : "top") + "," + (value.toRight ? "right" : "bottom") + ",from(" + start + "), to(" + end + "));"
                        + "background:-webkit-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:-moz-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:-o-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:linear-gradient(" + (value.toRight ? "to right" : "to bottom") + "," + start + "," + end + ");";
                }
                else {
                    start = toARGBHexString(value.start);
                    end = toARGBHexString(value.end);
                    this.filters.push("progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + start + ",endcolorstr=" + end + ");");
                    return;
                }
            }
            else if (value instanceof Cover) {
                if (window.addEventListener) {
                    return "background:url(" + value.src + ") no-repeat center center;\n"
                        + "-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;";
                }
                else {
                    this.filters.push("progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + value.src + "',sizingMethod='scale');");
                }
            }
            else if (value <= 0xffffff) {
                return "background:#" + value.toString(16).padStart(6, "0");
            }
        }
        else if (key.includes("color")) {
            if (value <= 0xffffff) {
                value = "#" + value.toString(16).padStart(6, "0");
            }
        }
        switch (key) {
            case "box-shadow":
            case "border-radius": //-webkit -moz
            case "column-count":
                return "-moz-" + key + ":" + value + ";-webkit-" + key + ":" + value + ";" + key + ":" + value;
            case "text-overflow": //-o-
                return "-o-" + key + ":" + value + ";" + key + ":" + value;
            case "text-stroke": //-webkit
            case "filter":
                return "-webkit-" + key + ":" + value + ";" + key + ":" + value;
            case "opacity":
                if (!window.addEventListener) {
                    this.filters.push("progid:DXImageTransform.Microsoft.Alpha(opacity=" + (value * 100) + ")");
                }
                return "-moz-" + key + ":" + value + ";-webkit-" + key + ":" + value + ";" + key + ":" + value;
            case "zoom":
                this.hasLayout = true;
                break;
        }
        return key + ":" + value.toString();
    }
    exports.dealCssProperty = dealCssProperty;
    function camel2dash(str) {
        return "-" + str.toLowerCase();
    }
    var Cover = /** @class */ (function () {
        function Cover() {
        }
        return Cover;
    }());
    exports.Cover = Cover;
    function cover(url) {
        var bg = new Cover();
        bg.src = url.href;
        return bg;
    }
    exports.cover = cover;
    var Gradient = /** @class */ (function () {
        function Gradient() {
        }
        return Gradient;
    }());
    exports.Gradient = Gradient;
    function gradient(start, end, toRight) {
        var g = new Gradient();
        g.start = start.rgba ? start.rgba() : num2rgba(start);
        g.end = end.rgba ? end.rgba() : num2rgba(end);
        g.toRight = toRight;
        return g;
    }
    exports.gradient = gradient;
    function toRGBAString(rgba) {
        return "rgba(" + rgba.join(",") + ")";
    }
    function toARGBHexString(rgba) {
        var num = ((rgba[0] * 0x10000) |
            (rgba[1] * 0x100) |
            rgba[2]);
        return "#" + Math.round(rgba[3] * 255).toString(16).padStart(2, "0") + num.toString(16).padStart(6, "0");
    }
    function mix(rgba1, rgba2) {
        var rgba = new Array(4);
        var ta = rgba1[3] + rgba2[3];
        rgba[3] = ta / 2;
        var i = 3;
        while (i-- > 0) {
            rgba[i] = rgba1[i] * rgba1[3] / ta + rgba2[i] * rgba[3] / ta;
        }
        return rgba;
    }
    function num2rgba(num) {
        var r = num >> 16;
        var g = (num >> 8) & 0xFF;
        var b = num & 0xFF;
        return [r, g, b, 1];
    }
});
