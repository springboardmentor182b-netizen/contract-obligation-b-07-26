import React, { useState } from "react";
import "./AddObligationModal.css";
import { addObligation } from "../api/obligationApi";
import { toast } from "react-toastify";
function AddObligationModal({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    obligationName: "",
    contract: "",
    owner: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await addObligation({

            title: formData.obligationName,

            department: formData.contract,

            owner: formData.owner,

            due_date: formData.dueDate,

            priority: formData.priority,

            status: formData.status

        });

        toast.success("Obligation Added Successfully!");

        onClose();

        window.location.reload();

    }

    catch(error){

        console.log(error);

        alert("Unable to save obligation");

    }

};

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <div className="modal-header">

          <h2>Add New Obligation</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Obligation Name</label>

            <input
              type="text"
              name="obligationName"
              placeholder="Enter obligation name"
              value={formData.obligationName}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Contract</label>

            <input
              type="text"
              name="contract"
              placeholder="Enter contract"
              value={formData.contract}
              onChange={handleChange}
              required
            />

          </div>

          <div className="row">

            <div className="form-group">

              <label>Owner</label>

              <input
                type="text"
                name="owner"
                placeholder="Owner Name"
                value={formData.owner}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label>Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="row">

            <div className="form-group">

              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option>High</option>

                <option>Medium</option>

                <option>Low</option>

              </select>

            </div>

            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>Pending</option>

                <option>In Progress</option>

                <option>Completed</option>

                <option>Overdue</option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              placeholder="Enter description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>

          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Obligation
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddObligationModal;
