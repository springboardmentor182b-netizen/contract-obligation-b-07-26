import "./ComplianceOverview.css";

import { useEffect, useState } from "react";

import { getCompliance } from "../../api/complianceApi";

import ComplianceScore from "./ComplianceScore";
import ComplianceDonutChart from "./ComplianceDonutChart";
import OverviewCard from "./OverviewCard";

import {
    ClipboardDocumentCheckIcon,
    ExclamationTriangleIcon,
    ShieldExclamationIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

function ComplianceOverview() {

    const [complianceData, setComplianceData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadCompliance();

    }, []);

    const loadCompliance = async () => {

        try {

            const data = await getCompliance();

            setComplianceData(data);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load compliance data.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // Calculations
    // ===========================

    const totalRecords = complianceData.length;

    const completed = complianceData.filter(
        item => item.status === "Completed"
    ).length;

    const pending = complianceData.filter(
        item => item.status === "Pending"
    ).length;

    const highRisk = complianceData.filter(
        item => item.risk_level === "High"
    ).length;

    const mediumRisk = complianceData.filter(
        item => item.risk_level === "Medium"
    ).length;

    const lowRisk = complianceData.filter(
        item => item.risk_level === "Low"
    ).length;

    const averageScore =
        totalRecords > 0
            ? Math.round(
                  complianceData.reduce(
                      (sum, item) =>
                          sum + item.compliance_score,
                      0
                  ) / totalRecords
              )
            : 0;

    const chartData = [

        {
            name: "Completed",
            value: completed,
            color: "#22C55E"
        },

        {
            name: "Pending",
            value: pending,
            color: "#F59E0B"
        },

        {
            name: "High Risk",
            value: highRisk,
            color: "#EF4444"
        },

        {
            name: "Medium Risk",
            value: mediumRisk,
            color: "#8B5CF6"
        },

        {
            name: "Low Risk",
            value: lowRisk,
            color: "#3B82F6"
        }

    ];

    if (loading) {

        return <h2>Loading Compliance Data...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }
        return (

        <div className="overview-wrapper">

            {/* LEFT : Compliance Score */}

            <div className="score-section">

                <ComplianceScore

                    score={averageScore}

                />

            </div>

            {/* CENTER : Donut Chart */}

            <div className="chart-section">

                <ComplianceDonutChart

                    data={chartData}

                />

            </div>

            {/* RIGHT : Overview Cards */}

            <div className="cards-section">

                <OverviewCard

                    title="Total Records"

                    value={totalRecords}

                    subtitle="Compliance Records"

                    icon={<ClipboardDocumentCheckIcon />}

                    bgColor="#ECFDF5"

                    iconColor="#10B981"

                />

                <OverviewCard

                    title="Pending"

                    value={pending}

                    subtitle="Awaiting Completion"

                    icon={<ExclamationTriangleIcon />}

                    bgColor="#FFF7ED"

                    iconColor="#F59E0B"

                />

                <OverviewCard

                    title="High Risk"

                    value={highRisk}

                    subtitle="Immediate Attention"

                    icon={<ShieldExclamationIcon />}

                    bgColor="#FEF2F2"

                    iconColor="#EF4444"

                />

                <OverviewCard

                    title="Completed"

                    value={completed}

                    subtitle="Successfully Closed"

                    icon={<DocumentChartBarIcon />}

                    bgColor="#EFF6FF"

                    iconColor="#2563EB"

                />

            </div>

        </div>

    );

}

export default ComplianceOverview;
