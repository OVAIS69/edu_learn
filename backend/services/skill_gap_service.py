from typing import List, Dict
from pydantic import BaseModel

class SkillGap(BaseModel):
    topic: str
    severity: str # "Critical", "Moderate", "Minor"
    reason: str
    recommended_action: str

class SkillGapService:
    def analyze_gaps(self, user_id: int, performance_data: Dict[str, float]) -> List[SkillGap]:
        """
        Analyzes performance data (topic -> accuracy) to identify skill gaps.
        """
        gaps = []
        for topic, accuracy in performance_data.items():
            if accuracy < 40:
                gaps.append(SkillGap(
                    topic=topic,
                    severity="Critical",
                    reason="Consistently low accuracy (<40%)",
                    recommended_action="Review fundamental concepts immediately."
                ))
            elif accuracy < 70:
                gaps.append(SkillGap(
                    topic=topic,
                    severity="Moderate",
                    reason="Inconsistent performance (40-70%)",
                    recommended_action="Practice more problems in this area."
                ))
        return gaps

skill_gap_service = SkillGapService()
