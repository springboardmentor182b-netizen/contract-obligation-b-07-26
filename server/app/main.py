from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Notification

app = FastAPI(
    title="Notification API",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI Server is Running Successfully!"}

@app.get("/notifications")
def get_notifications():
    db = SessionLocal()

    try:
        notifications = db.query(Notification).order_by(Notification.id).all()

        return {
            "stats": {
                "total": len(notifications),
                "unread": len(notifications),
                "email": len(notifications),
                "sms": 0
            },
            "feed": [
                {
                    "id": n.id,
                    "title": n.title,
                    "message": n.message,
                    "type": n.type
                }
                for n in notifications
            ]
        }

    finally:
        db.close()