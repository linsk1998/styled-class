
import {styled} from "styled-class";

class BoxStyle{
	display="inline-block";
	margin="20px";
	padding="20px";
}
@styled
export class Div1Style extends BoxStyle{
	background="red";
	h3={
		color:"white"
	};
}

@styled
export class Div2Style extends BoxStyle{
	background="blue";
	h3={
		color:"tomato"
	};
}


document.getElementById("div1").className=Div1Style.toString();
document.getElementById("div2").className=Div2Style as any;