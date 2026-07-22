import { useMemo, useState } from "react";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { API_BASE_URL, emptyCredentials, emptyPasswordReset, emptyRegistration } from "./constants";
import { forgotPassword } from "./services/forgotPassword";
import { login } from "./services/login";
import { signup } from "./services/signup";
import { canSubmitLogin, canSubmitPasswordReset, canSubmitRegistration } from "./utils/authValidation";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Auth({ onLogin }) {
	const [mode, setMode] = useState("login");
	const [formData, setFormData] = useState(emptyCredentials);
	const [registrationData, setRegistrationData] = useState(emptyRegistration);
	const [passwordResetData, setPasswordResetData] = useState(emptyPasswordReset);
	const [rememberMe, setRememberMe] = useState(true);
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	const [roleTouched, setRoleTouched] = useState(false);
	const canSubmit = useMemo(() => canSubmitLogin(formData, roleTouched), [formData, roleTouched]);
	const canRegister = useMemo(() => canSubmitRegistration(registrationData), [registrationData]);
	const canResetPassword = useMemo(() => canSubmitPasswordReset(passwordResetData), [passwordResetData]);
	function handleChange(event) {
		const { name, value } = event.target;
		if (name === "role") {
			setRoleTouched(true);
		}
		setFormData((current) => ({
			...current,
			[name]: value
		}));
	}
	function handleRegistrationChange(event) {
		const { name, value } = event.target;
		setRegistrationData((current) => ({
			...current,
			[name]: value
		}));
	}
	function handlePasswordResetChange(event) {
		const { name, value } = event.target;
		setPasswordResetData((current) => ({
			...current,
			[name]: value
		}));
	}
	function switchMode(nextMode) {
		setMode(nextMode);
		setStatus("idle");
		setMessage("");
	}
	async function handleSubmit(event) {
		event.preventDefault();
		if (!canSubmit) {
			setStatus("error");
			setMessage("Enter a valid email, select a role, and use a stronger password.");
			return;
		}
		setStatus("loading");
		setMessage("");
		try {
			const result = await login(API_BASE_URL, formData);
			if (rememberMe) {
				window.localStorage.setItem("contractiq_token", result.access_token);
				window.localStorage.setItem("contractiq_role", formData.role);
			}
			onLogin({
				token: result.access_token,
				role: formData.role
			});
			setStatus("success");
			setMessage("Login successful");
		} catch (error) {
			setStatus("error");
			setMessage(error.message);
		}
	}
	async function handleRegisterSubmit(event) {
		event.preventDefault();
		if (!canRegister) {
			setStatus("error");
			setMessage("Enter your name, valid email, selected role, and a stronger password.");
			return;
		}
		setStatus("loading");
		setMessage("");
		try {
			await signup(API_BASE_URL, {
				...registrationData,
				department: registrationData.department || null
			});
			setFormData({
				...emptyCredentials,
				email: registrationData.email
			});
			setRegistrationData(emptyRegistration);
			setMode("login");
			setStatus("success");
			setMessage("Account created. Sign in with your registered email.");
		} catch (error) {
			setStatus("error");
			setMessage(error.message);
		}
	}
	async function handlePasswordResetSubmit(event) {
		event.preventDefault();
		if (!canResetPassword) {
			setStatus("error");
			setMessage("Enter your registered email and a stronger new password.");
			return;
		}
		setStatus("loading");
		setMessage("");
		try {
			await forgotPassword(API_BASE_URL, passwordResetData);
			setFormData({
				...emptyCredentials,
				email: passwordResetData.email
			});
			setPasswordResetData(emptyPasswordReset);
			setMode("login");
			setStatus("success");
			setMessage("Password reset successful. Sign in with your new password.");
		} catch (error) {
			setStatus("error");
			setMessage(error.message);
		}
	}
	return /* @__PURE__ */ _jsx("main", {
		className: "login-page",
		children: /* @__PURE__ */ _jsx("section", {
			className: "login-panel",
			"aria-labelledby": "login-title",
			children: /* @__PURE__ */ _jsxs("div", {
				className: "login-card",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "brand-block",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "brand-mark",
						"aria-hidden": "true",
						children: "C"
					}), /* @__PURE__ */ _jsxs("div", { children: [
						/* @__PURE__ */ _jsx("p", {
							className: "eyebrow",
							children: "Contract obligation platform"
						}),
						/* @__PURE__ */ _jsx("h1", {
							id: "login-title",
							children: "Contract Obligation Tracking Assistant"
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "intro",
							children: "Manage contracts, renewals, obligations, and compliance activity from one secure workspace."
						})
					] })]
				}), mode === "login" ? /* @__PURE__ */ _jsx(LoginForm, {
					canSubmit,
					formData,
					message,
					onChange: handleChange,
					onRememberChange: setRememberMe,
					onSubmit: handleSubmit,
					onSwitchMode: switchMode,
					rememberMe,
					roleTouched,
					status
				}) : mode === "register" ? /* @__PURE__ */ _jsx(RegisterForm, {
					canRegister,
					message,
					onChange: handleRegistrationChange,
					onSubmit: handleRegisterSubmit,
					onSwitchMode: switchMode,
					registrationData,
					status
				}) : /* @__PURE__ */ _jsx(ForgotPasswordForm, {
					canResetPassword,
					message,
					onChange: handlePasswordResetChange,
					onSubmit: handlePasswordResetSubmit,
					onSwitchMode: switchMode,
					passwordResetData,
					status
				})]
			})
		})
	});
}
