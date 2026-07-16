import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export function exportPDF(data){

const doc=new jsPDF();

doc.text("Obligation Report",10,12);

autoTable(doc,{

head:[["ID","Title","Department","Owner","Status"]],

body:data.map(item=>

[

item.id,

item.title,

item.department,

item.owner,

item.status

]

)

});

doc.save("Obligations.pdf");

}
