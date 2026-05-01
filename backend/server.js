const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));   // ✅ ADD 
app.use("/api/users", require("./routes/user"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// port
const PORT = process.env.PORT || 5001;

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log("DB Error:", err));
  