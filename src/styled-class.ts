

export interface IStyleClass{
	ele?:HTMLStyleElement;
	clazz:Function;
	className:string;
}
var styleInitor=refreshStyle;
var index=0;
export function styled(target) {
	var styleClass:IStyleClass={
		clazz:target,
		className:"scope"+(index++)
	};
	target.toString=function(){
		if(!styleClass.ele){
			var style=document.createElement('style');
			style.type='text/css';
			document.head.appendChild(style);
			styleClass.ele=style;
			styleInitor(styleClass);
		}
		return styleClass.className;
	};
}
export function setStyleInitor(fn:(data:IStyleClass)=>void){
	styleInitor=fn;
}
function setCssText(style:any,cssText:string){
	if(style.styleSheet){//IE
		style.styleSheet.cssText=cssText;
	}else{//w3c
		if(style.firstChild){
			style.firstChild.data=cssText
		}else{
			var textNode=document.createTextNode(cssText);
			style.appendChild(textNode);
		}
	}
}
export function refreshStyle(styleClass:IStyleClass){
	var obj=new (styleClass.clazz as any)();
	var cssText=objectToCssText("."+styleClass.className,obj).join("\n");
	setCssText(styleClass.ele,cssText);
}
export function objectToCssText(prefix:string,obj:any):string[]{
	var cssTexts=[];
	var myobj={};
	for(var key in obj){
		var value=obj[key];
		if((value instanceof Object) && Object.getPrototypeOf(value)===Object.prototype){
			cssTexts.push.call(cssTexts,objectToCssText(prefix+" "+key,value));
		}else{
			myobj[key]=value;
		}
	}
	cssTexts.unshift(ruleToString(prefix,oneObjectToCssRules(myobj)));
	return cssTexts;
}
export interface IRule{
	rules:any;
	filters:any;
	needLayout:boolean;
	hasLayout:boolean;
}
export function oneObjectToCssRules(obj):string[]{//特殊样式有 Transform background
	var r:IRule={
		rules:obj,
		filters:[],
		needLayout:false,
		hasLayout:false
	};
	var result=Object.keys(obj).map(dealCssProperty,r);
	if(!window.atob){
		if(r.filters.length){
			r.needLayout=true;
			result.push("filter:"+r.filters.join(" "));
		}
	}
	if(r.needLayout){
		if(!r.hasLayout){
			r.hasLayout=true;
			result.push("zoom:1");
		}
	}
	return result;
}
function ruleToString(prefix,rules){
	return prefix+"{"+rules.join("; ")+"}";
}

export function dealCssProperty(key:string){
	var value=this.rules[key];
	key=key.replace(/[A-Z]/,camel2dash);
	if(key=="display" && value=="inline-block"){
		if(!document.querySelector){
			this.needLayout=true;
			return "display:inline-block;*display:inline";
		}
	}
	if(key=="background"){
		if(value.rgba){
			var rgba=value.rgba();
			if(window.addEventListener){
				return "background:"+toRGBAString(rgba);
			}
			if(rgba[3]<1){
				var background=toARGBHexString(rgba);
				this.filters.push("progid:DXImageTransform.Microsoft.gradient(startcolorstr="+background+",endcolorstr="+background+");");
				return ;
			}
		}else if(value instanceof Gradient){
			var start,end,avg=mix(value.start,value.end);
			if(window.atob){
				start=toRGBAString(value.start);
				end=toRGBAString(value.end);
				return "background:"+avg.toString()+";"
				+"background:-webkit-gradient(linear,"+(value.toRight?"left":"top")+","+(value.toRight?"right":"bottom")+",from("+start+"), to("+end+"));"
				+"background:-webkit-linear-gradient("+(value.toRight?"left":"top")+","+start+","+end+");"
				+"background:-moz-linear-gradient("+(value.toRight?"left":"top")+","+start+","+end+");"
				+"background:-o-linear-gradient("+(value.toRight?"left":"top")+","+start+","+end+");"
				+"background:linear-gradient("+(value.toRight?"to right":"to bottom")+","+start+","+end+");";
			}else{
				start=toARGBHexString(value.start);
				end=toARGBHexString(value.end);
				this.filters.push("progid:DXImageTransform.Microsoft.gradient(startcolorstr="+start+",endcolorstr="+end+");");
				return ;
			}
		}else if(value instanceof Cover){
			if(window.addEventListener){
				return "background:url("+value.src+") no-repeat center center;\n"
				+"-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;";
			}else{
				this.filters.push("progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+value.src+"',sizingMethod='scale');");
			}
		}else if(value<=0xffffff){
			return "background:#"+value.toString(16).padStart(6,"0");
		}
	}else if(key.includes("color")){
		if(value<=0xffffff){
			value="#"+value.toString(16).padStart(6,"0");
		}
	}
	switch(key){
		case "box-shadow":
		case "border-radius"://-webkit -moz
		case "column-count":
			return "-moz-"+key+":"+value+";-webkit-"+key+":"+value+";"+key+":"+value;
		case "text-overflow"://-o-
			return "-o-"+key+":"+value+";"+key+":"+value;
		case "text-stroke"://-webkit
		case "filter":
			return "-webkit-"+key+":"+value+";"+key+":"+value;
		case "opacity":
			if(!window.addEventListener){
				this.filters.push("progid:DXImageTransform.Microsoft.Alpha(opacity="+(value*100)+")");
			}
			return "-moz-"+key+":"+value+";-webkit-"+key+":"+value+";"+key+":"+value;
		case "zoom":
			this.hasLayout=true;
			break ;
	}
	return key+":"+value.toString();
}
function camel2dash(str:string){
	return "-"+str.toLowerCase();
}
export class Cover{
	src:string;
}
export function cover(url:URL){
	var bg=new Cover();
	bg.src=url.href;
	return bg;
}
export class Gradient{
	start:number[];
	end:number[];
	toRight:boolean;
}
export function gradient(start:IColor|number,end:IColor|number,toRight?:boolean):Gradient{
	var g=new Gradient();
	g.start=(start as IColor).rgba?(start as IColor).rgba():num2rgba(start as number);
	g.end=(end as IColor).rgba?(end as IColor).rgba():num2rgba(end as number);
	g.toRight=toRight;
	return g;
}
export interface IColor{
	rgb:()=>number[];
	rgba:()=>number[];
}
function toRGBAString(rgba:number[]){
	return "rgba("+rgba.join(",")+")";
}
function toARGBHexString(rgba:number[]){
	var num=(
		(rgba[0]*0x10000) |
		(rgba[1]*0x100) |
		rgba[2]
	);
	return "#"+Math.round(rgba[3]*255).toString(16).padStart(2,"0")+num.toString(16).padStart(6,"0");
}
function mix(rgba1:number[],rgba2:number[]){
	var rgba=new Array(4);
	var ta=rgba1[3]+rgba2[3];
	rgba[3]=ta/2;
	var i=3
	while(i-->0){
		rgba[i]=rgba1[i]*rgba1[3]/ta+rgba2[i]*rgba[3]/ta;
	}
	return rgba;
}
function num2rgba(num:number){
	var r = num >> 16;
	var g = (num >> 8) & 0xFF;
	var b = num & 0xFF;
	return [r,g,b,1];
}