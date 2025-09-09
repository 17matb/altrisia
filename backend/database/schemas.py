from pydantic import BaseModel
from datetime import datetime


class PostCreate(BaseModel):
    titre: str
    description: str
    user_id: int
    category_id: int
    media_url: str | None


class PostRead(PostCreate):
    post_id: int
    date_creation: datetime


class PostUpdate(BaseModel):
    titre: str | None = None
    description: str | None = None
    category_id: int | None = None
    media_url: str | None = None
