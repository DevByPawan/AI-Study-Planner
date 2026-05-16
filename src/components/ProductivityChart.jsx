import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts"

function ProductivityChart({
    completedTasks,
    pendingTasks
}) {

    const data = [
        {
            name: "Completed",
            value: completedTasks
        },
        {
            name: "Pending",
            value: pendingTasks
        }
    ]

    const COLORS = [
        "#22c55e",
        "#ef4444"
    ]

    return (

        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <h3 className="text-2xl font-bold mb-6">
                Productivity Analytics
            </h3>

            <div className="h-[300px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    )
}

export default ProductivityChart