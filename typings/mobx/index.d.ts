
declare module "mobx"{
	export function autorun(fn:()=>void):()=>void;
	export function observable(target:any, propertyKey:string);
	export function computed(target:any, propertyKey:string);
	export function action (target, propertyKey, descriptor);
	export namespace action{
		function bound(target, propertyKey, descriptor);
	}
}