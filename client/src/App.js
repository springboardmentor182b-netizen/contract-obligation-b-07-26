import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Auth } from "./features/authentication/Auth";
import { Dashboard } from "./pages/Dashboard";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function App() {
	const [session, setSession] = useState(() => {
		const token = window.localStorage.getItem("contractiq_token");
		const role = window.localStorage.getItem("contractiq_role");
		return token ? {
			token,
			role
		} : null;
	});
	function handleLogout() {
		window.localStorage.removeItem("contractiq_token");
		window.localStorage.removeItem("contractiq_role");
		setSession(null);
	}
	return /* @__PURE__ */ _jsxs("div", {
		className: "App",
		children: [session ? /* @__PURE__ */ _jsx(Dashboard, {
			userRole: session.role,
			onLogout: handleLogout
		}) : /* @__PURE__ */ _jsx(Auth, { onLogin: setSession }), /* @__PURE__ */ _jsx(ToastContainer, {
			position: "top-right",
			autoClose: 3e3
		})]
	});
}
export default App;


export default function App() {
  return React.createElement(Home)
}
import "./App.css";

import ComplianceDashboard from "./pages/ComplianceDashboard";

function App() {

return (

<div>

<ComplianceDashboard/>

</div>

);

}

export default App;

