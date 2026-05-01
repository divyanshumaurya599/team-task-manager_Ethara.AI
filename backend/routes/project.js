const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

// ================= CREATE PROJECT =================
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, members } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name required" });
    }

    const project = await Project.create({
      name,
      description: description || "",
      members: members || [],
      admin: req.user.id,
    });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Create project error" });
  }
});


// ================= GET PROJECTS (🔥 FINAL LOGIC) =================
router.get("/", auth, async (req, res) => {
  try {
    let projects;

    if (req.user.role === "Admin") {
      // ✅ Admin → ALL projects
      projects = await Project.find()
        .populate("members", "name email")
        .populate("admin", "name email");
    } else {
      // ✅ Member → ONLY assigned projects
      projects = await Project.find({
        members: req.user.id,   // 🔥 THIS IS KEY
      })
        .populate("members", "name email")
        .populate("admin", "name email");
    }

    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Fetch project error" });
  }
});


// ================= ADD MEMBER =================
router.put("/:id/add-member", auth, async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // only admin can add members
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Only admin allowed" });
    }

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Add member error" });
  }
});

module.exports = router;