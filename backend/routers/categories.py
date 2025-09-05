from fastapi import APIRouter

router = APIRouter(prefix='/categories')

temp_categories = ['dons', 'déménagement', 'alimentation']


@router.get('/')
def read_categories():
    return temp_categories
