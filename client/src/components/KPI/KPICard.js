
import { DocumentTextIcon, ClockIcon, ClipboardDocumentCheckIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import "./KPICard.css";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function KPICard({ title, value, badge, icon }) {
	return /* @__PURE__ */ _jsxs("div", {
		className: "kpi-card",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "top",
				children: [/* @__PURE__ */ _jsx("div", {
					className: "icon",
					children: icon
				}), /* @__PURE__ */ _jsx("span", {
					className: "badge",
					children: badge
				})]
			}),
			/* @__PURE__ */ _jsx("h2", { children: value }),
			/* @__PURE__ */ _jsx("p", { children: title })
		]
	});
}

import {
  DocumentTextIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import "./KPICard.css";

function KPICard({
    title,
    value,
    badge,
    icon,
}) {

    return (

        <div className="kpi-card">

            <div className="top">

                <div className="icon">
                    {icon}
                </div>

                <span className="badge">
                    {badge}
                </span>

            </div>

            <h2>{value}</h2>

            <p>{title}</p>

        </div>

    );

}


export default KPICard;
import "./KPICard.css";

function KPICard({

    title,
    value,
    badge,
    icon,
    iconBg,
    badgeBg,
    badgeColor

}) {

    return (

        <div className="kpi-card">

            <div className="top">

                <div
                    className="icon"
                    style={{ background: iconBg }}
                >

                    {icon}

                </div>

                <span
                    className="badge"
                    style={{
                        background: badgeBg,
                        color: badgeColor
                    }}
                >

                    {badge}

                </span>

            </div>

            <h2>{value}</h2>

            <p>{title}</p>

        </div>

    );

}

export default KPICard;
