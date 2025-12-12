# EDUVERSE - AI-Powered Adaptive Learning Platform

**EDUVERSE** is a next-generation educational platform that combines **AI mentorship**, **gamification**, and **adaptive learning paths** to create a personalized and immersive learning experience.



## 🚀 Key Features
# EDUVERSE - AI-Powered Adaptive Learning Platform

**EDUVERSE** is a next-generation educational platform that combines **AI mentorship**, **gamification**, and **adaptive learning paths** to create a personalized and immersive learning experience.

![EDUVERSE Banner](https://via.placeholder.com/1200x400?text=EDUVERSE+Pixel-Neo+Theme)

## 🚀 Key Features

### 🤖 AI Tutor (EduBot)
-   **Voice-Enabled**: Interact with the AI tutor using your voice (Speech-to-Text) and hear responses (Text-to-Speech).
-   **Powered by Groq**: Utilizes the **Llama 3.3 70B** model for fast, accurate, and context-aware explanations.
-   **Contextual History**: Remembers your conversation context for a seamless tutoring session.

### 🧠 Knowledge Neural Map
-   **Brain-Like Visualization**: Replaces the linear galaxy map with an interconnected neural network of knowledge.
-   **Interactive Nodes**: Click on nodes (subjects) to see dependencies and unlock new learning paths.
-   **Dynamic Growth**: Watch your neural network expand as you master new skills.

### 💰 Monetization & Economy (New)
-   **Unified Hub**: Access Plans, Certifications, Credits, and Store at `/upgrade`.
-   **Gamified Store**: Spend earned coins on pixel-art avatars and themes.
-   **Skill Marketplace**: Purchase and earn verified certificates.
-   **B2B Portal**: Dedicated solution for schools and institutions at `/schools`.

### 🎮 Gamification & Social
-   **XP & Leveling**: Earn XP for completing lessons and quizzes to level up your profile.
-   **Leaderboards**: Compete with peers on global and class leaderboards.
-   **Badges & Streaks**: Unlock achievements and maintain daily learning streaks.
-   **Community**: Ask questions and help peers in the community forum.

### 📊 Mentor Dashboard
-   **Real-Time Analytics**: Monitor student progress with live heatmaps.
-   **At-Risk Detection**: AI identifies students who are falling behind and suggests interventions.
-   **Class Performance**: View aggregate data to understand overall class understanding.

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React 19 (Vite 7)
-   **Language**: TypeScript
-   **Styling**: Custom "Pixel-Neo" CSS (Glassmorphism, Animations), Lucide React Icons
-   **Routing**: React Router DOM 7
-   **Effects**: Canvas Confetti
-   **Visualization**: Custom SVG Graph Engine (Neural Map)

### Backend
-   **Framework**: FastAPI (Python 3.13+)
-   **Database**: SQLAlchemy (SQLite for Dev / PostgreSQL compatible)
-   **AI Integration**: Groq API (Llama 3.3)
-   **Voice Services**: `SpeechRecognition` (Google API), `pyttsx3` (Offline TTS)
-   **Authentication**: JWT (JSON Web Tokens)

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   Python (v3.10+)
-   Git

### 1. Clone the Repository
```bash
git clone https://github.com/krishal356/edulearn-ai.git
cd edulearn-ai
```

### 2. Backend Setup
Navigate to the backend directory and set up the virtual environment.

```bash
cd development/backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

Install dependencies:
```bash
pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib[bcrypt] email-validator groq SpeechRecognition pyttsx3 pyaudio python-multipart python-dotenv
```

**Environment Variables:**
Create a `.env` file in `development/backend/` and add your keys:
```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_secret_key_here
```

Run the server:
```bash
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory.

```bash
cd development/frontend
npm install
```

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🧪 Usage

1.  **Register/Login**: Create a student or mentor account.
2.  **Dashboard**: Explore your personalized dashboard.
3.  **AI Tutor**: Navigate to `/tutor` to chat with EduBot (Voice Enabled).
4.  **Neural Map**: Go to `/neural-map` to visualize your knowledge graph.
5.  **Monetization**: Visit `/upgrade` to see plans, store, and certifications.
6.  **Schools**: Check out the B2B offering at `/schools`.
7.  **Mentor View**: Log in as a mentor to see class analytics.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
MIT License