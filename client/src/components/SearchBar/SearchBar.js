import React, { useState } from "react";

import "./SearchBar.css";

import {

    MagnifyingGlassIcon

} from "@heroicons/react/24/outline";

function SearchBar({

    users,

    onSearchResults

}) {

    const [search, setSearch] = useState("");

    const handleChange = (e) => {

        const value = e.target.value;

        setSearch(value);

        if (value.trim() === "") {

            onSearchResults(users);

            return;

        }

        const keyword = value.toLowerCase();

        const filtered = users.filter((user) => {

            const fullName =

                `${user.first_name} ${user.last_name}`

                    .toLowerCase();

            const role =

                user.role?.role_name

                    ?.toLowerCase() || "";

            return (

                fullName.includes(keyword)

                ||

                user.email.toLowerCase().includes(keyword)

                ||

                user.department.toLowerCase().includes(keyword)

                ||

                role.includes(keyword)

            );

        });

        onSearchResults(filtered);

    };

    return (

        <div className="search-bar">

            <MagnifyingGlassIcon

                className="search-icon"

            />

            <input

                type="text"

                placeholder="Search users..."

                value={search}

                onChange={handleChange}

            />

        </div>

    );

}

export default SearchBar;
