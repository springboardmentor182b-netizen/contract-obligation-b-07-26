import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import UserCards from "./UserCards";
import Pagination from "./Pagination";
import UserProfile from "./UserProfile";

import { useUsers } from "../../../context/UsersContext";

const UserDirectory = () => {
  const {
    view,
    selectedUser,
    loading,
  } = useUsers();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500 text-sm">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <UserFilters />

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

        {view === "table" ? (
          <UserTable />
        ) : (
          <UserCards />
        )}

      </div>

      <Pagination />

      {selectedUser && <UserProfile />}

    </div>
  );
};

export default UserDirectory;