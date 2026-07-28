import "./MissedObligations.css";

import { useEffect, useState } from "react";

import { getMissedObligations } from "../../api/missedObligationApi";

import {
    ExclamationTriangleIcon,
    ClockIcon,
    ExclamationCircleIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import KPICard from "../KPI/KPICard";
import ObligationCard from "./ObligationCard";

function MissedObligations() {

    const [search, setSearch] = useState("");

    const [obligations, setObligations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadObligations();

    }, []);

    const loadObligations = async () => {

        try {

            const data = await getMissedObligations();

            setObligations(data);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load missed obligations.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // KPI Calculations
    // ===========================

    const totalMissed = obligations.length;

    const critical = obligations.filter(
        item => item.priority === "High"
    ).length;

    const overdue = obligations.filter(
        item => item.status === "Overdue"
    ).length;

    const dueSoon = obligations.filter(
        item =>
            item.status === "Pending" ||
            item.status === "Due Soon"
    ).length;

    // ===========================
    // Search + Latest 3
    // ===========================

    const filtered = obligations

        .filter((item) =>

            item.obligation_name?.toLowerCase().includes(search.toLowerCase()) ||

            item.department?.toLowerCase().includes(search.toLowerCase()) ||

            item.owner?.toLowerCase().includes(search.toLowerCase())

        )

        .sort(

            (a, b) =>

                new Date(b.due_date) -

                new Date(a.due_date)

        )

        .slice(0, 4);

    if (loading) {

        return <h2>Loading Missed Obligations...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }
        return (

        <div className="missed-page">

            {/* Header */}

            <div className="missed-header">

                <div>

                    <h2>

                        Missed Obligations

                    </h2>

                    <p>

                        Monitor overdue obligations, identify risks,
                        and resolve pending compliance tasks.

                    </p>

                </div>

            </div>

            {/* KPI Cards */}

            <div className="summary-row">

                <KPICard

                    title="Total Missed"

                    value={totalMissed}

                    badge="Overall"

                    icon={<ClockIcon />}

                    iconBg="#2563EB"

                    badgeBg="#DBEAFE"

                    badgeColor="#1D4ED8"

                />

                <KPICard

                    title="Critical"

                    value={critical}

                    badge="High"

                    icon={<ExclamationTriangleIcon />}

                    iconBg="#EF4444"

                    badgeBg="#FEE2E2"

                    badgeColor="#B91C1C"

                />

                <KPICard

                    title="Overdue"

                    value={overdue}

                    badge="Action"

                    icon={<ExclamationCircleIcon />}

                    iconBg="#F97316"

                    badgeBg="#FFEDD5"

                    badgeColor="#C2410C"

                />

                <KPICard

                    title="Due Soon"

                    value={dueSoon}

                    badge="Next"

                    icon={<ClockIcon />}

                    iconBg="#14B8A6"

                    badgeBg="#CCFBF1"

                    badgeColor="#0F766E"

                />

            </div>

            {/* Search */}

            <div className="toolbar">

                <div className="search-box">

                    <MagnifyingGlassIcon className="search-icon" />

                    <input

                        type="text"

                        placeholder="Search obligation..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <button className="filter-btn">

                    <FunnelIcon className="filter-icon" />

                    Filter

                </button>

            </div>

            {/* Latest 4 Cards */}

            <div className="obligation-list">

                {

                    filtered.length > 0 ? (

                        filtered.map((item) => (

                            <ObligationCard

                                key={item.id}

                                id={item.id}

                                title={item.obligation_name}

                                contract={item.contract}

                                department={item.department}

                                owner={item.owner}

                                dueDate={item.due_date}

                                overdue={`${item.missed_days} Days Missed`}

                                priority={item.priority}

                                status={item.status}

                            />

                        ))

                    ) : (

                        <div

                            style={{

                                width: "100%",

                                textAlign: "center",

                                padding: "40px",

                                color: "#64748B",

                                fontWeight: "500"

                            }}

                        >

                            No missed obligations found.

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default MissedObligations;
