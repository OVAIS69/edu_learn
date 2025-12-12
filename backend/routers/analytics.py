from fastapi import APIRouter, Depends
from ..services.analytics_service import analytics_service, ClassAnalytics

router = APIRouter(prefix="/analytics", tags=["Dashboards & Analytics"])

# Mock auth dependency
async def get_current_user_mock():
    return {"id": 1, "email": "mentor@example.com", "role": "mentor"}

@router.get("/class/{class_id}", response_model=ClassAnalytics)
async def get_class_analytics(class_id: str, user=Depends(get_current_user_mock)):
    # In real app, check if user has access to class_id
    return analytics_service.get_class_analytics(class_id)
