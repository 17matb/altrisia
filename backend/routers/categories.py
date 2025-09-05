from fastapi import APIRouter

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("/")
def list_categories():
    return {"categories": []}

@router.post("/")
def create_category(category: dict):
    return {"message": "Catégorie créée", "category": category}
