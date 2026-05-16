function TopicAnalyzer({
    syllabus,
    setSyllabus,
    analyzeSyllabus,
    analyzedTopics,
    getPriorityColor
}) {

    return (

        <>

            {/* AI Topic Analyzer */}
            <div className="bg-[#1e293b] p-6 rounded-3xl mb-8 shadow-xl">

                <h3 className="text-2xl font-bold mb-6">
                    AI Syllabus Analyzer
                </h3>

                <div className="flex flex-col gap-4">

                    <textarea
                        placeholder="Enter syllabus topics separated by commas"
                        value={syllabus}
                        onChange={(e) => setSyllabus(e.target.value)}
                        className="bg-[#0f172a] p-4 rounded-2xl outline-none min-h-[120px]"
                    />

                    <button
                        onClick={analyzeSyllabus}
                        className="bg-cyan-600 hover:bg-cyan-700 transition p-4 rounded-2xl"
                    >
                        Analyze Topics
                    </button>

                </div>

            </div>

            {/* AI Analyzed Topics */}
            <div className="bg-[#1e293b] p-6 rounded-3xl mb-8 shadow-xl">

                <h3 className="text-2xl font-bold mb-6">
                    AI Topic Priority Analysis
                </h3>

                <div className="space-y-4">

                    {analyzedTopics.map((item, index) => (

                        <div
                            key={index}
                            className="bg-[#0f172a] p-4 rounded-2xl flex justify-between items-center"
                        >

                            <p className="font-semibold">
                                {item.topic}
                            </p>

                            <span
                                className={`${getPriorityColor(item.priority)} px-3 py-1 rounded-full`}
                            >
                                {item.priority}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </>

    )
}

export default TopicAnalyzer