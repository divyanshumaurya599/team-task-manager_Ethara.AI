🚀 Team Task Manager

This is a simple full-stack project built to manage team tasks with role-based access (Admin & Member).
The main idea is to create projects, assign tasks, and track progress in a clean and easy way.

📌 What this app does
Users can sign up and log in
Two roles:
Admin
Member
Admin can create projects and assign members
Admin can create tasks and assign them to users
Members can only see their own tasks
Members can update task status
Dashboard shows task progress and overall stats
🛠 Tech Stack

Frontend

React (Vite)
Tailwind CSS

Backend

Node.js
Express

Database

MongoDB (Atlas)
📁 Project Structure
team-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── project.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Projects.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
⚙️ How to run locally
1. Clone project
git clone <your-repo-link>
cd team-task-manager
2. Backend setup
cd backend
npm install

Create .env file:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5001

Run backend:

npm run dev
3. Frontend setup
cd frontend
npm install
npm run dev
🔐 Roles and Access
Admin
Create project
Add members
Create task
Assign task
Delete task
Member
See only assigned tasks
Update task status (in-progress / done)
📊 Dashboard

Dashboard shows:

Pending tasks
In-progress tasks
Completed tasks
Overdue tasks
Completion percentage