import { useEffect, useState } from "react";
import "./ObligationTracker.css";
import { getObligations } from "../api/api";
import Header from "../components/Header/Header";
import KPICard from "../components/KPI/KPICard";
import SearchFilters from "../components/SearchFilters/SearchFilters";
import ObligationTable from "../components/Table/ObligationTable";
import Calendar from "../components/Calendar/Calendar";
import UpcomingDeadlines from "../components/Dashboard/UpcomingDeadlines";
import WeeklyChart from "../components/Charts/WeeklyChart";
import AddObligationModal from "../components/AddObligationModal";
import Navbar from "../layout/Navbar";
import PageContainer from "../layout/PageContainer";
import Sidebar from "../layout/Sidebar";
import { getDashboard, getProfile } from "../features/dashboard/services/dashboardApi";

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

    const [profile, setProfile] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(
        () => localStorage.getItem('contractiq_sidebar_collapsed') === 'true',
    );

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

            const rows = Array.isArray(data) ? data : [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const statusCount = (status) => rows.filter(
                (item) => String(item.status || '').toLowerCase() === status,
            ).length;
            const compliantCount = rows.filter(
                (item) => String(item.compliance_level || item.priority || '').toLowerCase() === 'compliant',
            ).length;

            setObligations(rows);
            setKpis({
                total: rows.length,
                in_progress: statusCount('in progress'),
                pending: statusCount('pending'),
                completed: statusCount('completed'),
                overdue: rows.filter((item) => {
                    const dueDate = item.due_date ? new Date(item.due_date) : null;
                    return dueDate && dueDate < today && String(item.status || '').toLowerCase() !== 'completed';
                }).length,
                risk: rows.filter((item) => /high|risk|delayed|non-compliant/i.test(String(item.compliance_level || item.priority || ''))).length,
                compliance: rows.length ? Math.round((compliantCount / rows.length) * 100) : 0,
            });

        })

        .catch((err) => console.log(err));

}, []);

    useEffect(() => {
        Promise.all([getProfile(), getDashboard()])
            .then(([user, dashboardData]) => {
                setProfile(user);
                setDashboard(dashboardData);
            })
            .catch((error) => console.log(error));
    }, []);

    const openModal = () => {

        setIsModalOpen(true);

    };

    const closeModal = () => {

        setIsModalOpen(false);

    };

    const toggleSidebar = () => {
        setSidebarCollapsed((current) => {
            const next = !current;
            localStorage.setItem('contractiq_sidebar_collapsed', String(next));
            return next;
        });
    };

    const upcomingDeadlines = obligations
        .filter((item) => item.due_date && new Date(`${item.due_date}T00:00:00`) >= new Date(new Date().setHours(0, 0, 0, 0)))
        .sort((left, right) => new Date(left.due_date) - new Date(right.due_date))
        .slice(0, 6)
        .map((item) => ({
            id: item.id,
            contract_number: item.contract_number || '—',
            obligation: item.title,
            due_date: item.due_date,
            assignee: item.owner || 'Unassigned',
            assignee_initials: String(item.owner || 'U').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
            priority: item.priority || item.compliance_level || 'Normal',
            status: item.status || 'Pending',
        }));

    return (

        <div className="app-shell">

            <Sidebar
                profile={profile}
                stats={dashboard?.stats}
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
            />

            <div className="app-main">

                <Navbar
                    profile={profile}
                    pageTitle="Obligations"
                    unreadCount={dashboard?.unread_notifications || 0}
                />

                <PageContainer>

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

                            <WeeklyChart obligations={obligations} />

                        </div>

                    </div>

                </div>

                <div className="right-content">

                    <Calendar obligations={obligations} />

                    <UpcomingDeadlines deadlines={upcomingDeadlines} compact />

                </div>

            </div>

            <AddObligationModal

                isOpen={isModalOpen}

                onClose={closeModal}

            />

                    </div>

                </PageContainer>

            </div>

        </div>

    );

}

export default ObligationTracker;
