import React from "react";
import "./DashboardCards.css";

import {
    UsersIcon,
    ShieldCheckIcon,
    BuildingOfficeIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/outline";

function DashboardCards({ users = [], roles = [] }) {

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.is_active
    ).length;

    const inactiveUsers = totalUsers - activeUsers;

    const totalRoles = roles.length;

    const totalDepartments = new Set(
        users.map((user) => user.department)
    ).size;

    const cards = [

        {
            title: "Total Users",
            value: totalUsers,
            icon: <UsersIcon className="card-icon" />
        },

        {
            title: "Active Users",
            value: activeUsers,
            icon: <CheckBadgeIcon className="card-icon" />
        },

        {
            title: "Departments",
            value: totalDepartments,
            icon: <BuildingOfficeIcon className="card-icon" />
        },

        {
            title: "Roles",
            value: totalRoles,
            icon: <ShieldCheckIcon className="card-icon" />
        }

    ];

    return (

        <div className="dashboard-cards">

            {

                cards.map((card, index) => (

                    <div
                        className="dashboard-card"
                        key={index}
                    >

                        <div className="card-left">

                            <h4>

                                {card.title}

                            </h4>

                            <h2>

                                {card.value}

                            </h2>

                        </div>

                        <div className="card-right">

                            {card.icon}

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default DashboardCards;
