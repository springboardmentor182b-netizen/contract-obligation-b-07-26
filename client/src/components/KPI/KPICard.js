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
