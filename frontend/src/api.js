import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manageretharaai-production.up.railway.app/api",
});

// 🔥 attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;