from fastapi import APIRouter

router = APIRouter(prefix='/users')

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
