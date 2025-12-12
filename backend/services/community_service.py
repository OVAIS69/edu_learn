from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class Reply(BaseModel):
    id: str
    author_name: str
    content: str
    created_at: datetime
    is_solution: bool

class Post(BaseModel):
    id: str
    author_name: str
    title: str
    content: str
    tags: List[str]
    created_at: datetime
    replies: List[Reply]
    likes: int

class CommunityService:
    def get_recent_posts(self) -> List[Post]:
        # Mock data
        return [
            Post(
                id="p1", author_name="Alice", title="Help with Calculus Chain Rule", 
                content="I don't understand when to apply the chain rule vs product rule.",
                tags=["Calculus", "Help"], created_at=datetime.now(), likes=5,
                replies=[
                    Reply(id="r1", author_name="Bob", content="Think of it as peeling an onion...", created_at=datetime.now(), is_solution=True)
                ]
            ),
            Post(
                id="p2", author_name="Charlie", title="Study Group for Geometry?", 
                content="Anyone want to practice triangle proofs this weekend?",
                tags=["Geometry", "Study Group"], created_at=datetime.now(), likes=2,
                replies=[]
            )
        ]

    def create_post(self, user_id: int, title: str, content: str, tags: List[str]) -> Post:
        # Mock creation
        return Post(
            id="p_new", author_name="You", title=title, content=content, tags=tags,
            created_at=datetime.now(), replies=[], likes=0
        )

community_service = CommunityService()
