import {
  FaTimes,
  FaBell,
  FaClock,
  FaTag,
  FaGlobe,
} from "react-icons/fa";

function NotificationDetails({
  show,
  notification,
  onClose,
}) {
  if (!show || !notification) return null;

  const statusColor = {
    Success: "#16A34A",
    Warning: "#F59E0B",
    Critical: "#DC2626",
    Info: "#2563EB",
  };

  return (
    <div className="details-overlay">

      <div className="details-panel">

        {/* Header */}

        <div className="details-header">

          <div className="d-flex align-items-center">

            <div className="details-icon">

              <FaBell />

            </div>

            <div className="ms-3">

              <h4 className="mb-0">
                Notification Details
              </h4>

              <small className="text-muted">
                View notification information
              </small>

            </div>

          </div>

          <button
            className="btn btn-light"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        <hr />

        {/* Body */}

        <div className="mt-4">

          <h5 className="fw-bold">
            {notification.title}
          </h5>

          <p className="text-secondary">
            {notification.description}
          </p>

          <div className="row mt-4">

            <div className="col-6 mb-3">

              <small className="text-muted">
                Source
              </small>

              <div className="fw-semibold">

                <FaGlobe className="me-2" />

                {notification.source}

              </div>

            </div>

            <div className="col-6 mb-3">

              <small className="text-muted">
                Status
              </small>

              <div>

                <span
                  className="badge"
                  style={{
                    background: statusColor[notification.status],
                    color: "#fff",
                  }}
                >
                  {notification.status}
                </span>

              </div>

            </div>

            <div className="col-6 mb-3">

              <small className="text-muted">
                Created
              </small>

              <div>

                <FaClock className="me-2" />

                {new Date(notification.createdAt).toLocaleString()}

              </div>

            </div>

            <div className="col-6 mb-3">

              <small className="text-muted">
                Category
              </small>

              <div>

                <FaTag className="me-2" />

                System Notification

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NotificationDetails;