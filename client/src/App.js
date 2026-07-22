import { Auth } from "./features/authentication/Auth";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";
import "./App.css";
import { jsx as _jsx } from "react/jsx-runtime";
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
	if (session) {
		return /* @__PURE__ */ _jsx(Dashboard, {
			userRole: session.role,
			onLogout: handleLogout
		});
	}
	return /* @__PURE__ */ _jsx(Auth, { onLogin: setSession });
}
export default App;
