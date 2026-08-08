import React, { useState, useEffect } from "react";
import "./NewContractModal.css";

const defaultForm = {
  contract_id: "",
  category: "Service Agreements",
  name: "",
  party: "",
  department: "IT",
  status: "Draft",
  value: "",
  expiry: "",
  version: "v1.0",
};

const NewContractModal = ({
  isOpen,
  onClose,
  onSave,
  contract,
  isEditing,
}) => {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (isEditing && contract) {
      setFormData({
        contract_id: contract.contract_id || "",
        category: contract.category || "Service Agreements",
        name: contract.name || "",
        party: contract.party || "",
        department: contract.department || "IT",
        status: contract.status || "Draft",
        value: contract.value || "",
        expiry: contract.expiry
          ? contract.expiry.substring(0, 10)
          : "",
        version: contract.version || "v1.0",
      });
    } else {
      setFormData(defaultForm);
    }
  }, [contract, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !formData.contract_id ||
      !formData.name ||
      !formData.party ||
      !formData.department ||
      !formData.category ||
      !formData.value
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave({
      ...formData,
      value: Number(formData.value),
      id: contract?.id,
    });

    setFormData(defaultForm);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? "Edit Contract" : "New Contract"}</h2>

        <input
          type="text"
          name="contract_id"
          placeholder="Contract ID"
          value={formData.contract_id}
          onChange={handleChange}
          disabled={isEditing}
        />

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
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Legal">Legal</option>
          <option value="Operations">Operations</option>
          <option value="Procurement">Procurement</option>
          <option value="Strategy">Strategy</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Service Agreements">Service Agreements</option>
          <option value="Lease Agreements">Lease Agreements</option>
          <option value="Employment Contracts">Employment Contracts</option>
          <option value="Vendor Contracts">Vendor Contracts</option>
          <option value="Purchase Agreements">Purchase Agreements</option>
          <option value="Partnership Agreements">Partnership Agreements</option>
          <option value="Confidentiality Agreements">
            Confidentiality Agreements
          </option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Draft">Draft</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Terminated">Terminated</option>
        </select>

        <input
          type="number"
          step="0.01"
          name="value"
          placeholder="100000"
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
          placeholder="v1.0"
          value={formData.version}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>

          <button className="save-btn" onClick={handleSave}>
            {isEditing ? "Update Contract" : "Save Contract"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContractModal;