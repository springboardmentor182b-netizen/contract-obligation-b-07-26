import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";

function RiskSeverityChart({ risks }) {

    const severityData = [

        {
            name: "Critical",
            value: risks.filter(
                risk => risk.severity === "Critical"
            ).length,
            color: "#EF4444"
        },

        {
            name: "High",
            value: risks.filter(
                risk => risk.severity === "High"
            ).length,
            color: "#F97316"
        },

        {
            name: "Medium",
            value: risks.filter(
                risk => risk.severity === "Medium"
            ).length,
            color: "#FACC15"
        },

        {
            name: "Low",
            value: risks.filter(
                risk => risk.severity === "Low"
            ).length,
            color: "#22C55E"
        }

    ];

    return (

        <div
            style={{
                width: "100%",
                height: 320
            }}
        >

            <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                    <Pie

                        data={severityData}

                        dataKey="value"

                        nameKey="name"

                        cx="50%"

                        cy="50%"

                        innerRadius={70}

                        outerRadius={110}

                        paddingAngle={4}

                    >

                        {

                            severityData.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={entry.color}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend

                        verticalAlign="bottom"

                        iconType="circle"

                    />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RiskSeverityChart;
