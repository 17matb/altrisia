### Grâce à ça, SQLAlchemy ou une autre ORM sait comment communiquer avec la base de données sans écrire les requêtes SQL à la main.

from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timezone

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String)
    prenom = Column(String)
    email = Column(String, unique=True, nullable=False, index=True)
    mdp_hash = Column(String, nullable=False)
    date_insc = Column(TIMESTAMP, default=lambda: datetime.now(timezone.utc))


class Post(Base):
    __tablename__ = 'posts'
    post_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titre = Column(String, nullable=False)
    description = Column(String)
    date_creation = Column(TIMESTAMP, default=lambda: datetime.now(timezone.utc))
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.category_id'), nullable=False)
    media_url = Column(String)
    ville = Column(String)
    type_demande = Column(Boolean)

class Category(Base):
    __tablename__ = 'categories'
    category_id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
