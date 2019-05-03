declare module "color" {
    export function rgb2cmyk(r: any, g: any, b: any): number[];
    export function cmyk2rgb(c: any, m: any, y: any, k: any): number[];
    export function rgb2hsl(r: any, g: any, b: any): any[];
    export function hsl2rgb(h: any, s: any, l: any): any[];
    export function rgb2hsi(r: any, g: any, b: any): number[];
    export function hsi2rgb(h: any, s: any, i: any): number[];
    export function hsv2rgb(h: any, s: any, v: any): any[];
    export function rgb2hsv(r: any, g: any, b: any): any[];
    export function rgb2xyz(r: any, g: any, b: any): number[];
    export function rgb2lab(r: any, g: any, b: any): number[];
    export function lab2rgb(l: any, a: any, b: any): number[];
    export function lab2lch(l: any, a: any, b: any): any[];
    export function rgb2lch(r: any, g: any, b: any): any;
    export function lch2lab(l: any, c: any, h: any): any[];
    export function lch2rgb(l: any, c: any, h: any): any;
    export function hsy2rgb(h: number, s: number, y: number): number[];
    export function rgb2hsy(r: number, g: number, b: number): any[];
    export function hcl2rgb(h: number, c: number, l: number): any;
    export class Color {
        _rgb: number[];
        constructor(r: number, g: number, b: number, a: number);
        alpha(): number;
        rgb(): number[];
        rgba(): number[];
        num(): number;
        hex(): string;
        toString(): string;
        blacken(amount: number): Color;
        whiten(amount: number): Color;
        brighten(amount: number): Color;
        darken(amount: number): Color;
        spin(deg: number): Color;
    }
    export function rgb(r: any, b: any, g: any): Color;
    export function rgba(r: any, b: any, g: any, a: any): Color;
    export function hsl(h: any, s: any, l: any): Color;
    export function hsla(h: any, s: any, l: any, a: any): Color;
    export function hsv(h: any, s: any, v: any): Color;
    export function hsi(h: any, s: any, i: any): Color;
    export function hsy(h: any, s: any, y: any): Color;
    export function lab(l: any, a: any, b: any): Color;
    export function lch(l: any, c: any, h: any): Color;
    export function lcha(l: any, c: any, h: any, a: any): Color;
    export function hcl(h: any, l: any, c: any): Color;
    export function hcla(h: any, l: any, c: any, a: any): Color;
}
