import React, { useState } from "react";
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {

        setIsModalOpen(true);

    };

    const closeModal = () => {

        setIsModalOpen(false);

    };

    return (

        <div className="tracker-page">

            <Header openModal={openModal} />

            {/* KPI SECTION */}

            <div className="kpi-row">

                <KPICard
    title="Total"
    value="20"
    badge="+5"
    icon={<DocumentTextIcon className="kpi-icon" />}
/>

<KPICard
    title="In-Progress"
    value="8"
    badge="Live"
    icon={<ClockIcon className="kpi-icon" />}
/>

<KPICard
    title="Pending"
    value="5"
    badge="New"
    icon={<ClipboardDocumentCheckIcon className="kpi-icon" />}
/>

<KPICard
    title="Completed"
    value="7"
    badge="+3"
    icon={<CheckCircleIcon className="kpi-icon" />}
/>

<KPICard
    title="Overdue"
    value="4"
    badge="Alert"
    icon={<ExclamationCircleIcon className="kpi-icon" />}
/>

<KPICard
    title="Risk"
    value="2"
    badge="Watch"
    icon={<ExclamationTriangleIcon className="kpi-icon" />}
/>

<KPICard
    title="Compliance"
    value="96%"
    badge="+6%"
    icon={<ShieldCheckIcon className="kpi-icon" />}
/>

            </div>

            {/* FILTERS */}

            <SearchFilters />

            {/* MAIN CONTENT */}

            <div className="dashboard-content">

    {/* Left Section */}

    <div className="left-content">

        <ObligationTable />

        <div className="bottom-widgets">

           

            <div className="chart-section">

                <WeeklyChart />

            </div>

        </div>

    </div>

    {/* Right Section */}

    <div className="right-content">

        <Calendar />

	<UpcomingDeadlines />

    </div>

</div>

            {/* MODAL */}

            <AddObligationModal

                isOpen={isModalOpen}

                onClose={closeModal}

            />

        </div>

    );

}

export default ObligationTracker;