from fastapi import APIRouter

router = APIRouter( 
    prefix="/categories",# prefix: pour categories les endpoints / les endpoints c a d  les routes
    tags=["categories"] 
)

temp_categories = ['dons', 'déménagement', 'alimentation']

@router.get('/')
def read_categories():
    return temp_categories