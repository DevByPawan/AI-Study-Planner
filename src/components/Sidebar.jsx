import {
    LayoutDashboard,
    BookOpen,
    BarChart3,
    Bot,
    Settings
} from "lucide-react"

function Sidebar() {

    return (

        <div className="w-72 bg-[#111827] p-6 hidden md:block">

            <div className="flex items-center gap-3 mb-10">

                <Bot className="text-blue-400" size={34} />

                <h1 className="text-3xl font-bold">
                    StudyAI
                </h1>

            </div>

            <ul className="space-y-6 text-gray-300">

                <li className="flex items-center gap-3 hover:text-white cursor-pointer transition">
                    <LayoutDashboard size={20} />
                    Dashboard
                </li>

                <li className="flex items-center gap-3 hover:text-white cursor-pointer transition">
                    <BookOpen size={20} />
                    Planner
                </li>

                <li className="flex items-center gap-3 hover:text-white cursor-pointer transition">
                    <BarChart3 size={20} />
                    Analytics
                </li>

                <li className="flex items-center gap-3 hover:text-white cursor-pointer transition">
                    <Bot size={20} />
                    AI Assistant
                </li>

                <li className="flex items-center gap-3 hover:text-white cursor-pointer transition">
                    <Settings size={20} />
                    Settings
                </li>

            </ul>

        </div>

    )
}

export default Sidebar