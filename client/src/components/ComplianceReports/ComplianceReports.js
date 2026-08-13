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



    useEffect(() => {
        getReports()
            .then(setReports)
            .catch((error) => console.log(error));
    }, []);




    const handlePreview = (report)=>{

    setSelectedReport(report);

};



    const download = async (id, format) => {
        try {
            const token = localStorage.getItem("contractiq_token") || localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/reports/${id}/${format}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            if (!response.ok) throw new Error("Download failed");
            const url = URL.createObjectURL(await response.blob());
            const link = document.createElement("a");
            link.href = url;
            link.download = `contractiq-report-${id}.${format === "excel" ? "xls" : "csv"}`;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert("Unable to download the report.");
        }
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

                        title={report.name}

                        department={report.department}

                        generated={report.generated_at ? new Date(report.generated_at).toLocaleDateString() : "Today"}

                        size={`${Number(report.value || 0).toLocaleString()} value`}

                        status={report.status}

                        onPreview={()=>handlePreview(report)}

                        onCSV={(id) => download(id, "csv")}

                        onExcel={(id) => download(id, "excel")}

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
<b>Title:</b> {selectedReport.name}
</p>


<p>
<b>Department:</b> {selectedReport.department}
</p>


<p>
<b>Status:</b> {selectedReport.status}
</p>


<p>
<b>Value:</b> {selectedReport.value}
</p>


<p>
<b>Generated Date:</b> {selectedReport.generated_at ? new Date(selectedReport.generated_at).toLocaleString() : "-"}
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
