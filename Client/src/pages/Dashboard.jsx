import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import StatsCard from "../components/StatsCard";

function Dashboard() {
  const stats = [
    {
      title: "Active Contracts",
      value: "247",
      color: "primary",
    },
    {
      title: "Upcoming Renewals",
      value: "23",
      color: "warning",
    },
    {
      title: "Pending Obligations",
      value: "41",
      color: "success",
    },
    {
      title: "Compliance Score",
      value: "94.2%",
      color: "info",
    },
  ];

  return (
    <div
      className="container-fluid"
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div className="row">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col p-4">

          <TopNavbar />

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="fw-bold">
                Good Morning, Mahesh 👋
              </h2>

              <p className="text-muted">
                Here's what's happening with your contracts today.
              </p>

            </div>

            <button className="btn btn-primary px-4">
              + New Contract
            </button>

          </div>

          {/* Statistics */}

          <div className="row">

            {stats.map((item) => (

              <div
                className="col-lg-3 col-md-6 mb-4"
                key={item.title}
              >
                <StatsCard
                  title={item.title}
                  value={item.value}
                  color={item.color}
                />
              </div>

            ))}

          </div>

          {/* Charts */}

          <div className="row">

            <div className="col-lg-8 mb-4">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                  <h5 className="fw-bold mb-4">
                    Contract Activity
                  </h5>

                  <BarChart />

                </div>

              </div>

            </div>

            <div className="col-lg-4 mb-4">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                  <h5 className="fw-bold mb-4">
                    Portfolio by Type
                  </h5>

                  <DoughnutChart />

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Section */}

          <div className="row">

            <div className="col-lg-7 mb-4">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                  <h5 className="fw-bold mb-3">
                    Recent Activity
                  </h5>

                  <table className="table table-hover align-middle">

                    <thead>

                      <tr>

                        <th>User</th>
                        <th>Activity</th>
                        <th>Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr>

                        <td>Sarah</td>
                        <td>Created Contract</td>
                        <td>
                          <span className="badge bg-success">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr>

                        <td>David</td>
                        <td>Updated Compliance</td>
                        <td>
                          <span className="badge bg-primary">
                            Completed
                          </span>
                        </td>

                      </tr>

                      <tr>

                        <td>Lisa</td>
                        <td>Submitted Approval</td>
                        <td>
                          <span className="badge bg-warning text-dark">
                            Pending
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

            <div className="col-lg-5 mb-4">

              <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                  <h5 className="fw-bold mb-3">
                    Upcoming Deadlines
                  </h5>

                  <ul className="list-group list-group-flush">

                    <li className="list-group-item">
                      📄 Insurance Renewal
                    </li>

                    <li className="list-group-item">
                      📄 Compliance Report
                    </li>

                    <li className="list-group-item">
                      📄 Vendor Agreement
                    </li>

                    <li className="list-group-item">
                      📄 Lease Renewal
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;