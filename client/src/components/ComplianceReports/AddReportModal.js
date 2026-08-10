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

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async () => {
        if (!form.title.trim() || !form.department.trim()) {
            alert("Report title and department are required.");
            return;
        }
        try {
            await createReport({ ...form, value: Number(form.value || 0) });
            await refresh();
            close();
        } catch (error) {
            console.error(error);
            alert("Unable to generate the report.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="report-modal">
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
                <div className="modal-buttons">
                    <button className="save-btn" onClick={submit}>Generate</button>
                    <button className="cancel-btn" onClick={close}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default AddReportModal;
