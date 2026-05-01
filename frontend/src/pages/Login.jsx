import { useState } from "react";
import API from "../api";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOGIN (FIXED)
  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      // 🔥 CRITICAL FIX (role-based system)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ❌ alert हटाया (UX better)
      // alert("Login Success ✅");

      // 🔥 HARD REDIRECT (IMPORTANT)
      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Login Failed ❌");
    }
  };

  // ✅ REGISTER (FIXED)
  const handleRegister = async () => {
    if (!role) return alert("Select Role First");

    try {
      const res = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role,
      });

      // 🔥 SAME FIX HERE
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // alert("Account Created ✅");

      window.location.href = "/dashboard";

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Register Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] relative">

      <div className="absolute w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-cyan-500 rounded-lg text-white font-bold">
            TTM
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Team Task Manager</h2>
            <p className="text-gray-400 text-xs">Ethara.AI</p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg ${
              isLogin ? "bg-cyan-500 text-white" : "bg-white/5 text-gray-300"
            }`}
          >
            Sign In
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg ${
              !isLogin ? "bg-cyan-500 text-white" : "bg-white/5 text-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* LOGIN */}
        {isLogin && (
          <>
            <p className="text-gray-400 text-xs mb-2">Role-Based Access</p>

            <div className="flex gap-2 mb-4">
              {["Admin", "Member"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-xs rounded-lg ${
                    role === r
                      ? "bg-cyan-500 text-white"
                      : "border border-white/10 text-gray-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-cyan-500 rounded-lg text-white"
            >
              Sign In →
            </button>
          </>
        )}

        {/* REGISTER */}
        {!isLogin && (
          <>
            <p className="text-gray-400 text-xs mb-2 text-center">
              Role-Based Access
            </p>

            <div className="flex gap-2 mb-4">
              {["Admin", "Member"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-xs rounded-lg ${
                    role === r
                      ? "bg-cyan-500 text-white"
                      : "border border-white/10 text-gray-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />

            <input
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full mb-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />

            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />

            <button
              onClick={handleRegister}
              className="w-full py-2 bg-cyan-500 rounded-lg text-white"
            >
              Create Account →
            </button>
          </>
        )}
      </div>
    </div>
  );
}