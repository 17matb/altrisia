from fastapi import APIRouter

router = APIRouter( 
    prefix="/categories",# prefix: pour categories les endpoints / les endpoints c a d  les routes
    tags=["Categories"] 
)

@router.get("/")#get('/') pour recuperer les categories, on le utilise pour afficher les categories quand on cree une annonce
def list_categories():
    return {"categories": []}

@router.post("/")
def create_category(category: dict):
    return {"message": "Catégorie créée", "category": category}
