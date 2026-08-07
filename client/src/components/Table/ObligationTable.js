import "./ObligationTable.css";
import { useEffect, useState } from "react";
import {
    getObligations,
    deleteObligation,
    updateObligation
} from "../../api";
import EditObligationModal from "../EditObligationModal";
import Loader from "../Loader/Loader";

function ObligationTable({

    obligations: propObligations,

    search,

    status,

    priority

}) {

    const [loading, setLoading] = useState(false);

    const [obligations, setObligations] = useState(propObligations || []);

    const [isEditOpen, setIsEditOpen] = useState(false);

    const [selectedObligation, setSelectedObligation] = useState(null);

    useEffect(() => {
        if (propObligations) {
            setObligations(propObligations);
        } else {
            loadData();
        }
    }, [propObligations]);

    function loadData() {

        setLoading(true);

        getObligations()

            .then((data) => {

                setObligations(data);

                setLoading(false);

            })

            .catch((error) => {

                console.error("Error loading obligations:", error);

                setLoading(false);

            });

    }

    const handleView = (item) => {

        alert(

`Title : ${item.title}

Department : ${item.department}

Owner : ${item.owner}

Due Date : ${item.due_date}

Priority : ${item.priority}

Status : ${item.status}`

        );

    };

    const handleEdit = (item) => {

        setSelectedObligation(item);

        setIsEditOpen(true);

    };

    const handleUpdate = async (updatedItem) => {

        await updateObligation(

            updatedItem.id,

            updatedItem

        );

        setIsEditOpen(false);

        loadData();

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this obligation?"
        );

        if (!confirmDelete) return;

        await deleteObligation(id);

        loadData();

    };

    // ==========================
    // SEARCH + FILTER
    // ==========================

    const filteredObligations = obligations

        .filter((item) => {
            const searchLower = search.toLowerCase();
            const title = (item.title || '').toLowerCase();
            const department = (item.department || '').toLowerCase();
            const owner = (item.owner || '').toLowerCase();
            return title.includes(searchLower) || 
                   department.includes(searchLower) || 
                   owner.includes(searchLower);
        })

        .filter((item) => {
            if (!status) return true;
            return String(item.status || '').toLowerCase() === status.toLowerCase();
        })

        .filter((item) => {
            if (!priority) return true;
            return String(item.priority || '').toLowerCase() === priority.toLowerCase();
        });

    return (

        <div className="table-card">

            <h2>Obligations</h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Title</th>

                        <th>Department</th>

                        <th>Owner</th>

                        <th>Due Date</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        loading ?

                        (

                            <tr>

                                <td colSpan="8">

                                    <Loader />

                                </td>

                            </tr>

                        )

                        :

                        filteredObligations.length > 0 ?

                        (

                            filteredObligations.map((item, index) => (

                                <tr key={item.id}>

                                    <td><span className="obligation-code">OBL-{String(index + 1).padStart(3, '0')}</span></td>

                                    <td>{item.title}</td>

                                    <td>{item.department}</td>

                                    <td>{item.owner}</td>

                                    <td>{item.due_date}</td>

                                    <td>

                                        <span className={String(item.priority || item.compliance_level || "Normal").toLowerCase()}>

                                            {item.priority || item.compliance_level || "Normal"}

                                        </span>

                                    </td>

                                    <td>

                                        <span className={String(item.status || "Pending").toLowerCase().replace(" ", "-")}>

                                            {item.status || "Pending"}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="view-btn"
                                            onClick={() => handleView(item)}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                        :

                        (

                            <tr>

                                <td
                                    colSpan="8"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        fontWeight: "bold"
                                    }}
                                >

                                    No Obligations Found

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

            <EditObligationModal

                key={selectedObligation?.id ?? "new"}

                isOpen={isEditOpen}

                onClose={() => setIsEditOpen(false)}

                obligation={selectedObligation}

                onUpdate={handleUpdate}

            />

        </div>

    );

}

export default ObligationTable;
