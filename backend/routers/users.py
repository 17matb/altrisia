from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/")
def create_user(user: dict):
    return {"message": "Utilisateur créé", "user": user}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"message": f"Infos utilisateur {user_id}"}

@router.post("/login")
def login(credentials: dict):
    return {"message": "Connexion réussie", "token": "fake-jwt-token"}
