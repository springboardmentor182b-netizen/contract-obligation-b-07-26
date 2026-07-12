import {
  FaShieldAlt,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

function ComplianceSummary() {
  return (
    <div className="summary-section">

      <div className="summary-card green">
        <FaShieldAlt />
        <div>
          <h2>142</h2>
          <p>Compliant</p>
        </div>
      </div>

      <div className="summary-card orange">
        <FaClock />
        <div>
          <h2>28</h2>
          <p>Pending</p>
        </div>
      </div>

      <div className="summary-card red">
        <FaShieldAlt />
        <div>
          <h2>19</h2>
          <p>Delayed</p>
        </div>
      </div>

      <div className="summary-card pink">
        <FaShieldAlt />
        <div>
          <h2>11</h2>
          <p>Non-Compliant</p>
        </div>
      </div>

      <div className="summary-card purple">
        <FaExclamationCircle />
        <div>
          <h2>6</h2>
          <p>High Risk</p>
        </div>
      </div>

    </div>
  );
}

export default ComplianceSummary;