import {
    CheckCircle,
    Trash2,
    Clock3
} from "lucide-react"

function TaskCard({
    task,
    index,
    toggleComplete,
    deleteTask,
    getPriorityColor
}) {

    return (

        <div
            className="flex justify-between items-center bg-[#0f172a] p-5 rounded-2xl"
        >

            <div>

                <div className="flex items-center gap-3 mb-2">

                    <p
                        className={`font-semibold text-lg ${task.completed
                            ? "line-through text-gray-500"
                            : ""
                            }`}
                    >
                        {task.subject}
                    </p>

                    <span
                        className={`${getPriorityColor(task.priority)} text-xs px-3 py-1 rounded-full`}
                    >
                        {task.priority}
                    </span>

                </div>

                <div className="flex items-center gap-2 text-blue-400 text-sm">

                    <Clock3 size={16} />

                    {task.hours}

                </div>

                <p className="text-gray-400 text-sm mt-2">
                    Exam Date: {task.examDate}
                </p>

            </div>

            <div className="flex gap-3">

                <button
                    onClick={() => toggleComplete(task.id)}
                    className="bg-green-600 px-4 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                >

                    <CheckCircle size={18} />

                    {task.completed ? "Undo" : "Done"}

                </button>

                <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 px-4 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2"
                >

                    <Trash2 size={18} />

                    Delete

                </button>

            </div>

        </div>

    )
}

export default TaskCard