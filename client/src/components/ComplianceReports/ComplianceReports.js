import "./ComplianceReports.css";

import { useEffect, useState } from "react";

import {
    DocumentPlusIcon
} from "@heroicons/react/24/outline";

import ReportCard from "./ReportCard";
import AddReportModal from "./AddReportModal";

import {
    getReports
} from "../../api/reportApi";


function ComplianceReports() {


    const [reports, setReports] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedReport,setSelectedReport] = useState(null);
    const loadReports = async () => {

        try {

            const data = await getReports();

            setReports(data);

        }

        catch(error){

            console.log(error);

        }

    };



    useEffect(()=>{

        loadReports();

    },[]);




    const handlePreview = (report)=>{

    setSelectedReport(report);

};



    const handlePDF = (id)=>{

        window.open(
            `http://127.0.0.1:8000/reports/${id}/pdf`,
            "_blank"
        );

    };



    const handleExcel = (id)=>{

        window.open(
            `http://127.0.0.1:8000/reports/${id}/excel`,
            "_blank"
        );

    };




    return (

        <div className="reports-page">


            <div className="reports-header">


                <div>

                    <h2>
                        Compliance Reports
                    </h2>


                    <p>
                        Generate, review and download compliance reports across departments.
                    </p>


                </div>



                <button

                    className="generate-report-btn"

                    onClick={()=>setShowModal(true)}

                >

                    <DocumentPlusIcon
                        className="generate-icon"
                    />

                    Generate Report

                </button>


            </div>




            <div className="reports-grid">


            {

                reports.map((report)=>(


                    <ReportCard

                        key={report.id}

                        id={report.id}

                        title={report.title}

                        department={report.department}

                        generated={report.generated_date}

                        size={report.file_size}

                        status={report.status}

                        onPreview={()=>handlePreview(report)}

                        onPDF={handlePDF}

                        onExcel={handleExcel}

                    />


                ))

            }


            </div>




            {

                showModal &&

                <AddReportModal

                    close={()=>setShowModal(false)}

                    refresh={loadReports}

                />

            }
{
selectedReport &&

<div className="preview-overlay">


<div className="preview-modal">


<h2>
Report Preview
</h2>


<div className="preview-content">


<p>
<b>Title:</b> {selectedReport.title}
</p>


<p>
<b>Department:</b> {selectedReport.department}
</p>


<p>
<b>Status:</b> {selectedReport.status}
</p>


<p>
<b>File Size:</b> {selectedReport.file_size}
</p>


<p>
<b>Generated Date:</b> {selectedReport.generated_date}
</p>


</div>



<button

className="close-preview"

onClick={()=>setSelectedReport(null)}

>

Close

</button>



</div>


</div>

}


        </div>

    );

}


export default ComplianceReports;
