from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import models
from database.datasession import SessionLocal
from pydantic import BaseModel #pydantic c'est pour valider les données et les sérialiser 
from typing import List

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

# Liste fixe des catégories autorisées
FIXED_CATEGORIES = [
    "Courses",
    "Déménagement",
    "Réparation",
    "Administratif",
    "Scolarité",
    "Enfants",
    "Seniors",
    "Événements",
    "Jardinage",
    "Dons",
    "Covoiturage",
    "Objets"
]
# Endpoint pour lister toutes les catégories en BDD
@router.get("/", response_model=List[str])
def list_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category.nom).all()
    return [c[0] for c in categories]

# Modèle Pydantic pour la réponse
class CategoryResponse(BaseModel):
    category_id: int
    nom: str

class CategoryCheckResponse(BaseModel):
    message: str
    added_categories: List[str]
    total_categories: int
    categories: List[str]

# Endpoint pour vérifier et remplir automatiquement les catégories manquantes
@router.post("/verify_and_fill", response_model=CategoryCheckResponse)
def verify_and_fill_categories(db: Session = Depends(get_db)):
    added_categories = []

    # Vérifier chaque catégorie de la liste fixe
    for category_name in FIXED_CATEGORIES:
        existing_category = db.query(models.Category).filter(models.Category.nom == category_name).first()
        if not existing_category:
            # Ajouter la catégorie si elle n'existe pas
            new_category = models.Category(nom=category_name)
            db.add(new_category)
            added_categories.append(category_name)

    # Commit unique pour toutes les catégories manquantes
    if added_categories:
        db.commit()

    # Liste complète après correction
    all_categories = db.query(models.Category.nom).all()
    all_categories = [c[0] for c in all_categories]

    return {
        "message": f"{len(added_categories)} catégories manquantes ajoutées automatiquement" if added_categories else "Toutes les catégories étaient déjà présentes",
        "added_categories": added_categories,
        "total_categories": len(all_categories),
        "categories": all_categories
    }


# Obtenir une catégorie par ID
@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")
    return category
#POST /categories/nom=covoiturage va bien créer une catégorie.
#GET /categories/ liste toutes les catégories.
#GET /categories/1 renvoie la catégorie avec category_id = 1.
#POST /categories/verify_and_fill avec {"categories": ["covoiturage", "jardinage", "cours de langue"]} vérifie et ajoute les catégories manquantes.