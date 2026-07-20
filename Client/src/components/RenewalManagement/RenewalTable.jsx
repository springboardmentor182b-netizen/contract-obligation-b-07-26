import { Trash2, Pencil } from "lucide-react";


const getBadge = (status) => {

  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-green-100 text-green-700",
  };


  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${styles[status] || "bg-gray-100 text-gray-700"}
      `}
    >
      {status}
    </span>
  );

};



const formatDate = (date) => {

  if (!date) return "-";

  return new Date(date).toLocaleDateString();

};



const RenewalTable = ({
  renewals = [],
  loading = false,
  refresh,
}) => {



const deleteRenewal = async (id) => {


  const confirmDelete = window.confirm(
    "Are you sure you want to delete this renewal?"
  );


  if (!confirmDelete) return;


  try {


    const response = await fetch(
      `http://127.0.0.1:8000/renewals/${id}`,
      {
        method:"DELETE",
      }
    );


    if(!response.ok){
      throw new Error("Delete failed");
    }


    if(refresh){
      refresh();
    }


  } catch(error){

    console.error(error);

    alert("Unable to delete renewal.");

  }


};




if(loading){

return (

<div
 className="
  rounded-xl
  bg-white
  border
  p-8
  text-center
 "
>
 Loading renewals...
</div>

);

}




return (

<div
 className="
  w-full
  rounded-xl
  bg-white
  border
  border-gray-200
  overflow-hidden
 "
>


{/* Header */}

<div
 className="
  flex
  items-center
  justify-between
  px-6
  py-4
  border-b
 "
>

<h2
 className="
 text-lg
 font-semibold
 text-gray-800
 "
>
 Renewal History
</h2>


</div>




<div className="overflow-x-auto">


<table
 className="
 w-full
 text-sm
 "
>


<thead
 className="
 bg-gray-50
 text-gray-600
 "
>

<tr>

<th className="px-6 py-3 text-left font-medium">
ID
</th>

<th className="px-6 py-3 text-left font-medium">
Contract ID
</th>

<th className="px-6 py-3 text-left font-medium">
Renewal Date
</th>

<th className="px-6 py-3 text-left font-medium">
Reminder Date
</th>

<th className="px-6 py-3 text-left font-medium">
Status
</th>

<th className="px-6 py-3 text-left font-medium">
Approved By
</th>

<th className="px-6 py-3 text-left font-medium">
Notes
</th>

<th className="px-6 py-3 text-center font-medium">
Actions
</th>


</tr>

</thead>





<tbody>


{
renewals.length > 0 ?


renewals.map((item)=>(


<tr
key={item.id}
className="
border-t
hover:bg-gray-50
transition
"
>


<td className="px-6 py-4 font-medium">
{item.id}
</td>


<td className="px-6 py-4">
{item.contract_id}
</td>


<td className="px-6 py-4">
{formatDate(item.renewal_date)}
</td>


<td className="px-6 py-4">
{formatDate(item.reminder_date)}
</td>


<td className="px-6 py-4">
{getBadge(item.renewal_status)}
</td>


<td className="px-6 py-4">
{item.approved_by || "-"}
</td>


<td className="px-6 py-4 max-w-xs truncate">
{item.notes || "-"}
</td>



<td className="px-6 py-4">

<div
className="
flex
justify-center
gap-4
"
>


<button
className="
text-blue-600
hover:text-blue-800
"
>
<Pencil size={18}/>
</button>



<button
className="
text-red-600
hover:text-red-800
"
onClick={()=>deleteRenewal(item.id)}
>
<Trash2 size={18}/>
</button>


</div>

</td>



</tr>


))


:

<tr>

<td
colSpan="8"
className="
px-6
py-8
text-center
text-gray-500
"
>
No renewals found.
</td>

</tr>


}



</tbody>


</table>


</div>


</div>


);


};


export default RenewalTable;