import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const getProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const getUsers = async () => {
    const res = await API.get("/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    getProjects();
    getUsers();
  }, []);

  const createProject = async () => {
    if (!name) return alert("Enter project name");

    await API.post("/projects", {
      name,
      members: selectedMembers,
    });

    alert("✅ Project Created");

    setName("");
    setSelectedMembers([]);
    getProjects();
  };

  const toggleMember = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  return (
    <div className="flex bg-[#0b1220] text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header title="My Projects" />

        {/* ADMIN ONLY CREATE */}
        {user?.role === "Admin" && (
          <div className="bg-[#111827] p-6 rounded-lg mb-6">
            <input
              placeholder="Project name"
              className="w-full p-3 mb-4 bg-black rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <h4 className="mb-2 text-gray-300">Select Members:</h4>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {users.map((u) => (
                <label key={u._id} className="flex gap-2 bg-black p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(u._id)}
                    onChange={() => toggleMember(u._id)}
                  />
                  {u.name}
                </label>
              ))}
            </div>

            <button
              onClick={createProject}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Create Project
            </button>
          </div>
        )}

        {/* PROJECT LIST */}
        <div className="grid grid-cols-2 gap-4">
          {projects.length === 0 && (
            <p>No projects found</p>
          )}

          {projects.map((p) => (
            <div key={p._id} className="bg-[#111827] p-4 rounded-lg">
              <h3 className="text-lg font-bold">{p.name}</h3>

              <p className="text-gray-400 text-sm mt-2">Members:</p>

              <div className="text-sm">
                {p.members.length > 0
                  ? p.members.map((m) => m.name).join(", ")
                  : "No members"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}