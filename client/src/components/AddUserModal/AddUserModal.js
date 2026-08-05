import React, { useState } from "react";
import "./AddUserModal.css";

function AddUserModal({

    isOpen,

    onClose,

    onAddUser,

    roles

}) {

    const [user, setUser] = useState({

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        department: "",

        designation: "",

        role_id: "",

        password: "",

        confirmPassword: ""

    });

    if (!isOpen) {

        return null;

    }

    const handleChange = (e) => {

        setUser({

            ...user,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (user.password !== user.confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        const requestData = {

            first_name: user.first_name,

            last_name: user.last_name,

            email: user.email,

            phone: user.phone,

            department: user.department,

            designation: user.designation,

            role_id: Number(user.role_id),

            password: user.password

        };

        try {

            await onAddUser(requestData);

            setUser({

                first_name: "",

                last_name: "",

                email: "",

                phone: "",

                department: "",

                designation: "",

                role_id: "",

                password: "",

                confirmPassword: ""

            });

            onClose();

        }

        catch (error) {

            console.error(error);

            alert("Unable to create user.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>Add New User</h2>

                    <button

                        className="close-btn"

                        onClick={onClose}

                    >

                        ×

                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <div>

                            <label>First Name</label>

                            <input

                                type="text"

                                name="first_name"

                                value={user.first_name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Last Name</label>

                            <input

                                type="text"

                                name="last_name"

                                value={user.last_name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Email</label>

                            <input

                                type="email"

                                name="email"

                                value={user.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Phone</label>

                            <input

                                type="text"

                                name="phone"

                                value={user.phone}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Department</label>

                            <input

                                type="text"

                                name="department"

                                value={user.department}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Designation</label>

                            <input

                                type="text"

                                name="designation"

                                value={user.designation}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Role</label>

                            <select

                                name="role_id"

                                value={user.role_id}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Role

                                </option>

                                {

                                    roles.map((role) => (

                                        <option

                                            key={role.role_id}

                                            value={role.role_id}

                                        >

                                            {role.role_name}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div>

                            <label>Password</label>

                            <input

                                type="password"

                                name="password"

                                value={user.password}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Confirm Password</label>

                            <input

                                type="password"

                                name="confirmPassword"

                                value={user.confirmPassword}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

                    <div className="modal-buttons">

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

                            Create User

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddUserModal;
