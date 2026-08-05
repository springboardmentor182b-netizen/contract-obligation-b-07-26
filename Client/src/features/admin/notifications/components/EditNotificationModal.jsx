import { useState, useEffect } from "react";
import { updateNotification } from "../services/notificationService";

function EditNotificationModal({
  show,
  notification,
  onClose,
  loadNotifications,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    status: "",
  });

  useEffect(() => {
    if (notification) {
      setFormData({
        title: notification.title,
        description: notification.description,
        source: notification.source,
        status: notification.status,
      });
    }
  }, [notification]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateNotification(
      notification._id,
      formData
    );

    toast.success("Notification Updated");

    loadNotifications();
    onClose();
  };

  return (
    <div className="modal-backdrop-custom">

      <div className="modal-box">

        <h3>Edit Notification</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            value={formData.title}
            onChange={(e)=>
              setFormData({
                ...formData,
                title:e.target.value
              })
            }
          />

          <textarea
            className="form-control mb-3"
            value={formData.description}
            onChange={(e)=>
              setFormData({
                ...formData,
                description:e.target.value
              })
            }
          />

          <input
            className="form-control mb-3"
            value={formData.source}
            onChange={(e)=>
              setFormData({
                ...formData,
                source:e.target.value
              })
            }
          />

          <select
            className="form-select mb-4"
            value={formData.status}
            onChange={(e)=>
              setFormData({
                ...formData,
                status:e.target.value
              })
            }
          >
            <option>Success</option>
            <option>Warning</option>
            <option>Critical</option>
            <option>Info</option>
          </select>

          <div className="d-flex justify-content-end">

            <button
              className="btn btn-primary"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditNotificationModal;