function Loader(){

return(

<div
style={{
display:"flex",
justifyContent:"center",
padding:"30px"
}}
>

<span
aria-label="Loading"
style={{
width:"38px",
height:"38px",
border:"4px solid #dbeafe",
borderTopColor:"#2563EB",
borderRadius:"50%",
animation:"spin 0.8s linear infinite"
}}
/>

</div>

);

}

export default Loader;
