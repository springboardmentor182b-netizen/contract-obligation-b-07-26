import React, { useState, useEffect } from "react";
import "./EditUserModal.css";

function EditUserModal({

    isOpen,

    onClose,

    user,

    onUpdateUser,

    roles

}) {

    const [formData, setFormData] = useState({

        id: "",

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        department: "",

        designation: "",

        role_id: "",

        is_active: true

    });

    useEffect(() => {

        if (user) {

            setFormData({

                id: user.id,

                first_name: user.first_name || "",

                last_name: user.last_name || "",

                email: user.email || "",

                phone: user.phone || "",

                department: user.department || "",

                designation: user.designation || "",

                role_id: user.role?.role_id || user.role_id || "",

                is_active: user.is_active

            });

        }

    }, [user]);

    if (!isOpen) {

        return null;

    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleStatusChange = (e) => {

        setFormData({

            ...formData,

            is_active: e.target.checked

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const updatedUser = {

            id: formData.id,

            first_name: formData.first_name,

            last_name: formData.last_name,

            email: formData.email,

            phone: formData.phone,

            department: formData.department,

            designation: formData.designation,

            role_id: Number(formData.role_id),

            is_active: formData.is_active

        };

        try {

            await onUpdateUser(updatedUser);

            onClose();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update user.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>Edit User</h2>

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

                                value={formData.first_name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Last Name</label>

                            <input

                                type="text"

                                name="last_name"

                                value={formData.last_name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Email</label>

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Phone</label>

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Department</label>

                            <input

                                type="text"

                                name="department"

                                value={formData.department}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Designation</label>

                            <input

                                type="text"

                                name="designation"

                                value={formData.designation}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div>

                            <label>Role</label>

                            <select

                                name="role_id"

                                value={formData.role_id}

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

                        <div className="status-container">

                            <label>

                                <input

                                    type="checkbox"

                                    checked={formData.is_active}

                                    onChange={handleStatusChange}

                                />

                                Active User

                            </label>

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

                            Update User

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditUserModal;
