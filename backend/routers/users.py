from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

temp_users = [
    {
        'user_id': 1,
        'user_first_name': 'John',
        'user_last_name': 'Doe',
        'user_email': 'example@domain.com',
        'user_password': 'qwertyuiop',
        'user_creation_date': '2025-09-05',
    },
    {
        'user_id': 2,
        'user_first_name': 'John',
        'user_last_name': 'Doe',
        'user_email': 'example@domain.com',
        'user_password': 'qwertyuiop',
        'user_creation_date': '2025-09-05',
    },
    {
        'user_id': 3,
        'user_first_name': 'John',
        'user_last_name': 'Doe',
        'user_email': 'example@domain.com',
        'user_password': 'qwertyuiop',
        'user_creation_date': '2025-09-05',
    },
]

@router.get('/')
def read_users():
    return temp_users

@router.post("/")
def create_user(user: dict):
    return {"message": "Utilisateur créé", "user": user}

@router.get("/{user_id}")
def get_user(user_id: int):
    return {"message": f"Infos utilisateur {user_id}"}

@router.post("/login")
def login(credentials: dict):
    return {"message": "Connexion réussie", "token": "fake-jwt-token"}