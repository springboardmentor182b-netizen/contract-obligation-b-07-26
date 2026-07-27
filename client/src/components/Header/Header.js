import "./Header.css";
import { exportPDF } from "../../utils/exportPDF";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Header({ openModal, obligations }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "header",
		children: [/* @__PURE__ */ _jsx("div", {
			className: "header-left",
			children: /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h1", { children: "Obligation Tracker" }), /* @__PURE__ */ _jsx("p", { children: "Track and manage contractual obligations efficiently." })] })
		}), /* @__PURE__ */ _jsxs("div", {
			className: "header-right",
			children: [/* @__PURE__ */ _jsx("button", {
				className: "export-btn",
				onClick: () => exportPDF(obligations),
				children: "Export PDF"
			}), /* @__PURE__ */ _jsx("button", {
				className: "add-btn",
				onClick: openModal,
				children: "+ Add Obligation"
			})]
		})]
	});
}
export default Header;
