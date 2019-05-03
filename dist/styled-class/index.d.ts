declare module "styled-class" {
    export interface IStyleClass {
        ele?: HTMLStyleElement;
        clazz: Function;
        className: string;
    }
    export function styled(target: any): void;
    export function setStyleInitor(fn: (data: IStyleClass) => void): void;
    export function refreshStyle(styleClass: IStyleClass): void;
    export function objectToCssText(prefix: string, obj: any): string[];
    export interface IRule {
        rules: any;
        filters: any;
        needLayout: boolean;
        hasLayout: boolean;
    }
    export function oneObjectToCssRules(obj: any): string[];
    export function dealCssProperty(key: string): string;
    export class Cover {
        src: string;
    }
    export function cover(url: URL): Cover;
    export class Gradient {
        start: number[];
        end: number[];
        toRight: boolean;
    }
    export function gradient(start: IColor | number, end: IColor | number, toRight?: boolean): Gradient;
    export interface IColor {
        rgb: () => number[];
        rgba: () => number[];
    }
}
