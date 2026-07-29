import "./ComplianceDonutChart.css";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from "recharts";

function ComplianceDonutChart({ data = [] }) {

    return (

        <div className="status-card">

            <h3>Status Distribution</h3>

            <div className="status-body">

                {/* Donut Chart */}

                <div className="status-chart">

                    <ResponsiveContainer
                        width="100%"
                        height={260}
                    >

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                outerRadius={95}
                                paddingAngle={3}
                            >

                                {

                                    data.map((item, index) => (

                                        <Cell
                                            key={index}
                                            fill={item.color}
                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* Legend */}

                <div className="status-legend">

                    {

                        data.map((item, index) => (

                            <div
                                key={index}
                                className="legend-row"
                            >

                                <div className="legend-left">

                                    <span
                                        className="legend-dot"
                                        style={{
                                            background: item.color
                                        }}
                                    />

                                    <span>

                                        {item.name}

                                    </span>

                                </div>

                                <div className="legend-right">

                                    <span>

                                        {item.value}

                                    </span>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default ComplianceDonutChart;
