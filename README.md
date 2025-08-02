# 🎓 Tutorverse - AI Tutor Web App

Tutorverse is an **AI-powered tutoring platform** built with **React (frontend)** and **FastAPI (backend)**.  
It provides an interactive learning experience using multiple AI agents such as Tutor, Quiz, Evaluator, and Monitor.

---

## 📌 Project Structure
Tutorverse/
│── backend/ # FastAPI + AI Agents (CrewAI/OpenAI)
│ ├── main.py
│ ├── agents.py
│ ├── tasks.py
│ └── requirements.txt
│
│── frontend/ # React + Vite + CSS
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
│── README.md
│── .gitignore



## 🚀 Getting Started

### 🔹 Backend (FastAPI + CrewAI Agents)
```bash
cd backend
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
Server runs at: http://127.0.0.1:8000

🔹 Frontend (React + Vite + Tailwind)
cd frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

🧠 Features
📘 Tutor Agent – explains concepts in detail.

📝 Quiz Agent – generates quizzes for practice.

✅ Evaluator Agent – checks answers & provides feedback.

🛠 Monitor Agent – ensures reliability of all agents.

⚡ Built with React + FastAPI + CrewAI/OpenAI API.

📷 Screenshots
(Add your app screenshots here once ready)

📜 License
This project is for educational purposes as part of a mini-project.
Feel free to fork & extend 🚀.


