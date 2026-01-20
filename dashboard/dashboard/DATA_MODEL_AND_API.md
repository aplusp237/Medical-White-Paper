# Vytal Dashboard: Data Models & API Design

---

## 📊 DATA MODELS

### Core Entities

```python
"""
Vytal Dashboard Data Models
Pydantic models for goals, actions, and user progress
"""

from datetime import datetime, date
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


# ============================================================================
# ENUMS
# ============================================================================

class GoalCategory(str, Enum):
    CARDIOVASCULAR = "cardiovascular"
    METABOLIC = "metabolic"
    LIVER = "liver"
    KIDNEY = "kidney"
    THYROID = "thyroid"
    NUTRITIONAL = "nutritional"
    INFLAMMATION = "inflammation"
    BIOLOGICAL_AGE = "biological_age"
    CUSTOM = "custom"


class GoalIntensity(str, Enum):
    GENTLE = "gentle"      # 2-3 habits, ~10% improvement
    BALANCED = "balanced"  # 4-5 habits, ~20% improvement
    INTENSIVE = "intensive"  # 6-8 habits, ~30% improvement


class GoalStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"
    ABANDONED = "abandoned"


class ActionCategory(str, Enum):
    NUTRITION = "nutrition"
    MOVEMENT = "movement"
    SUPPLEMENT = "supplement"
    LIFESTYLE = "lifestyle"
    MINDSET = "mindset"


class ActionFrequency(str, Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    SPECIFIC_DAYS = "specific_days"
    ON_DEMAND = "on_demand"


class ActionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    SKIPPED = "skipped"
    PARTIAL = "partial"


class SignalPriority(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


# ============================================================================
# USER PROFILE & REPORT DATA
# ============================================================================

class BiomarkerValue(BaseModel):
    """Single biomarker reading from user's report"""
    biomarker_id: str
    name: str
    value: float
    unit: str
    reference_low: Optional[float] = None
    reference_high: Optional[float] = None
    status: str  # "normal", "borderline_low", "borderline_high", "low", "high"
    percentile: Optional[int] = None  # Where user falls in population


class HealthSignal(BaseModel):
    """Early health signal derived from biomarker patterns"""
    signal_id: str
    type: str  # "single", "within_system", "multi_system"
    system: str  # "cardiovascular", "renal", etc.
    involved_biomarkers: list[str]
    condition_name: str
    priority: SignalPriority
    medical_insight: str
    layman_insight: str
    source: str
    user_values: dict[str, float]  # biomarker_id -> user's value


class UserHealthProfile(BaseModel):
    """User's complete health profile from report"""
    user_id: str
    report_id: str
    report_date: datetime
    
    # Scores
    health_score: int = Field(ge=0, le=100)
    biological_age: float
    chronological_age: int
    
    # Biomarkers
    biomarkers: list[BiomarkerValue]
    
    # Derived signals
    signals: list[HealthSignal]
    
    # System-level summaries
    system_statuses: dict[str, str]  # system -> "healthy", "attention", "warning"


# ============================================================================
# GOALS
# ============================================================================

class GoalBiomarkerTarget(BaseModel):
    """Target improvement for a specific biomarker"""
    biomarker_id: str
    name: str
    baseline_value: float
    target_value: float
    unit: str
    projected_value: Optional[float] = None  # Model's prediction
    actual_value: Optional[float] = None     # From re-test


class Goal(BaseModel):
    """User's health goal"""
    goal_id: str
    user_id: str
    
    # Goal definition
    category: GoalCategory
    title: str
    description: str
    why_it_matters: str  # Personalized explanation
    
    # Configuration
    intensity: GoalIntensity
    duration_days: int = 90
    
    # Targets
    biomarker_targets: list[GoalBiomarkerTarget]
    health_score_target: Optional[int] = None
    biological_age_target: Optional[float] = None
    
    # Timeline
    start_date: date
    end_date: date
    status: GoalStatus = GoalStatus.ACTIVE
    
    # Progress tracking
    created_at: datetime
    updated_at: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "goal_id": "goal_12345",
                "user_id": "user_abc",
                "category": "cardiovascular",
                "title": "Lower Cardiovascular Risk",
                "description": "Reduce LDL, lower inflammation, improve heart health",
                "why_it_matters": "Your LDL (145) and hs-CRP (3.2) pattern suggests...",
                "intensity": "balanced",
                "duration_days": 90,
                "biomarker_targets": [
                    {
                        "biomarker_id": "ldl",
                        "name": "LDL Cholesterol",
                        "baseline_value": 145,
                        "target_value": 100,
                        "unit": "mg/dL"
                    }
                ],
                "start_date": "2026-01-15",
                "end_date": "2026-04-15",
                "status": "active"
            }
        }


# ============================================================================
# ACTIONS & HABITS
# ============================================================================

class ActionDefinition(BaseModel):
    """Definition of an action/habit in the library"""
    action_id: str
    
    # Display
    name: str
    short_name: str  # For notifications
    icon: str
    description: str
    how_to: list[str]  # Step-by-step instructions
    
    # Categorization
    category: ActionCategory
    goal_categories: list[GoalCategory]  # Which goals this supports
    
    # Impact
    target_biomarkers: list[str]
    impact_level: str  # "high", "moderate", "low"
    difficulty: str    # "easy", "moderate", "hard"
    time_commitment_minutes: int
    
    # Frequency
    default_frequency: ActionFrequency
    recommended_time: Optional[str] = None  # "morning", "with_meal", "evening"
    
    # Tracking
    metric_type: str  # "boolean", "count", "duration", "value"
    metric_unit: Optional[str] = None
    metric_target: Optional[float] = None


class UserAction(BaseModel):
    """Action assigned to a user as part of their goal"""
    user_action_id: str
    user_id: str
    goal_id: str
    action_id: str  # Reference to ActionDefinition
    
    # Personalization
    personalized_title: Optional[str] = None
    personalized_description: Optional[str] = None
    
    # Schedule
    frequency: ActionFrequency
    specific_days: Optional[list[str]] = None  # ["monday", "wednesday", "friday"]
    reminder_time: Optional[str] = None  # "08:00"
    
    # Activation
    phase: int  # 1, 2, or 3 (which week phase)
    activation_date: date
    is_active: bool = True
    
    # Stats
    total_completions: int = 0
    current_streak: int = 0
    longest_streak: int = 0
    
    created_at: datetime
    updated_at: datetime


class ActionLog(BaseModel):
    """Daily log entry for an action"""
    log_id: str
    user_action_id: str
    user_id: str
    
    # When
    log_date: date
    logged_at: datetime
    
    # What
    status: ActionStatus
    value: Optional[float] = None  # For tracked metrics
    notes: Optional[str] = None
    
    # Context
    reminder_sent: bool = False
    logged_via: str  # "app", "notification", "chat"


# ============================================================================
# PROGRESS & ANALYTICS
# ============================================================================

class DailyProgress(BaseModel):
    """User's progress for a single day"""
    user_id: str
    date: date
    
    # Action completion
    actions_planned: int
    actions_completed: int
    completion_rate: float
    
    # Streak
    streak_continued: bool
    current_streak: int
    
    # Optional tracking
    energy_level: Optional[int] = None  # 1-5
    mood: Optional[int] = None          # 1-5
    notes: Optional[str] = None


class WeeklyProgress(BaseModel):
    """Aggregated weekly progress"""
    user_id: str
    goal_id: str
    week_number: int
    week_start: date
    week_end: date
    
    # Metrics
    consistency_score: float  # 0-100
    days_active: int
    total_actions_completed: int
    total_actions_planned: int
    
    # By category
    category_breakdown: dict[str, float]  # category -> completion rate
    
    # Highlights
    top_performing_action: Optional[str] = None
    needs_attention_action: Optional[str] = None
    
    # Biomarker projections
    projected_biomarkers: dict[str, float]  # biomarker_id -> projected value


class GoalProgress(BaseModel):
    """Overall progress toward a goal"""
    goal_id: str
    user_id: str
    
    # Timeline
    days_elapsed: int
    days_remaining: int
    percent_complete: float
    
    # Consistency
    overall_consistency: float
    best_week_consistency: float
    current_week_consistency: float
    
    # Streaks
    current_streak: int
    longest_streak: int
    
    # Projections
    on_track: bool
    projected_health_score: Optional[int] = None
    projected_biomarkers: dict[str, float]
    
    # Milestones
    milestones_achieved: list[str]
    next_milestone: Optional[str] = None


# ============================================================================
# CHAT / CONVERSATIONS
# ============================================================================

class ChatMessage(BaseModel):
    """Single message in a conversation"""
    message_id: str
    conversation_id: str
    user_id: str
    
    role: str  # "user" or "assistant"
    content: str
    
    # Context used (for assistant messages)
    context_used: Optional[dict] = None  # biomarkers, actions, etc.
    
    # Suggested follow-ups
    suggested_replies: Optional[list[str]] = None
    
    created_at: datetime


class Conversation(BaseModel):
    """Chat conversation thread"""
    conversation_id: str
    user_id: str
    
    # Type
    topic: Optional[str] = None  # "biomarker_explanation", "motivation", etc.
    
    # State
    is_active: bool = True
    message_count: int = 0
    
    created_at: datetime
    last_message_at: datetime


# ============================================================================
# NOTIFICATIONS
# ============================================================================

class NotificationPreferences(BaseModel):
    """User's notification preferences"""
    user_id: str
    
    # Channels
    push_enabled: bool = True
    sms_enabled: bool = False
    whatsapp_enabled: bool = True
    email_enabled: bool = True
    
    # Timing
    morning_checkin_time: str = "08:00"
    evening_wrapup_time: str = "20:00"
    
    # Types
    daily_reminders: bool = True
    streak_alerts: bool = True
    weekly_summary: bool = True
    milestone_celebrations: bool = True
    
    # Quiet hours
    quiet_start: str = "22:00"
    quiet_end: str = "07:00"


class ScheduledNotification(BaseModel):
    """Notification to be sent"""
    notification_id: str
    user_id: str
    
    # Type
    type: str  # "morning_checkin", "action_reminder", "streak_at_risk", etc.
    
    # Content
    title: str
    body: str
    data: Optional[dict] = None  # Deep link data
    
    # Schedule
    scheduled_for: datetime
    channel: str  # "push", "sms", "whatsapp", "email"
    
    # Status
    sent: bool = False
    sent_at: Optional[datetime] = None
    opened: bool = False
    opened_at: Optional[datetime] = None
```

