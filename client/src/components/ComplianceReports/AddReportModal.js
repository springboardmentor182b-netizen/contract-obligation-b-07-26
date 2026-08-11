import "./AddReportModal.css";
import { useState } from "react";
import { createReport } from "../../api/reportApi";

function AddReportModal({ close, refresh }) {
    const [form, setForm] = useState({
        title: "",
        report_type: "Compliance",
        department: "",
        status: "Generated",
        value: "0",
        due_date: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async () => {
        if (!form.title.trim() || !form.department.trim()) {
            alert("Report title and department are required.");
            return;
        }
        setIsSaving(true);
        try {
            await createReport({ ...form, value: Number(form.value || 0) });
            await refresh();
            close();
        } catch (error) {
            console.error(error);
            alert("Unable to generate the report.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="report-generate-modal">
                <h2>Generate Report</h2>
                <input name="title" placeholder="Report Title" value={form.title} onChange={handleChange} />
                <select name="report_type" value={form.report_type} onChange={handleChange}>
                    <option value="Compliance">Compliance</option>
                    <option value="Obligations">Obligations</option>
                    <option value="Contracts">Contracts</option>
                    <option value="Risk">Risk</option>
                </select>
                <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Generated">Generated</option>
                    <option value="Processing">Processing</option>
                    <option value="Draft">Draft</option>
                </select>
                <input name="value" type="number" min="0" placeholder="Report value" value={form.value} onChange={handleChange} />
                <input type="date" name="due_date" value={form.due_date} onChange={handleChange} />
                <div className="report-generate-actions">
                    <button className="report-generate-submit" type="button" onClick={submit} disabled={isSaving}>
                        {isSaving ? "Generating..." : "Generate Report"}
                    </button>
                    <button className="report-generate-cancel" type="button" onClick={close} disabled={isSaving}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddReportModal;
