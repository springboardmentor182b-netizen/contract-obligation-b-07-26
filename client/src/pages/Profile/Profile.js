import React from "react";
import "./Profile.css";

import {
    UserCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingOffice2Icon,
    ShieldCheckIcon,
    IdentificationIcon,
    PencilSquareIcon,
    KeyIcon
} from "@heroicons/react/24/outline";

function Profile() {

    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">

                        <UserCircleIcon className="avatar-icon" />

                    </div>

                    <div>

                        <h2>

                            {user.first_name} {user.last_name}

                        </h2>

                        <p>

                            {user.role?.role_name || "User"}

                        </p>

                    </div>

                </div>

                <div className="profile-details">

                    <div className="detail-row">

                        <EnvelopeIcon className="detail-icon"/>

                        <div>

                            <label>Email</label>

                            <span>{user.email}</span>

                        </div>

                    </div>

                    <div className="detail-row">

                        <PhoneIcon className="detail-icon"/>

                        <div>

                            <label>Phone</label>

                            <span>{user.phone}</span>

                        </div>

                    </div>

                    <div className="detail-row">

                        <BuildingOffice2Icon className="detail-icon"/>

                        <div>

                            <label>Department</label>

                            <span>{user.department}</span>

                        </div>

                    </div>

                    <div className="detail-row">

                        <IdentificationIcon className="detail-icon"/>

                        <div>

                            <label>Designation</label>

                            <span>{user.designation}</span>

                        </div>

                    </div>

                    <div className="detail-row">

                        <ShieldCheckIcon className="detail-icon"/>

                        <div>

                            <label>Role</label>

                            <span>

                                {user.role?.role_name}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="profile-buttons">

                    <button className="edit-btn">

                        <PencilSquareIcon className="btn-icon"/>

                        Edit Profile

                    </button>

                    <button className="password-btn">

                        <KeyIcon className="btn-icon"/>

                        Change Password

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profile;
