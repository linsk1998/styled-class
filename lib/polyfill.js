//下面polyfill仅供参考
if(!Array.isArray){
	Array.isArray=function(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	};
}
if(!Array.from){
	Array.from=function(arrayLike,mapFn,thisArg){
		var arr;
		try{
			arr=Array.prototype.slice.call(arrayLike);
		}catch(e){
			arr=new Array();
			for(var i=0;i<arrayLike.length;i++){
				arr.push(arrayLike[i]);
			}
		}
		if(mapFn){
			arr=arr.map( mapFn, thisArg);
		}
		return arr;
	};
}
if(!Array.prototype.forEach){
	Array.prototype.forEach =function(callback, thisArg){
		var len=this.length;
		for(var i=0,j;i<len && i<this.length; i++){
			j=this[i];
			callback.call(thisArg,j,i,this);
		}
	};
}
if(!Array.prototype.map){
	Array.prototype.map = function(fn, context) {
		var arr = [];
		for (var k = 0, length = this.length; k < length; k++) {
			arr.push(fn.call(context, this[k], k, this));
		}
		return arr;
	};
}
if(!Object.keys){
	Object.keys=function(obj){
		var result=[];
		for(var key in obj){
			result.push(key);
		}
		return result;
	};
}
if (!Object.is){
	Object.is=function(x, y){
		if(x===y){// Steps 1-5, 7-10
			// Steps 6.b-6.e: +0 != -0
			return x!==0 || 1/x===1/y;
		}else{
			// Step 6.a: NaN == NaN
			return x!==x && y!==y;
		}
	};
}
if(!Object.assign){
	Object.assign=function(target, varArgs){
		if(target==null){
			throw 'Cannot convert undefined or null to object';
		}
		var to=Object(target);
		for(var i=1;i<arguments.length;i++){
			var obj=arguments[i];
			if(obj!=null){
				for(var k in obj){
					var v=obj[k];
					to[k]=v;
				}
			}
		}
		return target;
	};
}
if(!String.prototype.includes){
	String.prototype.includes=function(search,start){
		return this.indexOf(search, start)!==-1;
	};
}
if(!String.prototype.repeat){
	String.prototype.repeat=function(count){
		if(count<0){
			throw 'RangeError repeat count must be non-negative';
		}
		if(count==Number.POSITIVE_INFINITY){
			throw 'RangeError repeat count must be less than infinity';
		}
		return new Array(count+1).join(this);
	};
}
if(!String.prototype.padStart){
	String.prototype.padStart=function(targetLength,padString){
		var x=targetLength-this.length;
		if(x<0) return this+"";
		if(!padString) padString=" ";
		return padString.repeat(Math.ceil(x/padString.length)).substr(0,x)+this;
	};
}
if(!Function.prototype.bind){
	Function.prototype.bind=function(context){
		var self=this,args=Array.prototype.slice.call(arguments,1);
		return function(){
			return self.apply(context,args.concat(Array.from(arguments)));
		};
	};
}
if(!this.Map){
	Map=function(){
		this.data=[];
	};
	Map.prototype.set=function(key,value){
		var i=this.data.length;
		while(i--){
			var item=this.data[i];
			if(item[0]==key){
				item[1]=value;
				return ;
			}
		}
		this.data.push([key,value]);
	};
	Map.prototype.get=function(key){
		var i=this.data.length;
		while(i--){
			var item=this.data[i];
			if(item[0]==key){
				return value;
			}
		}
	};
}
if(!document.head){
	document.head=document.getElementsByTagName("head")[0];
}
if(!Object.getPrototypeOf){
	Object.getPrototypeOf=function(obj){
		return obj.constructor.prototype;
	};
}
var URL=function(href){
	return {
		href:href
	};
};