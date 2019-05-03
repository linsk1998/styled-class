

import {styled,refreshStyle,setStyleInitor} from "styled-class";
import {rgb,hsl,hcl} from "color";
import {observable, autorun, computed, action} from "mobx";

//配置，初始化时用mobx收集依赖，有改变时自动更新样式
setStyleInitor(function(data){
	autorun(function(){
		refreshStyle(data);
	});
});
//主题色，用mobx监视
class Theme{
	@observable//主题色
	primary=rgb(0x33,0x7a,0xb7);

	@computed//主题色-深色
	get darkPrimary(){
		return this.primary.darken(0.15);
	}
	@computed//主题色-浅色
	get lightPrimary(){
		return this.primary.brighten(0.15);
	}
	@observable//标题色
	caption=rgb(0xff,0xff,0xff);

	@observable//文本色
	text=rgb(0x33,0x33,0x33);

	@observable//突出色
	accent=rgb(0x60,0x7D,0x8B);

	@observable//分割线色
	divider=rgb(0xcc,0xcc,0xcc);
}
var theme=new Theme();

@styled
export class PanelStyle{
	display="inline-block";
	width="400px";
	color=theme.text;
	border="1px solid "+theme.divider.toString();
	header={
		background:theme.darkPrimary,
		color:theme.caption,
		textAlign:"left"
	};
	h3={
		background:theme.primary,
		color:theme.caption,
		marginTop:0
	};
	button={
		background:theme.primary,
		border:"1px solid "+theme.darkPrimary.toString(),
		color:theme.caption
	};
}
document.getElementById("div1").className=PanelStyle.toString();
document.getElementById("themeBtn").onclick=function(){
	theme.primary=hcl(360*Math.random(),0.6, 0.5);//hsy 色相 饱和度 亮度
};
