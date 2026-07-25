import { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            User Management
          </h1>
          <p className="text-gray-500">
            Manage all users in the system.
          </p>
        </div>

        <button className="rounded-lg bg-yellow-500 px-5 py-2 font-semibold text-white hover:bg-yellow-600">
          + Add User
        </button>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">ID</th>
              <th className="py-3 text-left">Username</th>
              <th className="py-3 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3">{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;