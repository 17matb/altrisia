from fastapi import APIRouter

router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)

temp_posts = [{'post_id': 1, 'title': 'Aide au déménagement'}]

@router.get('/')
def read_posts():
    return temp_posts

@router.post("/")
def create_post(posts: dict):
    return {"message": "Annonce créée", "posts": posts}

@router.get("/{posts_id}")
def get_post(posts_id: int):
    return {"message": f"Annonce {posts_id}"}

@router.put("/{posts_id}") # new endpoint
def update_post(posts_id: int, posts: dict):
    return {"message": f"Annonce {posts_id} mise à jour", "posts": posts}

@router.delete("/{posts_id}")
def delete_post(posts_id: int):
    return {"message": f"Annonce {posts_id} supprimée"}