---

## 🔌 API DESIGN

### Endpoints Overview

```yaml
endpoints:
  
  # Onboarding & Goals
  POST   /api/v1/goals                          # Create new goal
  GET    /api/v1/goals                          # List user's goals
  GET    /api/v1/goals/{goal_id}                # Get goal details
  PATCH  /api/v1/goals/{goal_id}                # Update goal (pause, intensity, etc.)
  DELETE /api/v1/goals/{goal_id}                # Abandon goal
  
  # Goal Recommendations
  GET    /api/v1/goals/recommendations          # Get recommended goals for user
  POST   /api/v1/goals/custom                   # Create custom goal from prompt
  
  # Actions
  GET    /api/v1/actions/library                # Get full action library
  GET    /api/v1/goals/{goal_id}/actions        # Get actions for a goal
  POST   /api/v1/actions/{action_id}/log        # Log action completion
  GET    /api/v1/actions/today                  # Get today's actions
  
  # Progress
  GET    /api/v1/progress/daily                 # Get daily progress
  GET    /api/v1/progress/weekly                # Get weekly summary
  GET    /api/v1/progress/goal/{goal_id}        # Get goal progress
  GET    /api/v1/progress/projections           # Get biomarker projections
  
  # Chat
  POST   /api/v1/chat/message                   # Send message to AI
  GET    /api/v1/chat/conversations             # List conversations
  GET    /api/v1/chat/conversations/{id}        # Get conversation history
  
  # Notifications
  GET    /api/v1/notifications/preferences      # Get notification prefs
  PUT    /api/v1/notifications/preferences      # Update notification prefs
```

