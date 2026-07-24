import "./ComplianceHistory.css";

import { useEffect, useState } from "react";

import HistoryCard from "./HistoryCard";

import { getHistory } from "../../api/historyApi";

function ComplianceHistory() {

    const [historyData, setHistoryData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const data = await getHistory();

            setHistoryData(data);

        }

        catch (err) {

            console.log(err);

            setError("Unable to load compliance history.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="history-page">

            <div className="history-header">

                <div>

                    <h2>Compliance History</h2>

                    <p>

                        View historical compliance activities, approvals,
                        audits and policy updates across departments.

                    </p>

                </div>

            </div>

            <div className="history-timeline">

                {

                    historyData.map((item) => (

                        <HistoryCard

                            key={item.id}

                            activity={item.activity}

                            department={item.department}

                            status={item.status}

                            activityDate={item.activity_date}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default ComplianceHistory;
