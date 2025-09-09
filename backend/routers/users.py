from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from supabase_auth import Session
from database import models
from fastapi import Form
from supabase import Client, create_client
from database.datasession import SessionLocal
from dotenv import load_dotenv
import os
from database.hash_pass import hash_password
from validate_email import validate_email

load_dotenv()

URL = os.getenv("API_URL")
KEY = os.getenv("API_KEY")

supabase_client: Client = create_client(URL, KEY)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/')
def read_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.post("/")
def create_user(
    nom: str = Form(...),
    prenom: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
    ):

    hashed_password = hash_password(password)
    is_valid_format = validate_email(email)

    if not is_valid_format:
        return {"Email format is not valid":  email}
    else:
        new_user = models.User(
            nom=nom,
            prenom=prenom,
            email=email,
            mdp_hash=hashed_password,
            date_insc=datetime.now(timezone.utc)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "Utilisateur créé", "Response": new_user}

@router.get("/{user_id}")
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == id).all()

    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return user

@router.post("/login")
def login(user_email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_email).all()
    hashed_password = hash_password(password)
    user_password = db.query(models.User).filter(models.User.mdp_hash == hashed_password).all()
    if not user_password:
        raise HTTPException(status_code=404, detail="Password not valid")
    elif not user:
        raise HTTPException(status_code=404, detail="Email not valid")
    return "Bienvenue"