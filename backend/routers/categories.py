from fastapi import APIRouter, Depends, HTTPException #Depends : pour la dependance de la base de donnee et HTTPException : pour  les erreurs (si la categorie n'existe pas)
from sqlalchemy.orm import Session #Session : pour la session de la base de donnee
from database import models
from database.datasession import SessionLocal

router = APIRouter( 
    prefix="/categories",# prefix: pour categories les endpoints / les endpoints c a d  les routes
    tags=["categories"] 
)

# Dépendance DB (même méthode que users.py)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Ajouter une catégorie
@router.post("/")
def create_category(name: str, description: str = None, db: Session = Depends(get_db)):
    category = models.Category(name=name, description=description)
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
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")
    return category
###### 

