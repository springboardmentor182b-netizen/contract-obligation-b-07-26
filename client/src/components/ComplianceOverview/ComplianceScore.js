import "./ComplianceScore.css";

function ComplianceScore({ score = 0 }) {

    const percentage = Math.round(score);

    const radius = 95;

    const stroke = 12;

    const normalizedRadius = radius - stroke;

    const circumference = normalizedRadius * 2 * Math.PI;

    const offset =
        circumference -
        (percentage / 100) * circumference;

    // Dynamic Status
    let status = "";
    let growth = "";

    if (percentage >= 90) {
        status = "Excellent";
        growth = "+5.8% vs last quarter";
    }
    else if (percentage >= 75) {
        status = "Good";
        growth = "+2.1% vs last quarter";
    }
    else if (percentage >= 60) {
        status = "Average";
        growth = "-1.2% vs last quarter";
    }
    else {
        status = "Critical";
        growth = "-5.0% vs last quarter";
    }

    return (

        <div className="compliance-score-card">

            <p className="score-title">

                OVERALL COMPLIANCE SCORE

            </p>

            <div className="score-circle">

                <svg
                    width="220"
                    height="220"
                >

                    {/* Background Circle */}

                    <circle
                        className="bg-circle"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="110"
                        cy="110"
                    />

                    {/* Progress Circle */}

                    <circle
                        className="progress-circle"
                        strokeWidth={stroke}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        r={normalizedRadius}
                        cx="110"
                        cy="110"
                    />

                </svg>

                <div className="score-text">

                    <h1>

                        {percentage}

                    </h1>

                    <span>%</span>

                </div>

            </div>

            <button className="score-status">

                {status}

            </button>

            <p className="score-growth">

                {growth}

            </p>

        </div>

    );

}

export default ComplianceScore;