### Detailed Endpoint Specs

#### Create Goal

```yaml
POST /api/v1/goals

description: Create a new health goal for the user

request_body:
  category: "cardiovascular"
  intensity: "balanced"
  duration_days: 90  # optional, defaults to 90
  custom_prompt: null  # For custom goals: "I want more energy"

response:
  goal_id: "goal_12345"
  category: "cardiovascular"
  title: "Lower Cardiovascular Risk"
  description: "Focus on reducing LDL and inflammation..."
  why_it_matters: "Your LDL (145 mg/dL) combined with..."
  intensity: "balanced"
  duration_days: 90
  start_date: "2026-01-15"
  end_date: "2026-04-15"
  biomarker_targets:
    - biomarker_id: "ldl"
      name: "LDL Cholesterol"
      baseline_value: 145
      target_value: 100
      unit: "mg/dL"
    - biomarker_id: "hscrp"
      name: "hs-CRP"
      baseline_value: 3.2
      target_value: 1.0
      unit: "mg/L"
  actions:
    - user_action_id: "ua_001"
      action_id: "add_fiber"
      name: "Add 10g Fiber Daily"
      phase: 1
      activation_date: "2026-01-15"
    - user_action_id: "ua_002"
      action_id: "post_meal_walk"
      name: "10-Min Post-Meal Walk"
      phase: 1
      activation_date: "2026-01-15"
    # ... more actions
  created_at: "2026-01-15T10:30:00Z"

errors:
  400: Invalid category or intensity
  409: User already has active goal in this category
```

