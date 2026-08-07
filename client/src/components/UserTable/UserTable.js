import React from "react";
import "./UserTable.css";



function UserTable({

    users,

    onEdit,

    onDelete

}) {

    if (!users || users.length === 0) {

        return (

            <div className="empty-users">

                <h3>No Users Found</h3>

                <p>There are no users available.</p>

            </div>

        );

    }

    return (

        <div className="table-container">

            <table className="user-table">

                <thead>

                    <tr>

                        <th>Profile</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Department</th>

                        <th>Designation</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => {

                            const initials =

                                `${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`;

                            return (

                                <tr key={user.id}>

                                    {/* Profile */}

                                    <td>

                                        <div className="profile-cell">

                                            <div className="avatar">

                                                {initials.toUpperCase()}

                                            </div>

                                        </div>

                                    </td>

                                    {/* Name */}

                                    <td>

                                        <div className="name-column">

                                            <span className="user-name">

                                                {user.first_name} {user.last_name}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Email */}

                                    <td>

                                        <span className="user-email">

                                            {user.email}

                                        </span>

                                    </td>

                                    {/* Role */}

                                    <td>

                                        <span className="role-badge">

                                            {user.role?.role_name}

                                        </span>

                                    </td>

                                    {/* Department */}

                                    <td>

                                        {user.department}

                                    </td>

                                    {/* Designation */}

                                    <td>

                                        {user.designation}

                                    </td>

                                    

                                    {/* Status */}

                                    <td>

                                        <span

                                            className={

                                                user.is_active

                                                    ?

                                                    "status active"

                                                    :

                                                    "status inactive"

                                            }

                                        >

                                            {

                                                user.is_active

                                                    ?

                                                    "Active"

                                                    :

                                                    "Inactive"

                                            }

                                        </span>

                                    </td>

                                    {/* Actions */}

                                    <td>

    <div className="action-buttons">

        <button
    className="view-btn"
    onClick={() =>
        alert(
            `User Details

Name: ${user.first_name} ${user.last_name}

Email: ${user.email}

Department: ${user.department}

Designation: ${user.designation}

Role: ${user.role?.role_name}

Phone: ${user.phone}

Status: ${user.is_active ? "Active" : "Inactive"}`
        )
    }
>
    View
</button>

        <button
            className="edit-btn"
            title="Edit User"
            onClick={() => onEdit(user)}
        >
            Edit
        </button>

        <button
            className="delete-btn"
            title="Delete User"
            onClick={() => onDelete(user.id)}
        >
            Delete
        </button>

    </div>

</td>
                                </tr>

                            );

                        })

                    }

                </tbody>

            </table>

        </div>

    );

}

export default UserTable;
