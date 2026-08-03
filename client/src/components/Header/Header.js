import "./Header.css";
import { exportPDF } from "../../utils/exportPDF";

function Header({ openModal, obligations }) {
  return (
    <div className="header">

      <div className="header-left">

        <div>
          <h1>Obligation Tracker</h1>

          <p>
            Track and manage contractual obligations efficiently.
          </p>
        </div>

      </div>

      <div className="header-right">
        <button

className="export-btn"

onClick={()=>exportPDF(obligations)}

>

Export PDF

</button>

        <button className="add-btn" onClick={openModal}>
          + Add Obligation
        </button>

      </div>

    </div>
  );
}

export default Header;
import "./Header.css";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { exportDashboard } from "../../api/headerApi";

function Header() {

    return (

        <div className="header">

            <div className="header-left">

                <h1>

                    Compliance Monitoring

                </h1>

                <p>

                    Track, monitor, and manage compliance across all obligations.

                </p>

            </div>

            <div className="header-right">

                <button

                    className="export-btn"

                    onClick={exportDashboard}

                >

                    <ArrowDownTrayIcon

                        className="export-icon"

                    />

                    Export Dashboard

                </button>

            </div>

        </div>

    );

}

export default Header;

import React from "react";
import "./Header.css";

import {
    BellIcon,
    MagnifyingGlassIcon,
    PlusIcon
} from "@heroicons/react/24/outline";

function Header({

    onAddUser,

    onSearch

}) {

    const loggedUser = JSON.parse(

        localStorage.getItem("user")

    );

    // Full Name
    const fullName = loggedUser?.name || "Guest User";

    // Initials
    const initials = loggedUser?.name

        ?

        loggedUser.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()

        :

        "GU";

    // Role Names
    const roleMap = {

        1: "Administrator",

        2: "Legal Manager",

        3: "Compliance Officer",

        4: "Contract Manager",

        5: "Department Head",

        6: "Employee"

    };

    const role =

        roleMap[loggedUser?.role_id] ||

        "User";

    return (

        <header className="header">

            <div className="header-left">

                <h1>

                    User Management

                </h1>
                <p>Welcome to User Authentication & Role Management</p>

            </div>

            <div className="header-right">

                <div className="header-search">

                    <MagnifyingGlassIcon

                        className="search-icon"

                    />

                    <input

                        type="text"

                        placeholder="Search users..."

                        onChange={(e) =>

                            onSearch &&

                            onSearch(e.target.value)

                        }

                    />

                </div>

                <button

                    className="add-user-btn"

                    onClick={onAddUser}

                >

                    <PlusIcon

                        className="plus-icon"

                    />

                    Add User

                </button>

                <button

                    className="notification-btn"

                >

                    <BellIcon

                        className="bell-icon"

                    />

                    <span className="notification-dot"></span>

                </button>

                <div className="profile-section">

                    <div className="profile-avatar">

                        {initials}

                    </div>

                    <div>

                        <h4>

                            {fullName}

                        </h4>

                        <p>

                            {role}

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Header;
