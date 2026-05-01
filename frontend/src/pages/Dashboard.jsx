import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const pending = tasks.filter(t => t.status?.toLowerCase() === "pending").length;
  const progress = tasks.filter(t => t.status?.toLowerCase() === "in-progress").length;
  const done = tasks.filter(t => t.status?.toLowerCase() === "done").length;

  const overdue = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status?.toLowerCase() !== "done"
  ).length;

  const total = tasks.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  if (loading) {
    return (
      <div className="flex bg-[#0b1220] text-white min-h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-[#0b1220] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header title="Dashboard" />

        <div className="grid grid-cols-5 gap-4">
          <div className="bg-yellow-500/20 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Pending</p>
            <h2 className="text-3xl">{pending}</h2>
          </div>

          <div className="bg-blue-500/20 p-4 rounded-lg">
            <p className="text-sm text-gray-300">In Progress</p>
            <h2 className="text-3xl">{progress}</h2>
          </div>

          <div className="bg-green-500/20 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Completed</p>
            <h2 className="text-3xl">{done}</h2>
          </div>

          <div className="bg-red-500/20 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Overdue</p>
            <h2 className="text-3xl">{overdue}</h2>
          </div>

          <div className="bg-purple-500/20 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Completion</p>
            <h2 className="text-3xl">{percent}%</h2>
          </div>
        </div>
      </div>
    </div>
  );
}