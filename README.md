# 📝 Nota App

A full-stack notes application built with **React** (frontend), **FastAPI** (backend), and **PostgreSQL** (database), containerized using **Docker Compose**.

---

## 📁 Project Structure

```
nota-app/
├── nota-frontend/        # React frontend (SPA)
│   ├── Dockerfile
│   ├── public/
│   └── src/
├── nota-backend/         # FastAPI backend
│   ├── Dockerfile
│   ├── app/
│   └── requirements.txt
├── docker-compose.yml    # Orchestrates frontend, backend, and db
├── .gitignore
└── README.md             # You are here
```

---

## 🚀 Getting Started

### 📦 Prerequisites

* [Docker](https://www.docker.com/) installed
* [Docker Compose](https://docs.docker.com/compose/) enabled

---

### 🔧 Local Development

```bash
git clone https://github.com/your-username/nota-app.git
cd nota-app

# Build and start everything
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000](http://localhost:8000)
* Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

To stop:

```bash
docker-compose down
```

---

## ⚙️ Environment Variables

### Frontend (`nota-frontend/.env`)

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Backend (set via `docker-compose.yml`)

```yaml
DB_HOST=postgres
DB_PORT=5432
DB_NAME=notadb
DB_USER=notadbuser
DB_PASSWORD=secretpassword
```

---

## 🐳 Docker Services

| Service  | Port | Description         |
| -------- | ---- | ------------------- |
| frontend | 3000 | React app           |
| backend  | 8000 | FastAPI app         |
| postgres | 5432 | PostgreSQL database |

---

## 🧪 Testing API

Use `/docs` or tools like Postman to test the backend:

```http
POST /login
POST /register
GET /notes
POST /notes
PUT /notes/{id}
DELETE /notes/{id}
```

---

## 📌 Notes

* Designed for rapid prototyping and production readiness.
* Includes JWT auth, toast notifications, and responsive layout.
* Easily extendable for tagging, markdown, or rich editing.

---

## 📄 License

MIT License — feel free to use, extend, and share!
