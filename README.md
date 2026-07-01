# 🧠 Fake News Detection using Fine-Tuned BERT

> An AI-powered Fake News Detection System built using a Fine-Tuned BERT model with a modern **Next.js + FastAPI** architecture.

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green?logo=fastapi)
![PyTorch](https://img.shields.io/badge/PyTorch-2.x-red?logo=pytorch)
![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Overview

<img width="2940" height="1654" alt="image" src="https://github.com/user-attachments/assets/0fbd96f6-950d-4f0e-a25a-6de3e495f275" />


This project detects whether a news article is **Fake** or **Real** using a **Fine-Tuned BERT (Bidirectional Encoder Representations from Transformers)** model.

The application features a modern **Next.js frontend**, a **FastAPI backend**, and a locally hosted fine-tuned BERT model for high-speed inference.

---

## ✨ Features

- 🧠 Fine-Tuned BERT Model
- ⚡ FastAPI REST API
- 💻 Modern Next.js Frontend
- 📊 Confidence Score Prediction
- 📈 Fake & Real Probability
- 🚀 Real-Time Inference
- 📱 Responsive UI
- 🔥 Production-ready Architecture

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- PyTorch
- Hugging Face Transformers

### Machine Learning

- Fine-Tuned BERT
- Scikit-Learn
- Pandas
- NumPy

---

## 📂 Project Structure

```text
fake-news-detection/
│
├── frontend/                 # Next.js Frontend
│
├── backend/
│   ├── app.py
│   ├── predict.py
│   ├── requirements.txt
│   └── models/               # Ignored from Git
│
├── model_training/
│   └── FakeNews_BERT.ipynb
│
├── screenshots/
│
├── README.md
└── .gitignore
```

---

## 📊 Dataset

The model was trained using the **Fake and Real News Dataset**.

- Fake.csv
- True.csv

The dataset was:

- Cleaned
- Merged
- Shuffled
- Tokenized
- Fine-Tuned using BERT

---

## 📈 Model Performance

| Metric | Score |
|---------|-------|
| Accuracy | **99.9%** |
| Precision | **99.9%** |
| Recall | **99.9%** |
| F1 Score | **99.9%** |

---

## 🖥 Running Locally

### Clone Repository

```bash
git clone https://github.com/devashishgorai/fake-news-detection.git

cd fake-news-detection
```

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 📦 Model

The trained BERT model is **not included** in this repository because it exceeds GitHub's file size limit.

Download the model and place it inside:

```text
backend/models/fake_news_bert/
```

---

## 📸 Screenshots

> Add screenshots of your application here.

---

## 👨‍💻 Author

### Devashish Gorai

Electronics & Communication Engineering (ECE)

Passionate about AI • Full Stack Development • Machine Learning

GitHub: https://github.com/devashishgorai

LinkedIn: *(Add your LinkedIn URL here)*

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
