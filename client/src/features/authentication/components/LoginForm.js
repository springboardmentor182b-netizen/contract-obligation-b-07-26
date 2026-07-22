import { roles } from "../constants";
import { StatusMessage } from "./StatusMessage";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function LoginForm({ canSubmit, formData, message, onChange, onRememberChange, onSwitchMode, onSubmit, rememberMe, roleTouched, status }) {
	return /* @__PURE__ */ _jsxs("form", {
		className: "login-form",
		onSubmit,
		children: [
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "Email address" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "email",
						name: "email",
						onChange,
						placeholder: "Enter your work email",
						type: "email",
						value: formData.email
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use your registered work email address."
					})
				]
			}),
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "Password" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "current-password",
						name: "password",
						onChange,
						placeholder: "Enter your password",
						type: "password",
						value: formData.password
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use 8+ characters with uppercase, lowercase, and a special character."
					})
				]
			}),
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [/* @__PURE__ */ _jsx("span", { children: "Role" }), /* @__PURE__ */ _jsxs("select", {
					name: "role",
					onChange,
					required: true,
					value: roleTouched ? formData.role : "",
					children: [/* @__PURE__ */ _jsx("option", {
						value: "",
						children: "Select the role"
					}), roles.map((role) => /* @__PURE__ */ _jsx("option", {
						value: role,
						children: role
					}, role))]
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "form-row",
				children: [/* @__PURE__ */ _jsxs("label", {
					className: "remember",
					children: [/* @__PURE__ */ _jsx("input", {
						checked: rememberMe,
						onChange: (event) => onRememberChange(event.target.checked),
						type: "checkbox"
					}), /* @__PURE__ */ _jsx("span", { children: "Remember me" })]
				}), /* @__PURE__ */ _jsx("button", {
					className: "link-button",
					onClick: () => onSwitchMode("forgot-password"),
					type: "button",
					children: "Forgot password?"
				})]
			}),
			/* @__PURE__ */ _jsx(StatusMessage, {
				message,
				status
			}),
			/* @__PURE__ */ _jsx("button", {
				className: "primary-button",
				disabled: !canSubmit || status === "loading",
				type: "submit",
				children: status === "loading" ? "Signing in..." : "Sign in"
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "register-row",
				children: [/* @__PURE__ */ _jsx("span", { children: "New to ContractIQ?" }), /* @__PURE__ */ _jsx("button", {
					className: "link-button",
					onClick: () => onSwitchMode("register"),
					type: "button",
					children: "Register account"
				})]
			})
		]
	});
}