#### Get Goal Recommendations

```yaml
GET /api/v1/goals/recommendations

description: Get personalized goal recommendations based on user's health profile

query_params:
  limit: 4  # optional, max recommendations to return

response:
  recommendations:
    - category: "cardiovascular"
      title: "Lower Cardiovascular Risk"
      priority: "high"
      reason: "Your LDL + hs-CRP pattern is the #1 lever for your health"
      potential_impact:
        health_score_delta: "+7"
        key_biomarkers:
          - name: "LDL"
            current: 145
            target: 100
            unit: "mg/dL"
          - name: "hs-CRP"
            current: 3.2
            target: 1.0
            unit: "mg/L"
      related_signals:
        - "Cardiovascular Inflammation"
        - "Atherogenic lipid pattern"
      recommended_intensity: "balanced"
      
    - category: "metabolic"
      title: "Reverse Pre-Diabetes Pattern"
      priority: "high"
      reason: "Your HbA1c and glucose are in the warning zone"
      # ... similar structure
      
    - category: "biological_age"
      title: "Reduce Biological Age"
      priority: "medium"
      reason: "Holistic improvement across systems"
      # ...
```

#### Log Action

```yaml
POST /api/v1/actions/{action_id}/log

description: Log completion of an action for today

request_body:
  status: "completed"  # "completed", "skipped", "partial"
  value: 12  # optional, for tracked metrics (e.g., grams of fiber)
  notes: "Had oatmeal for breakfast"  # optional

response:
  log_id: "log_abc123"
  action_id: "add_fiber"
  user_action_id: "ua_001"
  status: "completed"
  log_date: "2026-01-20"
  logged_at: "2026-01-20T08:15:00Z"
  
  # Updated stats
  streak_update:
    previous_streak: 4
    current_streak: 5
    longest_streak: 5
    streak_milestone: "5_day"  # null if no milestone
    
  # Encouragement
  celebration:
    type: "streak_milestone"
    message: "5-day streak! Your body is starting to adapt."
    
  # Daily progress update
  daily_progress:
    actions_planned: 4
    actions_completed: 2
    completion_rate: 0.5
    remaining_actions:
      - action_id: "post_meal_walk"
        name: "Post-Meal Walk"
      - action_id: "sleep_by_1030"
        name: "Sleep by 10:30 PM"
```

#### Get Today's Actions

