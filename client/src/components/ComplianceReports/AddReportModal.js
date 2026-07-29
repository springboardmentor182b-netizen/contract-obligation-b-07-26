import "./AddReportModal.css";
import { useState } from "react";
import { createReport } from "../../api/reportApi";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AddReportModal({ close, refresh }) {
	const [form, setForm] = useState({
		title: "",
		department: "",
		status: "Ready",
		file_size: "1 MB",
		generated_date: ""
	});
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	const submit = async () => {
		await createReport(form);
		refresh();
		close();
	};
	return /* @__PURE__ */ _jsx("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "report-modal",
			children: [
				/* @__PURE__ */ _jsx("h2", { children: "Generate Report" }),
				/* @__PURE__ */ _jsx("input", {
					name: "title",
					placeholder: "Report Title",
					onChange: handleChange
				}),
				/* @__PURE__ */ _jsx("input", {
					name: "department",
					placeholder: "Department",
					onChange: handleChange
				}),
				/* @__PURE__ */ _jsxs("select", {
					name: "status",
					onChange: handleChange,
					children: [
						/* @__PURE__ */ _jsx("option", { children: "Ready" }),
						/* @__PURE__ */ _jsx("option", { children: "Processing" }),
						/* @__PURE__ */ _jsx("option", { children: "Draft" })
					]
				}),
				/* @__PURE__ */ _jsx("input", {
					name: "file_size",
					placeholder: "File Size",
					onChange: handleChange
				}),
				/* @__PURE__ */ _jsx("input", {
					type: "date",
					name: "generated_date",
					onChange: handleChange
				}),
				/* @__PURE__ */ _jsxs("div", {
					className: "modal-buttons",
					children: [/* @__PURE__ */ _jsx("button", {
						className: "save-btn",
						onClick: submit,
						children: "Generate"
					}), /* @__PURE__ */ _jsx("button", {
						className: "cancel-btn",
						onClick: close,
						children: "Cancel"
					})]
				})
			]
		})
	});
}
export default AddReportModal;
