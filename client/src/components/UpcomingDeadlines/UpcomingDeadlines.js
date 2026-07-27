import "./UpcomingDeadlines.css";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/api";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function UpcomingDeadlines() {
	const [deadlines, setDeadlines] = useState([]);
	useEffect(() => {
		fetch(`${BASE_URL}/dashboard/deadlines`).then((response) => response.json()).then((data) => {
			setDeadlines(data);
		}).catch((error) => console.error(error));
	}, []);
	return /* @__PURE__ */ _jsxs("div", {
		className: "deadlines-card",
		children: [/* @__PURE__ */ _jsx("h3", { children: "Upcoming Deadlines" }), deadlines.map((item) => /* @__PURE__ */ _jsxs("div", {
			className: "deadline-item",
			children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h4", { children: item.title }), /* @__PURE__ */ _jsx("p", { children: item.owner })] }), /* @__PURE__ */ _jsx("div", { children: /* @__PURE__ */ _jsx("span", {
				className: "deadline-date",
				children: item.due_date
			}) })]
		}, item.id))]
	});
}
export default UpcomingDeadlines;
