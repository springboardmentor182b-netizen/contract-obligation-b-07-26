import "./AddRiskModal.css";

import { useState } from "react";

import { createRisk } from "../../api/riskApi";

function AddRiskModal({ close, refresh }) {

    const [form, setForm] = useState({

        risk_name: "",

        department: "",

        severity: "Medium",

        status: "Open",

        owner: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createRisk(form);

            refresh();

            close();

        }

        catch (err) {

            console.log(err);

            alert("Unable to create risk.");

        }

    };

    return (

        <div className="risk-modal-overlay">

            <div className="risk-modal">

                <div className="risk-modal-header">

                    <h2>Add Risk</h2>

                    <button

                        className="close-btn"

                        onClick={close}

                    >

                        ×

                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Risk Name</label>

                        <input

                            type="text"

                            name="risk_name"

                            placeholder="Enter risk name"

                            value={form.risk_name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Department</label>

                        <input

                            type="text"

                            name="department"

                            placeholder="Enter department"

                            value={form.department}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Owner</label>

                        <input

                            type="text"

                            name="owner"

                            placeholder="Enter owner"

                            value={form.owner}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Severity</label>

                            <select

                                name="severity"

                                value={form.severity}

                                onChange={handleChange}

                            >

                                <option>Critical</option>

                                <option>High</option>

                                <option>Medium</option>

                                <option>Low</option>

                            </select>

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <select

                                name="status"

                                value={form.status}

                                onChange={handleChange}

                            >

                                <option>Open</option>

                                <option>Pending</option>

                                <option>In Review</option>

                                <option>Resolved</option>

                            </select>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={close}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            Save Risk

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddRiskModal;
