from dotenv import load_dotenv
import os

# Mimic main.py loading
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
print(f"Loading env from: {dotenv_path}")
load_dotenv(dotenv_path)

key = os.environ.get("GROQ_API_KEY")
if key:
    print(f"GROQ_API_KEY found: {key[:5]}...{key[-4:] if len(key) > 8 else ''}")
else:
    print("GROQ_API_KEY NOT found in environment.")
