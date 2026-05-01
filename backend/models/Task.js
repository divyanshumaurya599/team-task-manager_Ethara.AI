const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending",
  },

  dueDate: Date, // ✅ NEW
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);