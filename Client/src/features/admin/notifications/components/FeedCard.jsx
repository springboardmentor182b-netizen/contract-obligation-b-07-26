import { deleteNotification } from "../services/notificationService";

import {
  FaBell,
  FaEye,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

function FeedCard({
  id,
  title,
  description,
  source,
  time,
  status,
  loadNotifications,
  onView,
  onEdit,
}) {
  const statusColor = {
    Success: "#16A34A",
    Warning: "#F59E0B",
    Critical: "#DC2626",
    Info: "#2564eb02",
  };

  const statusBg = {
    Success: "#DCFCE7",
    Warning: "#FEF3C7",
    Critical: "#FEE2E2",
    Info: "#DBEAFE",
  };

  const handleDelete = async () => {
    try {
      await deleteNotification(id);
      toast.success("Notification Deleted");
      loadNotifications();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="feed-card mb-3">

      <div className="d-flex justify-content-between align-items-start">

        {/* Left */}

        <div className="d-flex">

          <div className="feed-icon">
            <FaBell />
          </div>

          <div className="ms-3">

            <div className="d-flex align-items-center gap-2">

              <h5 className="feed-title">
                {title}
              </h5>

              <span
                className="feed-status"
                style={{
                  color: statusColor[status],
                  background: statusBg[status],
                }}
              >
                {status}
              </span>

            </div>

            <div className="feed-source">

              {source}

              <span className="mx-2">•</span>

              {time}

            </div>

            <p className="feed-description">
              {description}
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="d-flex gap-2">

          {/* View */}

          <button
            className="feed-action"
            onClick={onView}
          >
            <FaEye />
          </button>

          {/* Delete */}

          <button
            className="feed-action text-danger"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>

          {/* More */}

          <button
            className="feed-action"
            onClick={onEdit}
          >
            <FaEdit />
          </button>

        </div>

      </div>

    </div>
  );
}

export default FeedCard;