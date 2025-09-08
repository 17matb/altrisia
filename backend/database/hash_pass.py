import hashlib

def hash_password(password: str) -> str:
    x = hashlib.md5(password.encode())
    return x.hexdigest()