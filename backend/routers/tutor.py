from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel
from typing import List, Optional
import shutil
import os
import uuid
from ..services.tutor_service import tutor_service

router = APIRouter(
    prefix="/tutor",
    tags=["tutor"],
    responses={404: {"description": "Not found"}},
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []

class TTSRequest(BaseModel):
    text: str

@router.post("/chat")
async def chat(request: ChatRequest):
    response = tutor_service.generate_response(request.message, [h.dict() for h in request.history])
    return {"response": response}

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    try:
        # Save temp file
        temp_filename = f"temp_{uuid.uuid4()}.wav"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        text = tutor_service.transcribe_audio(temp_filename)
        
        # Cleanup
        os.remove(temp_filename)
        
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/speak")
async def speak(request: TTSRequest):
    audio_url = tutor_service.text_to_speech(request.text)
    if not audio_url:
        raise HTTPException(status_code=500, detail="TTS generation failed")
    return {"audio_url": audio_url}
