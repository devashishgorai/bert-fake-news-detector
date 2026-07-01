from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from predict import predict_news

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
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
