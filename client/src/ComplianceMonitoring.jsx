export default function ComplianceMonitoring() {
    return (
        <div className="container-fluid p-0">
            <div className="row g-0">

                {/* Left Sidebar */}
                <div className="col-2 sidebar min-vh-100">
                    <div className="p-4 border-bottom">
                        <h5 className="text-white mb-0">🛡 ContractIQ</h5>
                        <small>Enterprise Suite</small>
                    </div>

                    <div className="p-3">
                        <small className="menu-heading">MAIN MENU</small>

                        <ul className="nav flex-column mt-2">
                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">▦ Dashboard</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">▤ Contracts</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">▱ Repository</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">▣ Obligations</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">↻ Renewals</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link active-menu" href="#">♢ Compliance</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">▥ Reports</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">♧ Notifications</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">♙ Users</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">⌁ Audit & Logs</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link sidebar-link" href="#">⚙ Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>

                                {/* Right Side Content */}
                <div className="col-10 main-content">

                    {/* Top Navbar */}
                    <nav className="navbar bg-white border-bottom px-4 py-3">
                        <div>
                            <span className="text-secondary">ContractIQ</span>
                            <span className="mx-2">›</span>
                            <span className="text-secondary">Compliance</span>
                            <span className="mx-2">›</span>
                            <strong>Monitoring</strong>
                        </div>

                        <div className="d-flex align-items-center ms-auto">
                            <input className="form-control me-3" type="search" placeholder="Search..." />

                            <button className="btn btn-light border me-3">♧</button>

                            <div className="d-flex align-items-center">
                                <div className="admin-icon me-2">AT</div>
                                <div>
                                    <strong>Alexandra T.</strong>
                                    <small className="d-block text-secondary">System Admin</small>
                                </div>
                            </div>
                        </div>
                    </nav>


                    {/* Compliance Monitoring */}
                    <div className="p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h3 className="fw-bold mb-1">Compliance Monitoring</h3>
                                <p className="text-secondary mb-0">
                                    Real-time compliance tracking, risk scoring, and regulatory audit management
                                </p>
                            </div>

                            <button className="btn btn-primary px-4 py-2">
                                Generate Report
                            </button>
                        </div>


                        {/* Compliance Cards */}
                        <div className="row g-3">

                            <div className="col-3">
                                <div className="dashboard-card p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="card-label">COMPLIANCE SCORE</small>
                                            <h1 className="card-number mb-1">89%</h1>
                                            <small className="text-success">↗ +2.3 pts this month</small>
                                        </div>

                                        <div className="icon-box icon-success">♢</div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-3">
                                <div className="dashboard-card p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="card-label">HIGH RISK CONTRACTS</small>
                                            <h1 className="card-number mb-1">20</h1>
                                            <small className="text-danger">↘ Needs immediate review</small>
                                        </div>

                                        <div className="icon-box icon-danger">⚠</div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-3">
                                <div className="dashboard-card p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="card-label">PENDING REVIEWS</small>
                                            <h1 className="card-number mb-1">34</h1>
                                            <small className="text-secondary">Scheduled this month</small>
                                        </div>

                                        <div className="icon-box icon-warning">◷</div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-3">
                                <div className="dashboard-card p-4">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <small className="card-label">COMPLIANT</small>
                                            <h1 className="card-number mb-1">198</h1>
                                            <small className="text-secondary">91.7% compliance rate</small>
                                        </div>

                                        <div className="icon-box icon-primary">✓</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                                                {/* Compliance Score Trend And Risk Distribution */}
                        <div className="row g-3 mt-3">

                            {/* Compliance Score Trend */}
                            <div className="col-7">
                                <div className="chart-card">
                                    <div className="p-3 border-bottom">
                                        <h5 className="fw-bold mb-1">Compliance Score Trend</h5>
                                        <small className="text-secondary">Overall score over time — 2026</small>
                                    </div>

                                    <div className="trend-chart p-4">
                                        <div className="chart-line">
                                            <span className="chart-point point-1"></span>
                                            <span className="chart-point point-2"></span>
                                            <span className="chart-point point-3"></span>
                                            <span className="chart-point point-4"></span>
                                            <span className="chart-point point-5"></span>
                                            <span className="chart-point point-6"></span>
                                            <span className="chart-point point-7"></span>
                                        </div>

                                        <div className="d-flex justify-content-between mt-4 text-secondary">
                                            <small>Jan</small>
                                            <small>Feb</small>
                                            <small>Mar</small>
                                            <small>Apr</small>
                                            <small>May</small>
                                            <small>Jun</small>
                                            <small>Jul</small>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Risk Distribution */}
                            <div className="col-5">
                                <div className="chart-card">
                                    <div className="p-3 border-bottom">
                                        <h5 className="fw-bold mb-1">Risk Distribution</h5>
                                        <small className="text-secondary">Contracts by risk level</small>
                                    </div>

                                    <div className="p-4">
                                        <div className="risk-circle mx-auto mb-3"></div>

                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <p className="mb-1 text-secondary">
                                                    <span className="text-success">●</span> Low Risk
                                                </p>

                                                <p className="mb-1 text-secondary">
                                                    <span className="text-warning">●</span> Medium Risk
                                                </p>

                                                <p className="mb-0 text-secondary">
                                                    <span className="text-danger">●</span> High Risk
                                                </p>
                                            </div>

                                            <div className="text-end">
                                                <p className="mb-1 fw-bold">142</p>
                                                <p className="mb-1 fw-bold">56</p>
                                                <p className="mb-0 fw-bold">20</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                                    {/* Compliance Register */}
                        <div className="compliance-register mt-3">

                            {/* Compliance Register Header */}
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="fw-bold mb-0">Compliance Register</h5>

                                <button className="btn btn-light border px-3">
                                    ↓ Export
                                </button>
                            </div>


                            {/* Compliance Register Table */}
                            <div className="table-responsive">
                                <table className="table compliance-table mb-0">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>CONTRACT</th>
                                            <th>RISK LEVEL</th>
                                            <th>STATUS</th>
                                            <th>SCORE</th>
                                            <th>LAST REVIEW</th>
                                            <th>NEXT REVIEW</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td className="text-primary">CMP-001</td>
                                            <td className="fw-semibold">Enterprise SaaS Agreement</td>
                                            <td><span className="risk-low">● Low</span></td>
                                            <td><span className="status-compliant">● Compliant</span></td>
                                            <td><span className="score-green">━━━━ 96%</span></td>
                                            <td>Jun 15, 2026</td>
                                            <td>Sep 15, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                        <tr>
                                            <td className="text-primary">CMP-002</td>
                                            <td className="fw-semibold">Data Processing Agreement</td>
                                            <td><span className="risk-high">● High</span></td>
                                            <td><span className="status-risk">● At Risk</span></td>
                                            <td><span className="score-orange">━━━ 62%</span></td>
                                            <td>May 30, 2026</td>
                                            <td>Jul 15, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                        <tr>
                                            <td className="text-primary">CMP-003</td>
                                            <td className="fw-semibold">Vendor Contract</td>
                                            <td><span className="risk-medium">● Medium</span></td>
                                            <td><span className="status-compliant">● Compliant</span></td>
                                            <td><span className="score-green">━━━━ 81%</span></td>
                                            <td>Jun 22, 2026</td>
                                            <td>Sep 22, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                        <tr>
                                            <td className="text-primary">CMP-004</td>
                                            <td className="fw-semibold">Software License Agreement</td>
                                            <td><span className="risk-low">● Low</span></td>
                                            <td><span className="status-compliant">● Compliant</span></td>
                                            <td><span className="score-green">━━━━ 94%</span></td>
                                            <td>Jul 1, 2026</td>
                                            <td>Oct 1, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                        <tr>
                                            <td className="text-primary">CMP-005</td>
                                            <td className="fw-semibold">IT Infrastructure Contract</td>
                                            <td><span className="risk-high">● High</span></td>
                                            <td><span className="status-non-compliant">● Non-Compliant</span></td>
                                            <td><span className="score-red">━━ 44%</span></td>
                                            <td>Jun 1, 2026</td>
                                            <td>Jul 10, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                        <tr>
                                            <td className="text-primary">CMP-006</td>
                                            <td className="fw-semibold">Office Lease Agreement</td>
                                            <td><span className="risk-medium">● Medium</span></td>
                                            <td><span className="status-compliant">● Compliant</span></td>
                                            <td><span className="score-orange">━━━ 78%</span></td>
                                            <td>Jun 28, 2026</td>
                                            <td>Sep 28, 2026</td>
                                            <td>◉　✎　♜</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}