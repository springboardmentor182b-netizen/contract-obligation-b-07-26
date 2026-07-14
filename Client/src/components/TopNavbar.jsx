import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function TopNavbar() {
  return (
    <div
      className="bg-white rounded-4 shadow-sm px-4 py-3 mb-4 d-flex justify-content-between align-items-center"
    >

      {/* Search */}

      <div
        className="input-group"
        style={{
          width: "360px",
        }}
      >

        <span className="input-group-text bg-white border-end-0">

          <FaSearch color="#64748B" />

        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search contracts..."
        />

      </div>

      {/* Right */}

      <div className="d-flex align-items-center">

        <button
          className="btn btn-light rounded-circle position-relative me-4"
        >

          <FaBell size={20} />

          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            3
          </span>

        </button>

        <FaUserCircle
          size={42}
          color="#2563EB"
        />

        <div className="ms-3">

          <div className="fw-bold">
            Welcome, Mahesh 👋
          </div>

          <small className="text-muted">
            Legal Manager
          </small>

        </div>

      </div>

    </div>
  );
}

export default TopNavbar;