from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, posts, categories, search
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title='Altrisia API',
    description='API pour les services gratuits de bénévolat',
    version='1.0.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001'],  # Next.js
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Inclusion des routers
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(categories.router)
app.include_router(search.router)


@app.get(
    '/'
)  # @app.get('/') pour recuperer les informations sur le projet / on le a besoin quand on ouvre la page principale pour afficher le nom du projet
def read_root():
    return {'projet': 'Altrisia'}
