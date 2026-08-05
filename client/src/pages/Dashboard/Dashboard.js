import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import Header from "../../components/Header/Header";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import RoleTabs from "../../components/RoleTabs/RoleTabs";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserTable from "../../components/UserTable/UserTable";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import EditUserModal from "../../components/EditUserModal/EditUserModal";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../api/userApi";

import { getRoles } from "../../api/roleApi";

function Dashboard() {

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [selectedRole,setSelectedRole]=useState("All");

    const [roles, setRoles] = useState([]);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
    loadUsers();
    loadRoles();
}, []);

useEffect(() => {
    setFilteredUsers(users);
}, [users]);
const filterUsersByRole = (roleName) => {

    setSelectedRole(roleName);

    if (roleName === "All") {

        setFilteredUsers(users);

        return;

    }

    const filtered = users.filter(

        user =>

            user.role?.role_name === roleName

    );

    setFilteredUsers(filtered);

};
    // -----------------------------
    // Load Users
    // -----------------------------

    const loadUsers = async () => {

        try {

            const data = await getUsers();

setUsers(data);

setFilteredUsers(data);;

        }

        catch (error) {

            console.error("Error loading users:", error);

        }

    };

    // -----------------------------
    // Load Roles
    // -----------------------------

    const loadRoles = async () => {

        try {

            const data = await getRoles();

            setRoles(data);

        }

        catch (error) {

            console.error("Error loading roles:", error);

        }

    };

    // -----------------------------
    // Add User
    // -----------------------------

    const handleAddUser = async (newUser) => {

    try {

        const createdUser = await createUser(newUser);

        const updatedUsers = [

            ...users,

            createdUser

        ];

        setUsers(updatedUsers);

        setFilteredUsers(updatedUsers);

        setShowAddModal(false);

    }

    catch (error) {

        console.error(error);

    }

};

    // -----------------------------
    // Edit User
    // -----------------------------

    const handleEditUser = (user) => {

        setSelectedUser(user);

        setShowEditModal(true);

    };

    // -----------------------------
    // Update User
    // -----------------------------

    const handleUpdateUser = async (updatedUser) => {

    try {

        const updated = await updateUser(

            updatedUser.id,

            updatedUser

        );

        const updatedUsers = users.map(

            (user) =>

                user.id === updated.id

                    ? updated

                    : user

        );

        setUsers(updatedUsers);

        setFilteredUsers(updatedUsers);

        setShowEditModal(false);

    }

    catch (error) {

        console.error(error);

    }

};

    // -----------------------------
    // Delete User
    // -----------------------------

    const handleDeleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) {

        return;

    }

    try {

        await deleteUser(id);

        const updatedUsers = users.filter(

            (user) => user.id !== id

        );

        setUsers(updatedUsers);

        setFilteredUsers(updatedUsers);

    }

    catch (error) {

        console.error("Error deleting user:", error);

    }

};

    return (

        <div className="dashboard-page">

            <Header

                onAddUser={() => setShowAddModal(true)}

            />

            <div className="dashboard-container">

                

                <DashboardCards

                    users={users}

                    roles={roles}

                />

                <RoleTabs

    		  roles={roles}

    	          users={users}

                  onRoleChange={filterUsersByRole}

		/>

                <SearchBar

    users={

        selectedRole === "All"

            ?

            users

            :

            users.filter(

                user =>

                    user.role?.role_name === selectedRole

            )

    }

    onSearchResults={setFilteredUsers}

/>

                <UserTable

                    users={filteredUsers}

                    onEdit={handleEditUser}

                    onDelete={handleDeleteUser}

                />

            </div>

            <AddUserModal

                isOpen={showAddModal}

                onClose={() => setShowAddModal(false)}

                onAddUser={handleAddUser}

                roles={roles}

            />

            <EditUserModal

                isOpen={showEditModal}

                user={selectedUser}

                onClose={() => setShowEditModal(false)}

                onUpdateUser={handleUpdateUser}

                roles={roles}

            />

        </div>

    );

}

export default Dashboard;
