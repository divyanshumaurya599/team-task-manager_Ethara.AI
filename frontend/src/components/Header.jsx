export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center mb-6">
      
      {/* LEFT SIDE TITLE */}
      <h2 className="text-2xl font-bold">
        {window.location.pathname === "/dashboard" && "Dashboard"}
        {window.location.pathname === "/tasks" && "My Tasks"}
        {window.location.pathname === "/projects" && "My Projects"}
      </h2>

      {/* RIGHT SIDE USER INFO */}
      <div className="flex items-center gap-4">
        
        {/* ROLE + NAME */}
        <div className="bg-[#111827] px-4 py-2 rounded-lg flex items-center gap-2">
          
          {/* ROLE */}
          <span className="text-xs bg-blue-600 px-2 py-1 rounded">
            {user?.role}
          </span>

          {/* NAME */}
          <span className="text-sm">
            👤 {user?.name}
          </span>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-3 py-2 rounded text-sm"
        >
          Logout
        </button>

      </div>
    </div>
  );
}