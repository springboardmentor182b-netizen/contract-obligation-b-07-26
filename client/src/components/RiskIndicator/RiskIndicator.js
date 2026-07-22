import "./RiskIndicator.css";

import { useEffect, useState } from "react";

import {
    PlusIcon,
    ExclamationTriangleIcon,
    ShieldExclamationIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { getRisks } from "../../api/riskApi";

import RiskSummaryCard from "./RiskSummaryCard";
import RiskSeverityChart from "./RiskSeverityChart";
import RiskDepartmentChart from "./RiskDepartmentChart";
import AddRiskModal from "./AddRiskModal";

function RiskIndicator() {

    const [risks, setRisks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        loadRisks();

    }, []);

    const loadRisks = async () => {

        try {

            const data = await getRisks();

            setRisks(data);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load risks.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===============================
    // KPI Calculations
    // ===============================

    const openRisks = risks.filter(
        risk => risk.status !== "Resolved"
    ).length;

    const criticalRisks = risks.filter(
        risk => risk.severity === "Critical"
    ).length;

    const mediumRisks = risks.filter(
        risk => risk.severity === "Medium"
    ).length;

    const resolvedRisks = risks.filter(
        risk => risk.status === "Resolved"
    ).length;

    if (loading) {

        return <h2>Loading Risk Indicators...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="risk-page">

            {/* Header */}

            <div className="risk-header">

                <div>

                    <h2>Risk Indicators</h2>

                    <p>

                        Analyze compliance risks across contracts,
                        departments and obligations.

                    </p>

                </div>

                <button

                    className="risk-btn"

                    onClick={() => setShowModal(true)}

                >

                    <PlusIcon className="risk-btn-icon" />

                    Add Risk

                </button>

            </div>

            {/* KPI */}

            <div className="risk-summary">

                <RiskSummaryCard

                    title="Open Risks"

                    value={openRisks}

                    badge="Overall"

                    icon={<ExclamationTriangleIcon />}

                    iconBg="#DBEAFE"

                    badgeBg="#DBEAFE"

                    badgeColor="#2563EB"

                />

                <RiskSummaryCard

                    title="Critical"

                    value={criticalRisks}

                    badge="High"

                    icon={<ShieldExclamationIcon />}

                    iconBg="#FEE2E2"

                    badgeBg="#FEE2E2"

                    badgeColor="#DC2626"

                />

                <RiskSummaryCard

                    title="Medium"

                    value={mediumRisks}

                    badge="Monitor"

                    icon={<ExclamationCircleIcon />}

                    iconBg="#FEF3C7"

                    badgeBg="#FEF3C7"

                    badgeColor="#CA8A04"

                />

                <RiskSummaryCard

                    title="Resolved"

                    value={resolvedRisks}

                    badge="Closed"

                    icon={<CheckCircleIcon />}

                    iconBg="#DCFCE7"

                    badgeBg="#DCFCE7"

                    badgeColor="#15803D"

                />

            </div>

            {/* Charts */}

            <div className="risk-chart-grid">

                <div className="risk-chart-card">

                    <h3>

                        Risk Severity Distribution

                    </h3>

                    <RiskSeverityChart

                        risks={risks}

                    />

                </div>

                <div className="risk-chart-card">

                    <h3>

                        Department Risk Analysis

                    </h3>

                    <RiskDepartmentChart

                        risks={risks}

                    />

                </div>

            </div>

            {

                showModal &&

                <AddRiskModal

                    close={() => setShowModal(false)}

                    refresh={loadRisks}

                />

            }

        </div>

    );

}

export default RiskIndicator;