```yaml
GET /api/v1/actions/today

description: Get all actions due today with completion status

response:
  date: "2026-01-20"
  goal:
    goal_id: "goal_12345"
    title: "Lower Cardiovascular Risk"
    day_number: 6
    days_remaining: 84
    
  actions:
    - user_action_id: "ua_001"
      action_id: "add_fiber"
      name: "Add 10g Fiber Daily"
      icon: "🥗"
      category: "nutrition"
      status: "completed"
      completed_at: "2026-01-20T08:15:00Z"
      streak: 5
      target_biomarkers: ["ldl", "glucose"]
      
    - user_action_id: "ua_002"
      action_id: "post_meal_walk"
      name: "10-Min Post-Meal Walk"
      icon: "🚶"
      category: "movement"
      status: "pending"
      reminder_time: "13:00"
      streak: 3
      target_biomarkers: ["glucose", "triglycerides"]
      
    - user_action_id: "ua_003"
      action_id: "fish_oil"
      name: "Fish Oil Supplement"
      icon: "💊"
      category: "supplement"
      status: "pending"
      reminder_time: "13:00"
      streak: 5
      target_biomarkers: ["triglycerides", "hscrp"]
      
    - user_action_id: "ua_004"
      action_id: "sleep_by_1030"
      name: "Wind Down by 10:30 PM"
      icon: "😴"
      category: "lifestyle"
      status: "pending"
      reminder_time: "21:30"
      streak: 2
      target_biomarkers: ["hscrp", "cortisol"]
      
  summary:
    total: 4
    completed: 1
    pending: 3
    skipped: 0
    completion_rate: 0.25
    
  motivation:
    streak_at_risk: false
    message: "3 more actions to complete today. You've got this!"
```

#### Get Goal Progress

```yaml
GET /api/v1/progress/goal/{goal_id}

description: Get comprehensive progress for a goal

response:
  goal:
    goal_id: "goal_12345"
    title: "Lower Cardiovascular Risk"
    status: "active"
    
  timeline:
    start_date: "2026-01-15"
    end_date: "2026-04-15"
    days_elapsed: 28
    days_remaining: 62
    percent_complete: 31
    
  consistency:
    overall: 74
    trend: "improving"  # "improving", "stable", "declining"
    best_week: 85
    worst_week: 62
    current_week: 78
    
  streaks:
    current: 5
    longest: 12
    average: 4.2
    
  by_action:
    - action_id: "add_fiber"
      name: "Add 10g Fiber Daily"
      completion_rate: 82
      streak: 5
      status: "on_track"
      
    - action_id: "post_meal_walk"
      name: "Post-Meal Walk"
      completion_rate: 64
      streak: 3
      status: "needs_attention"
      
    - action_id: "fish_oil"
      name: "Fish Oil"
      completion_rate: 93
      streak: 5
      status: "excellent"
      
    - action_id: "sleep_by_1030"
      name: "Sleep Goal"
      completion_rate: 57
      streak: 2
      status: "needs_attention"
      
  biomarker_projections:
    note: "Based on your consistency and similar user outcomes"
    projections:
      - biomarker_id: "ldl"
        name: "LDL Cholesterol"
        baseline: 145
        current_projected: 125
        target: 100
        end_projected: 112
        on_track: true
        confidence: "medium"
        
      - biomarker_id: "hscrp"
        name: "hs-CRP"
        baseline: 3.2
        current_projected: 2.4
        target: 1.0
        end_projected: 1.8
        on_track: false
        confidence: "medium"
        improvement_tip: "Improving sleep consistency could accelerate this"
        
      - biomarker_id: "triglycerides"
        name: "Triglycerides"
        baseline: 180
        current_projected: 145
        target: 100
        end_projected: 115
        on_track: true
        confidence: "high"
        
  health_score_projection:
    baseline: 78
    current_projected: 82
    end_projected: 86
    target: 85
    on_track: true
    
  milestones:
    achieved:
      - id: "week_1_complete"
        name: "First Week Complete"
        achieved_at: "2026-01-22"
      - id: "first_streak_7"
        name: "7-Day Streak"
        achieved_at: "2026-01-28"
    upcoming:
      - id: "week_4_complete"
        name: "Month 1 Complete"
        days_away: 2
      - id: "halfway"
        name: "Halfway Point"
        days_away: 17
        
  recommendations:
    focus_areas:
      - "Your sleep and walk habits are lagging. These directly impact hs-CRP."
    quick_wins:
      - "Even a 5-minute post-meal walk counts. Lower the bar to build the habit."
    retest_suggestion:
      days_until_recommended: 47
      message: "Schedule a re-test around Day 75 to validate your progress"
```

#### Chat Message

