from math import ceil
from fastapi import APIRouter, Depends, HTTPException, Query
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
def read_posts(
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=50),
    type_demande: bool | None = None,
    category_id: int | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(models.Post)
    if type_demande is not None:
        query = query.filter(models.Post.type_demande == type_demande)
    if category_id is not None:
        query = query.filter(models.Post.category_id == category_id)
    total_posts = query.count()
    offset = (page - 1) * limit
    posts = query.offset(offset).limit(limit).all()
    return {
        'posts': [
            {
                'titre': post.titre,
                'description': post.description,
                'user_id': post.user_id,
                'category_id': post.category_id,
                'media_url': post.media_url,
                'ville': post.ville,
                'date_creation': post.date_creation,
                'type_demande': post.type_demande,
            }
            for post in posts
        ],
        'total_pages': ceil(total_posts / limit),
        'current_page': page,
    }


@router.post('/')
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    new_post = models.Post(**post.model_dump())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return {
        'type_demande': new_post.type_demande,
        'titre': new_post.titre,
        'description': new_post.description,
        'user_id': new_post.user_id,
        'category_id': new_post.category_id,
        'media_url': new_post.media_url,
        'ville': new_post.ville,
    }


@router.get('/{post_id}', response_model=schemas.PostRead)
def get_post(post_id: int, db: Session = Depends(get_db)):
    statement = select(models.Post).where(models.Post.post_id == post_id)
    selected_post = db.execute(statement).scalar_one_or_none()
    if not selected_post:
        raise HTTPException(status_code=404, detail='Post not found')
    return selected_post


@router.put('/{post_id}', response_model=schemas.PostRead)
def update_post(
    post_id: int, post_update: schemas.PostUpdate, db: Session = Depends(get_db)
):
    statement = select(models.Post).where(models.Post.post_id == post_id)
    selected_post = db.execute(statement).scalar_one_or_none()
    if not selected_post:
        raise HTTPException(status_code=404, detail='Post not found')
    update_data = post_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(selected_post, key, value)
    db.add(selected_post)
    db.commit()
    db.refresh(selected_post)
    return selected_post


@router.delete('/{post_id}')
def delete_post(post_id: int, db: Session = Depends(get_db)):
    statement = select(models.Post).where(models.Post.post_id == post_id)
    selected_post = db.execute(statement).scalar_one_or_none()
    if not selected_post:
        raise HTTPException(status_code=404, detail='Post not found')
    db.delete(selected_post)
    db.commit()
    return {'message': f'Post {post_id} deleted'}