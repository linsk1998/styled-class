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
            if (value instanceof Color) {
                if (window.addEventListener) {
                    return "background:" + value.toRGBAString();
                }
                if (value.alpha < 1) {
                    var background = value.toARGBHexString();
                    this.filters.push("progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + background + ",endcolorstr=" + background + ");");
                    return;
                }
            }
            else if (value instanceof Gradient) {
                var start, end, avg = mix(value.start, value.end);
                if (window.atob) {
                    start = value.start.toRGBAString();
                    end = value.end.toRGBAString();
                    return "background:" + avg.toString() + ";"
                        + "background:-webkit-gradient(linear," + (value.toRight ? "left" : "top") + "," + (value.toRight ? "right" : "bottom") + ",from(" + start + "), to(" + end + "));"
                        + "background:-webkit-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:-moz-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:-o-linear-gradient(" + (value.toRight ? "left" : "top") + "," + start + "," + end + ");"
                        + "background:linear-gradient(" + (value.toRight ? "to right" : "to bottom") + "," + start + "," + end + ");";
                }
                else {
                    start = value.start.toARGBHexString();
                    end = value.end.toARGBHexString();
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
        if (!(start instanceof Color)) {
            start = Color.of(start);
        }
        if (!(end instanceof Color)) {
            end = Color.of(end);
        }
        var g = new Gradient();
        g.start = start;
        g.end = end;
        g.toRight = toRight;
        return g;
    }
    exports.gradient = gradient;
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            this.alpha = 1;
            this.rgb = null;
            this.rgb = new Array(Math.round(r), Math.round(g), Math.round(b));
            this.alpha = a;
        }
        Color.prototype.equals = function (color) {
            var mine = this.rgb;
            var its = color.rgb;
            return mine[0] == its[0] && mine[1] == its[1] && mine[2] == its[2] && mine[3] == its[3] && this.alpha == color.alpha;
        };
        Color.prototype.toRGB = function () {
            return this.rgb.slice(0, 3);
        };
        Color.prototype.toHSL = function () {
            return Color.RGBtoHSL(this.rgb);
        };
        Color.prototype.valueOf = function () {
            var channels = this.rgb;
            return (
            //((255-Math.round(channels[3]*256)+1) * 0x1000000) |
            (channels[0] * 0x10000) |
                (channels[1] * 0x100) |
                channels[2]);
        };
        Color.prototype.toString = function () {
            return "#" + this.valueOf().toString(16).padStart(6, "0");
        };
        Color.prototype.toRGBAString = function () {
            return "rgba(" + this.rgb + "," + this.alpha + ")";
        };
        Color.prototype.toARGBHexString = function () {
            return "#" + Math.round(this.alpha * 255).toString(16).padStart(2, "0") + this.valueOf().toString(16).padStart(6, "0");
        };
        Color.parse = function (str) {
            str = str.toLowerCase();
            var r, g, b, a = 1;
            var arr;
            if (arr = str.match(/^#[0-9a-z]{3}$/)) {
                r = str.substr(1, 1);
                r = parseInt(r, 16);
                g = str.substr(2, 2);
                g = parseInt(g, 16);
                b = str.substr(3, 3);
                b = parseInt(b, 16);
                return new Color(r, g, b, 1);
            }
            else if (arr = str.match(/^#[0-9a-z]{6}$/)) {
                r = str.substr(1, 2);
                r = parseInt(r, 16);
                g = str.substr(3, 2);
                g = parseInt(g, 16);
                b = str.substr(5, 2);
                b = parseInt(b, 16);
                return new Color(r, g, b, 1);
            }
            else if (arr = str.match(/^\s*(rgba?|hsla?)\s*\(([^\)]+)\)\s*$/)) {
                var type = arr[1];
                var args = arr[2].split(",");
                switch (type) {
                    case "rgba":
                        a = parsePercent(args[3]);
                    case "rgb":
                        r = parseInt(args[0]);
                        g = parseInt(args[1]);
                        b = parseInt(args[2]);
                        return new Color(r, g, b, a);
                    case "hsla":
                        a = parsePercent(args[3]);
                    case "hsl":
                        r = parseInt(arr[1]); //h
                        g = parsePercent(arr[2]); //g
                        b = parsePercent(arr[3]); //l
                        arr = Color.HSLtoRGB([r, g, b]);
                        return new Color(arr[0], arr[1], arr[2], a);
                }
            }
            else if (Color.names.hasOwnProperty(str)) {
                return Color.of(Color.names[str]);
            }
            return NaN;
        };
        Color.of = function (v) {
            var g = (v & 0xFF00) / 0x100;
            var b = v & 0xFF;
            var r = v >>> 0x10;
            return new Color(r, g, b, 1);
        };
        // RGB to HSL and HSL to RGB code from
        // https://github.com/less/less.js
        Color.RGBtoHSL = function (rgb) {
            var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2, d = max - min;
            if (max === min) {
                h = s = 0;
            }
            else {
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [h * 360, s, l];
        };
        Color.HSLtoRGB = function (hsl) {
            var h = hsl[0], s = hsl[1], l = hsl[2];
            var m1, m2;
            function hue(h) {
                h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
                if (h * 6 < 1) {
                    return m1 + (m2 - m1) * h * 6;
                }
                else if (h * 2 < 1) {
                    return m2;
                }
                else if (h * 3 < 2) {
                    return m1 + (m2 - m1) * (2 / 3 - h) * 6;
                }
                else {
                    return m1;
                }
            }
            h = (h % 360) / 360;
            s = clamp(s);
            l = clamp(l);
            m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            m1 = l * 2 - m2;
            return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255];
        };
        Color.names = { aliceblue: 0xf0f8ff, antiquewhite: 0xfaebd7, aqua: 0x00ffff, aquamarine: 0x7fffd4, azure: 0xf0ffff, beige: 0xf5f5dc, bisque: 0xffe4c4, black: 0x000000, blanchedalmond: 0xffebcd, blue: 0x0000ff, blueviolet: 0x8a2be2, brown: 0xa52a2a, burlywood: 0xdeb887, cadetblue: 0x5f9ea0, chartreuse: 0x7fff00, chocolate: 0xd2691e, coral: 0xff7f50, cornflowerblue: 0x6495ed, cornsilk: 0xfff8dc, crimson: 0xdc143c, cyan: 0x00ffff, darkblue: 0x00008b, darkcyan: 0x008b8b, darkgoldenrod: 0xb8860b, darkgray: 0xa9a9a9, darkgrey: 0xa9a9a9, darkgreen: 0x006400, darkkhaki: 0xbdb76b, darkmagenta: 0x8b008b, darkolivegreen: 0x556b2f, darkorange: 0xff8c00, darkorchid: 0x9932cc, darkred: 0x8b0000, darksalmon: 0xe9967a, darkseagreen: 0x8fbc8f, darkslateblue: 0x483d8b, darkslategray: 0x2f4f4f, darkslategrey: 0x2f4f4f, darkturquoise: 0x00ced1, darkviolet: 0x9400d3, deeppink: 0xff1493, deepskyblue: 0x00bfff, dimgray: 0x696969, dimgrey: 0x696969, dodgerblue: 0x1e90ff, firebrick: 0xb22222, floralwhite: 0xfffaf0, forestgreen: 0x228b22, fuchsia: 0xff00ff, gainsboro: 0xdcdcdc, ghostwhite: 0xf8f8ff, gold: 0xffd700, goldenrod: 0xdaa520, gray: 0x808080, grey: 0x808080, green: 0x008000, greenyellow: 0xadff2f, honeydew: 0xf0fff0, hotpink: 0xff69b4, indianred: 0xcd5c5c, indigo: 0x4b0082, ivory: 0xfffff0, khaki: 0xf0e68c, lavender: 0xe6e6fa, lavenderblush: 0xfff0f5, lawngreen: 0x7cfc00, lemonchiffon: 0xfffacd, lightblue: 0xadd8e6, lightcoral: 0xf08080, lightcyan: 0xe0ffff, lightgoldenrodyellow: 0xfafad2, lightgray: 0xd3d3d3, lightgrey: 0xd3d3d3, lightgreen: 0x90ee90, lightpink: 0xffb6c1, lightsalmon: 0xffa07a, lightseagreen: 0x20b2aa, lightskyblue: 0x87cefa, lightslategray: 0x778899, lightslategrey: 0x778899, lightsteelblue: 0xb0c4de, lightyellow: 0xffffe0, lime: 0x00ff00, limegreen: 0x32cd32, linen: 0xfaf0e6, magenta: 0xff00ff, maroon: 0x800000, mediumaquamarine: 0x66cdaa, mediumblue: 0x0000cd, mediumorchid: 0xba55d3, mediumpurple: 0x9370d8, mediumseagreen: 0x3cb371, mediumslateblue: 0x7b68ee, mediumspringgreen: 0x00fa9a, mediumturquoise: 0x48d1cc, mediumvioletred: 0xc71585, midnightblue: 0x191970, mintcream: 0xf5fffa, mistyrose: 0xffe4e1, moccasin: 0xffe4b5, navajowhite: 0xffdead, navy: 0x000080, oldlace: 0xfdf5e6, olive: 0x808000, olivedrab: 0x6b8e23, orange: 0xffa500, orangered: 0xff4500, orchid: 0xda70d6, palegoldenrod: 0xeee8aa, palegreen: 0x98fb98, paleturquoise: 0xafeeee, palevioletred: 0xd87093, papayawhip: 0xffefd5, peachpuff: 0xffdab9, peru: 0xcd853f, pink: 0xffc0cb, plum: 0xdda0dd, powderblue: 0xb0e0e6, purple: 0x800080, rebeccapurple: 0x663399, red: 0xff0000, rosybrown: 0xbc8f8f, royalblue: 0x4169e1, saddlebrown: 0x8b4513, salmon: 0xfa8072, sandybrown: 0xf4a460, seagreen: 0x2e8b57, seashell: 0xfff5ee, sienna: 0xa0522d, silver: 0xc0c0c0, skyblue: 0x87ceeb, slateblue: 0x6a5acd, slategray: 0x708090, slategrey: 0x708090, snow: 0xfffafa, springgreen: 0x00ff7f, steelblue: 0x4682b4, tan: 0xd2b48c, teal: 0x008080, thistle: 0xd8bfd8, tomato: 0xff6347, turquoise: 0x40e0d0, violet: 0xee82ee, wheat: 0xf5deb3, white: 0xffffff, whitesmoke: 0xf5f5f5, yellow: 0xffff00, yellowgreen: 0x9acd32 };
        return Color;
    }());
    exports.Color = Color;
    function parsePercent(n) {
        if (n.indexOf) {
            if (n.indexOf("%") < 0) {
                return parseFloat(n);
            }
            else {
                return parseFloat(n) / 100;
            }
        }
        return n;
    }
    function clamp(val) {
        return Math.min(1, Math.max(0, val));
    }
    function rgb(r, g, b) {
        return new Color(r, g, b, 1);
    }
    exports.rgb = rgb;
    function rgba(r, g, b, a) {
        return new Color(r, g, b, a);
    }
    exports.rgba = rgba;
    function hsl(h, s, l) {
        var rgb = Color.HSLtoRGB([h, s, l]);
        return new Color(rgb[0], rgb[1], rgb[2], 1);
    }
    exports.hsl = hsl;
    function hsla(h, s, l, a) {
        var rgb = Color.HSLtoRGB([h, s, l]);
        return new Color(rgb[0], rgb[1], rgb[2], a);
    }
    exports.hsla = hsla;
    function lighten(color, amount, relative) {
        if (!(color instanceof Color)) {
            color = Color.of(color);
        }
        var hsl = color.toHSL();
        var l = hsl[2];
        if (relative) {
            l += l * amount / 100;
        }
        else {
            l += amount;
        }
        l = clamp(l);
        return hsla(hsl[0], hsl[1], l, color.alpha);
    }
    exports.lighten = lighten;
    function darken(color, amount, relative) {
        return lighten(color, -amount, relative);
    }
    exports.darken = darken;
    function spin(color, amount) {
        if (!(color instanceof Color)) {
            color = Color.of(color);
        }
        var hsl = color.toHSL();
        var hue = (hsl[0] + amount) % 360;
        var h = hue < 0 ? 360 + hue : hue;
        return hsla(h, hsl[1], hsl[2], color.alpha);
    }
    exports.spin = spin;
    function saturate(color, amount, relative) {
        if (!(color instanceof Color)) {
            color = Color.of(color);
        }
        var hsl = color.toHSL();
        var s = hsl[1];
        if (relative) {
            s += s * amount / 100;
        }
        else {
            s += amount;
        }
        s = clamp(s);
        return hsla(hsl[0], s, hsl[2], color.alpha);
    }
    exports.saturate = saturate;
    function desaturate(color, amount, relative) {
        return saturate(color, -amount, relative);
    }
    exports.desaturate = desaturate;
    function mix(color1, color2, weight) {
        if (!(color1 instanceof Color)) {
            color1 = Color.of(color1);
        }
        if (!(color2 instanceof Color)) {
            color2 = Color.of(color2);
        }
        if (weight === void 0) {
            weight = 0.5;
        }
        var color = new Color(0, 0, 0, 1);
        var ta = color1.alpha + color2.alpha;
        color.alpha = ta / 2;
        var i = 3;
        while (i-- > 0) {
            color.rgb[i] = color1.rgb[i] * color1.alpha / ta * weight + color2.rgb[i] * color2.alpha / ta * (1 - weight);
        }
        return color;
    }
    exports.mix = mix;
});
