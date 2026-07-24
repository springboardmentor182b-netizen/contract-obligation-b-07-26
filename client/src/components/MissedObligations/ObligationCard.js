import "./ObligationCard.css";

import {
    ExclamationTriangleIcon,
    UserCircleIcon,
    BuildingOffice2Icon,
    CalendarDaysIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

function ObligationCard({

    id,
    title,
    contract,
    department,
    owner,
    dueDate,
    overdue,
    priority,
    status

}) {

    return (

        <div className="obligation-card">

            {/* Header */}

            <div className="obligation-header">

                <div className="header-left">

                    <span
                        className={`priority ${priority?.toLowerCase()}`}
                    >

                        <ExclamationTriangleIcon className="priority-icon" />

                        {priority}

                    </span>

                    <span className="obligation-id">

                        {id}

                    </span>

                </div>

                <span
                    className={`status ${status?.toLowerCase().replace(/\s/g, "-")}`}
                >

                    {status}

                </span>

            </div>

            {/* Title */}

            <h3 className="obligation-title">

                {title}

            </h3>

            {/* Details */}

            <div className="details-grid">

                <div className="detail-item">

                    <DocumentTextIcon className="detail-icon" />

                    <div>

                        <label>Contract</label>

                        <p>{contract}</p>

                    </div>

                </div>

                <div className="detail-item">

                    <BuildingOffice2Icon className="detail-icon" />

                    <div>

                        <label>Department</label>

                        <p>{department}</p>

                    </div>

                </div>

                <div className="detail-item">

                    <UserCircleIcon className="detail-icon" />

                    <div>

                        <label>Owner</label>

                        <p>{owner}</p>

                    </div>

                </div>

                <div className="detail-item">

                    <CalendarDaysIcon className="detail-icon" />

                    <div>

                        <label>Due Date</label>

                        <p>{dueDate}</p>

                        <span className="overdue-text">

                            {overdue}

                        </span>

                    </div>

                </div>

            </div>

                    </div>

    );

}

export default ObligationCard;
