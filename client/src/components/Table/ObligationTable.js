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

    search,

    status,

    priority

}) {

    const [loading, setLoading] = useState(true);

    const [obligations, setObligations] = useState([]);

    const [isEditOpen, setIsEditOpen] = useState(false);

    const [selectedObligation, setSelectedObligation] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = () => {

        setLoading(true);

        getObligations()

            .then((data) => {

                setObligations(data);

                setLoading(false);

            })

            .catch((error) => {

                console.log(error);

                setLoading(false);

            });

    };

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

        .filter((item) =>

            item.title
                .toLowerCase()
                .includes(search.toLowerCase())

        )

        .filter((item) =>

            status === ""

                ? true

                : item.status === status

        )

        .filter((item) =>

            priority === ""

                ? true

                : item.priority === priority

        );

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

                            filteredObligations.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.title}</td>

                                    <td>{item.department}</td>

                                    <td>{item.owner}</td>

                                    <td>{item.due_date}</td>

                                    <td>

                                        <span className={item.priority.toLowerCase()}>

                                            {item.priority}

                                        </span>

                                    </td>

                                    <td>

                                        <span className={item.status.toLowerCase().replace(" ", "-")}>

                                            {item.status}

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

                isOpen={isEditOpen}

                onClose={() => setIsEditOpen(false)}

                obligation={selectedObligation}

                onUpdate={handleUpdate}

            />

        </div>

    );

}

export default ObligationTable;
