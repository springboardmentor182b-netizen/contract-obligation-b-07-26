import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function AuditTrendChart({ data = [] }) {

    return (

        <div
            style={{
                width: "100%",
                height: 340,
            }}
        >

            <ResponsiveContainer width="100%" height="100%">

                <LineChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#E5E7EB"
                    />

                    <XAxis
                        dataKey="month"
                        tick={{
                            fill: "#64748B",
                            fontSize: 13,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{
                            fill: "#64748B",
                            fontSize: 13,
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #E5E7EB",
                            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: "#2563EB",
                            stroke: "#FFFFFF",
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 7,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default AuditTrendChart;
