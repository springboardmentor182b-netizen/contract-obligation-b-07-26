import {
  FaHome,
  FaFileContract,
  FaClipboardCheck,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column text-white p-4 shadow"
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "#0F172A",
      }}
    >
      {/* Logo */}

      <div className="text-center mb-5">

        <img
          src={logo}
          alt="ContractIQ"
          width="70"
          className="mb-3"
        />

        <h3 className="fw-bold mb-1">
          ContractIQ
        </h3>

        <small
          style={{
            color: "#94A3B8",
          }}
        >
          Enterprise Contract Platform
        </small>

      </div>

      <small
        className="text-uppercase mb-3"
        style={{
          color: "#64748B",
          letterSpacing: "2px",
        }}
      >
        Main Menu
      </small>

      <div className="d-grid gap-2">

        <button className="btn btn-primary rounded-3 text-start py-3">
          <FaHome className="me-2" />
          Dashboard
        </button>

        <button className="btn btn-dark rounded-3 text-start py-3 border-0">
          <FaFileContract className="me-2" />
          Contract Repository
        </button>

        <button className="btn btn-dark rounded-3 text-start py-3 border-0">
          <FaClipboardCheck className="me-2" />
          Obligation Tracker
        </button>

        <button className="btn btn-dark rounded-3 text-start py-3 border-0">
          <FaChartBar className="me-2" />
          Reports
        </button>

        <button className="btn btn-dark rounded-3 text-start py-3 border-0">
          <FaCog className="me-2" />
          Settings
        </button>

      </div>

      <div className="mt-auto">

        <hr style={{ borderColor: "#334155" }} />

        <div className="d-flex align-items-center mb-3">

          <img
            src={logo}
            alt=""
            width="45"
          />

          <div className="ms-3">

            <h6 className="mb-1">
              Mahesh Ingale
            </h6>

            <small
              style={{
                color: "#94A3B8",
              }}
            >
              Legal Manager
            </small>

            <div
              className="d-flex align-items-center mt-2"
            >
              <FaCircle
                size={9}
                color="#22C55E"
              />

              <small
                className="ms-2"
                style={{
                  color: "#CBD5E1",
                }}
              >
                Online
              </small>

            </div>

          </div>

        </div>

        <button
          className="btn btn-outline-danger rounded-3 w-100 py-2"
          onClick={logout}
        >
          <FaSignOutAlt className="me-2" />
          Logout
        </button>

        <p
          className="text-center mt-4"
          style={{
            color: "#64748B",
            fontSize: "12px",
          }}
        >
          Version 1.0.0
        </p>

      </div>

    </div>
  );
}

export default Sidebar;