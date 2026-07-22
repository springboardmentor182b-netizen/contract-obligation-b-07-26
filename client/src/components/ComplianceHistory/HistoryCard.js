import "./HistoryCard.css";

import {

    ShieldCheckIcon,

    ClipboardDocumentCheckIcon,

    CheckCircleIcon,

    ClockIcon,

    ExclamationTriangleIcon

} from "@heroicons/react/24/outline";

function HistoryCard({

    activity,

    department,

    activityDate,

    status

}) {

    const getStatusClass = () => {

        switch (status) {

            case "Completed":

                return "completed";

            case "Closed":

                return "closed";

            case "Approved":

                return "approved";

            case "Pending":

                return "pending";

            case "Critical":

                return "critical";

            default:

                return "";

        }

    };

    const getIcon = () => {

        switch (status) {

            case "Completed":

                return <ShieldCheckIcon />;

            case "Closed":

                return <ClipboardDocumentCheckIcon />;

            case "Approved":

                return <CheckCircleIcon />;

            case "Pending":

                return <ClockIcon />;

            case "Critical":

                return <ExclamationTriangleIcon />;

            default:

                return <ShieldCheckIcon />;

        }

    };

    const getColor = () => {

        switch (status) {

            case "Completed":

                return "#2563EB";

            case "Closed":

                return "#10B981";

            case "Approved":

                return "#059669";

            case "Pending":

                return "#F59E0B";

            case "Critical":

                return "#EF4444";

            default:

                return "#2563EB";

        }

    };

    const getBackground = () => {

        switch (status) {

            case "Completed":

                return "#DBEAFE";

            case "Closed":

                return "#DCFCE7";

            case "Approved":

                return "#D1FAE5";

            case "Pending":

                return "#FEF3C7";

            case "Critical":

                return "#FEE2E2";

            default:

                return "#DBEAFE";

        }

    };

    return (

        <div className="history-item">

            <div

                className="history-dot"

                style={{

                    background: getColor()

                }}

            />

            <div className="history-card">

                <div className="history-card-left">

                    <div

                        className="history-icon"

                        style={{

                            background: getBackground(),

                            color: getColor()

                        }}

                    >

                        {getIcon()}

                    </div>

                    <div className="history-info">

                        <div className="history-title-row">

                            <h3>

                                {activity}

                            </h3>

                            <span

                                className={`history-status ${getStatusClass()}`}

                            >

                                {status}

                            </span>

                        </div>

                        <p className="history-department">

                            {department}

                        </p>

                        <p className="history-date">

                            {activityDate}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;
