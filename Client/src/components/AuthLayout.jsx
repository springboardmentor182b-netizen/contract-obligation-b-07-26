import logo from "../assets/logo.png";
import LeftPanel from "./LeftPanel";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Left Panel */}
      <LeftPanel />

      {/* Right Side */}
      <div
        className="flex-grow-1 d-flex justify-content-center align-items-center p-4"
      >
        <div
          className="bg-white shadow rounded-4 p-5"
          style={{
            width: "100%",
            maxWidth: "560px",
          }}
        >
          <div className="text-center mb-4">

            <img
              src={logo}
              alt="ContractIQ"
              width="70"
              className="mb-3"
            />

            <h1
              className="fw-bold"
              style={{
                fontSize: "48px",
              }}
            >
              {title}
            </h1>

            <p
              className="text-secondary"
              style={{
                fontSize: "22px",
              }}
            >
              {subtitle}
            </p>

          </div>

          {children}

          <hr className="my-4" />

          <div className="text-center">
            <small className="text-muted">
              © 2026 ContractIQ • Enterprise Contract Management System
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthLayout;