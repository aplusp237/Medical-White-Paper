"""
Vytal Dashboard Backend API
FastAPI server for health dashboard
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from datetime import datetime, date

# Try to import OpenAI for real AI chat
try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

app = FastAPI(
    title="Vytal Dashboard API",
    description="Backend API for the Vytal Health Dashboard",
    version="1.0.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ChatMessage(BaseModel):
    message: str
    user_context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    suggestions: list[str]

class ActionLog(BaseModel):
    action_id: str
    status: str  # "completed", "pending", "skipped"
    value: Optional[float] = None
    notes: Optional[str] = None

# System prompt for AI chat
SYSTEM_PROMPT = """You are Vytal, a warm and knowledgeable AI health assistant. Your role is to help users understand their health biomarkers, explain their action plans, and provide motivation and guidance.

Key principles:
1. Be empathetic and supportive, never alarming
2. Explain medical concepts in simple, accessible language
3. Connect recommendations to the user's specific biomarker values
4. Celebrate progress and encourage consistency
5. Always remind users to consult their doctor for medical decisions

User context will be provided including their biomarkers, current goals, and action plan. Use this to personalize your responses.

When explaining biomarkers:
- State their value and what's optimal
- Explain what the biomarker measures
- Connect it to their overall health picture
- Show how their action plan addresses it

Format your responses with:
- **Bold** for emphasis
- Bullet points for lists
- Clear sections with headers
- Emoji sparingly for warmth 😊

Keep responses concise but thorough. Break complex topics into digestible parts."""

# Mock user context for demo
MOCK_USER_CONTEXT = {
    "name": "Ankur",
    "chronological_age": 42,
    "biological_age": 38,
    "health_score": 78,
    "biomarkers": {
        "ldl": {"value": 145, "unit": "mg/dL", "status": "high", "optimal": "<100"},
        "hdl": {"value": 42, "unit": "mg/dL", "status": "borderline_low", "optimal": ">40"},
        "triglycerides": {"value": 180, "unit": "mg/dL", "status": "borderline_high", "optimal": "<150"},
        "hsCRP": {"value": 3.2, "unit": "mg/L", "status": "high", "optimal": "<1"},
        "apoB": {"value": 128, "unit": "mg/dL", "status": "high", "optimal": "<90"},
        "glucose": {"value": 108, "unit": "mg/dL", "status": "borderline_high", "optimal": "<100"},
        "hba1c": {"value": 5.9, "unit": "%", "status": "borderline_high", "optimal": "<5.7"},
        "homocysteine": {"value": 12, "unit": "µmol/L", "status": "borderline_high", "optimal": "<10"},
    },
    "goal": {
        "category": "cardiovascular",
        "title": "Lower Cardiovascular Risk",
        "intensity": "balanced"
    },
    "actions": [
        {"id": "fiber", "name": "Add 10g Fiber Daily", "category": "nutrition"},
        {"id": "walk", "name": "10-Min Post-Meal Walk", "category": "movement"},
        {"id": "fish_oil", "name": "Fish Oil Supplement", "category": "supplement"},
        {"id": "sleep", "name": "Sleep by 10:30 PM", "category": "lifestyle"},
    ],
    "signals": {
        "attention": ["Cardiovascular Inflammation - LDL + hs-CRP pattern"],
        "watch": ["Pre-diabetic pattern - Glucose + HbA1c"]
    }
}

def get_ai_response(message: str, user_context: dict) -> ChatResponse:
    """Generate AI response using OpenAI or fallback."""
    
    # Build context string
    context = f"""
User Profile:
- Name: {user_context.get('name', 'User')}
- Age: {user_context.get('chronological_age', 'N/A')} (Biological: {user_context.get('biological_age', 'N/A')})
- Health Score: {user_context.get('health_score', 'N/A')}/100

Key Biomarkers:
"""
    for name, data in user_context.get('biomarkers', {}).items():
        context += f"- {name}: {data.get('value')} {data.get('unit')} (Status: {data.get('status')}, Optimal: {data.get('optimal')})\n"
    
    context += f"""
Current Goal: {user_context.get('goal', {}).get('title', 'Not set')}

Active Actions:
"""
    for action in user_context.get('actions', []):
        context += f"- {action.get('name')} ({action.get('category')})\n"
    
    context += f"""
Health Signals:
- Needs Attention: {', '.join(user_context.get('signals', {}).get('attention', []))}
- Watch Closely: {', '.join(user_context.get('signals', {}).get('watch', []))}
"""
    
    # Try OpenAI if available
    if OPENAI_AVAILABLE and os.getenv("OPENAI_API_KEY"):
        try:
            client = OpenAI()
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "system", "content": f"User Context:\n{context}"},
                    {"role": "user", "content": message}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
            
            # Generate suggestions based on the message
            suggestions = generate_suggestions(message)
            
            return ChatResponse(
                response=ai_response,
                suggestions=suggestions
            )
        except Exception as e:
            print(f"OpenAI error: {e}")
            # Fall through to fallback
    
    # Fallback response
    return get_fallback_response(message, user_context)

def generate_suggestions(message: str) -> list[str]:
    """Generate follow-up suggestions based on the message."""
    msg_lower = message.lower()
    
    if 'ldl' in msg_lower or 'cholesterol' in msg_lower:
        return [
            "How does fiber lower cholesterol?",
            "What about medications?",
            "Show me my APO-B result"
        ]
    elif 'inflammation' in msg_lower or 'crp' in msg_lower:
        return [
            "How long until hs-CRP improves?",
            "What foods cause inflammation?",
            "Tell me about sleep and inflammation"
        ]
    elif 'food' in msg_lower or 'eat' in msg_lower or 'diet' in msg_lower:
        return [
            "What about breakfast?",
            "Can I have coffee?",
            "How much protein do I need?"
        ]
    elif 'progress' in msg_lower or 'track' in msg_lower:
        return [
            "How can I improve consistency?",
            "What if I miss a day?",
            "When should I retest?"
        ]
    else:
        return [
            "Explain my cardiovascular risk",
            "What should I eat today?",
            "How am I progressing?"
        ]

def get_fallback_response(message: str, user_context: dict) -> ChatResponse:
    """Provide fallback responses when OpenAI is not available."""
    msg_lower = message.lower()
    
    if 'ldl' in msg_lower or 'cholesterol' in msg_lower:
        ldl = user_context.get('biomarkers', {}).get('ldl', {})
        return ChatResponse(
            response=f"""Great question about LDL! Let me explain.

**Your LDL: {ldl.get('value', 'N/A')} {ldl.get('unit', 'mg/dL')}**
- Optimal: {ldl.get('optimal', '<100')}
- Status: {'Elevated ⚠️' if ldl.get('status') == 'high' else 'Borderline'}

**What LDL is:**
LDL (Low-Density Lipoprotein) carries cholesterol to your artery walls. When there's too much, it builds up as plaque, narrowing arteries over time.

**Your action plan addresses this:**
• **Fiber** → Binds cholesterol, prevents absorption
• **Fish oil** → Reduces inflammation
• **Post-meal walks** → Improves lipid metabolism

**Expected improvement:**
With 70%+ consistency, you could see LDL drop to ~105-115 mg/dL in 90 days.""",
            suggestions=[
                "How does fiber lower cholesterol?",
                "What about medications?",
                "Show me my full lipid panel"
            ]
        )
    
    elif 'inflammation' in msg_lower or 'crp' in msg_lower:
        hscrp = user_context.get('biomarkers', {}).get('hsCRP', {})
        return ChatResponse(
            response=f"""Let me explain inflammation and hs-CRP.

**Your hs-CRP: {hscrp.get('value', 'N/A')} {hscrp.get('unit', 'mg/L')}**
- Optimal: {hscrp.get('optimal', '<1')}
- Status: {'Elevated ⚠️' if hscrp.get('status') == 'high' else 'Borderline'}

**What inflammation is:**
Think of chronic inflammation as a slow-burning fire inside your body. A little is normal, but when it stays elevated, it damages tissues—especially blood vessels.

**Why this matters:**
1. Damages artery walls
2. Makes plaque unstable
3. Worsens insulin resistance
4. Accelerates biological aging

**Your plan targets this:**
• Fish oil → Strong anti-inflammatory
• Sleep optimization → Reduces inflammatory markers
• Post-meal walks → Reduces glucose spikes""",
            suggestions=[
                "How long until hs-CRP improves?",
                "What foods cause inflammation?",
                "Tell me about sleep and inflammation"
            ]
        )
    
    # Default response
    return ChatResponse(
        response=f"""Hi {user_context.get('name', 'there')}! 👋

I'm here to help you understand your health results. Based on your profile:

**Your Key Numbers:**
- Health Score: {user_context.get('health_score', 'N/A')}/100
- Biological Age: {user_context.get('biological_age', 'N/A')} (Calendar: {user_context.get('chronological_age', 'N/A')})

**Areas to Focus:**
- {', '.join(user_context.get('signals', {}).get('attention', ['Not specified']))}

**Try asking me about:**
- Any specific biomarker (LDL, hs-CRP, glucose)
- Why certain actions are in your plan
- Food and nutrition guidance
- Your progress and projections

What would you like to explore?""",
        suggestions=[
            "Explain my LDL result",
            "Why is inflammation bad?",
            "What foods should I eat?"
        ]
    )

# Routes
@app.get("/")
async def root():
    return {"status": "healthy", "service": "Vytal Dashboard API"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@app.post("/api/v1/chat/message", response_model=ChatResponse)
async def chat_message(message: ChatMessage):
    """Send a message to the AI health assistant."""
    try:
        user_context = message.user_context or MOCK_USER_CONTEXT
        response = get_ai_response(message.message, user_context)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/user/profile")
async def get_user_profile():
    """Get the user's health profile."""
    return MOCK_USER_CONTEXT

@app.post("/api/v1/actions/{action_id}/log")
async def log_action(action_id: str, log: ActionLog):
    """Log completion of an action."""
    return {
        "status": "success",
        "action_id": action_id,
        "logged_status": log.status,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/v1/progress/summary")
async def get_progress_summary():
    """Get progress summary."""
    return {
        "days_active": 7,
        "current_streak": 5,
        "consistency": 75,
        "actions_completed": 23,
        "health_score_change": "+2",
        "biomarker_projections": {
            "ldl": {"current": 145, "projected": 115},
            "hscrp": {"current": 3.2, "projected": 1.5},
            "triglycerides": {"current": 180, "projected": 130}
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

