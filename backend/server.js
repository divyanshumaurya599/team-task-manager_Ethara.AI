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

// ===== FRONTEND SERVE =====
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== DB CONNECT =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log("DB Error:", err));