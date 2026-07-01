import torch
import torch.nn.functional as F
from transformers import BertTokenizer, BertForSequenceClassification

MODEL_ID = "devashishgorai/bert-fake-news-detector"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model only once
tokenizer = BertTokenizer.from_pretrained(MODEL_ID)
model = BertForSequenceClassification.from_pretrained(MODEL_ID)

model.to(device)
model.eval()


def predict_news(news: str):
    inputs = tokenizer(
        news,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=256,
    )

    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)

    probs = F.softmax(outputs.logits, dim=1)

    fake_prob = probs[0][0].item()
    real_prob = probs[0][1].item()

    prediction = torch.argmax(probs, dim=1).item()
    confidence = max(fake_prob, real_prob) * 100

    return {
        "prediction": "REAL" if prediction == 1 else "FAKE",
        "confidence": round(confidence, 2),
        "fake_probability": round(fake_prob * 100, 2),
        "real_probability": round(real_prob * 100, 2),
    }
