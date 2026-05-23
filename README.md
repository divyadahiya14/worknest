# 💼 Worknest Task Management Dashboard

> A high-performance, dark-themed SaaS Kanban Sprint Backlog application inspired by **Jira** and **GoodDay Work** designed for streamlined developer productivity.

---

## 📸 Screenshots Placeholders

### Glassmorphic Workspace Portal
```text
┌─────────────────────────────────────────────────────────────┐
│                       Welcome to Worknest                   │
│                                                             │
│              Email:    [ developer@worknest.com ]           │
│              Password: [ •••••••••••••• ]                   │
│                                                             │
│                    [ Access Dashboard  → ]                  │
└─────────────────────────────────────────────────────────────┘
```

### Modern Active Kanban Board
```text
┌─────────────────────────────────────────────────────────────┐
│ 👤 Chloe Frazier (Intern) | Worknest OS | [ + Create Task ]  │
├───────────────┬──────────────────────────────┬──────────────┤
│    TO DO (2)  │        IN PROGRESS (1)       │   DONE (1)   │
├───────────────┼──────────────────────────────┼──────────────┤
│ 🟢 Low task   │ 🟡 Medium task (Today)       │ 🔴 High task │
│ 🔴 High task  │                              │              │
└───────────────┴──────────────────────────────┴──────────────┘
```

---

## ✨ Features Overview

* **Database-Backed Authentication**: Users register accounts via a beautiful **Sign Up Page** and log in securely, verifying details from the backend MongoDB server with session persistence using local storage.
* **Smart Kanban Workspace**: Manage task cards across **To Do**, **In Progress**, and **Done** workflow columns using responsive HTML5 drag-and-drop.
* **Smart Due-Date Highlighting**:
  * 🔴 **Overdue Tasks**: Red borders and visual pulsing error alerts warning developers of past-due targets.
  * 🟡 **Due Today Tasks**: Amber highlighted indicators.
  * 🟢 **Upcoming Tasks**: Standard slate themes. Completed tasks automatically clear warnings.
* **Loading States & Skeletons**: Smooth `animate-pulse` skeleton placeholders render while loading tasks. Loading spinners display inside buttons and forms during async authentication requests.
* **Keyboard Hotkeys**: Press `N` anywhere on the screen to spawn the task modal instantly. Focus check ignores shortcuts while the cursor is inside text fields. Press `ESC` to dismiss overlays.
* **Integrated Stats Widgets**: Live aggregation calculating task shares with customized progress color meters.
* **Live Search & Priority Filters**: Clean inputs in the header to search tasks or isolate columns by priority level (High, Medium, Low).
* **Toast Notification Drawer**: Smooth alerts gliding onto the bottom-right corner during CRUD activities (create, update state, delete).

---

## 🛠️ The Tech Stack (MERN Stack)

* **Frontend**: React 18, Vite, Tailwind CSS (v3), Axios, Lucide Icons
* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose (ODM)

---

## 📂 Folder Structure

```text
worknest/
├── backend/
│   ├── config/db.js          # Mongoose database connection
│   ├── controllers/
│   │   ├── taskController.js # Tasks CRUD with database fallback
│   │   └── userController.js # Signup & Login logic with memory fallback
│   ├── models/
│   │   ├── Task.js           # Task database schema (Mongoose)
│   │   └── User.js           # User credentials schema (Mongoose)
│   ├── routes/
│   │   ├── taskRoutes.js     # Task API paths
│   │   └── userRoutes.js     # User registration API paths
│   ├── .env.example          # Backend settings templates
│   └── server.js             # Express API entry configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx   # Tab layout navigation drawer
│   │   │   ├── Navbar.jsx    # Header controllers and search inputs
│   │   │   ├── KanbanBoard.jsx # Columns structure & drop handlers
│   │   │   ├── TaskCard.jsx  # Draggable task ticket with due-date alert
│   │   │   ├── AddTaskModal.jsx # overlay task inputs forms
│   │   │   └── DashboardCards.jsx # Core metrics statistics cards
│   │   ├── pages/
│   │   │   ├── Login.jsx     # Credentials validation screen
│   │   │   ├── Signup.jsx    # User registration screen
│   │   │   └── Dashboard.jsx # Contents routing panel selector
│   │   ├── services/api.js   # Centralized Axios API request client
│   │   ├── App.jsx           # Global state hub, toast manager, and hotkeys
│   │   └── index.css         # Global directives and scrollbars CSS
│   ├── .env.example          # Frontend Vite environment template
│   └── tailwind.config.js    # Content selectors and theme colors
│
└── .env.example              # Universal configuration template
```

---

## ⚡ Environmental Setup & Files

Copy the provided `.env.example` templates to configure environment variables.

### Backend `.env` (`/backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/worknest
```

### Frontend `.env` (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Installation & Local Startup

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v18+ recommended).
* Optional: A running local [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas URI link.

### Step 1: Clone and install packages
```bash
# Clone the workspace and go to backend
cd backend
npm install

# In a new terminal window, go to frontend
cd frontend
npm install
```

### Step 2: Boot servers
```bash
# In the backend terminal tab
npm start

# In the frontend terminal tab
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser to view the application.

---

## 📡 REST API Route Endpoints

| HTTP Method | Route Endpoint | Action | Description |
|---|---|---|---|
| **POST** | `/api/users/signup` | User Sign Up | Registers a new account inside MongoDB |
| **POST** | `/api/users/login` | User Login | Authenticates email & password |
| **GET** | `/api/tasks` | Fetch Tasks | Returns all tasks (newest first) |
| **POST** | `/api/tasks` | Add Task | Saves a fresh task |
| **PUT** | `/api/tasks/:id` | Update Task | Alters task status or detail fields |
| **DELETE** | `/api/tasks/:id` | Delete Task | Removes task from database |

---

## 🧠 Core Engineering Principles

### 1. Dual-Mode DB Resiliency
To guarantee 100% operational uptime for code reviewers, the backend includes an **intelligent fallback**: if a connection to MongoDB cannot be established, the Express controllers automatically alert the logs and host operations inside a **volatile in-memory JavaScript data store** seeded with sample items. This lets recruiters preview the MERN CRUD functionalities immediately without setting up databases!

### 2. Optimistic UI Updates
To prevent drag lags or deletion freezes, all status updates and deletion calls perform **Optimistic UI Updates**. When you drag a card to another column, the task lists state is rearranged instantly on the client. Axios then syncs this update on the server in the background. In case of network errors, the client rolls back status and triggers a warning toast alert.

---

## 🔮 Future Improvements Roadmap
1. **Password Encryption**: Integrate `bcryptjs` hashing in the backend registration controller.
2. **JWT Route Guard Protection**: Lock down task API routes behind JSON Web Token headers.
3. **Collaboration Ticker**: Integrate WebSockets (Socket.io) to sync card changes instantly across multiple open browsers in real-time.
