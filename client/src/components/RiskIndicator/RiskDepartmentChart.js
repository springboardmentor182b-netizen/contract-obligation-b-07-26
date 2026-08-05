import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";

function RiskDepartmentChart({ risks }) {

    const colorMap = {
        Legal: "#EF4444",
        Finance: "#F97316",
        Operations: "#FACC15",
        IT: "#3B82F6",
        HR: "#22C55E",
        Procurement: "#8B5CF6",
        Compliance: "#14B8A6",
    };

    // Count risks by department
    const departmentCounts = risks.reduce((acc, risk) => {

        const department = risk.department;

        if (acc[department]) {

            acc[department] += 1;

        } else {

            acc[department] = 1;

        }

        return acc;

    }, {});

    // Convert object to array for Recharts
    const chartData = Object.keys(departmentCounts).map((department) => ({

        department,

        risks: departmentCounts[department],

        color: colorMap[department] || "#64748B",

    }));

    return (

        <div
            style={{
                width: "100%",
                height: 320,
            }}
        >

            <ResponsiveContainer width="100%" height="100%">

                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 10,
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                    />

                    <XAxis
                        type="number"
                        tick={{ fill: "#64748B" }}
                    />

                    <YAxis
                        dataKey="department"
                        type="category"
                        tick={{ fill: "#334155" }}
                        width={110}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="risks"
                        radius={[0, 8, 8, 0]}
                        barSize={18}
                    >

                        {

                            chartData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={entry.color}
                                />

                            ))

                        }

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RiskDepartmentChart;
