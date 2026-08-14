import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import {getPreferences} from "../services/preferenceService";
import Header from "../components/Header";
import WelcomeBanner from "../components/WelcomeBanner";
import StatsCard from "../components/StatsCard";
import NotificationChart from "../components/NotificationChart";
import PreferenceCard from "../components/PreferenceCard";
import FeedCard from "../components/FeedCard";
import NotificationModal from "../components/NotificationModal";
import NotificationDetails from "../components/NotificationDetails";
import EditNotificationModal from "../components/EditNotificationModal";

import { getDashboardStats } from "../services/dashboardService";
//import preferenceData from "../data/preferenceData";

import {
  FaBell,
  FaExclamationCircle,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  getNotifications,
  markAllRead,
} from "../services/notificationService";

function NotificationDashboard() {
  const [notifications, setNotifications] = useState([]);

  const [stats, setStats] = useState({
    totalNotifications: 0,
    unread: 0,
    success: 0,
    warning: 0,
    critical: 0,
    info: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const loadPreferences=async()=>{

  const res=
  await getPreferences();

  setPreferences(res.data);

  }

  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {

    try {

      setLoading(true);

      const res = await getNotifications();

      setNotifications(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const [filterStatus, setFilterStatus] = useState("All");

  const [preferences, setPreferences]=useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [editNotification, setEditNotification] = useState(null);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data);

      loadDashboardStats();

    } catch (error) {
      console.log(error);
    }
  };

  const loadDashboardStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPreferences();
    loadNotifications();
    loadDashboardStats();
  }, []);

  const handleReadAll = async () => {
    try {
      await markAllRead();
      loadNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotifications = notifications.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All"
        ? true
        : item.status === filterStatus;

    return matchesSearch && matchesStatus;

  });

  if (loading) {

    return <Loading />;

  }

  return (
    <div className="dashboard-container">

      {/* Header */}
      <Header handleReadAll={handleReadAll} />

      <WelcomeBanner />

      <div className="container-fluid py-4">

        {/* Page Title */}
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

          <div>
            <h1 className="dashboard-title">
              Notification Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Manage alerts, reminders and notification preferences across your organization.
            </p>

            <span className="badge bg-primary px-3 py-2 rounded-pill">
              Live Dashboard
            </span>
          </div>

        </div>

        {/* KPI Cards */}

        <div className="row g-4 mb-4">

          <StatsCard
            title="Total Notifications"
            value={stats.totalNotifications}
            subtitle="All Notifications"
            icon={FaBell}
            color="primary"
          />

          <StatsCard
            title="Unread"
            value={stats.unread}
            subtitle="Pending"
            icon={FaExclamationCircle}
            color="warning"
          />

          <StatsCard
            title="Success"
            value={stats.success}
            subtitle="Completed"
            icon={FaCheckCircle}
            color="success"
          />

          <StatsCard
            title="Critical"
            value={stats.critical}
            subtitle="High Priority"
            icon={FaExclamationTriangle}
            color="danger"
          />

        </div>


        {/* Chart & Preferences */}

        <div className="row g-4 mb-4">

          <div className="col-lg-6">

            <NotificationChart />

          </div>

          <div className="col-lg-6">

            <div className="card border-0 shadow-sm rounded-4 h-100">

              <div className="card-body p-4">

                <h3 className="fw-bold">
                  Notification Preferences
                </h3>

                <p className="text-secondary">
                  Configure how users receive notifications.
                </p>

                <hr />

                <div className="row g-3">

                  {preferences.map((item) => (

                    <PreferenceCard
                      key={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      icon={item.icon}
                      enabled={item.enabled}
                    />

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Notification Feed */}

        <div className="card border-0 shadow-sm rounded-4">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h3 className="fw-bold mb-1">
                  Notification Feed
                </h3>

                <p className="text-secondary mb-0">
                  Recent system activities
                </p>

              </div>

              <button
                className="btn btn-primary rounded-pill px-4"
                onClick={() => setShowModal(true)}
              >
                + Create Notification
              </button>

            </div>

            {/* Search & Filter */}

    <div className="row mb-4">

      <div className="col-lg-6 mb-3">

        <input
          className="form-control"
          placeholder="🔍 Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      <div className="col-lg-6 d-flex justify-content-lg-end gap-2 flex-wrap">

        {[
          "All",
          "Success",
          "Warning",
          "Critical",
          "Info",
        ].map((status) => (

          <button
            key={status}
            className={`btn ${
              filterStatus === status
                ? "btn-primary"
                : "btn-outline-primary"
            } rounded-pill`}
            onClick={() => setFilterStatus(status)}
          >
            {status}
          </button>

        ))}

      </div>

    </div>

    {/* Empty State */}

    {filteredNotifications.length === 0 ? (

      <div className="text-center py-5">

        <h2>🔔</h2>

        
          <div className="text-center py-5">

          <h1>
            🔔
          </h1>

          <h3>
          No Notifications Found
          </h3>

          <p className="text-secondary">

          Create your first notification.

          </p>

          <button
          className="btn btn-primary"
          onClick={()=>setShowModal(true)}
          >

          Create Notification

          </button>

          </div>
          

        <p className="text-secondary">
          Try another search or filter.
        </p>

      </div>

    ) : (

              filteredNotifications.map((item) => (

                <FeedCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  source={item.source}
                  time={new Date(item.createdAt).toLocaleString()}
                  status={item.status}
                  loadNotifications={loadNotifications}

                  onView={() => {
                    setSelectedNotification(item);
                    setShowDetails(true);
                  }}

                  onEdit={() => {
                    setEditNotification(item);
                    setShowEdit(true);
                  }}

                />

              ))

            )}

          </div>

        </div>

      </div>

      {/* Modal */}

      <NotificationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loadNotifications={loadNotifications}
      />

      <NotificationDetails
        show={showDetails}
        notification={selectedNotification}
        onClose={()=>setShowDetails(false)}
      />

      <EditNotificationModal
        show={showEdit}
        notification={editNotification}
        onClose={() => setShowEdit(false)}
        loadNotifications={loadNotifications}
      />


    </div>
  );
}

export default NotificationDashboard;