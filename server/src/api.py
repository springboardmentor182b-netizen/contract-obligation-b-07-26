from fastapi import APIRouter
from src.renewals.controller import router as renewals_router

api_router = APIRouter()

# Register the renewals endpoint we just created
api_router.include_router(renewals_router)

# (If your todos or users files are also empty right now, leave them alone. 
# We only need renewals to work for your deadline today!)