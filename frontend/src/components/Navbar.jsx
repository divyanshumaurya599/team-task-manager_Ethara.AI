import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-black/40 border-b border-white/10">
      <h1 className="text-white font-semibold">Task Manager</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm">
          {user?.name} ({user?.role})
        </span>

        <button
          onClick={logout}
          className="px-3 py-1 bg-red-500 rounded text-white text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}