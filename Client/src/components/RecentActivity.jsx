import {
  FaUpload,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaUserPlus,
  FaHistory,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getRecentActivity } from "../api/dashboardApi";

function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchActivity(){
      try{
        const response = await getRecentActivity();
        console.log(response);
        setActivities(response);
      }catch(error){
        console.error("Error fetching recent activity:",error);
      }
    }
    fetchActivity();
  },[]);
  return (
    <div className="recent-activity">

      <div className="activity-header">
        <h2>Recent Activity</h2>

        <span className="view-all">
          View all
        </span>
      </div>

      {activities.map((item, index) => (
        <div className="activity-item" key={index}>

          <div className="activity-icon">
            {item.type === "upload" && <FaUpload/>}
            {item.type === "approved" && <FaCheckCircle/>}
            {item.type === "reminder" && <FaClock/>}
            {item.type === "warning" && <FaExclamationTriangle/>}
            {item.type === "user" && <FaUserPlus/>}
            {item.type === "history" && <FaHistory/>}
          </div>

          <div className="activity-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <span className="activity-time">
              {item.time}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}

export default RecentActivity;