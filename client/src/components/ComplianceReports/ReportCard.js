import "./ReportCard.css";


import {

DocumentTextIcon,
EyeIcon,
ArrowDownTrayIcon,
TableCellsIcon

} from "@heroicons/react/24/outline";



function ReportCard({

id,
title,
department,
generated,
size,
status,
onPreview,
onPDF,
onExcel

}) {



const statusClass =
status?.toLowerCase();



return (


<div className="report-card">



    <div className="report-left">


        <div className="report-icon">


            <DocumentTextIcon />


        </div>




        <div className="report-info">


            <div className="report-title-row">


                <h3>
                    {title}
                </h3>



                <span 
                className={`report-status ${statusClass}`}
                >

                    {status}

                </span>



            </div>




            <p className="department">

                {department}

            </p>




            <p className="report-meta">

                Generated {generated}

                <span>•</span>

                {size}

            </p>



        </div>


    </div>




    <div className="report-actions">


        <button

className="preview-btn"

onClick={onPreview}

>

            <EyeIcon/>

            Preview

        </button>




        <button

        className="pdf-btn"

        onClick={()=>onPDF(id)}

        >

            <ArrowDownTrayIcon/>

            PDF

        </button>




        <button

        className="excel-btn"

        onClick={()=>onExcel(id)}

        >

            <TableCellsIcon/>

            Excel

        </button>



    </div>



</div>


);


}


export default ReportCard;
