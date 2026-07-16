import React from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="table-toolbar">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search contracts..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;