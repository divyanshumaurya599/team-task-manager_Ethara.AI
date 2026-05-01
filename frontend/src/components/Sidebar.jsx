import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded ${
      location.pathname === path
        ? "bg-blue-600"
        : "hover:bg-gray-700"
    }`;

  return (
    <div className="w-56 bg-[#020617] p-4">
      <h1 className="text-xl font-bold mb-6">Task Track</h1>

      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/tasks" className={linkClass("/tasks")}>
          My Tasks
        </Link>

        <Link to="/projects" className={linkClass("/projects")}>
          My Projects
        </Link>
      </nav>
    </div>
  );
}