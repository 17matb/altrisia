from fastapi import FastAPI
from routers import users, posts, categories

app = FastAPI(
    title="Altrisia API",
    description="API pour les services gratuits de bénévolat",
    version="1.0.0"
)

# Inclusion des routers
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(categories.router)

@app.get('/') #@app.get('/') pour recuperer les informations sur le projet / on le a besoin quand on ouvre la page principale pour afficher le nom du projet
def read_root():
    return {'projet':'Altrisia'}

