import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUsers } from "../services/userService";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const [view, setView] = useState("table");
  const [activeTab, setActiveTab] = useState("directory");
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination
  const USERS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      console.log("===== fetchUsers() CALLED =====");

      try {
        const data = await getUsers();

        console.log("Users received:", data);

        const formattedUsers = data.map((user) => ({
          id: user.id,
          name: user.username,
          email: user.email,
          department: "-",
          role: "-",
          status: "Active",
          contracts: 0,
          joined: "-",
          lastLogin: "-",
          permissions: [],
        }));

        console.log("Formatted users:", formattedUsers);

        setUsers(formattedUsers);

        console.log("Users state updated.");
      } catch (err) {
        console.error("User fetch error:", err);
      } finally {
        console.log("Loading finished.");
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchDepartment =
        department === "All" || user.department === department;

      const matchStatus =
        status === "All" || user.status === status;

      return matchSearch && matchDepartment && matchStatus;
    });
  }, [users, search, department, status]);

  // Reset to page 1 whenever filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, status]);

  const totalPages = Math.ceil(
    filteredUsers.length / USERS_PER_PAGE
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    const end = start + USERS_PER_PAGE;

    return filteredUsers.slice(start, end);
  }, [filteredUsers, currentPage]);

  return (
    <UsersContext.Provider
      value={{
        users,
        filteredUsers,
        paginatedUsers,
        loading,

        search,
        setSearch,

        department,
        setDepartment,

        status,
        setStatus,

        view,
        setView,

        activeTab,
        setActiveTab,

        selectedUser,
        setSelectedUser,

        currentPage,
        setCurrentPage,

        totalPages,
        USERS_PER_PAGE,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);