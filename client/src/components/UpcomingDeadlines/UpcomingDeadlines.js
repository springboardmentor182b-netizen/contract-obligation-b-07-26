import "./UpcomingDeadlines.css";
import { useEffect, useState } from "react";
import BASE_URL from "../../api/api";

function UpcomingDeadlines() {

    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {

        fetch(`${BASE_URL}/dashboard/deadlines`)
            .then((response) => response.json())
            .then((data) => {
                setDeadlines(data);
            })
            .catch((error) => console.error(error));

    }, []);

    return (

        <div className="deadlines-card">

            <h3>Upcoming Deadlines</h3>

            {

                deadlines.map((item) => (

                    <div
                        className="deadline-item"
                        key={item.id}
                    >

                        <div>

                            <h4>{item.title}</h4>

                            <p>{item.owner}</p>

                        </div>

                        <div>

                            <span className="deadline-date">

                                {item.due_date}

                            </span>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default UpcomingDeadlines;
