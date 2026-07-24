import "./AuditSummaryCard.css";

function AuditSummaryCard({

    title,

    value,

    subtitle,

    badge,

    icon,

    iconBg,

    badgeBg,

    badgeColor,

}) {

    return (

        <div className="audit-summary-card">

            {/* Top Section */}

            <div className="audit-card-top">

                <div
                    className="audit-card-icon"
                    style={{
                        background: iconBg
                    }}
                >

                    {icon}

                </div>

                {

                    badge && (

                        <span
                            className="audit-card-badge"
                            style={{
                                background: badgeBg,
                                color: badgeColor,
                            }}
                        >

                            {badge}

                        </span>

                    )

                }

            </div>

            {/* Value */}

            <h2 className="audit-card-value">

                {value}

            </h2>

            {/* Title */}

            <h4 className="audit-card-title">

                {title}

            </h4>

            {/* Subtitle */}

            <p className="audit-card-subtitle">

                {subtitle}

            </p>

        </div>

    );

}

export default AuditSummaryCard;
