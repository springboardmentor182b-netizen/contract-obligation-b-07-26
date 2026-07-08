from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ContractIQ Backend Running Successfully"}