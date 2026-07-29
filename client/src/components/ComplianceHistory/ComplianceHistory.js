import "./ComplianceHistory.css";
import { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { getHistory } from "../../api/historyApi";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ComplianceHistory() {
	const [historyData, setHistoryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		loadHistory();
	}, []);
	async function loadHistory() {
		try {
			const data = await getHistory();
			setHistoryData(data);
		} catch (err) {
			console.log(err);
			setError("Unable to load compliance history.");
		} finally {
			setLoading(false);
		}
	}
	if (loading) {
		return /* @__PURE__ */ _jsx("h2", { children: "Loading..." });
	}
	if (error) {
		return /* @__PURE__ */ _jsx("h2", { children: error });
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "history-page",
		children: [/* @__PURE__ */ _jsx("div", {
			className: "history-header",
			children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h2", { children: "Compliance History" }), /* @__PURE__ */ _jsx("p", { children: "View historical compliance activities, approvals, audits and policy updates across departments." })] })
		}), /* @__PURE__ */ _jsx("div", {
			className: "history-timeline",
			children: historyData.map((item) => /* @__PURE__ */ _jsx(HistoryCard, {
				activity: item.activity,
				department: item.department,
				status: item.status,
				activityDate: item.activity_date
			}, item.id))
		})]
	});
}
export default ComplianceHistory;
