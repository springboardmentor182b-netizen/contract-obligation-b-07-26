import "./ComplianceReports.css";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/config";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import ReportCard from "./ReportCard";
import AddReportModal from "./AddReportModal";
import { getReports } from "../../api/reportApi";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceReports() {
	const [reports, setReports] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);
	const loadReports = async () => {
		try {
			const data = await getReports();
			setReports(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		loadReports();
	}, []);
	const handlePreview = (report) => {
		setSelectedReport(report);
	};
	const handlePDF = (id) => {
		window.open(`${BASE_URL}/reports/${id}/pdf`, "_blank");
	};
	const handleExcel = (id) => {
		window.open(`${BASE_URL}/reports/${id}/excel`, "_blank");
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "reports-page",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "reports-header",
				children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: "Compliance Reports" }), /* @__PURE__ */ _jsx("p", { children: "Generate, review and download compliance reports across departments." })] }), /* @__PURE__ */ _jsxs("button", {
					className: "generate-report-btn",
					onClick: () => setShowModal(true),
					children: [/* @__PURE__ */ _jsx(DocumentPlusIcon, { className: "generate-icon" }), "Generate Report"]
				})]
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "reports-grid",
				children: reports.map((report) => /* @__PURE__ */ _jsx(ReportCard, {
					id: report.id,
					title: report.title,
					department: report.department,
					generated: report.generated_date,
					size: report.file_size,
					status: report.status,
					onPreview: () => handlePreview(report),
					onPDF: handlePDF,
					onExcel: handleExcel
				}, report.id))
			}),
			showModal && /* @__PURE__ */ _jsx(AddReportModal, {
				close: () => setShowModal(false),
				refresh: loadReports
			}),
			selectedReport && /* @__PURE__ */ _jsx("div", {
				className: "preview-overlay",
				children: /* @__PURE__ */ _jsxs("div", {
					className: "preview-modal",
					children: [
						/* @__PURE__ */ _jsx("h2", { children: "Report Preview" }),
						/* @__PURE__ */ _jsxs("div", {
							className: "preview-content",
							children: [
								/* @__PURE__ */ _jsxs("p", { children: [
									/* @__PURE__ */ _jsx("b", { children: "Title:" }),
									" ",
									selectedReport.title
								] }),
								/* @__PURE__ */ _jsxs("p", { children: [
									/* @__PURE__ */ _jsx("b", { children: "Department:" }),
									" ",
									selectedReport.department
								] }),
								/* @__PURE__ */ _jsxs("p", { children: [
									/* @__PURE__ */ _jsx("b", { children: "Status:" }),
									" ",
									selectedReport.status
								] }),
								/* @__PURE__ */ _jsxs("p", { children: [
									/* @__PURE__ */ _jsx("b", { children: "File Size:" }),
									" ",
									selectedReport.file_size
								] }),
								/* @__PURE__ */ _jsxs("p", { children: [
									/* @__PURE__ */ _jsx("b", { children: "Generated Date:" }),
									" ",
									selectedReport.generated_date
								] })
							]
						}),
						/* @__PURE__ */ _jsx("button", {
							className: "close-preview",
							onClick: () => setSelectedReport(null),
							children: "Close"
						})
					]
				})
			})
		]
	});
}
export default ComplianceReports;
