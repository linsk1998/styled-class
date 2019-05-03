//==============================================================
//转化方法
var TWOPI=2*Math.PI;
var PITHIRD=Math.PI/3;
var RAD2DEG=180/Math.PI;
var DEG2RAD=Math.PI/180;
export function rgb2cmyk(r,g,b){
	r=r/255;
	g=g/255;
	b=b/255;
	var k=1-Math.max(r,Math.max(g,b));
	var f=k<1?1/(1-k):0;
	var c=(1-r-k)*f;
	var m=(1-g-k)*f;
	var y=(1-b-k)*f;
	return [c,m,y,k];
}
export function cmyk2rgb(c,m,y,k){
	if(k===1){return new Array(0,0,0);}
	return [
		c>=1?0:255*(1-c)*(1-k), // r
		m>=1?0:255*(1-m)*(1-k), // g
		y>=1?0:255*(1-y)*(1-k) // b
	];
}
export function rgb2hsl(r,g,b){
	r/=255;
	g/=255;
	b/=255;

	var min=Math.min(r,g,b);
	var max=Math.max(r,g,b);

	var l=(max+min)/2;
	var s,h;

	if(max===min){
		s=0;
		h=NaN;
	}else{
		s=l<0.5?(max-min)/(max+min):(max-min)/(2-max-min);
	}

	if(r==max){h=(g-b)/(max-min);}
	else if(g==max){h=2+(b-r)/(max-min);}
	else if(b==max){h=4+(r-g)/(max-min);}

	h*=60;
	if(h<0){h+=360;}
	return [h,s,l];
}
export function hsl2rgb(h,s,l){
	var r,g,b;
	if(s===0){
		r=g=b=l*255;
	}else{
		var t3=[0,0,0];
		var c=[0,0,0];
		var t2=l<0.5?l*(1+s):l+s-l*s;
		var t1=2*l-t2;
		var h_=h/360;
		t3[0]=h_+1/3;
		t3[1]=h_;
		t3[2]=h_-1/3;
		for(var i=0;i<3;i++){
			if(t3[i]<0){t3[i]+=1;}
			if(t3[i]>1){t3[i]-=1;}
			if(6*t3[i]<1){
				c[i]=t1+(t2-t1)*6*t3[i];
			}else if(2*t3[i]<1){
				c[i]=t2;
			}else if(3*t3[i]<2){
				c[i]=t1+(t2-t1)*((2/3)-t3[i])*6;
			}else{
				c[i]=t1;
			}
		}
		r=c[0]*255; g=c[1]*255; b=c[2]*255;
	}
	return [r,g,b];
}
export function rgb2hsi(r,g,b){
	r/=255;
	g/=255;
	b/=255;
	var h;
	var min_=Math.min(r,g,b);
	var i=(r+g+b)/3;
	var s=i>0?1-min_/i:0;
	if(s===0){
		h=NaN;
	}else{
		h=((r-g)+(r-b))/2;
		h/=Math.sqrt((r-g)*(r-g)+(r-b)*(g-b));
		h=Math.acos(h);
		if(b>g){
			h=TWOPI-h;
		}
		h/=TWOPI;
	}
	return [h*360,s,i];
}
export function hsi2rgb(h,s,i){
	var r,g,b;
	if(isNaN(h)){h=0;}
	if(isNaN(s)){s=0;}
	h%=360
	h/=360;
	if(h<1/3){
		b=(1-s)/3;
		r=(1+s*Math.cos(TWOPI*h)/Math.cos(PITHIRD-TWOPI*h))/3;
		g=1-(b+r);
	}else if(h<2/3){
		h-=1/3;
		r=(1-s)/3;
		g=(1+s*Math.cos(TWOPI*h)/Math.cos(PITHIRD-TWOPI*h))/3;
		b=1-(r+g);
	} else {
		h-=2/3;
		g=(1-s)/3;
		b=(1+s*Math.cos(TWOPI*h)/Math.cos(PITHIRD-TWOPI*h))/3;
		r=1-(g+b);
	}
	r=clamp(i*r*3);
	g=clamp(i*g*3);
	b=clamp(i*b*3);
	return [r*255,g*255, b*255];
}
export function hsv2rgb(h,s,v){
	var r,g,b;
	v*=255;
	if(s===0){
		r=g=b=v;
	}else{
		if(h===360){h=0;}
		if(h>360){h-=360;}
		if(h<0){h+=360;}
		h/=60;
		var i=Math.floor(h);
		var f=h-i;
		var p=v*(1-s);
		var q=v*(1-s*f);
		var t=v*(1-s*(1-f));

		switch(i){
			case 0:r=v; g=t; b=p; break ;
			case 1:r=q; g=v; b=p; break ;
			case 2:r=p; g=v; b=t; break ;
			case 3:r=p; g=q; b=v; break ;
			case 4:r=t; g=p; b=v; break ;
			case 5:r=v; g=p; b=q; break ;
		}
	}
	return [r,g,b];
}
export function rgb2hsv(r,g,b){
	var min_=Math.min(r,g,b);
	var max_=Math.max(r,g,b);
	var delta=max_-min_;
	var h,s,v;
	v=max_/255.0;
	if(max_===0){
		h=NaN;
		s=0;
	}else{
		s=delta/max_;
		if(r===max_){h=(g-b)/delta;}
		if(g===max_){h=2+(b-r)/delta;}
		if(b===max_){h=4+(r-g)/delta;}
		h*=60;
		if(h<0){h+=360;}
	}
	return [h,s,v];
}
var labConstants = {
	Kn:18,
	Xn:0.950470,
	Yn:1,
	Zn:1.088830,
	t0:0.137931034,  // 4 / 29
	t1:0.206896552,  // 6 / 29
	t2:0.12841855,   // 3 * t1 * t1
	t3:0.008856452,  // t1 * t1 * t1
};
function rgb_xyz(r) {
	if(r<=0.04045){ return r/12.92;}
	return Math.pow((r+0.055)/1.055,2.4);
}
function xyz_lab(t){
	if(t>labConstants.t3){ return Math.pow(t,1/3);}
	return t/labConstants.t2+labConstants.t0;
}
export function rgb2xyz(r,g,b) {
	r=rgb_xyz(r);
	g=rgb_xyz(g);
	b=rgb_xyz(b);
	var x=xyz_lab((0.4124564*r+0.3575761*g+0.1804375*b)/labConstants.Xn);
	var y=xyz_lab((0.2126729*r+0.7151522*g+0.0721750*b)/labConstants.Yn);
	var z=xyz_lab((0.0193339*r+0.1191920*g+0.9503041*b)/labConstants.Zn);
	return [x,y,z];
}
export function rgb2lab(r,g,b){
	var xyz=rgb2xyz(r/255,g/255,b/255);
	var x=xyz[0];
	var y=xyz[1];
	var z=xyz[2];
	var l=116*y-16;
	return [Math.max(0,l),500*(x-y),200*(y-z)];
}
function xyz_rgb(r){
	return r<=0.00304?12.92*r:1.055*Math.pow(r,1/2.4)-0.055;
}
function lab_xyz(t){
	return t>labConstants.t1?t*t*t:labConstants.t2*(t-labConstants.t0);
}
export function lab2rgb(l,a,b){
	var x,y,z,r,g,b_;
	y=(l+16)/116;
	x=isNaN(a)?y:y+a/500;
	z=isNaN(b)?y:y-b/200;
	y=labConstants.Yn*lab_xyz(y);
	x=labConstants.Xn*lab_xyz(x);
	z=labConstants.Zn*lab_xyz(z);
	r=xyz_rgb(3.2404542*x-1.5371385*y-0.4985314*z);  // D65 -> sRGB
	g=xyz_rgb(-0.9692660*x+1.8760108*y+0.0415560*z);
	b_=xyz_rgb(0.0556434*x-0.2040259*y+1.0572252*z);
	return [255*r,255*g,255*b_];
}
export function lab2lch(l,a,b){
	var c=Math.sqrt(a*a+b*b);
	var h=(Math.atan2(b,a)*RAD2DEG+360)%360;
	if(Math.round(c*10000)===0){h=NaN;}
	return [l,c,h];
}
export function rgb2lch(r,g,b){
	var lab=rgb2lab(r,g,b);
	return lab2lch.apply(this,lab);
}
export function lch2lab(l,c,h){
	if(isNaN(h)){ h=0;}
	h=h*DEG2RAD;
	return [l,Math.cos(h)*c,Math.sin(h)*c];
}
export function lch2rgb(l,c,h){
	var lab=lch2lab(l,c,h);
	return lab2rgb.apply(this,lab);
}
export function hsy2rgb(h:number,s:number,y:number){
	var hi=Math.floor(h/60);
	var f=h/60-hi;
	var p:number[];
	switch(hi){
		case 0: p=new Array(1,f,0); break ;
		case 1: p=new Array(1-f,1,0); break ;
		case 2: p=new Array(0,1,f); break ;
		case 3: p=new Array(0,1-f,1); break ;
		case 4: p=new Array(f,0,1); break ;
		case 5: p=new Array(1,0,1-f); break ;
	}
	var py=0.299*p[0]+0.587*p[1]+0.114*p[2];
	var maxs;
	if(py===y){
		return p;
	}else if(y<py){
		maxs=y/py;
	}else{
		maxs=(1-y)/(1-py);
	}
	s=Math.min(s,maxs);
	var r=py*s+(1-s)*p[0]+y-py;
	var g=py*s+(1-s)*p[1]+y-py;
	var b=py*s+(1-s)*p[2]+y-py;
	return [clamp(r)*255,clamp(g)*255,clamp(b)*255];
}
export function rgb2hsy(r:number,g:number,b:number){
	r/=255; g/=255; b/=255;
	var max=Math.max(r,g,b), min=Math.min(r,g,b);
	var h,s,y;
	s=max-min;
	y=0.299*r+0.587*g+0.114*b;
	if(s===0){
		h=0;
	}else{
		switch(max){
			case r: h=(g-b)/s+(g<b?6:0); break;
			case g: h=(b-r)/s+2; break;
			case b: h=(r-g)/s+4; break;
		}
		h/=6;
	}
	return [h*360,s,y];
}
export function hcl2rgb(h:number,c:number,l:number){
	var hi=Math.floor(h/60);
	var f=h/60-hi;
	var p:number[];
	switch(hi){
		case 0: p=new Array(1,f,0); break ;
		case 1: p=new Array(1-f,1,0); break ;
		case 2: p=new Array(0,1,f); break ;
		case 3: p=new Array(0,1-f,1); break ;
		case 4: p=new Array(f,0,1); break ;
		case 5: p=new Array(1,0,1-f); break ;
	}
	var plch=rgb2lch(p[0]*255,p[1]*255,p[2]*255);
	return lch2rgb(l*100,plch[1]*c,plch[2]);
}
function clamp(val) {
	return Math.min(1,Math.max(0,val));
}
function clampN(val,n) {
	return Math.min(n,Math.max(0,val));
}
//****颜色类********************************* */
export class Color{
	_rgb:number[];
	constructor(r:number,g:number,b:number,a:number){
		this._rgb=Array.from(arguments);
	}
	alpha():number{
		return this._rgb[3];
	}
	rgb():number[]{
		var rgb=this._rgb;
		return [clampN(Math.round(rgb[0]),255),clampN(Math.round(rgb[1]),255),clampN(Math.round(rgb[2]),255)];
	}
	rgba():number[]{
		var r=this.rgb();
		r.push(this._rgb[3]);
		return r;
	}
	num():number{
		var channels=this.rgb();
		return (
			(channels[0]*0x10000) |
			(channels[1]*0x100) |
			channels[2]
		);
	}
	hex(){
		return "#"+this.num().toString(16).padStart(6,"0");
	}
	toString(){
		return this.hex();
	}
	blacken(amount:number){
		amount=1-amount;
		var r=this._rgb[0]*amount;
		var g=this._rgb[1]*amount;
		var b=this._rgb[2]*amount;
		return new Color(r,g,b,this._rgb[3]);
	}
	whiten(amount:number){
		amount=1-amount;
		var r=255-this._rgb[0];
		var g=255-this._rgb[1];
		var b=255-this._rgb[2];
		return new Color(255-r*amount,255-g*amount,255-b*amount,this._rgb[3]);
	}
	brighten(amount:number){
		var hsl=rgb2hsl.apply(this,this._rgb);
		var l=hsl[2]+amount;
		l=Math.min(l,1);
		return hsla(hsl[0],hsl[1],l,this._rgb[3]);
	}
	darken(amount:number){
		var hsl=rgb2hsl.apply(this,this._rgb);
		var l=hsl[2]-amount;
		l=Math.max(l,0);
		return hsla(hsl[0],hsl[1],l,this._rgb[3]);
	}
	spin(deg:number){
		var lch=rgb2lch.call(this,this._rgb);
		return lcha(lch[0],lch[1],lch[2],this._rgb[3]);
	}
}
export function rgb(r,b,g){
	return new Color(r,b,g,1);
}
export function rgba(r,b,g,a){
	return new Color(r,b,g,a);
}
export function hsl(h,s,l){
	var rgb=hsl2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function hsla(h,s,l,a){
	var rgb=hsl2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],a);
}
export function hsv(h,s,v){
	var rgb=hsv2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function hsi(h,s,i){
	var rgb=hsi2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function hsy(h,s,y){
	var rgb=hsy2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function lab(l,a,b){
	var rgb=lab2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function lch(l,c,h){
	var rgb=lch2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function lcha(l,c,h,a){
	var rgb=lch2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],a);
}
export function hcl(h,l,c){
	var rgb=hcl2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],1);
}
export function hcla(h,l,c,a){
	var rgb=hcl2rgb.apply(this,arguments);
	return new Color(rgb[0],rgb[1],rgb[2],a);
}