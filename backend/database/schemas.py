from pydantic import BaseModel, EmailStr
from datetime import datetime


class PostCreate(BaseModel):
    titre: str
    description: str
    user_id: int
    category_id: int
    media_url: str | None
    ville: str | None
    type_demande: bool


class PostRead(PostCreate):
    post_id: int
    date_creation: datetime


class PostUpdate(BaseModel):
    titre: str | None = None
    description: str | None = None
    category_id: int | None = None
    media_url: str | None = None
    ville: str | None
    type_demande: bool | None = None


class UserCreate(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    password: str


class UpdateUser(BaseModel):
    nom: str | None = None
    prenom: str | None = None
    email: str | None = None
    password: str | None = None
    avatar: str | None = None



class UserLogin(BaseModel):
    email: EmailStr
    password: str