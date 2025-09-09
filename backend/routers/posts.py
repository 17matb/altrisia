from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from database.datasession import SessionLocal
from database import models, schemas

router = APIRouter(prefix='/posts', tags=['posts'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/')
def read_posts(db: Session = Depends(get_db)):
    all_posts = db.query(models.Post).all()
    return [
        {
            'titre': post.titre,
            'description': post.description,
            'user_id': post.user_id,
            'category_id': post.category_id,
            'media_url': post.media_url,
        }
        for post in all_posts
    ]


@router.post('/')
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(**post.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {
        'titre': new_post.titre,
        'description': new_post.description,
        'user_id': new_post.user_id,
        'category_id': new_post.category_id,
        'media_url': new_post.media_url,
    }


# @router.get('/{post_id}')
# def get_post(post_id: int, db: Session = Depends(get_db)):
#     statement = select(models.Post).where(models.Post.post_id == post_id)
#     selected_post = db.execute(statement)
#     return {
#         'titre': selected_post.titre,
#         'description': selected_post.description,
#         'user_id': selected_post.user_id,
#         'category_id': selected_post.category_id,
#         'media_url': selected_post.media_url,
#     }


#
# @router.put("/{posts_id}") # new endpoint
# def update_post(posts_id: int, posts: dict):
#     return {"message": f"Annonce {posts_id} mise à jour", "posts": posts}
#
# @router.delete("/{posts_id}")
# def delete_post(posts_id: int):
#     return {"message": f"Annonce {posts_id} supprimée"}
