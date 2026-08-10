import { useState } from "react";

import UserHeader from "../components/UserManagement/Directory/UserHeader";
import UserStats from "../components/UserManagement/Directory/UserStats";
import UserTabs from "../components/UserManagement/Directory/UserTabs";
import UserDirectory from "../components/UserManagement/Directory/UserDirectory";
import AddUserModal from "../components/UserManagement/Directory/AddUserModal";

import RolesPage from "../components/UserManagement/Roles/RolesPage";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("User Directory");

  const [showAddUserModal, setShowAddUserModal] =
    useState(false);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <UserHeader
        onAddUser={() => setShowAddUserModal(true)}
      />

      {/* Statistics */}
      <UserStats />

      {/* Tabs */}
      <UserTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">

        {activeTab === "User Directory" && (
          <UserDirectory />
        )}

        {activeTab === "Roles & Access" && (
          <RolesPage />
        )}

        {activeTab === "Permission Matrix" && (
          <div className="py-16 text-center text-gray-500">
            Permission Matrix (Coming Next)
          </div>
        )}

      </div>

      <AddUserModal
        open={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSuccess={refreshPage}
      />
    </div>
  );
};

export default UserManagement;