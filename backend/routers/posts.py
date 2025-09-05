from fastapi import APIRouter

router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)

@router.get("/")
def list_posts():
    return {"posts": []}

@router.post("/")
def create_ad(posts: dict):
    return {"message": "Annonce créée", "posts": posts}

@router.get("/{posts_id}")
def get_ad(posts_id: int):
    return {"message": f"Annonce {posts_id}"}

@router.put("/{posts_id}")# new endpoint 
def update_ad(posts_id: int, posts: dict):
    return {"message": f"Annonce {posts_id} mise à jour", "posts": posts}

@router.delete("/{posts_id}")
def delete_ad(posts_id: int):
    return {"message": f"Annonce {posts_id} supprimée"}
