import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    ShieldCheck,
    Bell,
    FileText,
    FolderOpen,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Search,
    ChevronRight
} from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Notification_Screen() {

    const [notifications, setNotifications] = useState([]);
const [stats, setStats] = useState({});
const [activity, setActivity] = useState([]);
const [preferences, setPreferences] = useState([]);

const getPreference = (channel) =>
    preferences.find(
        (preference) =>
            preference.channel.toLowerCase() === channel.toLowerCase()
    );

    useEffect(() => {
        // Fetch notifications
        fetch(`${API_BASE_URL}/notifications`)
            .then((response) => response.json())
            .then((data) => setNotifications(data))
            .catch((error) => console.error(error));

        // Fetch notification statistics
        fetch(`${API_BASE_URL}/notification-stats`)
            .then((response) => response.json())
            .then((data) => setStats(data))
            .catch((error) => console.error(error));



        // Fetch notification activity
        fetch(`${API_BASE_URL}/notification-activity`)
    .then((response) => response.json())
    .then((data) => setActivity(data))
    .catch((error) => console.error(error));

// Fetch notification preferences
        fetch(`${API_BASE_URL}/notification-preferences`)
          .then((response) => response.json())
          .then((data) => setPreferences(data))
           .catch((error) => console.error(error));

    }, []);
    return (
        <>
            <div className="container-fluid p-0">

                <div className="row g-0">

                    {/* ================= Sidebar ================= */}

                    <div className="col-12 col-md-3 col-lg-2 sidebar">

<div className="p-4 border-bottom mb-4">
    <h5 className="text-white mb-0">🛡 ContractIQ</h5>
    <small>Enterprise Suite</small>
</div>

<small className="menu-heading">MAIN MENU</small>


                        <ul className="nav flex-column mt-2">

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <LayoutDashboard size={18} className="me-2"/>
        Dashboard
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <ShieldCheck size={18} className="me-2"/>
        Compliance
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link active-menu">
        <Bell size={18} className="me-2"/>
        Notifications
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <FileText size={18} className="me-2"/>
        Reports
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <FolderOpen size={18} className="me-2"/>
        Documents
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <Users size={18} className="me-2"/>
        Users
    </a>
</li>
<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <HelpCircle size={18} className="me-2"/>
        Help & Support
    </a>
</li>

<li className="nav-item">
    <a href="#" className="nav-link sidebar-link">
        <LogOut size={18} className="me-2"/>
        Logout
    </a>
</li>                        </ul>


                    </div>

                    {/* ================= Main Content ================= */}

                    <div className="col-lg-10 p-4">

                        {/* =============== Navbar =============== */}

                        <div className="top-navbar d-flex justify-content-between align-items-center">

                            <div className="breadcrumb-section d-flex align-items-center">

                                <span>Dashboard</span>

                                <ChevronRight size={16} className="mx-2" />

                                <strong>Notifications</strong>

                            </div>

                            <div className="d-flex align-items-center">

                                <div className="search-box d-flex align-items-center px-3">

                                    <Search size={18} />

                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search..."
                                    />

                                </div>

                            </div>

                        </div>

                        {/* Next Section */}

                        {/* ================= Dashboard Header ================= */}

<div className="d-flex justify-content-between align-items-center mt-5 mb-4">

    <div>

        <h2 className="notification-title">
            Notification Dashboard
        </h2>

        <p className="notification-subtitle">
            Manage alerts, reminders, and notification preferences across all channels
        </p>

    </div>

    <button className="btn mark-read-btn">

        <i className="bi bi-check2-square me-2"></i>

        Mark All Read

    </button>

</div>
                        {/* Dashboard Header */}
                        {/* ================= Statistics Cards ================= */}

<div className="row g-4 mb-4">

    <div className="col-lg-3">
        <div className="notification-card">

            <div className="d-flex justify-content-between">

                <div>
                    <p>TOTAL NOTIFICATIONS</p>
                    <h1>{stats.total_notifications}</h1>
                    <small>Last 30 days</small>
                </div>

                <div className="card-icon">
                    <i className="bi bi-bell"></i>
                </div>

            </div>

        </div>
    </div>

    <div className="col-lg-3">
        <div className="notification-card">

            <div className="d-flex justify-content-between">

                <div>
                    <p>UNREAD</p>
                    <h1>{stats.unread}</h1>
                    <small>Requires attention</small>
                </div>

                <div className="card-icon">
                    <i className="bi bi-exclamation-circle"></i>
                </div>

            </div>

        </div>
    </div>

    <div className="col-lg-3">
        <div className="notification-card">

            <div className="d-flex justify-content-between">

                <div>
                    <p>EMAIL ALERTS</p>
                    <h1>{stats.email_alerts}</h1>
                    <small>Sent this month</small>
                </div>

                <div className="card-icon">
                    <i className="bi bi-envelope"></i>
                </div>

            </div>

            

        </div>
    </div>

    <div className="col-lg-3">
        <div className="notification-card">

            <div className="d-flex justify-content-between">

                <div>
                    <p>SMS ALERTS</p>
                    <h1>{stats.sms_alerts}</h1>
                    <small>Sent this month</small>
                </div>

                <div className="card-icon">
                    <i className="bi bi-phone"></i>
                </div>

            </div>

        </div>
    </div>

</div>


<div className="row g-4">

    {/* Notification Activity */}

    

<div className="col-lg-5">

    <div className="activity-section">

        <div className="section-header">

            <h4>Notification Activity</h4>

            <p>Alerts sent this week</p>

        </div>

        <div className="chart-placeholder">

            <div className="chart-grid">

                <div className="chart-bars">

                    {activity.map((item) => (
                        <div
                            key={item.id}
                            className="bar"
                            style={{
                                height: `${item.alerts_sent}px`
                            }}
                        ></div>
                    ))}

                </div>

                <div className="chart-labels">

                    {activity.map((item) => (
                        <span key={item.id}>{item.day}</span>
                    ))}

                </div>

            </div>

        </div>

    </div>

</div>

    {/* Notification Preferences */}

    <div className="col-lg-7">

        <div className="preference-section">

            <div className="section-header">

                <h4>Notification Preferences</h4>

                <p>Channel configuration & toggles</p>

            </div>
<div className="row g-3">

    {/* Email */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-envelope"></i>
            </div>

           <h6>Email Notifications</h6>

<small>
    {getPreference("Email")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("Email")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

    {/* SMS */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-phone"></i>
            </div>

            <h6>SMS Alerts</h6>

<small>
    {getPreference("SMS")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("SMS")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

    {/* In App */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-bell"></i>
            </div>

            <h6>In-App</h6>

<small>
    {getPreference("In-App")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("In-App")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

    {/* Contract */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-file-earmark-text"></i>
            </div>

           <h6>Contract Expiry</h6>

<small>
    {getPreference("Contract Expiry")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("Contract Expiry")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

    {/* Reminder */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-clipboard-check"></i>
            </div>

            <h6>Obligation Reminders</h6>

<small>
    {getPreference("Obligation Reminders")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("Obligation Reminders")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

    {/* Security */}
    <div className="col-md-4">
        <div className="preference-card text-center">

            <div className="preference-icon">
                <i className="bi bi-shield-lock"></i>
            </div>

            <h6>Security Alerts</h6>

<small>
    {getPreference("Security Alerts")?.sent_count || "0 sent"}
</small>

<div className="mt-3">
    <div
        className={`toggle-switch ${
            getPreference("Security Alerts")?.enabled ? "" : "off"
        }`}
    ></div>
</div>

        </div>
    </div>

</div>

        </div>

    </div>

</div>



{/* 👇 Notification Feed paste here */}

{/* ================= Notification Feed ================= */}

<div className="row mt-4">
    <div className="col-12">

        <div className="notification-feed">

            <div className="feed-header d-flex justify-content-between align-items-center">

                <h4>Notification Feed</h4>

                <div className="feed-filters">
                    <button className="active">All</button>
                    <button>Unread</button>
                    <button>Warning</button>
                    <button>Critical</button>
                </div>

            </div>

           {notifications.map((notification) => (
    <div
        key={notification.id}
        className={`feed-item ${notification.type.toLowerCase()}`}
    >
        <div>
            <h6>{notification.title}</h6>
            <small>{notification.message}</small>
        </div>

        <span>{notification.type}</span>
    </div>
))}
               </div>   {/* notification-feed */}
    </div>       {/* col-12 */}
</div>           {/* row */}

</div>   {/* col-lg-10 */}
</div>   {/* row g-0 */}
</div>   {/* container-fluid */}


</>

    );
}