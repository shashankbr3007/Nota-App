from typing import Optional

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

from . import models, schemas, crud
from .auth import get_password_hash, verify_password, create_access_token
from .database import engine, SessionLocal, Base
from .util import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes API", description="An API to manage notes with FastAPI + PostgreSQL", version="1.0.0",
    contact={"name": "Shashank Beri", "email": "Shashankbr3007@gmail.com", }, docs_url="/docs",  # Optional: change path
    redoc_url="/redoc",  # Optional: change path
    openapi_url="/openapi.json"  # Optional: change path
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ exact frontend origin
    allow_credentials=True,
    allow_methods=["*"],                      # ✅ allow all methods
    allow_headers=["*"],                      # ✅ allow ALL headers, including Authorization
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/notes", response_model=list[schemas.NoteOut])
def get_notes(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Note).filter(models.Note.owner_id == current_user.id).all()

@app.get("/note/{note_id}", response_model=schemas.NoteOut, tags=["Notes"])
def get_user_note_by_id(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
) -> schemas.NoteOut:
    note = get_note_for_user(db, note_id, current_user.id)
    if not note:
        raise HTTPException(
            status_code=404,
            detail=f"Note with id {note_id} not found"
        )
    return note

def get_note_for_user(db: Session, note_id: int, user_id: int) -> Optional[models.Note]:
    return db.query(models.Note)\
        .filter(user_id == models.Note.owner_id)\
        .filter(note_id == models.Note.id)\
        .first()

@app.get("/debug-routes")
def debug_routes():
    return [route.path for route in app.routes]

@app.post("/notes", response_model=schemas.NoteOut)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db),
                current_user: models.User = Depends(get_current_user)):
    print(f"Creating note for user: {current_user.id}")
    db_note = models.Note(**note.dict(), owner_id=current_user.id)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note


@app.put("/notes/{note_id}", response_model=schemas.NoteOut, tags=["Notes"])
def update_note(note_id: int, note: schemas.NoteUpdate, db: Session = Depends(get_db)):
    updated_note = crud.update_note(db, note_id, note)
    if not updated_note:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated_note


@app.delete("/notes/{note_id}", response_model=schemas.NoteOut, tags=["Notes"])
def delete_note(note_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_note(db, note_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return deleted


@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
