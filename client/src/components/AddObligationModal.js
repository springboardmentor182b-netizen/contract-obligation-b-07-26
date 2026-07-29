import React, { useState } from "react";
import "./AddObligationModal.css";
import { addObligation } from "../api/api";
import { toast } from "react-toastify";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function AddObligationModal({ isOpen, onClose }) {
	const [formData, setFormData] = useState({
		obligationName: "",
		contract: "",
		owner: "",
		dueDate: "",
		priority: "Medium",
		status: "Pending",
		description: ""
	});
	if (!isOpen) return null;
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addObligation({
				title: formData.obligationName,
				department: formData.contract,
				owner: formData.owner,
				due_date: formData.dueDate,
				priority: formData.priority,
				status: formData.status
			});
			toast.success("Obligation Added Successfully!");
			onClose();
			window.location.reload();
		} catch (error) {
			console.log(error);
			alert("Unable to save obligation");
		}
	};
	return /* @__PURE__ */ _jsx("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "modal-container",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ _jsx("h2", { children: "Add New Obligation" }), /* @__PURE__ */ _jsx("button", {
					className: "close-btn",
					onClick: onClose,
					children: "✕"
				})]
			}), /* @__PURE__ */ _jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Obligation Name" }), /* @__PURE__ */ _jsx("input", {
							type: "text",
							name: "obligationName",
							placeholder: "Enter obligation name",
							value: formData.obligationName,
							onChange: handleChange,
							required: true
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Contract" }), /* @__PURE__ */ _jsx("input", {
							type: "text",
							name: "contract",
							placeholder: "Enter contract",
							value: formData.contract,
							onChange: handleChange,
							required: true
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "row",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Owner" }), /* @__PURE__ */ _jsx("input", {
								type: "text",
								name: "owner",
								placeholder: "Owner Name",
								value: formData.owner,
								onChange: handleChange,
								required: true
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Due Date" }), /* @__PURE__ */ _jsx("input", {
								type: "date",
								name: "dueDate",
								value: formData.dueDate,
								onChange: handleChange,
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "row",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Priority" }), /* @__PURE__ */ _jsxs("select", {
								name: "priority",
								value: formData.priority,
								onChange: handleChange,
								children: [
									/* @__PURE__ */ _jsx("option", { children: "High" }),
									/* @__PURE__ */ _jsx("option", { children: "Medium" }),
									/* @__PURE__ */ _jsx("option", { children: "Low" })
								]
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "form-group",
							children: [/* @__PURE__ */ _jsx("label", { children: "Status" }), /* @__PURE__ */ _jsxs("select", {
								name: "status",
								value: formData.status,
								onChange: handleChange,
								children: [
									/* @__PURE__ */ _jsx("option", { children: "Pending" }),
									/* @__PURE__ */ _jsx("option", { children: "In Progress" }),
									/* @__PURE__ */ _jsx("option", { children: "Completed" }),
									/* @__PURE__ */ _jsx("option", { children: "Overdue" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Description" }), /* @__PURE__ */ _jsx("textarea", {
							rows: "4",
							name: "description",
							placeholder: "Enter description...",
							value: formData.description,
							onChange: handleChange
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "modal-footer",
						children: [/* @__PURE__ */ _jsx("button", {
							type: "button",
							className: "cancel-btn",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ _jsx("button", {
							type: "submit",
							className: "save-btn",
							children: "Save Obligation"
						})]
					})
				]
			})]
		})
	});
}
export default AddObligationModal;
