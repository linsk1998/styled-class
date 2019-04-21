# styled-class是一个CSS-in-JS库
### 为什么要在JavaScript里写CSS？

1. 避免全局污染
2. 条件和动态样式（比如选择主题色之类的）
3. 在框架层面进行限制或补充（比如补全供应商前缀），避免业务人员使用奇技淫巧

### styled-class的基本用法

```javascript
import {styled} from "styled-class";

@styled
class Div1Style{
	background="red";
}
export function DemoComponent(){
	return <div className={Div1Style.toString()}>...这是一个组件</div>
}
```

使用styled装饰器，会生成的唯一class名称，自动创建相关style标签，并修改toString函数。toString()可以省略，会自动调用。
[查看演示](http://raw.githack.com/linsk1998/styled-class/mobx/index.html "查看演示")

### 结合mobx使用

```javascript
import {styled,rgb,hsl,darken,lighten} from "styled-class";
import {observable, computed} from "mobx";

//主题色，用mobx监视
class Theme{
	@observable//主题色
	primary=rgb(51,122,183);
	 
	@computed//主题色-浅色
	get text(){
		return lighten(this.primary,0.15);
	}
}
var theme=new Theme();

@styled
export class PanelStyle{
	background=theme.primary;
	color=theme.text;
}
export function DemoComponent(){
	return <div className={PanelStyle.toString()} onClick={changeTheme}>...这是一个组件</div>
}
function changeTheme(){//使用mobx监视，primary改变时，自动更新样式
	theme.primary=hsl(360*Math.random(),0.55,0.45);//hsl 色相 饱和度 亮度
}
```

[查看演示](http://raw.githack.com/linsk1998/styled-class/mobx/index.html "查看演示")

### 可以使用类的继承来复用样式

```javascript
import {styled} from "styled-class";

class BoxStyle{
	display="inline-block";
	margin="20px";
	padding="20px";
}
@styled
export class Div1Style extends BoxStyle{
	background="red";
}
@styled
export class Div2Style extends BoxStyle{
	background="blue";
}
```

[查看演示](http://raw.githack.com/linsk1998/styled-class/mobx/index.html "查看演示")

### 可以和Less、Sass等预处理器同时使用

直接使用预处理器编译完成的即可。
```javascript
xxx.className=MyStyle.toString()+" clearfix";
```

### 内置了常用的颜色计算函数
```javascript
import {styled,rgb,rgba,hsl,darken,lighten,mix,saturate,spin} from "styled-class";

var a=rgba(255,255,255,1);
var b=mix(rgba(100,100,100,1),0xc8c8c8);
```

### 可处理常用的兼容性问题和浏览器补全

```javascript
@styled
export class Div1Style extends BoxStyle{
    background=rgba(0,0,0,0.5);
}
```

[查看演示](http://javascript.sky.hm/linsk1998/styled-class/compat/index.html "查看演示")