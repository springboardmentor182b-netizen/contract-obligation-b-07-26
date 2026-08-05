import { useState } from "react";
import { createNotification } from "../services/notificationService";
import toast from "react-hot-toast";


function NotificationModal({ show, onClose, loadNotifications }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    status: "Info",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNotification(formData);

      toast.success("Notification Created Successfully");

      loadNotifications();

      setFormData({
        title: "",
        description: "",
        source: "",
        status: "Info",
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-box">

        <h3>Create Notification</h3>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            className="form-control mb-3"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />

          <select
            className="form-select mb-4"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Info</option>
            <option>Success</option>
            <option>Warning</option>
            <option>Critical</option>
          </select>

          <div className="d-flex justify-content-end gap-2">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default NotificationModal;