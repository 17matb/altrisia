import psycopg2
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

# Configuration de connexion (à adapter selon votre provider)
load_dotenv()

# Fetch variables
USER = os.getenv("USERNAME")
PASSWORD = os.getenv("PASS")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
SUPABASE_DB = os.getenv("DBNAME")

DATABASE_CONFIG = {
    'host': HOST,  
    'database': SUPABASE_DB,
    'user': USER,
    'password': PASSWORD,
    'port': PORT
}
    
# Création de l'engine SQLAlchemy
engine = create_engine(
    f"postgresql://{USER}:{PASSWORD}@"
    f"{HOST}:{PORT}/{SUPABASE_DB}", pool_size=5, max_overflow=0
)

# Test de connexion
def test_connection():
    # Connect to the database
    try:
        connection = psycopg2.connect(
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            dbname=SUPABASE_DB
        )
        print("Connection successful!")
        
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()
        
        # Example query
        cursor.execute("SELECT version();")
        result = cursor.fetchone()
        print("Current Time:", result)

        # Close the cursor and connection
        cursor.close()
        connection.close()
        print("Connection closed.")
    except Exception as e:
        print(f"Failed to connect: {e}")
test_connection()

def create_tables():
    sql = """
    CREATE TABLE IF NOT EXISTS Categories (
        category_id bigserial PRIMARY KEY,
        nom text NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Users (
        user_id bigserial PRIMARY KEY,
        nom text,
        prenom text,
        email text UNIQUE NOT NULL,
        mdp_hash text NOT NULL,
        date_insc timestamptz DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS Posts (
        post_id bigserial PRIMARY KEY,
        titre text NOT NULL,
        description text,
        date_crea timestamptz DEFAULT now(),
        user_id int8 REFERENCES Users(user_id),
        category_id int8 REFERENCES Categories(category_id),
        media_url text
    );
    """
    with engine.connect() as conn:
            conn.execute(text(sql))
            conn.commit()