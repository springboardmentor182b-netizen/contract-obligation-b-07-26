import {
  FaFileContract,
  FaClock,
  FaTasks,
  FaShieldAlt,
} from "react-icons/fa";

const icons = {
  primary: <FaFileContract size={26} />,
  warning: <FaClock size={26} />,
  success: <FaTasks size={26} />,
  info: <FaShieldAlt size={26} />,
};

function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">

      <div className="card-body d-flex justify-content-between align-items-center">

        <div>

          <small className="text-muted">
            {title}
          </small>

          <h2
            className={`fw-bold mt-2 text-${color}`}
          >
            {value}
          </h2>

        </div>

        <div
          className={`bg-${color} bg-opacity-10 rounded-circle p-3 text-${color}`}
        >
          {icons[color]}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;