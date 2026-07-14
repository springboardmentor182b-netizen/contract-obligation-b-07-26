import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: "#0F172A",
        color: "white",
      }}
    >
      <img
        src={logo}
        alt="ContractIQ"
        width="70"
        className="mb-4"
      />

      <div className="spinner-border text-primary mb-4"
        style={{
          width: "70px",
          height: "70px",
          borderWidth: "5px",
        }}
      ></div>

      <h3 className="fw-bold">
        Signing In
      </h3>

      <p
        style={{
          color: "#94A3B8",
        }}
      >
        Applying access policies...
      </p>

      <div
        className="progress mt-3"
        style={{
          width: "260px",
          height: "8px",
          background: "#1E293B",
        }}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{
            width: "100%",
          }}
        ></div>
      </div>

      <small
        className="mt-4"
        style={{
          color: "#64748B",
        }}
      >
        Secured with JWT • TLS 1.3 Encryption
      </small>
    </div>
  );
}

export default Loading;