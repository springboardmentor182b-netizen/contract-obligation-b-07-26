import {
  FaShieldAlt,
  FaLock,
  FaGlobe,
  FaStar,
  FaFileContract,
} from "react-icons/fa";

function LeftPanel() {
  return (
    <div
      className="d-none d-lg-flex flex-column justify-content-between text-white p-5"
      style={{
        width: "420px",
        minHeight: "100vh",
        background: "#0F172A",
      }}
    >
      {/* Logo */}
      <div>

        <div className="d-flex align-items-center mb-5">

          <div
            className="d-flex justify-content-center align-items-center rounded-3"
            style={{
              width: "44px",
              height: "44px",
              background: "#2563EB",
            }}
          >
            <FaFileContract
              size={20}
              color="white"
            />
          </div>

          <h4
            className="ms-3 fw-bold mb-0"
            style={{
              fontSize: "28px",
            }}
          >
            ContractIQ
          </h4>

        </div>

        {/* Heading */}

        <h1
          className="fw-bold text-white"
          style={{
            fontSize: "48px",
            lineHeight: "1.2",
          }}
        >
          Enterprise-grade
          <br />
          contract intelligence.
        </h1>

        {/* Description */}

        <p
          className="mt-4"
          style={{
            color: "#94A3B8",
            fontSize: "18px",
            lineHeight: "32px",
          }}
        >
          Centralize your contract portfolio,
          automate obligation tracking,
          and maintain regulatory compliance.
        </p>

        {/* Features */}

        <div className="mt-5">

          <div className="d-flex align-items-center mb-4">

            <FaShieldAlt
              className="me-3"
              color="#60A5FA"
              size={18}
            />

            <span
              style={{
                color: "#CBD5E1",
              }}
            >
              SOC 2 Type II certified platform
            </span>

          </div>

          <div className="d-flex align-items-center mb-4">

            <FaLock
              className="me-3"
              color="#60A5FA"
              size={18}
            />

            <span
              style={{
                color: "#CBD5E1",
              }}
            >
              End-to-end AES-256 encryption
            </span>

          </div>

          <div className="d-flex align-items-center">

            <FaGlobe
              className="me-3"
              color="#60A5FA"
              size={18}
            />

            <span
              style={{
                color: "#CBD5E1",
              }}
            >
              GDPR & CCPA compliant infrastructure
            </span>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div>

        <hr
          style={{
            borderColor: "#334155",
          }}
        />

        <p
          className="mt-4 mb-2"
          style={{
            color: "#94A3B8",
            fontSize: "15px",
          }}
        >
          Trusted by 500+ legal teams worldwide
        </p>

        <div
          className="mb-2"
          style={{
            color: "#FBBF24",
            fontSize: "18px",
          }}
        >
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <small
          style={{
            color: "#64748B",
          }}
        >
          4.9/5 • 2,400 reviews
        </small>

      </div>

    </div>
  );
}

export default LeftPanel;