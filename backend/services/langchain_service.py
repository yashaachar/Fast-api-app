import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory

load_dotenv()

# Initialize Groq LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.5,
)

# Prompt Template
prompt_with_memory = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful career guidance assistant."
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{user_query}")
    ]
)

# Create Chain
chain_with_memory = prompt_with_memory | llm

# Store chat history for each session
store = {}


def get_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]


# Add Memory
chat_with_memory = RunnableWithMessageHistory(
    runnable=chain_with_memory,
    get_session_history=get_history,
    input_messages_key="user_query",
    history_messages_key="chat_history"
)


def ask_career_chatbot_response(question: str, session_id: str = "default") -> str:
    response = chat_with_memory.invoke(
        {"user_query": question},
        {"configurable": {"session_id": session_id}}
    )

    return response.content