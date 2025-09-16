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

# Dépendance DB: ça sert à avoir une session de base de données pour chaque requête
def get_db():
    db = SessionLocal()
    try:
        yield db #yield pour retourner un générateur de session et pas une session unique à chaque fois
    finally:
        db.close()

# Liste fixe des catégories avec ID prédéfini
FIXED_CATEGORIES = [
    (1, "Courses"),
    (2, "Déménagement"),
    (3, "Réparation"),
    (4, "Administratif"),
    (5, "Scolarité"),
    (6, "Enfants"),
    (7, "Seniors"),
    (8, "Événements"),
    (9, "Jardinage"),
    (10, "Objets"),
    (11, "Covoiturage"),
    (12, "Alimentation")
]
# Modèles Pydantic
class CategoryResponse(BaseModel):
    category_id: int
    nom: str

class CategoryCheckResponse(BaseModel):
    message: str
    corrected_categories: List[str]
    total_categories: int
    categories: List[CategoryResponse]

# Endpoint : lister toutes les catégories en BDD
@router.get("/", response_model=List[str])
def list_categories(db: Session = Depends(get_db)):
    return [c[0] for c in db.query(models.Category.nom).all()]

# Endpoint pour réinitialiser / vérifier les catégories
@router.post("/reset", response_model=CategoryCheckResponse)
def verify_and_reset_categories(db: Session = Depends(get_db)):
    corrected = []

    # Récupérer toutes les catégories existantes
    existing = {c.category_id: c for c in db.query(models.Category).all()}

    for cat_id, cat_name in FIXED_CATEGORIES:
        cat = existing.get(cat_id)
        if cat and cat.nom != cat_name:
            cat.nom = cat_name
            corrected.append(cat_name)
        elif not cat:#elif=sinon si , au lieu de faire une autre requête pour vérifier si la catégorie existe on utilise le dictionnaire existant 
            db.add(models.Category(category_id=cat_id, nom=cat_name))
            corrected.append(cat_name)
        #if cat_id in existing:
        #     if existing[cat_id].nom != cat_name:
        #         existing[cat_id].nom = cat_name
        #         corrected.append(cat_name)
        # else:
        #     new_cat = models.Category(category_id=cat_id, nom=cat_name)
        #     db.add(new_cat)
        #     corrected.append(cat_name)
        
    db.commit()
    # Liste complète après correction
    all_categories = [{"category_id": c.category_id, "nom": c.nom} for c in db.query(models.Category).all()]# creation d'une liste de dictionnaires pour chaque catégorie
#in db.query : on récupère toutes les catégories de la base de données
    return {
        "message": f"{len(corrected)} catégories corrigées ou ajoutées automatiquement" if corrected else "Toutes les catégories sont correctes",
        "corrected_categories": corrected,
        "total_categories": len(all_categories),#len :ça sert à compter le nombre d'éléments dans une liste ici pour compter le nombre total de catégories
        "categories": all_categories
    }

# Obtenir une catégorie par ID
@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")
    return category
#GET /categories/ liste toutes les catégories en BDD
#POST /categories/verify_and_reset vérifie et réinitialise les catégories.
#GET /categories/{category_id} obtient une catégorie par son ID.