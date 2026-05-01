const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ================= CREATE TASK (ADMIN ONLY) =================
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Only Admin can create task" });
    }

    const { title, assignedTo, project, dueDate } = req.body;

    if (!title || !assignedTo || !project) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const task = await Task.create({
      title,
      assignedTo,
      project,
      dueDate,
      status: "pending",
    });

    const populated = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Create task error" });
  }
});


// ================= GET TASKS =================
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      // Admin → ALL TASKS
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name")
        .sort({ createdAt: -1 });
    } else {
      // Member → ONLY OWN TASKS
      tasks = await Task.find({ assignedTo: req.user.id })
        .populate("assignedTo", "name email")
        .populate("project", "name")
        .sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Fetch error" });
  }
});


// ================= UPDATE TASK STATUS =================
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Member → only own task update
    if (
      req.user.role === "Member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = status || task.status;
    await task.save();

    const updated = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Update error" });
  }
});


// ================= DELETE TASK (ADMIN ONLY) =================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ msg: "Only Admin can delete" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Delete error" });
  }
});

module.exports = router;