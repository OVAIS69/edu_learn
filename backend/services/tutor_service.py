import os
import speech_recognition as sr
import pyttsx3
from groq import Groq
import threading
import uuid
import base64

# Initialize Groq Client
api_key = os.environ.get("GROQ_API_KEY")
with open("backend/debug.log", "a") as f:
    f.write(f"DEBUG: GROQ_API_KEY present: {bool(api_key)}\n")
    if api_key:
        f.write(f"DEBUG: Key length: {len(api_key)}\n")

client = Groq(
    api_key=api_key,
)

class TutorService:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        # Initialize TTS engine
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('rate', 150)  # Speed of speech
        except Exception as e:
            print(f"Warning: TTS engine initialization failed: {e}")
            self.engine = None

    def generate_response(self, message: str, history: list = []) -> str:
        """
        Generates a response from the AI Tutor using Groq API.
        """
        try:
            # Construct messages with history
            messages = [
                {"role": "system", "content": "You are EduBot, a helpful and encouraging AI tutor for students. You explain complex concepts simply and use a friendly tone. Keep responses concise."}
            ]
            
            # Add history context (limit to last 5 exchanges to save tokens)
            for msg in history[-5:]:
                messages.append({"role": msg['role'], "content": msg['content']})
            
            messages.append({"role": "user", "content": message})

            chat_completion = client.chat.completions.create(
                messages=messages,
                model="llama-3.3-70b-versatile", # Using a reliable model
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            with open("backend/debug.log", "a") as f:
                f.write(f"Error generating response: {e}\n")
            print(f"Error generating response: {e}")
            return "I'm having trouble connecting to my neural network right now. Please try again later."

    def transcribe_audio(self, audio_file_path: str) -> str:
        """
        Transcribes audio file to text using Google Speech Recognition.
        """
        try:
            with sr.AudioFile(audio_file_path) as source:
                audio_data = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio_data)
                return text
        except sr.UnknownValueError:
            return "Sorry, I couldn't understand the audio."
        except sr.RequestError as e:
            return f"Could not request results; {e}"
        except Exception as e:
            return f"Error processing audio: {e}"

    def text_to_speech(self, text: str) -> str:
        """
        Converts text to speech and returns the path to the generated audio file.
        """
        if not self.engine:
            return ""

        try:
            # Create a unique filename for the audio
            filename = f"tts_{uuid.uuid4()}.mp3"
            output_path = os.path.join("static", "audio", filename)
            
            # Ensure directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save to file
            # Note: pyttsx3 save_to_file is synchronous but might block, 
            # for a hackathon this is acceptable.
            self.engine.save_to_file(text, output_path)
            self.engine.runAndWait()
            
            return f"/static/audio/{filename}"
        except Exception as e:
            print(f"Error in TTS: {e}")
            return ""

tutor_service = TutorService()
