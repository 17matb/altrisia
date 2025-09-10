from pydantic import BaseModel, EmailStr

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

class UserLogin(BaseModel):
    email: EmailStr
    password: str