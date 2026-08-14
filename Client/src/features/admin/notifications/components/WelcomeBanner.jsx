import { FaPlus } from "react-icons/fa";

function WelcomeBanner() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="welcome-banner">

      <div>

        <h2>
          👋 Good Afternoon, Admin
        </h2>

        <p>
          You have <strong>3 unread</strong> notifications and
          <strong> 5 pending tasks</strong>.
        </p>

        <small>
          Last Updated : {today}
        </small>

      </div>

      <button className="create-btn">

        <FaPlus className="me-2" />

        Create Notification

      </button>

    </div>
  );
}

export default WelcomeBanner;