from pydantic import BaseModel
from datetime import datetime


class PostCreate(BaseModel):
    titre: str
    description: str
    user_id: int
    category_id: int
    media_url: str


class PostRead(PostCreate):
    post_id: int
    date_creation: datetime
