from fastapi import APIRouter, Depends
from supabase_auth import Session
from database import models
from fastapi import Form
from supabase import Client, create_client
from database.datasession import SessionLocal
from dotenv import load_dotenv
import os
from database.hash_pass import hash_password

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

# class UserCreate(BaseModel):
#     user_id: int
#     nom: str
#     prenom: str
#     email: str 
#     mdp_hash: str
#     date_insc: str

@router.get('/')
def read_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.post("/")
def create_user(
    user_id: int = Form(...),
    nom: str = Form(...),
    prenom: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    date_insc: str = Form(...),
    db: Session = Depends(get_db)
    ):

    hashed_password = hash_password(password)

    new_user = models.User(
        user_id=user_id,
        nom=nom,
        prenom=prenom,
        email=email,
        mdp_hash=hashed_password,
        date_insc=date_insc
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Utilisateur créé", "Response": new_user}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"message": f"Infos utilisateur {user_id}"}

@router.post("/login")
def login(credentials: dict):
    return {"message": "Connexion réussie", "token": "fake-jwt-token"}