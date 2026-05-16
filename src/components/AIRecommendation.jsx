import { Bot } from "lucide-react"

function AIRecommendation({
    productivity
}) {

    return (

        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">

                <Bot className="text-cyan-400" />

                AI Recommendation

            </h3>

            <p className="text-gray-300 text-lg">

                {productivity < 40
                    ? "Focus on completing high priority subjects before the exam date."
                    : productivity < 80
                        ? "Good progress! Keep revising important topics consistently."
                        : "Excellent productivity today. Your exam preparation is on track!"
                }

            </p>

        </div>

    )
}

export default AIRecommendation