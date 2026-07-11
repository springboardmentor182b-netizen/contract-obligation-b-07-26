import "./TopActions.css";
import { FiFilter, FiDownload } from "react-icons/fi";

function TopActions() {
  return (
    <div className="top-actions">
      <button className="top-btn">
        <FiFilter />
        Filter
      </button>

      <button className="top-btn">
        <FiDownload />
        Export
      </button>
    </div>
  );
}

export default TopActions;