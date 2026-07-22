import { roles } from "../constants";
import { StatusMessage } from "./StatusMessage";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function RegisterForm({ canRegister, message, onChange, onSubmit, onSwitchMode, registrationData, status }) {
	return /* @__PURE__ */ _jsxs("form", {
		className: "login-form",
		onSubmit,
		children: [
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "Full name" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "name",
						name: "name",
						onChange,
						placeholder: "Enter your full name",
						type: "text",
						value: registrationData.name
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use at least 2 characters."
					})
				]
			}),
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
						value: registrationData.email
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use a valid work email address."
					})
				]
			}),
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "Password" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "new-password",
						name: "password",
						onChange,
						placeholder: "Create a password",
						type: "password",
						value: registrationData.password
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
					value: registrationData.role,
					children: [/* @__PURE__ */ _jsx("option", {
						value: "",
						children: "Select the role"
					}), roles.map((role) => /* @__PURE__ */ _jsx("option", {
						value: role,
						children: role
					}, role))]
				})]
			}),
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [/* @__PURE__ */ _jsx("span", { children: "Department" }), /* @__PURE__ */ _jsx("input", {
					autoComplete: "organization-title",
					name: "department",
					onChange,
					placeholder: "Enter department",
					type: "text",
					value: registrationData.department
				})]
			}),
			/* @__PURE__ */ _jsx(StatusMessage, {
				message,
				status
			}),
			/* @__PURE__ */ _jsx("button", {
				className: "primary-button",
				disabled: !canRegister || status === "loading",
				type: "submit",
				children: status === "loading" ? "Creating account..." : "Create account"
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "register-row",
				children: [/* @__PURE__ */ _jsx("span", { children: "Already registered?" }), /* @__PURE__ */ _jsx("button", {
					className: "link-button",
					onClick: () => onSwitchMode("login"),
					type: "button",
					children: "Back to sign in"
				})]
			})
		]
	});
}
