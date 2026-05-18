import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import { auth, provider } from "./firebase"
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

import Sidebar from "./components/Sidebar"
import StatsCard from "./components/StatsCard"
import TaskCard from "./components/TaskCard"
import AIRecommendation from "./components/AIRecommendation"
import TopicAnalyzer from "./components/TopicAnalyzer"
import ProductivityChart from "./components/ProductivityChart"
import SyllabusAnalyzer from "./components/SyllabusAnalyzer";

function App() {

  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
        {
          id: 1,
          subject: "Mathematics Revision",
          hours: "2 Hours",
          priority: "High",
          examDate: "2026-06-01",
          completed: false
        },
        {
          id: 2,
          subject: "Physics Numericals",
          hours: "1.5 Hours",
          priority: "Medium",
          examDate: "2026-06-10",
          completed:
            false
        },
        {
          id: 3,
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
  const [streak, setStreak] = useState(0)
  const [user, setUser] = useState(null)
  const handleGoogleLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      )

      setUser(result.user)

    } catch (error) {

      console.log(error)

    }

  }
  const handleLogout = async () => {

    await signOut(auth)

    setUser(null)

  }
  const addTask = () => {

    if (!subject || !hours || !examDate) {
      return
    }

    const newTask = {
      id: Date.now(),
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

  const deleteTask = (id) => {

    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    )

    setTasks(updatedTasks)
  }

  const toggleComplete = (id) => {

    const updatedTasks = tasks.map((task) => {

      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        }
      }

      return task
    })

    setTasks(updatedTasks)

    const completedCount = updatedTasks.filter(
      (task) => task.completed
    ).length

    setStreak(completedCount)
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
  const pendingTasks =
    tasks.length - completedTasks

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
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser)

      }
    )

    return () => unsubscribe()

  }, [])
  return (
    <>

      <div className="min-h-screen bg-[#0f172a] text-white flex">
        <Sidebar />

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

            <div className="flex items-center gap-4">

              {
                user ? (

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        user.photoURL ||
                        "https://i.pravatar.cc/150?img=3"
                      }
                      alt="profile"
                      className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                    />
                    <div>

                      <p className="font-semibold">
                        {user.displayName}
                      </p>

                      <p className="text-sm text-gray-400">
                        Logged In
                      </p>

                    </div>

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
                    >
                      Logout
                    </button>

                  </div>

                ) : (

                  <button
                    onClick={handleGoogleLogin}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl transition font-semibold"
                  >
                    Sign in with Google
                  </button>

                )
              }

              <div className="bg-blue-600 px-5 py-3 rounded-2xl">
                Productivity: {productivity}%
              </div>

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
          <SyllabusAnalyzer />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

            <StatsCard
              title="Study Streak"
              value={`🔥 ${streak}`}
              icon={<Flame className="text-orange-400" />}
              valueColor="text-orange-400"
            />

            <StatsCard
              title="Total Tasks"
              value={tasks.length}
              icon={<BookOpen className="text-blue-400" />}
            />

            <StatsCard
              title="Completed"
              value={completedTasks}
              icon={<CheckCircle className="text-green-400" />}
            />

            <StatsCard
              title="High Priority"
              value={highPriorityTasks}
              icon={<Flame className="text-red-400" />}
              valueColor="text-red-400"
            />

            <StatsCard
              title="Productivity"
              value={`${productivity}%`}
              icon={<BarChart3 className="text-cyan-400" />}
            />

          </div>
          <ProductivityChart
            completedTasks={completedTasks}
            pendingTasks={pendingTasks}
          />
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

          <AIRecommendation productivity={productivity} />
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

                <TaskCard
                  key={index}
                  task={task}
                  index={index}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  getPriorityColor={getPriorityColor}
                />

              ))}

            </div>

          </div>

        </div>

      </div>
    </>

  )
}

export default App