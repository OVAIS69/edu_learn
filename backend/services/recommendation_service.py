from typing import List, Optional
from pydantic import BaseModel

class Lesson(BaseModel):
    id: str
    title: str
    type: str # "video", "text", "interactive"
    duration_minutes: int
    topic: str
    difficulty: float

# Dummy Content Library
CONTENT_LIBRARY = [
    Lesson(id="l1", title="Introduction to Derivatives", type="video", duration_minutes=5, topic="Calculus", difficulty=0.2),
    Lesson(id="l2", title="Derivative Rules Cheat Sheet", type="text", duration_minutes=2, topic="Calculus", difficulty=0.3),
    Lesson(id="l3", title="Triangle Properties", type="interactive", duration_minutes=4, topic="Geometry", difficulty=0.1),
    Lesson(id="l4", title="Solving Linear Equations", type="video", duration_minutes=3, topic="Algebra", difficulty=0.4),
]

class RecommendationService:
    def get_recommendations(self, user_id: int, weak_topics: List[str], learning_style: str) -> List[Lesson]:
        """
        Recommends lessons based on weak topics and learning style.
        """
        recommendations = []
        
        # Filter content matching weak topics
        relevant_content = [c for c in CONTENT_LIBRARY if c.topic in weak_topics]
        
        # Sort by match with learning style (simple heuristic)
        # If visual, prefer video/interactive. If logical, prefer text/interactive.
        def style_match_score(lesson: Lesson):
            if learning_style == "visual":
                return 2 if lesson.type in ["video", "interactive"] else 1
            elif learning_style == "logical":
                return 2 if lesson.type in ["text", "interactive"] else 1
            return 1

        relevant_content.sort(key=style_match_score, reverse=True)
        
        # If no weak topics, return general recommendations
        if not relevant_content:
            return CONTENT_LIBRARY[:3]
            
        return relevant_content

recommendation_service = RecommendationService()
