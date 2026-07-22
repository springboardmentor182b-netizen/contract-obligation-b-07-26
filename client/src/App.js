
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

import React from 'react'

import Home from './pages/Home'
import "./App.css";
import{
ToastContainer
}
from"react-toastify";
import"react-toastify/dist/ReactToastify.css";
import ObligationTracker from "./pages/ObligationTracker";

function App() {
  return (
    <div className="App">
      <ObligationTracker />
<ToastContainer
position="top-right"
autoClose={3000}
/>
    </div>
  );
}

export default App;
export default function App() {
  return React.createElement(Home)

}
export default App;
