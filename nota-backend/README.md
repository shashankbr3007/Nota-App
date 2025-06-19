# 📝 FastAPI Notes API

A backend API for creating, managing, and storing personal notes with multi-user support, built using **FastAPI**, **PostgreSQL**, **SQLAlchemy**, and **JWT-based authentication**.

---

## 🚀 Features

- Create, read, update, and delete notes
- User registration and login with JWT tokens
- Each user sees only their own notes
- Swagger/OpenAPI documentation at `/docs`

---

## 📦 Tech Stack

- [FastAPI](https://fastapi.tiangolo.com/) – web framework
- [Uvicorn](https://www.uvicorn.org/) – ASGI server
- [SQLAlchemy](https://www.sqlalchemy.org/) – ORM
- [PostgreSQL](https://www.postgresql.org/) – database
- [Docker](https://www.docker.com/) – local PostgreSQL
- [Pydantic](https://docs.pydantic.dev/) – data validation
- [Passlib + Bcrypt](https://passlib.readthedocs.io/) – password hashing
- [JOSE](https://python-jose.readthedocs.io/) – JWT handling

---

## 🛠️ Setup Instructions

### 1. 📁 Clone the Repository

```bash
git clone https://github.com/your-username/fastapi-notes-api.git
cd fastapi-notes-api
```

### 2. 🐍 Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 3. 📦 Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. 🐘 Start PostgreSQL with Docker
```bash
docker run --name fastapi-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=notesdb -p 5432:5432 -d postgres
```

### 5. ⚙️ Set Environment Variables (Optional)
Create a .env file:
```bash
env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/notesdb
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```


### 6. 📚 Run the App

```bash 
uvicorn app.main:app --reload
```
* Swagger UI: http://localhost:8000/docs
* ReDoc: http://localhost:8000/redoc

### 🔐 Authentication
* Register: POST /users/ 
* Login: POST /token/ (returns JWT)
* Use Bearer <token> for all authenticated requests

## 📬 API Endpoints
### Notes
| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/notes`      | List all user notes |
| GET    | `/notes/{id}` | Get note by ID      |
| POST   | `/notes`      | Create a new note   |
| PUT    | `/notes/{id}` | Update a note       |
| DELETE | `/notes/{id}` | Delete a note       |

### Users
| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/users/`    | Register new user     |
| POST   | `/token/`    | Login and get JWT     |
| GET    | `/users/me/` | Get current user info |


# 🙋‍♂️ Contributing
Pull requests are welcome. For major changes, open an issue first.