```yaml
POST /api/v1/chat/message

description: Send a message to the AI health assistant

request_body:
  conversation_id: "conv_123"  # optional, creates new if not provided
  message: "Why is my hs-CRP elevated and what can I do about it?"

response:
  conversation_id: "conv_123"
  message_id: "msg_456"
  
  response:
    content: |
      Great question. Your hs-CRP is 3.2 mg/L, which signals elevated 
      inflammation in your body.
      
      **Why this matters:**
      Chronic inflammation is like a slow fire. It damages artery walls, 
      making them more likely to collect cholesterol deposits...
      
      [Full response content]
      
    context_used:
      biomarkers:
        - hscrp: 3.2
        - ldl: 145
      goal: "cardiovascular"
      related_actions:
        - "fish_oil"
        - "sleep_by_1030"
        
    suggested_replies:
      - "Tell me more about sleep and inflammation"
      - "What anti-inflammatory foods should I eat?"
      - "How long until I see improvement?"
      
  created_at: "2026-01-20T14:30:00Z"
```

---

## 🗄️ DATABASE SCHEMA

### PostgreSQL Schema

```sql
-- Users (linked to existing auth system)
CREATE TABLE dashboard_users (
    user_id VARCHAR(50) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_completed_at TIMESTAMP
);

-- Health Profiles (from reports)
CREATE TABLE health_profiles (
    profile_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    report_id VARCHAR(50) NOT NULL,
    report_date TIMESTAMP NOT NULL,
    health_score INTEGER NOT NULL,
    biological_age DECIMAL(4,1) NOT NULL,
    chronological_age INTEGER NOT NULL,
    biomarkers JSONB NOT NULL,  -- Array of BiomarkerValue
    signals JSONB NOT NULL,      -- Array of HealthSignal
    system_statuses JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, report_id)
);

-- Goals
CREATE TABLE goals (
    goal_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    profile_id VARCHAR(50) REFERENCES health_profiles(profile_id),
    category VARCHAR(30) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    why_it_matters TEXT,
    intensity VARCHAR(20) NOT NULL,
    duration_days INTEGER DEFAULT 90,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    biomarker_targets JSONB,
    health_score_target INTEGER,
    biological_age_target DECIMAL(4,1),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_goals_user ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);

-- Action Definitions (library)
CREATE TABLE action_definitions (
    action_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    how_to JSONB,  -- Array of strings
    category VARCHAR(30) NOT NULL,
    goal_categories JSONB NOT NULL,  -- Array of strings
    target_biomarkers JSONB NOT NULL,  -- Array of strings
    impact_level VARCHAR(20),
    difficulty VARCHAR(20),
    time_commitment_minutes INTEGER,
    default_frequency VARCHAR(20),
    recommended_time VARCHAR(20),
    metric_type VARCHAR(20),
    metric_unit VARCHAR(20),
    metric_target DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User Actions (assigned to user for a goal)
CREATE TABLE user_actions (
    user_action_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    goal_id VARCHAR(50) REFERENCES goals(goal_id),
    action_id VARCHAR(50) REFERENCES action_definitions(action_id),
    personalized_title VARCHAR(200),
    personalized_description TEXT,
    frequency VARCHAR(20) NOT NULL,
    specific_days JSONB,  -- Array of day names
    reminder_time TIME,
    phase INTEGER NOT NULL,
    activation_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    total_completions INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_actions_user ON user_actions(user_id);
CREATE INDEX idx_user_actions_goal ON user_actions(goal_id);

-- Action Logs
CREATE TABLE action_logs (
    log_id VARCHAR(50) PRIMARY KEY,
    user_action_id VARCHAR(50) REFERENCES user_actions(user_action_id),
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    log_date DATE NOT NULL,
    logged_at TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    value DECIMAL(10,2),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    logged_via VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_action_logs_user_date ON action_logs(user_id, log_date);
CREATE INDEX idx_action_logs_user_action ON action_logs(user_action_id);
CREATE UNIQUE INDEX idx_action_logs_unique ON action_logs(user_action_id, log_date);

-- Daily Progress (aggregated)
CREATE TABLE daily_progress (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    date DATE NOT NULL,
    actions_planned INTEGER NOT NULL,
    actions_completed INTEGER NOT NULL,
    completion_rate DECIMAL(5,2) NOT NULL,
    streak_continued BOOLEAN NOT NULL,
    current_streak INTEGER NOT NULL,
    energy_level INTEGER,
    mood INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, date)
);

CREATE INDEX idx_daily_progress_user ON daily_progress(user_id, date);

-- Conversations
CREATE TABLE conversations (
    conversation_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    topic VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    message_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP
);

-- Chat Messages
CREATE TABLE chat_messages (
    message_id VARCHAR(50) PRIMARY KEY,
    conversation_id VARCHAR(50) REFERENCES conversations(conversation_id),
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    role VARCHAR(20) NOT NULL,  -- 'user' or 'assistant'
    content TEXT NOT NULL,
    context_used JSONB,
    suggested_replies JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);

-- Notification Preferences
CREATE TABLE notification_preferences (
    user_id VARCHAR(50) PRIMARY KEY REFERENCES dashboard_users(user_id),
    push_enabled BOOLEAN DEFAULT TRUE,
    sms_enabled BOOLEAN DEFAULT FALSE,
    whatsapp_enabled BOOLEAN DEFAULT TRUE,
    email_enabled BOOLEAN DEFAULT TRUE,
    morning_checkin_time TIME DEFAULT '08:00',
    evening_wrapup_time TIME DEFAULT '20:00',
    daily_reminders BOOLEAN DEFAULT TRUE,
    streak_alerts BOOLEAN DEFAULT TRUE,
    weekly_summary BOOLEAN DEFAULT TRUE,
    milestone_celebrations BOOLEAN DEFAULT TRUE,
    quiet_start TIME DEFAULT '22:00',
    quiet_end TIME DEFAULT '07:00',
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Scheduled Notifications
CREATE TABLE scheduled_notifications (
    notification_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES dashboard_users(user_id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    data JSONB,
    scheduled_for TIMESTAMP NOT NULL,
    channel VARCHAR(20) NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP,
    opened BOOLEAN DEFAULT FALSE,
    opened_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scheduled_notifications_pending 
    ON scheduled_notifications(scheduled_for) 
    WHERE sent = FALSE;
```

