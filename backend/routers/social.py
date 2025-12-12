from fastapi import APIRouter, Depends
from typing import List
from ..services.gamification_service import gamification_service, UserGamificationProfile
from ..services.community_service import community_service, Post

router = APIRouter(prefix="/social", tags=["Social & Gamification"])

# Mock auth dependency
async def get_current_user_mock():
    return {"id": 1, "email": "test@example.com"}

@router.get("/gamification/profile", response_model=UserGamificationProfile)
async def get_gamification_profile(user=Depends(get_current_user_mock)):
    return gamification_service.get_user_profile(user["id"])

@router.get("/community/posts", response_model=List[Post])
async def get_community_posts():
    return community_service.get_recent_posts()

@router.post("/community/posts", response_model=Post)
async def create_post(title: str, content: str, tags: List[str], user=Depends(get_current_user_mock)):
    return community_service.create_post(user["id"], title, content, tags)
