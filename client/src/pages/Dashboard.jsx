import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-5">

      <div className="card shadow-lg p-4">

        <h2 className="text-success">
          🎉 Welcome
        </h2>

        <hr />

        <p>
          <strong>Status :</strong> Logged In Successfully
        </p>

        <p>
          JWT Token is stored securely in your browser.
        </p>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;