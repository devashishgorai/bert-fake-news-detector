import os

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from predict import predict_news

def _parse_origins(value: str | None) -> list[str]:
    if not value:
        return [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]

    return [origin.strip() for origin in value.split(",") if origin.strip()]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=_parse_origins(os.getenv("CORS_ORIGINS")),
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
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
