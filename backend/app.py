import os

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from predict import predict_news

def _parse_origins(value: str | None) -> list[str]:
    if not value:
        return []

    return [origin.strip() for origin in value.split(",") if origin.strip()]


cors_origins = _parse_origins(os.getenv("CORS_ORIGINS"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if cors_origins else ["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Fake News Detection API is running 🚀"}


@app.post("/predict")
def predict(request: NewsRequest):
    result = predict_news(request.text)
    return result
