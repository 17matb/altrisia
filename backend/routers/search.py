from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session
from database import models
from database.datasession import SessionLocal
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def search_items(query: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    results = db.query(models.Post).filter(or_(models.Post.titre.ilike(f"%{query}%"), models.Post.description.ilike(f"%{query}%"), models.Post.ville.ilike(f"%{query}%"))).limit(10).all()
    return results