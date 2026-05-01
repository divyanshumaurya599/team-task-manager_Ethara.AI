import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const t = await API.get("/tasks");
      const u = await API.get("/auth/users");
      const p = await API.get("/projects");

      setTasks(t.data);
      setUsers(u.data);
      setProjects(p.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= CREATE TASK =================
  const createTask = async () => {
    if (!title || !assignedTo || !project) {
      return alert("Fill all fields");
    }

    setCreating(true);

    try {
      await API.post("/tasks", {
        title,
        assignedTo, // MUST BE USER _id
        project,
        dueDate,
      });

      alert("✅ Task Created");

      setTitle("");
      setAssignedTo("");
      setProject("");
      setDueDate("");

      loadData();
    } catch (err) {
      console.log(err);
    }

    setCreating(false);
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    loadData();
  };

  // ================= DELETE =================
  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;

    await API.delete(`/tasks/${id}`);
    loadData();
  };

  // ================= FILTER =================
  let filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "in-progress") return t.status === "in-progress";
    if (filter === "done") return t.status === "done";
    return true;
  });

  // ================= SEARCH =================
  filteredTasks = filteredTasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#0b1220] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">

        {/* 🔥 FIXED HEADER */}
        <Header title="My Tasks" />

        {/* SEARCH */}
        <input
          placeholder="Search task..."
          className="p-2 bg-black mb-4 w-full rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER */}
        <div className="mb-4 flex gap-2">
          <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-700 rounded">
            All
          </button>
          <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-600 rounded">
            Pending
          </button>
          <button onClick={() => setFilter("in-progress")} className="px-3 py-1 bg-blue-600 rounded">
            In Progress
          </button>
          <button onClick={() => setFilter("done")} className="px-3 py-1 bg-green-600 rounded">
            Done
          </button>
        </div>

        {/* ADMIN CREATE */}
        {user?.role === "Admin" && (
          <div className="bg-[#111827] p-4 rounded mb-4 flex flex-wrap gap-2">

            <input
              placeholder="Task title"
              className="p-2 bg-black rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="p-2 bg-black rounded"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="p-2 bg-black rounded"
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-2 bg-black rounded"
            />

            <button
              disabled={creating}
              onClick={createTask}
              className="bg-green-500 px-4 py-2 rounded"
            >
              {creating ? "Creating..." : "Create Task"}
            </button>
          </div>
        )}

        {/* LOADER */}
        {loading && <p>Loading...</p>}

        {/* TASK LIST */}
        {filteredTasks.map((t) => {
          const isOverdue =
            t.dueDate &&
            new Date(t.dueDate) < new Date() &&
            t.status !== "done";

          return (
            <div key={t._id} className="bg-[#111827] p-4 mb-3 rounded">

              <p className="font-bold text-lg">{t.title}</p>
              <p>Project: {t.project?.name}</p>
              <p>Assigned: {t.assignedTo?.name}</p>
              <p>Status: {t.status}</p>

              {t.dueDate && (
                <p>Due: {new Date(t.dueDate).toDateString()}</p>
              )}

              {isOverdue && <p className="text-red-400">⚠ Overdue</p>}

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(t._id, "in-progress")}
                  className="bg-blue-500 px-3 py-1 rounded"
                >
                  Start
                </button>

                <button
                  onClick={() => updateStatus(t._id, "done")}
                  className="bg-green-500 px-3 py-1 rounded"
                >
                  Done
                </button>

                {user?.role === "Admin" && (
                  <button
                    onClick={() => deleteTask(t._id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}