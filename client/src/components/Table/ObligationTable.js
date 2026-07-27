import "./ObligationTable.css";
import { useEffect, useState } from "react";
import { getObligations, deleteObligation, updateObligation } from "../../api/api";
import EditObligationModal from "../EditObligationModal";
import Loader from "../Loader/Loader";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ObligationTable({ search, status, priority }) {
	const [loading, setLoading] = useState(true);
	const [obligations, setObligations] = useState([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedObligation, setSelectedObligation] = useState(null);
	useEffect(() => {
		loadData();
	}, []);
	const loadData = () => {
		setLoading(true);
		getObligations().then((data) => {
			setObligations(data);
			setLoading(false);
		}).catch((error) => {
			console.log(error);
			setLoading(false);
		});
	};
	const handleView = (item) => {
		alert(`Title : ${item.title}

Department : ${item.department}

Owner : ${item.owner}

Due Date : ${item.due_date}

Priority : ${item.priority}

Status : ${item.status}`);
	};
	const handleEdit = (item) => {
		setSelectedObligation(item);
		setIsEditOpen(true);
	};
	const handleUpdate = async (updatedItem) => {
		await updateObligation(updatedItem.id, updatedItem);
		setIsEditOpen(false);
		loadData();
	};
	const handleDelete = async (id) => {
		const confirmDelete = window.confirm("Delete this obligation?");
		if (!confirmDelete) return;
		await deleteObligation(id);
		loadData();
	};
	// ==========================
	// SEARCH + FILTER
	// ==========================
	const filteredObligations = obligations.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).filter((item) => status === "" ? true : item.status === status).filter((item) => priority === "" ? true : item.priority === priority);
	return /* @__PURE__ */ _jsxs("div", {
		className: "table-card",
		children: [
			/* @__PURE__ */ _jsx("h2", { children: "Obligations" }),
			/* @__PURE__ */ _jsxs("table", { children: [/* @__PURE__ */ _jsx("thead", { children: /* @__PURE__ */ _jsxs("tr", { children: [
				/* @__PURE__ */ _jsx("th", { children: "ID" }),
				/* @__PURE__ */ _jsx("th", { children: "Title" }),
				/* @__PURE__ */ _jsx("th", { children: "Department" }),
				/* @__PURE__ */ _jsx("th", { children: "Owner" }),
				/* @__PURE__ */ _jsx("th", { children: "Due Date" }),
				/* @__PURE__ */ _jsx("th", { children: "Priority" }),
				/* @__PURE__ */ _jsx("th", { children: "Status" }),
				/* @__PURE__ */ _jsx("th", { children: "Actions" })
			] }) }), /* @__PURE__ */ _jsx("tbody", { children: loading ? /* @__PURE__ */ _jsx("tr", { children: /* @__PURE__ */ _jsx("td", {
				colSpan: "8",
				children: /* @__PURE__ */ _jsx(Loader, {})
			}) }) : filteredObligations.length > 0 ? filteredObligations.map((item) => /* @__PURE__ */ _jsxs("tr", { children: [
				/* @__PURE__ */ _jsx("td", { children: item.id }),
				/* @__PURE__ */ _jsx("td", { children: item.title }),
				/* @__PURE__ */ _jsx("td", { children: item.department }),
				/* @__PURE__ */ _jsx("td", { children: item.owner }),
				/* @__PURE__ */ _jsx("td", { children: item.due_date }),
				/* @__PURE__ */ _jsx("td", { children: /* @__PURE__ */ _jsx("span", {
					className: item.priority.toLowerCase(),
					children: item.priority
				}) }),
				/* @__PURE__ */ _jsx("td", { children: /* @__PURE__ */ _jsx("span", {
					className: item.status.toLowerCase().replace(" ", "-"),
					children: item.status
				}) }),
				/* @__PURE__ */ _jsxs("td", { children: [
					/* @__PURE__ */ _jsx("button", {
						className: "view-btn",
						onClick: () => handleView(item),
						children: "View"
					}),
					/* @__PURE__ */ _jsx("button", {
						className: "edit-btn",
						onClick: () => handleEdit(item),
						children: "Edit"
					}),
					/* @__PURE__ */ _jsx("button", {
						className: "delete-btn",
						onClick: () => handleDelete(item.id),
						children: "Delete"
					})
				] })
			] }, item.id)) : /* @__PURE__ */ _jsx("tr", { children: /* @__PURE__ */ _jsx("td", {
				colSpan: "8",
				style: {
					textAlign: "center",
					padding: "20px",
					fontWeight: "bold"
				},
				children: "No Obligations Found"
			}) }) })] }),
			/* @__PURE__ */ _jsx(EditObligationModal, {
				isOpen: isEditOpen,
				onClose: () => setIsEditOpen(false),
				obligation: selectedObligation,
				onUpdate: handleUpdate
			})
		]
	});
}
export default ObligationTable;
