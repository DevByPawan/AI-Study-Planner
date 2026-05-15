function StatsCard({
    title,
    value,
    icon,
    valueColor = "text-white"
}) {

    return (

        <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <div className="flex items-center justify-between mb-4">

                <h3 className="text-gray-400">
                    {title}
                </h3>

                {icon}

            </div>

            <p className={`text-5xl font-bold ${valueColor}`}>
                {value}
            </p>

        </div>

    )
}

export default StatsCard