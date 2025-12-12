from typing import List, Dict
from pydantic import BaseModel

class Badge(BaseModel):
    id: str
    name: str
    description: str
    icon: str # emoji or url
    condition: str

class UserGamificationProfile(BaseModel):
    user_id: int
    points: int
    streak_days: int
    badges: List[Badge]
    level: int

BADGES = [
    Badge(id="b1", name="First Step", description="Completed first lesson", icon="🌱", condition="lessons_completed >= 1"),
    Badge(id="b2", name="Problem Solver", description="Solved 10 diagnostic questions", icon="🧩", condition="questions_solved >= 10"),
    Badge(id="b3", name="Helper", description="Answered a community question", icon="🤝", condition="replies_count >= 1"),
]

class GamificationService:
    def get_user_profile(self, user_id: int) -> UserGamificationProfile:
        # Mock data
        return UserGamificationProfile(
            user_id=user_id,
            points=1250,
            streak_days=5,
            badges=[BADGES[0], BADGES[1]],
            level=5
        )

    def award_points(self, user_id: int, action: str) -> int:
        # Logic to calculate points based on action
        points_map = {
            "lesson_complete": 100,
            "question_correct": 10,
            "community_reply": 50
        }
        points = points_map.get(action, 0)
        # In real app, update DB
        return points

gamification_service = GamificationService()
