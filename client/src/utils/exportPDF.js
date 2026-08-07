import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPDF(data) {
    if (!data || data.length === 0) {
        alert("No data to export");
        return;
    }

    const doc = new jsPDF();
    doc.text("Obligation Report", 10, 12);

    autoTable(doc, {
        head: [["ID", "Title", "Department", "Owner", "Status", "Priority", "Due Date"]],
        body: data.map(item => [
            item.id || "",
            item.title || "",
            item.department || "",
            item.owner || "",
            item.status || "",
            item.priority || "",
            item.due_date || ""
        ])
    });

    doc.save("Obligations.pdf");
}
