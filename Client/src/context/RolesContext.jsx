import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getRoles } from "../services/roleService";

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [view, setView] = useState("table");

  // Pagination
  const ROLES_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const data = await getRoles();

        const formattedRoles = data.map((role) => ({
          id: role.id,
          name: role.name,
          description: role.description ?? "",
        }));

        setRoles(formattedRoles);
      } catch (err) {
        console.error("Role fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      return (
        role.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        role.description
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [roles, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(
    filteredRoles.length / ROLES_PER_PAGE
  );

  const paginatedRoles = useMemo(() => {
    const start = (currentPage - 1) * ROLES_PER_PAGE;

    return filteredRoles.slice(
      start,
      start + ROLES_PER_PAGE
    );
  }, [filteredRoles, currentPage]);

  return (
    <RolesContext.Provider
      value={{
        roles,
        setRoles,

        filteredRoles,
        paginatedRoles,

        loading,

        search,
        setSearch,

        view,
        setView,

        currentPage,
        setCurrentPage,

        totalPages,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => useContext(RolesContext);