---

## 🔧 IMPLEMENTATION NOTES

### Action Plan Generation Logic

```python
def generate_action_plan(
    user_profile: UserHealthProfile,
    goal: Goal,
    intensity: GoalIntensity
) -> list[UserAction]:
    """
    Generate personalized action plan based on user's profile and goal.
    """
    
    # Get all actions that support this goal category
    available_actions = get_actions_for_category(goal.category)
    
    # Score and rank actions based on user's specific biomarkers
    scored_actions = []
    for action in available_actions:
        score = 0
        
        # Higher score if action targets user's problematic biomarkers
        for biomarker_id in action.target_biomarkers:
            user_value = get_biomarker_value(user_profile, biomarker_id)
            if user_value and is_abnormal(user_value):
                score += get_impact_weight(action.impact_level)
        
        # Adjust for difficulty vs intensity preference
        difficulty_match = get_difficulty_match(action.difficulty, intensity)
        score *= difficulty_match
        
        scored_actions.append((action, score))
    
    # Sort by score
    scored_actions.sort(key=lambda x: x[1], reverse=True)
    
    # Select actions based on intensity
    action_counts = {
        GoalIntensity.GENTLE: 3,
        GoalIntensity.BALANCED: 5,
        GoalIntensity.INTENSIVE: 8
    }
    
    selected = scored_actions[:action_counts[intensity]]
    
    # Assign to phases
    user_actions = []
    for i, (action, score) in enumerate(selected):
        phase = 1 if i < 3 else (2 if i < 5 else 3)
        
        user_action = UserAction(
            user_action_id=generate_id(),
            user_id=user_profile.user_id,
            goal_id=goal.goal_id,
            action_id=action.action_id,
            frequency=action.default_frequency,
            phase=phase,
            activation_date=calculate_activation_date(goal.start_date, phase),
            is_active=(phase == 1)  # Only phase 1 active initially
        )
        user_actions.append(user_action)
    
    return user_actions
```

### Biomarker Projection Model

