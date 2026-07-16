import React, { useState } from "react";
import "./NewContractModal.css";

const NewContractModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    dept: "IT",
    category: "Service Agreements",
    status: "Draft",
    value: "",
    expiry: "",
    version: "v1.0",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.party || !formData.value) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(formData);

    setFormData({
      name: "",
      party: "",
      dept: "IT",
      category: "Service Agreements",
      status: "Draft",
      value: "",
      expiry: "",
      version: "v1.0",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>New Contract</h2>

        <input
          type="text"
          name="name"
          placeholder="Contract Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="party"
          placeholder="Party"
          value={formData.party}
          onChange={handleChange}
        />

        <select
          name="dept"
          value={formData.dept}
          onChange={handleChange}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Legal</option>
          <option>Operations</option>
          <option>Procurement</option>
          <option>Strategy</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Service Agreements</option>
          <option>Lease Agreements</option>
          <option>Employment Contracts</option>
          <option>Vendor Contracts</option>
          <option>Purchase Agreements</option>
          <option>Partnership Agreements</option>
          <option>Confidentiality Agreements</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Draft</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Terminated</option>
        </select>

        <input
          type="text"
          name="value"
          placeholder="$100000"
          value={formData.value}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expiry"
          value={formData.expiry}
          onChange={handleChange}
        />

        <input
          type="text"
          name="version"
          value={formData.version}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>

          <button className="save-btn" onClick={handleSave}>
            Save Contract
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewContractModal;