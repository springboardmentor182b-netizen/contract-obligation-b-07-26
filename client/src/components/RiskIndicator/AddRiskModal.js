import "./AddRiskModal.css";
import { useState } from "react";
import { createRisk } from "../../api/riskApi";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AddRiskModal({ close, refresh }) {
	const [form, setForm] = useState({
		risk_name: "",
		department: "",
		severity: "Medium",
		status: "Open",
		owner: ""
	});
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createRisk(form);
			refresh();
			close();
		} catch (err) {
			console.log(err);
			alert("Unable to create risk.");
		}
	};
	return /* @__PURE__ */ _jsx("div", {
		className: "risk-modal-overlay",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "risk-modal",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "risk-modal-header",
				children: [/* @__PURE__ */ _jsx("h2", { children: "Add Risk" }), /* @__PURE__ */ _jsx("button", {
					className: "close-btn",
					onClick: close,
					children: "×"
				})]
			}), /* @__PURE__ */ _jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Risk Name" }), /* @__PURE__ */ _jsx("input", {
							type: "text",
							name: "risk_name",
							placeholder: "Enter risk name",
							value: form.risk_name,
							onChange: handleChange,
							required: true
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Department" }), /* @__PURE__ */ _jsx("input", {
							type: "text",
							name: "department",
							placeholder: "Enter department",
							value: form.department,
							onChange: handleChange,
							required: true
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Owner" }), /* @__PURE__ */ _jsx("input", {
							type: "text",
							name: "owner",
							placeholder: "Enter owner",
							value: form.owner,
							onChange: handleChange,
							required: true
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-row",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Severity" }), /* @__PURE__ */ _jsxs("select", {
								name: "severity",
								value: form.severity,
								onChange: handleChange,
								children: [
									/* @__PURE__ */ _jsx("option", { children: "Critical" }),
									/* @__PURE__ */ _jsx("option", { children: "High" }),
									/* @__PURE__ */ _jsx("option", { children: "Medium" }),
									/* @__PURE__ */ _jsx("option", { children: "Low" })
								]
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Status" }), /* @__PURE__ */ _jsxs("select", {
								name: "status",
								value: form.status,
								onChange: handleChange,
								children: [
									/* @__PURE__ */ _jsx("option", { children: "Open" }),
									/* @__PURE__ */ _jsx("option", { children: "Pending" }),
									/* @__PURE__ */ _jsx("option", { children: "In Review" }),
									/* @__PURE__ */ _jsx("option", { children: "Resolved" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "modal-footer",
						children: [/* @__PURE__ */ _jsx("button", {
							type: "button",
							className: "cancel-btn",
							onClick: close,
							children: "Cancel"
						}), /* @__PURE__ */ _jsx("button", {
							type: "submit",
							className: "save-btn",
							children: "Save Risk"
						})]
					})
				]
			})]
		})
	});
}
export default AddRiskModal;
