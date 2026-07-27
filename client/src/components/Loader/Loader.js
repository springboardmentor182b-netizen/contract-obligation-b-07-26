import { Circles } from "react-loader-spinner";

import { jsx as _jsx } from "react/jsx-runtime";
function Loader() {
	return /* @__PURE__ */ _jsx("div", {
		style: {
			display: "flex",
			justifyContent: "center",
			padding: "30px"
		},
		children: /* @__PURE__ */ _jsx(Circles, {
			height: "80",
			width: "80",
			color: "#2563EB"
		})
	});
}


function Loader(){

return(

<div
style={{
display:"flex",
justifyContent:"center",
padding:"30px"
}}
>

<Circles

height="80"

width="80"

color="#2563EB"

/>

</div>

);

}


export default Loader;
