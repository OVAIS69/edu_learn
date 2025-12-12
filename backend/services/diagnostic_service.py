from typing import List, Dict, Optional
from pydantic import BaseModel

class Question(BaseModel):
    id: str
    text: str
    options: List[str]
    correct_option: int
    difficulty: float  # 0.0 to 1.0
    topic: str
    subtopic: str
    skill_type: str # "visual", "logical", "memory"

class DiagnosticResult(BaseModel):
    user_id: int
    score: float
    weak_topics: List[str]
    strong_topics: List[str]
    learning_style: str # "visual", "logical", "mixed"

# Dummy Question Bank
QUESTION_BANK = [
    Question(
        id="q1", text="What is the derivative of x^2?", 
        options=["x", "2x", "x^2", "2"], correct_option=1, 
        difficulty=0.3, topic="Calculus", subtopic="Derivatives", skill_type="logical"
    ),
    Question(
        id="q2", text="Which shape has 3 sides?", 
        options=["Square", "Circle", "Triangle", "Pentagon"], correct_option=2, 
        difficulty=0.1, topic="Geometry", subtopic="Shapes", skill_type="visual"
    ),
    Question(
        id="q3", text="Solve for x: 2x + 4 = 10", 
        options=["2", "3", "4", "5"], correct_option=1, 
        difficulty=0.4, topic="Algebra", subtopic="Linear Equations", skill_type="logical"
    ),
    Question(
        id="q4", text="Identify the red planet.", 
        options=["Venus", "Mars", "Jupiter", "Saturn"], correct_option=1, 
        difficulty=0.2, topic="Astronomy", subtopic="Planets", skill_type="memory"
    ),
]

class DiagnosticService:
    def get_diagnostic_questions(self, limit: int = 5) -> List[Question]:
        # In a real app, this would select questions based on user history or random
        return QUESTION_BANK[:limit]

    def evaluate_diagnostic(self, user_id: int, answers: Dict[str, int]) -> DiagnosticResult:
        score = 0
        total = 0
        topic_scores = {}
        style_scores = {"visual": 0, "logical": 0, "memory": 0}

        for q in QUESTION_BANK:
            if q.id in answers:
                total += 1
                is_correct = (answers[q.id] == q.correct_option)
                if is_correct:
                    score += 1
                    topic_scores[q.topic] = topic_scores.get(q.topic, 0) + 1
                    style_scores[q.skill_type] += 1
                else:
                    topic_scores[q.topic] = topic_scores.get(q.topic, 0) - 0.5 # Penalty for wrong

        final_score = (score / total) * 100 if total > 0 else 0
        
        # Determine weak/strong topics
        sorted_topics = sorted(topic_scores.items(), key=lambda x: x[1])
        weak_topics = [t[0] for t in sorted_topics if t[1] <= 0]
        strong_topics = [t[0] for t in sorted_topics if t[1] > 0]

        # Determine learning style
        dominant_style = max(style_scores, key=style_scores.get)

        return DiagnosticResult(
            user_id=user_id,
            score=final_score,
            weak_topics=weak_topics,
            strong_topics=strong_topics,
            learning_style=dominant_style
        )

diagnostic_service = DiagnosticService()
