from typing import List, Dict
from pydantic import BaseModel

class StudentPerformance(BaseModel):
    student_id: int
    name: str
    average_score: float
    lessons_completed: int
    active_gaps: int
    last_active: str

class ClassAnalytics(BaseModel):
    total_students: int
    average_class_score: float
    at_risk_count: int
    top_weak_topics: List[str]
    student_performances: List[StudentPerformance]

class AnalyticsService:
    def get_class_analytics(self, class_id: str) -> ClassAnalytics:
        # Mock data
        students = [
            StudentPerformance(student_id=1, name="Alex Student", average_score=85.5, lessons_completed=12, active_gaps=0, last_active="Today"),
            StudentPerformance(student_id=2, name="Jamie Smith", average_score=62.0, lessons_completed=5, active_gaps=3, last_active="Yesterday"),
            StudentPerformance(student_id=3, name="Taylor Doe", average_score=91.0, lessons_completed=15, active_gaps=0, last_active="Today"),
            StudentPerformance(student_id=4, name="Jordan Lee", average_score=45.0, lessons_completed=2, active_gaps=5, last_active="3 days ago"),
        ]
        
        return ClassAnalytics(
            total_students=len(students),
            average_class_score=sum(s.average_score for s in students) / len(students),
            at_risk_count=sum(1 for s in students if s.average_score < 60),
            top_weak_topics=["Calculus Chain Rule", "Linear Equations"],
            student_performances=students
        )

analytics_service = AnalyticsService()
