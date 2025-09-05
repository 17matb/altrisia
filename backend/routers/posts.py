from fastapi import APIRouter

router = APIRouter(prefix='/posts')

temp_posts = [{'post_id': 1, 'title': 'Aide au déménagement'}]


@router.get('/')
def read_posts():
    return temp_posts
