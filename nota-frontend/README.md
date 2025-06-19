# 🖼️ Nota Frontend

This is the **React-based Single Page Application (SPA)** frontend for the Nota App — a full-stack notes management system. It includes user registration, login/logout, note CRUD, toast notifications, and a responsive UI with light/dark theming.

---

## ⚙️ Tech Stack

* React 19
* React Router DOM
* Axios
* React Hook Form + Yup
* Styled Components
* React Toastify
* TailwindCSS

---

## 🚀 Getting Started

### 📦 Prerequisites

* Node.js (v18 or newer)
* npm or yarn

### 📁 Local Setup

```bash
cd nota-frontend
npm install
npm start
```

Runs at: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Variables

Create a `.env` file in this directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

This base URL is used by `axios.js` to communicate with the FastAPI backend.

---

## 🧱 Project Structure

```
nota-frontend/
├── public/              # Static files (HTML, favicon, etc.)
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Route-specific views (Login, Register, Notes, Welcome)
│   ├── api/             # Axios instance setup
│   ├── App.jsx          # Main app entrypoint
│   └── index.js         # Renders React root
├── Dockerfile           # For containerized builds
├── .env                 # API base URL config
└── README.md
```

---

## ✨ Features

* 🔐 JWT-based login/logout
* ✅ Form validation with real-time feedback
* 🌙 Light/dark mode toggle
* 📦 Toast messages for user feedback
* 📱 Responsive layout for desktop & mobile
* 🧹 Clean and modular component design

---

## 🐳 Docker Usage

If using Docker:

```bash
docker build -t nota-frontend .
docker run -p 3000:3000 nota-frontend
```

Or start with Docker Compose from the root:

```bash
docker-compose up --build
```

---

## 🛠️ Available Scripts

```bash
npm start       # Start dev server
npm run build   # Production build
npm run lint    # Lint source code
npm test        # Run test suite
```

---

## 📄 License

MIT — use freely for learning or extending the project.

---

## 🙌 Acknowledgements

Inspired by simplicity-first UI principles and built for extensibility. Contributions welcome!
