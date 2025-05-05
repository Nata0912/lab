from fastapi import FastAPI
from models import Base
from database import engine

app = FastAPI()

# Створення таблиць у БД при першому запуску
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Voting App Backend працює"}


from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import SessionLocal
from auth import hash_password, verify_password, create_access_token
from models import User
from pydantic import BaseModel

class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(user: RegisterSchema, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


from fastapi import Header
from jose import jwt, JWTError
from auth import SECRET_KEY, ALGORITHM
from models import Poll

class PollSchema(BaseModel):
    title: str
    description: str

def get_current_user(token: str = Header(..., alias="Authorization"), db: Session = Depends(get_db)):
    try:
        token = token.replace("Bearer ", "")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.email == email).first()
        return user
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.post("/polls/create")
def create_poll(poll: PollSchema, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    new_poll = Poll(
        title=poll.title,
        description=poll.description,
        created_by=user.id
    )
    db.add(new_poll)
    db.commit()
    return {"message": "Poll created successfully"}
