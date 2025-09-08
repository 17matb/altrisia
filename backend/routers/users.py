from fastapi import APIRouter, Depends
from supabase_auth import Session
from database import models
import supabase
from database.datasession import SessionLocal


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
def create_user(user_id, nom, prenom, email, md5_hash, date_insc):
    response = supabase.table("users").insert({"id": user_id, "Nom": nom, "Prenom": prenom, "Email": email, "Pass": md5_hash, "Date Insc": date_insc}).execute()
    return {"message": "Utilisateur créé", "Response": response}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"message": f"Infos utilisateur {user_id}"}

@router.post("/login")
def login(credentials: dict):
    return {"message": "Connexion réussie", "token": "fake-jwt-token"}