from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from ..services.diagnostic_service import diagnostic_service, Question, DiagnosticResult
from ..services.skill_gap_service import skill_gap_service, SkillGap
from ..services.recommendation_service import recommendation_service, Lesson
# from ..auth import get_current_user # We need to implement this dependency

router = APIRouter(prefix="/engine", tags=["Core Engines"])

# Mock dependency for now until auth is fully wired with users
async def get_current_user_mock():
    return {"id": 1, "email": "test@example.com"}

@router.get("/diagnostic/questions", response_model=List[Question])
async def get_diagnostic_questions():
    return diagnostic_service.get_diagnostic_questions()

@router.post("/diagnostic/submit", response_model=DiagnosticResult)
async def submit_diagnostic(answers: Dict[str, int], user=Depends(get_current_user_mock)):
    result = diagnostic_service.evaluate_diagnostic(user["id"], answers)
    return result

@router.get("/skill-gaps", response_model=List[SkillGap])
async def get_skill_gaps(user=Depends(get_current_user_mock)):
    # In a real app, we'd fetch performance data from DB
    mock_performance = {"Calculus": 30.0, "Geometry": 80.0, "Algebra": 60.0} 
    return skill_gap_service.analyze_gaps(user["id"], mock_performance)

@router.get("/recommendations", response_model=List[Lesson])
async def get_recommendations(user=Depends(get_current_user_mock)):
    # Mock data fetch
    weak_topics = ["Calculus", "Algebra"]
    learning_style = "visual"
    return recommendation_service.get_recommendations(user["id"], weak_topics, learning_style)
