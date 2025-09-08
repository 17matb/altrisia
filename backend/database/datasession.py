from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
USER = os.getenv("USERNAME")
PASSWORD = os.getenv("PASS")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
URL = f"postgresql://{USER}:[{PASSWORD}]@{HOST}:{PORT}/postgres"

engine = create_engine(URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
