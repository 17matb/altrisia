from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import models
from database.datasession import SessionLocal
from database.schemas import UpdateUser, UserCreate, UserLogin
from dotenv import load_dotenv
from database.hash_pass import hash_password

load_dotenv()

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

@router.put('/{user_id}')
def update_user(user_id: str, user_update: UpdateUser, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    if user_update.nom is not None:
        user.nom = user_update.nom
    if user_update.prenom is not None:
        user.prenom = user_update.prenom
    if user_update.email is not None:
        user.email = user_update.email
    if user_update.password is not None:
        user.mdp_hash = hash_password(user_update.password)
    if user_update.avatar is not None:
        user.avatar = user_update.avatar


    db.commit()
    db.refresh(user)

    return {"message": "Profil mis à jour", "user": user}

@router.post("/register")
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
    ):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="L'adresse e-mail existe déjà")

    user.password = hash_password(user.password)
    
    new_user = models.User(
        nom=user.nom,
        prenom=user.prenom,
        email=user.email,
        mdp_hash=user.password,
        date_insc=datetime.now(timezone.utc)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Utilisateur créé", "user_id": new_user.user_id}

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return {"nom": user.nom, "prenom": user.prenom, "email": user.email}


@router.post("/login")
def login(login_user: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_user.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email non trouvé")
    elif user.mdp_hash != hash_password(login_user.password):
        raise HTTPException(status_code=404, detail="Password not valid")
    return {
        "message": "Bienvenue",
        "user_id": user.user_id,
        "avatar": user.avatar, 
        "nom": user.nom,
        "prenom": user.prenom,
        "email": user.email
    }

@router.delete("/{user_id}")
def user_delete(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User non trouvé")
    db.delete(user)
    db.commit()
    return {"message": "Compte supprimé"}