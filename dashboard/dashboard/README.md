# 🌿 Vytal Health Dashboard

A beautiful, empathetic health dashboard that transforms your health report into an actionable journey.

## ✨ Features

- **Beautiful Onboarding**: Guided 7-step flow from health score reveal to goal setting
- **Action-Centric Design**: Daily habits with streaks, completion tracking, and detailed explanations
- **Progress Tracking**: Visual biomarker projections and consistency charts
- **AI Health Chat**: Conversational interface to understand your biomarkers
- **Empathetic UX**: Warm, supportive copy that motivates without alarming

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)

### One-Command Start

```bash
cd dashboard
chmod +x start-dashboard.sh
./start-dashboard.sh
```

This will:
1. Install frontend dependencies (if needed)
2. Set up Python virtual environment (if needed)
3. Start both frontend (port 3000) and backend (port 8080)
4. Open the dashboard at `http://localhost:3000`

### Manual Start

**Frontend:**
```bash
cd dashboard/frontend
npm install
npm run dev
```

**Backend:**
```bash
cd dashboard/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

## 🎨 Design Philosophy

### Empathetic by Design

The dashboard is built around these principles:

1. **Warm, Not Clinical**: Health data can be scary. Our copy is supportive and actionable.
2. **Progress Over Perfection**: We celebrate consistency, not perfection.
3. **Actionable Insights**: Every piece of data connects to something the user can do.
4. **Educational**: Users learn *why* each action matters for their specific biomarkers.

### Visual Design

- **Color Palette**: Calming greens and teals, warm ambers for attention
- **Typography**: DM Sans for readability, Outfit for display
- **Motion**: Subtle animations that feel alive without being distracting
- **Whitespace**: Generous spacing that reduces cognitive load

## 📱 Screens

### Onboarding Flow
1. **Welcome & Health Score**: Big reveal with percentile comparison
2. **Biological Age**: Calendar vs biological age comparison
3. **Health Signals**: Priority-ordered findings from 51 biomarkers
4. **Goal Selection**: Recommended goals based on user's profile
5. **Intensity Selection**: Gentle / Balanced / Intensive
6. **Plan Preview**: 90-day action plan with phases
7. **First Action**: Immediate micro-commitment
8. **Complete**: What to expect next

### Main Dashboard
- **Home**: Today's actions, streak, quick stats
- **Actions**: Detailed view with explanations for each habit
- **Progress**: Charts, projections, biomarker tracking
- **Chat**: AI assistant for questions

## 🤖 AI Chat

The chat feature can use OpenAI for intelligent responses. Set your API key:

```bash
export OPENAI_API_KEY=your_key_here
```

Without an API key, the chat uses curated fallback responses based on common questions.

### What the AI Can Help With

- Explaining any biomarker in simple terms
- Connecting biomarkers to the action plan
- Food and nutrition guidance
- Progress checks and motivation
- Understanding health signals

## 🗂️ Project Structure

```
dashboard/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context (user state)
│   │   ├── pages/           # Main page components
│   │   └── index.css        # Global styles + Tailwind
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # FastAPI backend
│   ├── main.py              # API endpoints
│   └── requirements.txt
├── start-dashboard.sh       # One-click launcher
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI chat | No (uses fallback) |

### Customization

- **Colors**: Edit `tailwind.config.js` for theme colors
- **Actions**: Modify `actionTemplates` in `Onboarding.jsx`
- **AI Prompts**: Edit `SYSTEM_PROMPT` in `backend/main.py`

## 📊 Demo Data

The dashboard uses mock user data for demonstration. In production, this would come from your health report API.

Mock profile includes:
- 51 biomarkers with values and status
- Health score and biological age
- Early health signals (attention, watch, strengths)
- Goal and action tracking

## 🛠️ Development

### Frontend Development

```bash
cd dashboard/frontend
npm run dev
```

Hot reloading is enabled. Changes reflect immediately.

### Backend Development

```bash
cd dashboard/backend
source .venv/bin/activate
python main.py
```

### Adding New Actions

1. Add action template in `frontend/src/pages/Onboarding.jsx`
2. Add action details in `frontend/src/pages/Actions.jsx`
3. Map to biomarkers appropriately

## 📝 License

Proprietary - Vytal Health / Bajaj Finserv Health

---

Built with ❤️ for better health outcomes.

