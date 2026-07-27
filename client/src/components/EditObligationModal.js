import { useState, useEffect } from "react";
import "./AddObligationModal.css";

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function EditObligationModal({ isOpen, onClose, obligation, onUpdate }) {
	const [formData, setFormData] = useState({
		title: "",
		department: "",
		owner: "",
		due_date: "",
		priority: "",
		status: ""
	});
	useEffect(() => {
		if (obligation) {
			setFormData({
				title: obligation.title,
				department: obligation.department,
				owner: obligation.owner,
				due_date: obligation.due_date,
				priority: obligation.priority,
				status: obligation.status
			});
		}
	}, [obligation]);
	if (!isOpen) return null;
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdate({
			...obligation,
			...formData
		});
	};
	return /* @__PURE__ */ _jsx("div", {
		className: "modal-overlay",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "modal-container",
			children: [/* @__PURE__ */ _jsxs("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ _jsx("h2", { children: "Edit Obligation" }), /* @__PURE__ */ _jsx("button", {
					className: "close-btn",
					onClick: onClose,
					children: "✕"
				})]
			}), /* @__PURE__ */ _jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Title" }), /* @__PURE__ */ _jsx("input", {
							name: "title",
							value: formData.title,
							onChange: handleChange
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Department" }), /* @__PURE__ */ _jsx("input", {
							name: "department",
							value: formData.department,
							onChange: handleChange
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Owner" }), /* @__PURE__ */ _jsx("input", {
							name: "owner",
							value: formData.owner,
							onChange: handleChange
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ _jsx("label", { children: "Due Date" }), /* @__PURE__ */ _jsx("input", {
							type: "date",
							name: "due_date",
							value: formData.due_date,
							onChange: handleChange
						})]
					}),
					/* @__PURE__ */ _jsxs("div", {
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
					}),
					/* @__PURE__ */ _jsxs("div", {
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
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "modal-footer",
						children: [/* @__PURE__ */ _jsx("button", {
							type: "button",
							className: "cancel-btn",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ _jsx("button", {
							className: "save-btn",
							type: "submit",
							children: "Update"
						})]
					})
				]
			})]
		})
	});
}


function EditObligationModal({
    isOpen,
    onClose,
    obligation,
    onUpdate
}) {

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        owner: "",
        due_date: "",
        priority: "",
        status: ""
    });

    useEffect(() => {
        if (obligation) {
            setFormData({
                title: obligation.title,
                department: obligation.department,
                owner: obligation.owner,
                due_date: obligation.due_date,
                priority: obligation.priority,
                status: obligation.status
            });
        }
    }, [obligation]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdate({
            ...obligation,
            ...formData
        });
    };

    return (

        <div className="modal-overlay">

            <div className="modal-container">

                <div className="modal-header">

                    <h2>Edit Obligation</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Title</label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Department</label>

                        <input
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Owner</label>

                        <input
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Due Date</label>

                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Priority</label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>

                    </div>

                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Overdue</option>
                        </select>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="save-btn"
                            type="submit"
                        >
                            Update
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default EditObligationModal;
