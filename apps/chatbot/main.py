import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

frontend_origin = os.getenv("DEPLOYED_FRONTEND_URL")

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin] if frontend_origin else [],  # frontend origin
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    question: str

@app.post("/api/chat")
async def chat_endpoint(chat_request: ChatRequest):
    chat_completion = client.chat.completions.create(
        messages=[{"role": "user", "content": chat_request.question}],
        model="llama-3.3-70b-versatile",
    )
    answer = chat_completion.choices[0].message.content
    return {"answer": answer}
