import {
  useState,
  useEffect
} from "react"

import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Bot,
  Settings,
  Trash2,
  CheckCircle,
  Clock3,
  Flame
} from "lucide-react"

function App() {

  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
        {
          subject: "Mathematics Revision",
          hours: "2 Hours",
          priority: "High",
          examDate: "2026-06-01",
          completed: false
        },
        {
          subject: "Physics Numericals",
          hours: "1.5 Hours",
          priority: "Medium",
          examDate: "2026-06-10",
          completed: false
        },
        {
          subject: "Chemistry Notes",
          hours: "1 Hour",
          priority: "Low",
          examDate: "2026-06-15",
          completed: true
        }
      ]
  })

  const [subject, setSubject] = useState("")
  const [hours, setHours] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [examDate, setExamDate] = useState("")
  const [dailyHours, setDailyHours] = useState("")
  const [syllabus, setSyllabus] = useState("")
  const [analyzedTopics, setAnalyzedTopics] = useState([])
  const addTask = () => {

    if (!subject || !hours || !examDate) {
      return
    }

    const newTask = {
      subject,
      hours,
      priority,
      examDate,
      completed: false
    }

    setTasks([...tasks, newTask])

    setSubject("")
    setHours("")
    setPriority("Medium")
    setExamDate("")
    setDailyHours("")
  }

  const deleteTask = (index) => {

    const updatedTasks = tasks.filter((_, i) => i !== index)

    setTasks(updatedTasks)
  }

  const toggleComplete = (index) => {

    const updatedTasks = [...tasks]

    updatedTasks[index].completed =
      !updatedTasks[index].completed

    setTasks(updatedTasks)
  }
  const analyzeSyllabus = () => {

    if (!syllabus) {
      return
    }

    const topics = syllabus
      .split(",")
      .map((topic) => topic.trim())

    const analyzed = topics.map((topic) => {

      let priority = "Low"

      if (
        topic.toLowerCase().includes("algorithm") ||
        topic.toLowerCase().includes("probability") ||
        topic.toLowerCase().includes("machine learning") ||
        topic.toLowerCase().includes("ai") ||
        topic.toLowerCase().includes("data structure") ||
        topic.toLowerCase().includes("operating system")
      ) {
        priority = "High"
      }

      else if (
        topic.toLowerCase().includes("graph") ||
        topic.toLowerCase().includes("database")
      ) {
        priority = "Medium"
      }

      return {
        topic,
        priority
      }

    })

    setAnalyzedTopics(analyzed)
  }
  // Local Storage
  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])

  // Productivity Logic
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const productivity = tasks.length > 0
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length

  const sortedTasks = [...tasks].sort((a, b) => {

    // High priority first
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3
    }

    // Compare priority
    if (
      priorityOrder[a.priority] !==
      priorityOrder[b.priority]
    ) {
      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      )
    }

    // Compare exam dates
    return (
      new Date(a.examDate) -
      new Date(b.examDate)
    )
  })
  const recommendedTasks = sortedTasks
    .filter((task) => !task.completed)
    .slice(0, 3)
  const roadmap = recommendedTasks.map((task, index) => {

    return {
      day: `Day ${index + 1}`,
      subject: task.subject,
      hours: task.hours,
      examDate: task.examDate,
      priority: task.priority
    }

  })
  const getPriorityColor = (priority) => {

    if (priority === "High") {
      return "bg-red-500"
    }

    if (priority === "Medium") {
      return "bg-yellow-500"
    }

    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex">

      {/* Sidebar */}
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

      {/* Main */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-2 text-lg">
              Let’s make today productive.
            </p>

          </div>

          <div className="bg-blue-600 px-5 py-3 rounded-2xl">
            Productivity: {productivity}%
          </div>

        </div>

        {/* AI Smart Scheduler */}
        <div className="bg-[#1e293b] p-6 rounded-3xl mb-8 shadow-xl">

          <h3 className="text-2xl font-bold mb-6">
            AI Smart Scheduler
          </h3>

          <div className="grid md:grid-cols-6 gap-4">

            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-[#0f172a] p-4 rounded-2xl outline-none"
            />

            <input
              type="text"
              placeholder="Study hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="bg-[#0f172a] p-4 rounded-2xl outline-none"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[#0f172a] p-4 rounded-2xl outline-none"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="bg-[#0f172a] p-4 rounded-2xl outline-none"
            />

            <input
              type="number"
              placeholder="Daily Study Hours"
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="bg-[#0f172a] p-4 rounded-2xl outline-none"
            />

            <button
              onClick={addTask}
              className="bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
            >
              Add Task
            </button>

          </div>

        </div>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">
                Total Tasks
              </h3>

              <BookOpen className="text-blue-400" />
            </div>

            <p className="text-5xl font-bold">
              {tasks.length}
            </p>

          </div>

          <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">
                Completed
              </h3>

              <CheckCircle className="text-green-400" />
            </div>

            <p className="text-5xl font-bold">
              {completedTasks}
            </p>

          </div>

          <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">
                High Priority
              </h3>

              <Flame className="text-red-400" />
            </div>

            <p className="text-5xl font-bold text-red-400">
              {highPriorityTasks}
            </p>

          </div>

          <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl">

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">
                Productivity
              </h3>

              <BarChart3 className="text-cyan-400" />
            </div>

            <p className="text-5xl font-bold">
              {productivity}%
            </p>

          </div>

        </div>

        {/* Progress */}
        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

          <div className="flex justify-between mb-4">

            <h3 className="text-2xl font-bold">
              Daily Progress
            </h3>

            <span className="text-blue-400">
              {productivity}%
            </span>

          </div>

          <div className="w-full bg-[#0f172a] rounded-full h-6">

            <div
              className="bg-blue-600 h-6 rounded-full transition-all duration-500"
              style={{ width: `${productivity}%` }}
            ></div>

          </div>

        </div>

        {/* AI Recommendation */}
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
        {/* AI Recommended Tasks */}
        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">

            <Bot className="text-cyan-400" />

            Today's AI Focus

          </h3>

          <div className="space-y-4">

            {recommendedTasks.map((task, index) => (

              <div
                key={index}
                className="bg-[#0f172a] p-5 rounded-2xl"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-semibold text-lg">
                      {task.subject}
                    </p>

                    <p className="text-blue-400 text-sm mt-1">
                      {task.hours}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Exam: {task.examDate}
                    </p>

                  </div>

                  <span
                    className={`${getPriorityColor(task.priority)} px-3 py-1 rounded-full text-sm`}
                  >
                    {task.priority}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
        {/* AI Study Roadmap */}
        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">

            <Bot className="text-cyan-400" />

            AI Study Roadmap

          </h3>

          <div className="space-y-4">

            {roadmap.map((item, index) => (

              <div
                key={index}
                className="bg-[#0f172a] p-5 rounded-2xl"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-cyan-400 font-semibold">
                      {item.day}
                    </p>

                    <p className="text-lg font-bold mt-1">
                      {item.subject}
                    </p>

                    <p className="text-blue-400 text-sm mt-1">
                      {item.hours}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Exam: {item.examDate}
                    </p>

                  </div>

                  <span
                    className={`${getPriorityColor(item.priority)} px-3 py-1 rounded-full`}
                  >
                    {item.priority}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
        {/* Task List */}
        <div className="mt-10 bg-[#1e293b] p-6 rounded-3xl shadow-xl">

          <h3 className="text-2xl font-bold mb-6">
            <p className="text-gray-400 mb-2">
              AI generated schedule based on
              exam priority and deadlines.
            </p>
            Smart Study Plan
          </h3>

          <div className="space-y-4">

            {sortedTasks.map((task, index) => (

              <div
                key={index}
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
                    onClick={() => toggleComplete(index)}
                    className="bg-green-600 px-4 py-3 rounded-xl hover:bg-green-700 transition flex items-center gap-2"
                  >

                    <CheckCircle size={18} />

                    {task.completed ? "Undo" : "Done"}

                  </button>

                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-600 px-4 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2"
                  >

                    <Trash2 size={18} />

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default App