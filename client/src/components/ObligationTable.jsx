import "./ObligationTable.css";

function ObligationTable() {

    return (

        <div className="table-card">

            <h2>Obligations</h2>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Obligation</th>

                        <th>Contract</th>

                        <th>Owner</th>

                        <th>Due Date</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>OT-01</td>

                        <td>Renew Insurance Certificate</td>

                        <td>Insurance Policy</td>

                        <td>Emma</td>

                        <td>08 Aug 2026</td>

                        <td>
                            <span className="high">
                                High
                            </span>
                        </td>

                        <td>
                            <span className="pending">
                                Pending
                            </span>
                        </td>

                        <td>

                            <button className="view-btn">

                                View

                            </button>

                        </td>

                    </tr>

                    <tr>

                        <td>OT-02</td>

                        <td>Submit Vendor Documents</td>

                        <td>Service Contract</td>

                        <td>Olivia</td>

                        <td>22 Aug 2026</td>

                        <td>

                            <span className="medium">

                                Medium

                            </span>

                        </td>

                        <td>

                            <span className="progress">

                                In Progress

                            </span>

                        </td>

                        <td>

                            <button className="view-btn">

                                View

                            </button>

                        </td>

                    </tr>

                    <tr>

                        <td>OT-03</td>

                        <td>Update Monthly Compliance Report</td>

                        <td>Vendor Agreement</td>

                        <td>Isabella</td>

                        <td>28 Aug 2026</td>

                        <td>

                            <span className="low">

                                Low

                            </span>

                        </td>

                        <td>

                            <span className="completed">

                                Completed

                            </span>

                        </td>

                        <td>

                            <button className="view-btn">

                                View

                            </button>

                        </td>

                    </tr>

                   

                </tbody>

            </table>

        </div>

    );

}

export default ObligationTable;