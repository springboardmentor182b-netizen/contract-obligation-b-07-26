import { jsx as _jsx } from "react/jsx-runtime";
export function StatusMessage({ message, status }) {
	if (!message) {
		return null;
	}
	return /* @__PURE__ */ _jsx("p", {
		className: `status-message ${status}`,
		children: message
	});
}
