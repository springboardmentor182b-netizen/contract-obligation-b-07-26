from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import obligations

app = FastAPI(title="Obligation Tracker API")

# Allow the React dev server(s) to call this API.
# Add your deployed frontend URL here too once you host it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # CRA default
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(obligations.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "Obligation Tracker API"}
