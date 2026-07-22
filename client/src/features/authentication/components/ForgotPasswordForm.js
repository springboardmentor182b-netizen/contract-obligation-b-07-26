import { StatusMessage } from "./StatusMessage";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ForgotPasswordForm({ canResetPassword, message, onChange, onSubmit, onSwitchMode, passwordResetData, status }) {
	return /* @__PURE__ */ _jsxs("form", {
		className: "login-form",
		onSubmit,
		children: [
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "Registered email" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "email",
						name: "email",
						onChange,
						placeholder: "Enter your registered email",
						type: "email",
						value: passwordResetData.email
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use the email linked to your account."
					})
				]
			}),
			/* @__PURE__ */ _jsxs("label", {
				className: "field",
				children: [
					/* @__PURE__ */ _jsx("span", { children: "New password" }),
					/* @__PURE__ */ _jsx("input", {
						autoComplete: "new-password",
						name: "new_password",
						onChange,
						placeholder: "Create a new password",
						type: "password",
						value: passwordResetData.new_password
					}),
					/* @__PURE__ */ _jsx("span", {
						className: "field-hint",
						children: "Use 8+ characters with uppercase, lowercase, and a special character."
					})
				]
			}),
			/* @__PURE__ */ _jsx(StatusMessage, {
				message,
				status
			}),
			/* @__PURE__ */ _jsx("button", {
				className: "primary-button",
				disabled: !canResetPassword || status === "loading",
				type: "submit",
				children: status === "loading" ? "Resetting password..." : "Reset password"
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: "register-row",
				children: [/* @__PURE__ */ _jsx("span", { children: "Remember your password?" }), /* @__PURE__ */ _jsx("button", {
					className: "link-button",
					onClick: () => onSwitchMode("login"),
					type: "button",
					children: "Back to sign in"
				})]
			})
		]
	});
}
