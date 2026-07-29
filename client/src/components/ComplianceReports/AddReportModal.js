import "./AddReportModal.css";

import {useState} from "react";

import {
createReport
}
from "../../api/reportApi";



function AddReportModal({close,refresh}){


const [form,setForm]=useState({

title:"",
department:"",
status:"Ready",
file_size:"1 MB",
generated_date:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const submit=async()=>{


await createReport(form);


refresh();

close();


};




return(


<div className="modal-overlay">


<div className="report-modal">


<h2>
Generate Report
</h2>



<input

name="title"

placeholder="Report Title"

onChange={handleChange}

/>




<input

name="department"

placeholder="Department"

onChange={handleChange}

/>




<select

name="status"

onChange={handleChange}

>


<option>
Ready
</option>

<option>
Processing
</option>

<option>
Draft
</option>


</select>





<input

name="file_size"

placeholder="File Size"

onChange={handleChange}

/>




<input

type="date"

name="generated_date"

onChange={handleChange}

/>





<div className="modal-buttons">


<button

className="save-btn"

onClick={submit}

>

Generate

</button>



<button

className="cancel-btn"

onClick={close}

>

Cancel

</button>



</div>



</div>


</div>


);


}


export default AddReportModal;
