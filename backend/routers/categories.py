from fastapi import APIRouter, Depends, HTTPException #Depends : pour la dependance de la base de donnee et HTTPException : pour  les erreurs (si la categorie n'existe pas)
from sqlalchemy.orm import Session #Session : pour la session de la base de donnee
from database import models
from database.datasession import SessionLocal

router = APIRouter( 
    prefix="/categories",# prefix: pour categories les endpoints / les endpoints c a d  les routes
    tags=["categories"] 
)

# Dépendance DB 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Lister toutes les catégories
@router.get("/")
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()