```python
def project_biomarker_improvement(
    biomarker_id: str,
    baseline_value: float,
    user_consistency: float,
    days_elapsed: int,
    total_days: int,
    relevant_actions: list[UserAction]
) -> dict:
    """
    Project expected biomarker improvement based on consistency.
    
    This is a simplified model. In production, you'd want:
    1. ML model trained on real user outcomes
    2. Population-level improvement curves
    3. Individual response factors
    """
    
    # Get expected improvement per action
    total_impact_factor = 0
    for action in relevant_actions:
        action_completion = get_action_completion_rate(action)
        action_impact = get_biomarker_impact(action.action_id, biomarker_id)
        total_impact_factor += action_completion * action_impact
    
    # Apply time decay (improvements plateau)
    time_factor = min(1.0, days_elapsed / 60)  # Most improvement by day 60
    
    # Calculate projected improvement
    max_improvement = get_max_improvement(biomarker_id)  # e.g., 30% for LDL
    expected_improvement = max_improvement * total_impact_factor * time_factor
    
    # Apply to baseline
    if is_lower_better(biomarker_id):
        projected_value = baseline_value * (1 - expected_improvement)
    else:
        projected_value = baseline_value * (1 + expected_improvement)
    
    return {
        'biomarker_id': biomarker_id,
        'baseline': baseline_value,
        'projected': projected_value,
        'improvement_percent': expected_improvement * 100,
        'confidence': 'medium' if user_consistency > 0.7 else 'low'
    }
```

### Streak Calculation

```python
def update_streak(
    user_action: UserAction,
    log_date: date,
    status: ActionStatus
) -> dict:
    """
    Update streak for an action based on new log.
    """
    
    # Get previous day's log
    previous_date = log_date - timedelta(days=1)
    previous_log = get_action_log(user_action.user_action_id, previous_date)
    
    if status == ActionStatus.COMPLETED:
        if previous_log and previous_log.status == ActionStatus.COMPLETED:
            # Continue streak
            new_streak = user_action.current_streak + 1
        else:
            # Start new streak
            new_streak = 1
    else:
        # Streak broken
        new_streak = 0
    
    # Update longest streak
    new_longest = max(user_action.longest_streak, new_streak)
    
    # Check for milestone
    milestone = None
    milestones = [3, 7, 14, 21, 30, 60, 90]
    if new_streak in milestones and new_streak > user_action.current_streak:
        milestone = f"{new_streak}_day"
    
    return {
        'previous_streak': user_action.current_streak,
        'current_streak': new_streak,
        'longest_streak': new_longest,
        'streak_milestone': milestone
    }
```

---

## 🚀 DEPLOYMENT CONSIDERATIONS

### Caching Strategy

```yaml
redis_cache:
  
  user_today_actions:
    key: "user:{user_id}:today_actions"
    ttl: 3600  # 1 hour
    invalidate_on: ["action_log", "day_change"]
    
  user_goal_progress:
    key: "user:{user_id}:goal:{goal_id}:progress"
    ttl: 300  # 5 minutes
    invalidate_on: ["action_log"]
    
  action_library:
    key: "action_library"
    ttl: 86400  # 24 hours
    invalidate_on: ["action_definition_update"]
    
  user_streaks:
    key: "user:{user_id}:streaks"
    ttl: 3600
    invalidate_on: ["action_log"]
```

### Background Jobs

```yaml
celery_tasks:

  daily_progress_aggregation:
    schedule: "0 0 * * *"  # Midnight
    task: "Aggregate previous day's progress for all users"
    
  streak_check:
    schedule: "0 1 * * *"  # 1 AM
    task: "Reset streaks for users who missed previous day"
    
  notification_scheduler:
    schedule: "*/5 * * * *"  # Every 5 minutes
    task: "Queue notifications for upcoming reminders"
    
  weekly_summary_generation:
    schedule: "0 18 * * 0"  # Sunday 6 PM
    task: "Generate and send weekly summaries"
    
  biomarker_projection_update:
    schedule: "0 2 * * *"  # 2 AM
    task: "Recalculate biomarker projections based on latest consistency"
```

---

*This document provides the complete technical specification for implementing the Vytal dashboard backend. The models and APIs are designed to support the UX flows described in the companion documents.*

