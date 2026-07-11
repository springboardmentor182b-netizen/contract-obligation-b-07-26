
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    
    <div className="search-filter-bar">
     <div className="search-box">
        <FiSearch className="search-icon" />
        <input
            type="text"
            placeholder="Search contracts..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
     </div>

     <div className="filter-tabs">
        <button className="active">All (12)</button>
        <button>Draft</button>
        <button>Under Review</button>
        <button>Approved</button>
        <button>Active</button>
        <button>Expired</button>
        <button>Terminated</button>
     </div>
    </div>
  );
}

export default SearchBar;