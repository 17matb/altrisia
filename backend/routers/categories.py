from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import models
from database.datasession import SessionLocal

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

# Dépendance DB 
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Ajouter une catégorie
@router.post("/")
def create_category(nom: str, db: Session = Depends(get_db)):
    category = models.Category(nom=nom)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

# Lister toutes les catégories
@router.get("/")
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

# Obtenir une catégorie par ID
@router.get("/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")
    return category
