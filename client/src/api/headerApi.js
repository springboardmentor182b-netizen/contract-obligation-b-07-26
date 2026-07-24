import api from "./axios";

export const exportDashboard = async () => {

    try {

        const response = await api.get(
            "/dashboard/export/pdf",
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "Compliance_Dashboard_Report.pdf"
        );

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }

    catch (error) {

        console.log(error);

        alert("Unable to export dashboard.");

    }

};
