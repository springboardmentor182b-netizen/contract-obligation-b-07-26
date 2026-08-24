import React, { useState, useEffect } from "react";
import "./RoleTabs.css";

function RoleTabs({

    roles = [],

    users = [],

    onRoleChange

}) {

    const [activeRole, setActiveRole] = useState("All");

    useEffect(() => {

        if (onRoleChange) {

            onRoleChange("All");

        }

    }, []);

    const handleClick = (roleName) => {

        setActiveRole(roleName);

        if (onRoleChange) {

            onRoleChange(roleName);

        }

    };

    const getRoleCount = (roleName) => {

        if (roleName === "All") {

            return users.length;

        }

        return users.filter(

            (user) =>

                user.role?.role_name === roleName

        ).length;

    };

    return (

        <div className="role-tabs-container">

            <button

                className={

                    activeRole === "All"

                        ?

                        "role-tab active"

                        :

                        "role-tab"

                }

                onClick={() =>

                    handleClick("All")

                }

            >

                All

                <span className="role-count">

                    {getRoleCount("All")}

                </span>

            </button>

            {

                roles.map((role) => (

                    <button

                        key={role.role_id}

                        className={

                            activeRole === role.role_name

                                ?

                                "role-tab active"

                                :

                                "role-tab"

                        }

                        onClick={() =>

                            handleClick(role.role_name)

                        }

                    >

                        {role.role_name}

                        <span className="role-count">

                            {getRoleCount(role.role_name)}

                        </span>

                    </button>

                ))

            }

        </div>

    );

}

export default RoleTabs;
