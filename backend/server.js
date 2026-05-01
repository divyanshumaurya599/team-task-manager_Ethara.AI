const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/users", require("./routes/user"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// ===== FRONTEND SERVE (IMPORTANT) =====
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// port
const PORT = process.env.PORT || 5001;

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () =>
      console.log(`Server running on ${PORT} 🚀`)
    );
  })
  .catch((err) => console.log("DB Error:", err));