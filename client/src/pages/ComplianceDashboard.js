import { useState, useEffect } from "react";

import "./ComplianceDashboard.css";

import Header from "../components/Header/Header";

import KPICard from "../components/KPI/KPICard";

import ComplianceOverview from "../components/ComplianceOverview/ComplianceOverview";
import MissedObligations from "../components/MissedObligations/MissedObligations";
import ComplianceReports from "../components/ComplianceReports/ComplianceReports";
import RiskIndicators from "../components/RiskIndicator/RiskIndicator";
import AuditSummary from "../components/AuditSummary/AuditSummary";
import ComplianceHistory from "../components/ComplianceHistory/ComplianceHistory";

import { getDashboardKPIs } from "../api/kpiApi";

import {

    ShieldCheckIcon,
    DocumentChartBarIcon,
    ExclamationTriangleIcon,
    ClipboardDocumentCheckIcon,
    ExclamationCircleIcon,
    ClockIcon,
    DocumentDuplicateIcon,

} from "@heroicons/react/24/outline";

function ComplianceDashboard() {

    const [activeTab, setActiveTab] = useState("overview");

    const [kpis, setKpis] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadKPIs();

    }, []);

    const loadKPIs = async () => {

        try {

            const data = await getDashboardKPIs();

            setKpis(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    const kpiCards = [

        {
            title: "Compliance Score",
            value: `${kpis.compliance_score}%`,
            badge: "Average",
            icon: <ShieldCheckIcon />,
            iconBg: "#10B981",
            badgeBg: "#DCFCE7",
            badgeColor: "#15803D",
        },

        {
            title: "Reports Ready",
            value: kpis.reports_ready,
            badge: "Ready",
            icon: <DocumentChartBarIcon />,
            iconBg: "#2563EB",
            badgeBg: "#DBEAFE",
            badgeColor: "#1D4ED8",
        },

        {
            title: "Missed Obligations",
            value: kpis.missed_obligations,
            badge: "Overall",
            icon: <ExclamationTriangleIcon />,
            iconBg: "#F59E0B",
            badgeBg: "#FEF3C7",
            badgeColor: "#B45309",
        },

        {
            title: "Audit Findings",
            value: kpis.audit_findings,
            badge: "Audits",
            icon: <ClipboardDocumentCheckIcon />,
            iconBg: "#8B5CF6",
            badgeBg: "#EDE9FE",
            badgeColor: "#6D28D9",
        },

        {
            title: "High Risks",
            value: kpis.high_risks,
            badge: "Critical",
            icon: <ExclamationCircleIcon />,
            iconBg: "#EF4444",
            badgeBg: "#FEE2E2",
            badgeColor: "#B91C1C",
        },

        {
            title: "Pending Reviews",
            value: kpis.pending_reviews,
            badge: "Pending",
            icon: <ClockIcon />,
            iconBg: "#EAB308",
            badgeBg: "#FEF9C3",
            badgeColor: "#A16207",
        },

        {
            title: "Compliance History",
            value: kpis.history_records,
            badge: "Records",
            icon: <DocumentDuplicateIcon />,
            iconBg: "#14B8A6",
            badgeBg: "#CCFBF1",
            badgeColor: "#0F766E",
        },

    ];

    const tabs = [

        {
            key: "overview",
            label: "Compliance Overview",
            component: <ComplianceOverview />,
        },

        {
            key: "missed",
            label: "Missed Obligations",
            component: <MissedObligations />,
        },

        {
            key: "reports",
            label: "Compliance Reports",
            component: <ComplianceReports />,
        },

        {
            key: "risk",
            label: "Risk Indicators",
            component: <RiskIndicators />,
        },

        {
            key: "audit",
            label: "Audit Summary",
            component: <AuditSummary />,
        },

        {
            key: "history",
            label: "Compliance History",
            component: <ComplianceHistory />,
        },

    ];

    return (

        <div className="dashboard-page">

            <Header />

            <div className="kpi-row">

                {

                    kpiCards.map((card, index) => (

                        <KPICard

                            key={index}

                            {...card}

                        />

                    ))

                }

            </div>

            <div className="dashboard-tabs">

                {

                    tabs.map((tab) => (

                        <span

                            key={tab.key}

                            className={

                                activeTab === tab.key

                                    ? "active-tab"

                                    : ""

                            }

                            onClick={() => setActiveTab(tab.key)}

                        >

                            {tab.label}

                        </span>

                    ))

                }

            </div>

            <div className="tab-content">

                {

                    tabs.find(

                        (tab) => tab.key === activeTab

                    )?.component

                }

            </div>

        </div>

    );

}

export default ComplianceDashboard;
