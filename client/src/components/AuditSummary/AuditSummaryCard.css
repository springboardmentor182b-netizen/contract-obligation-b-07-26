import "./AuditTable.css";

import { useState } from "react";

import {
    MagnifyingGlassIcon,
    FunnelIcon,
    EyeIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

function AuditTable({ data = [] }) {

    const [search, setSearch] = useState("");

    // Ensure data is always an array
    const audits = Array.isArray(data) ? data : [];

    // Filter → Sort → Show only latest 3
    const filtered = audits
        .filter((item) => {

            return (

                item.audit_name?.toLowerCase().includes(search.toLowerCase()) ||

                item.department?.toLowerCase().includes(search.toLowerCase()) ||

                item.status?.toLowerCase().includes(search.toLowerCase())

            );

        })
        .sort((a, b) => new Date(b.id) - new Date(a.id))
        .slice(0, 3);

    return (

        <div className="audit-table-container">

            {/* Toolbar */}

            <div className="audit-toolbar">

                <div className="audit-search">

                    <MagnifyingGlassIcon className="toolbar-icon" />

                    <input
                        type="text"
                        placeholder="Search audit..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button className="audit-filter">

                    <FunnelIcon className="toolbar-icon" />

                    Filter

                </button>

            </div>

            {/* Table */}

            <table className="audit-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Audit Name</th>

                        <th>Department</th>

                        <th>Severity</th>

                        <th>Status</th>

                        <th>Audit Date</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.length > 0 ? (

                            filtered.map((audit) => (

                                <tr key={audit.id}>

                                    <td>{audit.id}</td>

                                    <td>{audit.audit_name}</td>

                                    <td>{audit.department}</td>

                                    <td>

                                        <span
                                            className={`severity-badge ${audit.severity?.toLowerCase()}`}
                                        >

                                            {audit.severity}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`status-badge ${audit.status?.toLowerCase().replace(/\s/g, "-")}`}
                                        >

                                            {audit.status}

                                        </span>

                                    </td>

                                    <td>{audit.audit_date}</td>

                                    <td>

                                        <div className="action-buttons">

                                            <button className="view-btn">

                                                <EyeIcon className="action-icon" />

                                            </button>

                                            <button className="edit-btn">

                                                <PencilSquareIcon className="action-icon" />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        color: "#64748B"
                                    }}
                                >

                                    No audit records found.

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AuditTable;
