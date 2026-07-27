import { Circles } from "react-loader-spinner";

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
