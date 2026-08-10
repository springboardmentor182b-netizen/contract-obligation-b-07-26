import api from "../utils/axios";

export const exportDashboard = async () => {

    try {

        const response = await api.get(
            "/api/compliance-dashboard/export/csv",
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
            "contractiq-compliance-dashboard.csv"
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
