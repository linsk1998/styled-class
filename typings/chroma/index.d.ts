// Type definitions for Chroma.js 1.4
// Project: https://github.com/gka/chroma.js
// Definitions by: Sebastian Brückner <https://github.com/invliD>, Marcin Pacholec <https://github.com/mpacholec>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

/**
 * Chroma.js is a tiny library for all kinds of color conversions and color scales.
 */
declare module "chroma" {
	export function hex(color: string): Color;
	export function hsl(h: number, s: number, l: number): Color;
	export function hsv(h: number, s: number, v: number): Color;
	export function lab(lightness: number, a: number, b: number, alpha?: number): Color;
	export function lch(l: number, c: number, h: number): Color;
	export function rgb(r: number, g: number, b: number): Color;

    interface Color {
        alpha(a?: number): Color;
        darken(f?: number): Color;
        brighten(f?: number): Color;
        /**
         * Returns an array with the red, green, and blue component, each as
         * number within the range 0..255. Chroma internally stores RGB
         * channels as floats but rounds the numbers before returning them.
         * You can pass false to prevent the rounding.
         *
         * @example
         * chroma('orange').rgb() === [255,165,0]
         * chroma('orange').darken().rgb() === [198,118,0]
         * chroma('orange').darken().rgb(false) === [198.05,118.11,0]
         */
        rgb: (round?: boolean) => number[];
        /**
         * Just like color.rgb but adds the alpha channel to the returned array.
         *
         * @example
         * chroma('orange').rgba() === [255,165,0,1]
         * chroma('hsla(20, 100%, 40%, 0.5)').rgba() === [204,68,0,0.5]
         */
        rgba: (round?: boolean) => number[];
    }
}