import React, { useEffect, useState } from "react";
import { getObligations, get } from "../api";
import "./ObligationTracker.css";
import Header from "../components/Header/Header";
import KPICard from "../components/KPI/KPICard";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import ObligationTable from "../components/Table/ObligationTable";
import Calendar from "../components/Calendar/Calendar";
import UpcomingDeadlines from "../components/UpcomingDeadlines/UpcomingDeadlines";
import WeeklyChart from "../components/Charts/WeeklyChart";
import AddObligationModal from "../components/AddObligationModal";

import {
    DocumentTextIcon,
    ClockIcon,
    ClipboardDocumentCheckIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function ObligationTracker() {
const [obligations, setObligations] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [search, setSearch] = useState("");


    const [status, setStatus] = useState("");

    const [priority, setPriority] = useState("");

    const [kpis, setKpis] = useState({

        total: 0,
        in_progress: 0,
        pending: 0,
        completed: 0,
        overdue: 0,
        risk: 0,
        compliance: 0

    });
useEffect(() => {

    getObligations()

        .then((data) => {

            setObligations(data);

        })

        .catch((err) => console.log(err));

}, []);

    useEffect(() => {

        get('/dashboard/kpis')

            .then((data) => {

                setKpis(data);

            })

            .catch((error) => console.log(error));

    }, []);

    const openModal = () => {

        setIsModalOpen(true);

    };

    const closeModal = () => {

        setIsModalOpen(false);

    };

    return (

        <div className="tracker-page">

            <Header

    openModal={openModal}

    obligations={obligations}

/>

            <div className="kpi-row">

                <KPICard
                    title="Total"
                    value={kpis.total}
                    badge="+5"
                    icon={<DocumentTextIcon className="kpi-icon" />}
                />

                <KPICard
                    title="In Progress"
                    value={kpis.in_progress}
                    badge="Live"
                    icon={<ClockIcon className="kpi-icon" />}
                />

                <KPICard
                    title="Pending"
                    value={kpis.pending}
                    badge="New"
                    icon={<ClipboardDocumentCheckIcon className="kpi-icon" />}
                />

                <KPICard
                    title="Completed"
                    value={kpis.completed}
                    badge="+3"
                    icon={<CheckCircleIcon className="kpi-icon" />}
                />

                <KPICard
                    title="Overdue"
                    value={kpis.overdue}
                    badge="Alert"
                    icon={<ExclamationCircleIcon className="kpi-icon" />}
                />

                <KPICard
                    title="Risk"
                    value={kpis.risk}
                    badge="Watch"
                    icon={<ExclamationTriangleIcon className="kpi-icon" />}
                />

                <KPICard
                    title="Compliance"
                    value={`${kpis.compliance}%`}
                    badge="+6%"
                    icon={<ShieldCheckIcon className="kpi-icon" />}
                />

            </div>

            <SearchFilters

                search={search}
                setSearch={setSearch}


                status={status}
                setStatus={setStatus}

                priority={priority}
                setPriority={setPriority}

            />

            <div className="dashboard-content">

                <div className="left-content">

                    <ObligationTable
                        search={search}
                        status={status}
                        priority={priority}
                    />

                    <div className="bottom-widgets">

                        <div className="chart-section">

                            <WeeklyChart />

                        </div>

                    </div>

                </div>

                <div className="right-content">

                    <Calendar />

                    <UpcomingDeadlines />

                </div>

            </div>

            <AddObligationModal

                isOpen={isModalOpen}

                onClose={closeModal}

            />

        </div>

    );

}

export default ObligationTracker;
