import * as React from "react";
import * as ReactDOM from "react-dom";

import {styled,gradient,cover} from "styled-class";
import {rgba} from "color";
import {rgb} from "chroma";

@styled
class InineBlock{
	display="inline-block";
	margin="20px";
	padding="20px";
	background="#99aacc";
}
@styled
class OpacityExample{
	color="white";
	margin="20px";
	padding="20px";
	opacity=0.5;
	background="black";
}
@styled
class RGBAExample{
	color="white";
	margin="20px";
	padding="20px";
	background=rgba(0,0,0,0.5);
}
@styled
class GradientExample{
	color=0xffffff;
	margin="20px";
	padding="20px";
	background=gradient(0x3388ff,rgba(0,0,0,0.8));
}
@styled
class CoverExample{
	color=rgb(255,255,255);
	width="600px";
	height="300px";
	background=cover(new URL("http://www.w3school.com.cn/i/eg_tulip.jpg"));
}
ReactDOM.render(<div className="container">
	<h1>inline-block</h1>
	<div className={InineBlock as any}>inline-block</div>
	<div className={InineBlock as any}>inline-block</div>
	<div className={InineBlock as any}>inline-block</div>
	<div className={InineBlock as any}>inline-block</div>
	<h1>opacity</h1>
	<div className={OpacityExample as any}>opacity:0.5</div>
	<h1>background:rgba()</h1>
	<div className={RGBAExample as any}>background:rgba(0,0,0,0.5)</div>
	<h1>background:gradient()</h1>
	<div className={GradientExample as any}>background:gradient(0x3388ff,rgba(0,0,0,0.8))</div>
	<h1>background:cover()</h1>
	<div className={CoverExample as any}>background:cover(url)</div>
</div>,document.body);