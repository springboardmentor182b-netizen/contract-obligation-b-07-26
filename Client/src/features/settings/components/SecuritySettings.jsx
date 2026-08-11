import { useState } from "react";

import {
  FiLock,
  FiShield,
  FiMonitor,
  FiSmartphone,
} from "react-icons/fi";

function SecuritySettings() {

  const [security] = useState({
    passwordUpdated: "",
    twoFactorEnabled: false,
    currentSession: {
      device: "",
      status: "",
    },
    otherSession: {
      device: "",
      lastActive: "",
    },
  });

  return (
    <div className="security-section">

      <h2 className="section-title">
        Security Settings
      </h2>

      <p className="section-subtitle">
        Manage your password, authentication, and active sessions.
      </p>

      {/* Password */}

      <div className="security-card">

        <div className="security-item">

          <div className="security-left">

            <div className="security-icon">
              <FiLock />
            </div>

            <div>

              <h4 className="security-title">
                Password
              </h4>

              <p className="security-desc">
                {security.passwordUpdated ||
                  "No password information available"}
              </p>

            </div>

          </div>

          <button className="link-btn">
            Change
          </button>

        </div>

      </div>

      {/* Two Factor */}

      <div className="security-card">

        <div className="security-item">

          <div className="security-left">

            <div className="security-icon green">
              <FiShield />
            </div>

            <div>

              <h4 className="security-title">
                Two Factor Authentication
              </h4>

              <p className="security-desc">

                {security.twoFactorEnabled
                  ? "Enabled"
                  : "Disabled"}

              </p>

            </div>

          </div>

          <span
            className={`status ${
              security.twoFactorEnabled
                ? "enabled"
                : "disabled"
            }`}
          >
            {security.twoFactorEnabled
              ? "Enabled"
              : "Disabled"}
          </span>

        </div>

      </div>

      {/* Sessions */}

      <h3 className="card-heading">
        Active Sessions
      </h3>

      <div className="security-card">

        <div className="session-row">

          <div className="session-left">

            <div className="session-device">
              <FiMonitor />
            </div>

            <div>

              <h5 className="session-title">
                {security.currentSession.device ||
                  "No Active Session"}
              </h5>

              <p className="session-desc">
                {security.currentSession.status}
              </p>

            </div>

          </div>

          <span className="status current">
            Current
          </span>

        </div>

        <div className="session-row">

          <div className="session-left">

            <div className="session-device">
              <FiSmartphone />
            </div>

            <div>

              <h5 className="session-title">
                {security.otherSession.device ||
                  "No Device"}
              </h5>

              <p className="session-desc">
                {security.otherSession.lastActive}
              </p>

            </div>

          </div>

          <button className="danger-btn">
            Revoke
          </button>

        </div>

      </div>

    </div>
  );
}

export default SecuritySettings;