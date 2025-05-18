# chatbot.py
from phidata.agent.chat_agent import ChatAgent
from phidata.tool.groq.groq_tool import GroqChatTool  # Groq Tool from phidata

# Create a chat agent using Groq
finance_bot = ChatAgent(
    name="finance_bot",
    llm=GroqChatTool(
        model="meta-llama/llama-4-scout-17b-16e-instruct"
    ),
    description="A financial advisor assistant that gives personal finance tips"
)

finance_bot.set_system_message(
    "You are a helpful AI financial advisor. Help users with investing, saving, budgeting, and understanding financial concepts in simple terms."
)
