import "./AuditSummary.css";

import { useEffect, useState } from "react";

import { getAudits } from "../../api/auditApi";

import {
    CheckCircleIcon,
    ClipboardDocumentCheckIcon,
    ClockIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import AuditSummaryCard from "./AuditSummaryCard";
import AuditTrendChart from "./AuditTrendChart";
import AuditTable from "./AuditTable";

function AuditSummary() {

    const [auditData, setAuditData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadAudits();

    }, []);

    const loadAudits = async () => {

        try {

            const data = await getAudits();

            setAuditData(data);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load audit data.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // KPI Calculations
    // ==========================

    const totalAudits = auditData.length;

    const completedAudits = auditData.filter(
        item => item.status === "Completed"
    ).length;

    const openAudits = auditData.filter(
        item => item.status === "Open"
    ).length;

    const highSeverity = auditData.filter(
        item => item.severity === "High"
    ).length;

    // Average Resolution (Demo)

    const averageResolution =
        totalAudits > 0
            ? Math.round(
                auditData.reduce((sum) => sum + 14, 0) /
                totalAudits
            )
            : 0;

    // ==========================
    // Monthly Chart Data
    // ==========================

    const monthMap = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    };

    const grouped = {};

    auditData.forEach((audit) => {

        if (!audit.audit_date) return;

        const month =
            monthMap[
                audit.audit_date.substring(5, 7)
            ];

        grouped[month] =
            (grouped[month] || 0) + 1;

    });

    const chartData = Object.keys(grouped).map(
        (month) => ({

            month,

            completed: grouped[month],

        })
    );

    if (loading) {

        return <h2>Loading Audit Data...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }
        return (

        <div className="audit-summary-page">

            {/* Header */}

            <div className="audit-summary-header">

                <div>

                    <h2>Audit Summary</h2>

                    <p>

                        Monitor audit performance, findings, resolution progress
                        and compliance activities across the organization.

                    </p>

                </div>

            </div>

            {/* KPI Cards */}

            <div className="audit-kpi-row">

                <AuditSummaryCard

                    title="Completed Audits"

                    value={completedAudits}

                    subtitle="Successfully Closed"

                    badge={`${completedAudits}`}

                    icon={<CheckCircleIcon />}

                    iconBg="#DCFCE7"

                    badgeBg="#DCFCE7"

                    badgeColor="#15803D"

                />

                <AuditSummaryCard

                    title="High Severity"

                    value={highSeverity}

                    subtitle="Require Immediate Attention"

                    badge="High"

                    icon={<ClipboardDocumentCheckIcon />}

                    iconBg="#FEF3C7"

                    badgeBg="#FEF3C7"

                    badgeColor="#CA8A04"

                />

                <AuditSummaryCard

                    title="Open Audits"

                    value={openAudits}

                    subtitle="Currently Active"

                    badge="Running"

                    icon={<ClockIcon />}

                    iconBg="#DBEAFE"

                    badgeBg="#DBEAFE"

                    badgeColor="#2563EB"

                />

                <AuditSummaryCard

                    title="Avg Resolution"

                    value={`${averageResolution}`}

                    subtitle="Days"

                    badge="Average"

                    icon={<CalendarDaysIcon />}

                    iconBg="#F3E8FF"

                    badgeBg="#F3E8FF"

                    badgeColor="#7C3AED"

                />

            </div>

            {/* Chart + Table */}

            <div className="audit-content-row">

                {/* Line Chart */}

                <div className="audit-chart-card">

                    <div className="chart-header">

                        <div>

                            <h3>Monthly Audit Trend</h3>

                            <p>

                                Audits performed month-wise.

                            </p>

                        </div>

                    </div>

                    <AuditTrendChart

                        data={chartData}

                    />

                </div>

                {/* Table */}

                <div className="audit-table-card">

                    <div className="table-header">

                        <div>

                            <h3>Recent Audits</h3>

                            <p>

                                Latest audit records from the database.

                            </p>

                        </div>

                    </div>

                    <AuditTable

                        data={auditData}

                    />

                </div>

            </div>

        </div>

    );

}

export default AuditSummary;
