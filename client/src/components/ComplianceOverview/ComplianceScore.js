import "./ComplianceScore.css";

function ComplianceScore({ score = 0 }) {

    const numericScore = Number(score);
    const percentage = Number.isFinite(numericScore)
        ? Math.max(0, Math.min(100, Math.round(numericScore)))
        : 0;

    const radius = 95;
    const stroke = 12;
    const normalizedRadius = radius - stroke;

    const circumference = normalizedRadius * 2 * Math.PI;

    const offset =
        circumference -
        (percentage / 100) * circumference;

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

                    <circle
                        className="bg-circle"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="110"
                        cy="110"
                    />

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

                    <h1>{percentage}</h1>

                    <span>%</span>

                </div>

            </div>

        </div>

    );

}

export default ComplianceScore;
