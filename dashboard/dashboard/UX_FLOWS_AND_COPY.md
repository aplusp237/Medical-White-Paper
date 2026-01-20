# Vytal Dashboard: Screen-by-Screen UX Flows & Copy

---

## 🔄 COMPLETE USER JOURNEY MAP

```
                                    ┌─────────────────────┐
                                    │   USER RECEIVES     │
                                    │   PDF REPORT        │
                                    └──────────┬──────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           ONBOARDING FLOW (5-7 min)                          │
│                                                                              │
│  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐│
│  │Welcome │ → │Bio Age │ → │Signals │ → │ Goal   │ → │ Depth  │ → │ First  ││
│  │& Score │   │Reveal  │   │Summary │   │ Select │   │ Config │   │ Action ││
│  └────────┘   └────────┘   └────────┘   └────────┘   └────────┘   └────────┘│
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           DAILY ENGAGEMENT LOOP                              │
│                                                                              │
│  ┌─────────────┐                                                             │
│  │  MORNING    │  Wake up → Open app → See today's actions                  │
│  │  CHECK-IN   │  → Quick mood/energy log (optional)                        │
│  └─────────────┘                                                             │
│         │                                                                    │
│         ▼                                                                    │
│  ┌─────────────┐                                                             │
│  │  THROUGHOUT │  Complete actions → Log completion                         │
│  │  THE DAY    │  → Get micro-celebrations → Ask questions via chat         │
│  └─────────────┘                                                             │
│         │                                                                    │
│         ▼                                                                    │
│  ┌─────────────┐                                                             │
│  │  EVENING    │  Review day → See streak update                            │
│  │  WRAP-UP    │  → Preview tomorrow → Sleep goal reminder                  │
│  └─────────────┘                                                             │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           WEEKLY/MONTHLY REVIEWS                             │
│                                                                              │
│  Weekly: Progress summary → Adjust next week → Celebrate wins               │
│  Monthly: Deep analytics → Biomarker projections → Goal checkpoint          │
│  90 Days: Re-test prompt → Compare results → Set new goals                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 ONBOARDING FLOW: SCREEN-BY-SCREEN

### SCREEN 1: WELCOME & SCORE REVEAL

**Purpose:** Create emotional impact, establish health score context

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                           VYTAL                                 │
│                                                                 │
│                    ─────────────────────                        │
│                                                                 │
│                                                                 │
│                     ✨ Your Results Are In                      │
│                                                                 │
│                                                                 │
│                 ┌───────────────────────────┐                   │
│                 │                           │                   │
│                 │      [Animated Ring]      │                   │
│                 │                           │                   │
│                 │           78              │                   │
│                 │                           │                   │
│                 │      Health Score         │                   │
│                 │                           │                   │
│                 └───────────────────────────┘                   │
│                                                                 │
│                                                                 │
│           "You're healthier than 68% of people                  │
│            your age. Here's how to go further."                 │
│                                                                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │    Explore My Blueprint →   │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                                                                 │
│                      Skip for now                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**UX Copy Variants by Score:**

| Score Range | Headline | Subheadline |
|-------------|----------|-------------|
| 85+ | "Exceptional Health" | "You're in the top 15%. Let's protect and optimize what you've built." |
| 70-84 | "Strong Foundation" | "Good news: you're ahead of most. A few focused changes can unlock your next level." |
| 55-69 | "Room to Grow" | "You have real opportunities to improve. The good news? They're all addressable." |
| 40-54 | "Time to Act" | "Your body is sending signals. Let's decode them and build a plan together." |
| <40 | "Your Starting Point" | "Knowledge is the first step. Now you know exactly where to focus for maximum impact." |

**Micro-interactions:**
- Health score ring animates from 0 to final score
- Percentile comparison fades in after ring completes
- Subtle confetti for scores 80+

---

### SCREEN 2: BIOLOGICAL AGE REVEAL

**Purpose:** Create the "aha" moment, establish biological vs chronological framing

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ← Back                                   │
│                                                                 │
│                                                                 │
│                                                                 │
│                   Your Body's True Age                          │
│                                                                 │
│                                                                 │
│                 Chronological Age: 42                           │
│                                                                 │
│                                                                 │
│          ┌─────────────────────────────────────┐                │
│          │                                     │                │
│          │    ┌─────┐          ┌─────┐        │                │
│          │    │ 42  │    →     │ 38  │        │                │
│          │    │     │          │     │        │                │
│          │    │ 📅  │          │ 🧬  │        │                │
│          │    └─────┘          └─────┘        │                │
│          │   Calendar         Biological      │                │
│          │                                     │                │
│          │         ▲ 4 years younger           │                │
│          │                                     │                │
│          └─────────────────────────────────────┘                │
│                                                                 │
│                                                                 │
│          "Your cells are performing like someone                │
│           4 years younger. This is the compound                 │
│           effect of choices you've already made."               │
│                                                                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │   See What's Driving This → │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**UX Copy Variants:**

**Younger Biological Age (Positive Delta):**
```
Headline: "Your Body is {X} Years Younger"

Body (1-3 years younger):
"Your biological age is slightly ahead of your calendar. 
This reflects generally healthy habits. Let's widen that gap."

Body (4-7 years younger):
"This is significant. Your body is performing like 
someone in their {bio_age}s. Protect this advantage."

Body (8+ years younger):
"Exceptional. You've earned extra years of vitality. 
Our focus: maintain and optimize."
```

**Older Biological Age (Negative Delta):**
```
Headline: "Your Biological Age is Running Ahead"

Body (1-3 years older):
"Your body's showing some extra wear—but this is 
highly addressable. Small changes create real impact here."

Body (4-7 years older):
"There's work to do, but here's what matters: most of 
this is reversible. We've seen people turn back the clock 
5+ years with focused effort."

Body (8+ years older):
"This is your wake-up call—in the best way. Everything 
we'll work on is designed to reverse this trend. 
Most people see improvement within 90 days."
```

**Same Age:**
```
Headline: "Right On Track"

Body:
"Your biological age matches your calendar. You're at a 
pivotal point—the choices you make now determine which 
direction this goes. Let's tip the scales in your favor."
```

---

### SCREEN 3: HEALTH SIGNALS SUMMARY

**Purpose:** Surface the "so what" from 51 biomarkers + signals

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ← Back                                   │
│                                                                 │
│                                                                 │
│                 What Your Body is Telling Us                    │
│                                                                 │
│          We analyzed 51 biomarkers and found                    │
│          these patterns:                                        │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🔴 NEEDS ATTENTION (tap to learn more)                   │  │
│  │                                                           │  │
│  │  Cardiovascular Inflammation                              │  │
│  │  ─────────────────────────────                            │  │
│  │  Your LDL (145 mg/dL) combined with elevated hs-CRP       │  │
│  │  (3.2 mg/L) indicates your arteries are under stress.     │  │
│  │                                                           │  │
│  │  💡 This is the #1 lever for your health right now.       │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🟡 WATCH CLOSELY                                         │  │
│  │                                                           │  │
│  │  Pre-Diabetic Pattern                                     │  │
│  │  ─────────────────────                                    │  │
│  │  Your HbA1c (5.9%) and fasting glucose (108 mg/dL) are    │  │
│  │  in the warning zone. Early intervention = full reversal. │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🟢 YOUR STRENGTHS                                        │  │
│  │                                                           │  │
│  │  ✓ Liver Function (Normal AST, ALT, GGT)                  │  │
│  │  ✓ Kidney Health (eGFR 95, Creatinine 0.9)               │  │
│  │  ✓ Thyroid Balance (TSH, T3, T4 all optimal)             │  │
│  │  ✓ Blood Health (Hemoglobin, Ferritin, B12 good)         │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │    I'm Ready to Act →       │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Dynamic Content Logic:**

```python
# Pseudo-code for generating signals summary

def generate_signals_summary(user_biomarkers, early_signals):
    
    needs_attention = []
    watch_closely = []
    strengths = []
    
    # Priority: Multi-system signals with high priority
    for signal in early_signals:
        if signal.priority == "High":
            needs_attention.append({
                'title': signal.condition_name,
                'involved': signal.involved_biomarkers,
                'user_values': get_user_values(user_biomarkers, signal.involved_biomarkers),
                'insight': signal.layman_insight,
                'action_hint': signal.action_hint
            })
        elif signal.priority == "Medium":
            watch_closely.append(...)
    
    # Systems with all normal biomarkers → strengths
    for system in BODY_SYSTEMS:
        if all_normal(user_biomarkers, system.biomarkers):
            strengths.append(system.name)
    
    return {
        'attention': needs_attention[:2],  # Max 2 to avoid overwhelm
        'watch': watch_closely[:2],
        'strengths': strengths
    }
```

**UX Copy for Signal Types:**

| Signal Type | Framing | Example |
|-------------|---------|---------|
| Cardiovascular High Risk | "Your heart needs attention" | "Your LDL + hs-CRP pattern suggests inflammation in your arteries. This is reversible with the right approach." |
| Metabolic Warning | "Blood sugar signals" | "Your glucose and HbA1c are trending toward diabetes. The good news? Caught early, this is 100% reversible." |
| Multi-system | "Connected patterns" | "We're seeing signals across your cardiovascular and metabolic systems. This often points to metabolic inflammation—a root cause we can address." |
| Single Biomarker | "One thing to watch" | "Your [biomarker] is slightly elevated. Not urgent, but worth addressing to prevent progression." |

---

### SCREEN 4: GOAL SELECTION

**Purpose:** Commitment moment—user chooses their focus

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ← Back                                   │
│                                                                 │
│                                                                 │
│                   What Matters Most to You?                     │
│                                                                 │
│          Based on your results, these goals could               │
│          create the biggest transformation:                     │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ★ RECOMMENDED FOR YOU                                    │  │
│  │                                                           │  │
│  │  🫀 Lower Cardiovascular Risk                             │  │
│  │                                                           │  │
│  │  Why: Your LDL, hs-CRP, and APO-B pattern suggests        │  │
│  │  your arteries need support. This is the single           │  │
│  │  biggest lever for your longevity.                        │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │  Potential Impact                               │     │  │
│  │  │  ─────────────────                              │     │  │
│  │  │  • 15-25% lower heart disease risk              │     │  │
│  │  │  • LDL: 145 → <100 mg/dL                        │     │  │
│  │  │  • hs-CRP: 3.2 → <1 mg/L                        │     │  │
│  │  │  • Timeline: 90 days                            │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │                                                           │  │
│  │           ┌────────────────────────────┐                  │  │
│  │           │    Select This Goal        │                  │  │
│  │           └────────────────────────────┘                  │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ⚡ Reverse Pre-Diabetes Pattern                          │  │
│  │     Bring glucose and HbA1c back to normal                │  │
│  │                                       [Select]            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🧬 Reduce Biological Age                                 │  │
│  │     Target: 3-5 years younger                             │  │
│  │                                       [Select]            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  🎯 I Have a Different Goal                               │  │
│  │     Tell us what you want to achieve                      │  │
│  │                                       [Custom]            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Goal Card Copy Templates:**

```yaml
goal_cards:

  cardiovascular:
    title: "Lower Cardiovascular Risk"
    icon: "🫀"
    why_text: |
      Your LDL ({user.ldl} mg/dL), hs-CRP ({user.hscrp} mg/L), and 
      {additional_marker} pattern suggests your arteries are under 
      stress. Addressing this is the single biggest lever for longevity.
    potential_impact:
      - "15-25% lower heart disease risk"
      - "LDL: {user.ldl} → <100 mg/dL"
      - "hs-CRP: {user.hscrp} → <1 mg/L"
    timeline: "90 days"
    
  metabolic:
    title: "Reverse Pre-Diabetes Pattern"
    icon: "⚡"
    why_text: |
      Your HbA1c ({user.hba1c}%) and fasting glucose ({user.glucose} mg/dL)
      are in the warning zone. Caught now, this is fully reversible.
      Wait, and it becomes permanent.
    potential_impact:
      - "Return to normal glucose range"
      - "HbA1c: {user.hba1c} → <5.7%"
      - "Glucose: {user.glucose} → <100 mg/dL"
    timeline: "60-90 days"
    
  inflammation:
    title: "Reduce Chronic Inflammation"
    icon: "🔥"
    why_text: |
      Your hs-CRP ({user.hscrp} mg/L) shows your body is in a state
      of chronic low-grade inflammation. This accelerates aging and
      makes everything else harder. Calming this down is foundational.
    potential_impact:
      - "Lower systemic inflammation"
      - "hs-CRP: {user.hscrp} → <1 mg/L"
      - "Better energy, sleep, recovery"
    timeline: "60 days"
    
  biological_age:
    title: "Reduce Biological Age"
    icon: "🧬"
    why_text: |
      Your biological age is {user.bio_age}, while your calendar says
      {user.chrono_age}. Let's close—or reverse—that gap. This is the
      ultimate compound metric.
    potential_impact:
      - "Turn back the biological clock"
      - "Target: {target_bio_age} years younger"
      - "Improvements across all systems"
    timeline: "6 months"
    
  custom:
    title: "Custom Goal"
    icon: "🎯"
    prompt: |
      What's most important to you right now?
      
      Examples:
      • "I want more energy"
      • "I want to lose weight"
      • "I want to sleep better"
      • "I want to lower my blood pressure"
      
      Tell us your goal, and we'll map it to your biomarkers.
```

---

### SCREEN 5: GOAL INTENSITY/DEPTH SELECTION

**Purpose:** Set expectations, allow personalization of effort level

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ← Back                                   │
│                                                                 │
│                                                                 │
│                  How Aggressive Do You                          │
│                    Want to Be?                                  │
│                                                                 │
│          Goal: Lower Cardiovascular Risk                        │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  🐢 GENTLE                                                │  │
│  │                                                           │  │
│  │  "Sustainable and easy"                                   │  │
│  │                                                           │  │
│  │  • 2-3 small daily habits                                 │  │
│  │  • ~10% improvement expected                              │  │
│  │  • 15-20 min/day commitment                               │  │
│  │                                                           │  │
│  │  Best for: Busy schedules, building momentum              │  │
│  │                                                           │  │
│  │                                     [Select]              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ★ RECOMMENDED                                            │  │
│  │                                                           │  │
│  │  ⚖️ BALANCED                                              │  │
│  │                                                           │  │
│  │  "Meaningful progress, totally doable"                    │  │
│  │                                                           │  │
│  │  • 4-5 targeted habits                                    │  │
│  │  • ~20% improvement expected                              │  │
│  │  • 30-45 min/day commitment                               │  │
│  │                                                           │  │
│  │  Best for: Most people, proven results                    │  │
│  │                                                           │  │
│  │                                     [Select]              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  🚀 INTENSIVE                                             │  │
│  │                                                           │  │
│  │  "Maximum transformation"                                 │  │
│  │                                                           │  │
│  │  • 6-8 significant changes                                │  │
│  │  • ~30% improvement expected                              │  │
│  │  • 60+ min/day commitment                                 │  │
│  │                                                           │  │
│  │  Best for: High motivation, dramatic change needed        │  │
│  │                                                           │  │
│  │                                     [Select]              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Copy Rationale:**

The intensity levels serve two purposes:
1. **Set realistic expectations** - Users know what they're committing to
2. **Reduce drop-off** - Users who choose "Gentle" are more likely to complete than users pushed into "Intensive"

---

### SCREEN 6: ACTION PLAN PREVIEW

**Purpose:** Show the concrete plan, build confidence, drive commitment

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ← Back                                   │
│                                                                 │
│                                                                 │
│                 Your 90-Day Action Plan                         │
│                                                                 │
│          Goal: Lower Cardiovascular Risk                        │
│          Intensity: Balanced                                    │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  PHASE 1: FOUNDATION (Weeks 1-2)                          │  │
│  │  ─────────────────────────────────                        │  │
│  │  Build the base habits                                    │  │
│  │                                                           │  │
│  │  □ Add 10g soluble fiber daily                            │  │
│  │    → Targets: LDL ↓                                       │  │
│  │                                                           │  │
│  │  □ 10-minute post-meal walk                               │  │
│  │    → Targets: Glucose ↓, Triglycerides ↓                  │  │
│  │                                                           │  │
│  │  □ Start fish oil supplement (2g EPA/DHA)                 │  │
│  │    → Targets: Triglycerides ↓, hs-CRP ↓                   │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  PHASE 2: BUILD (Weeks 3-6)                               │  │
│  │  ─────────────────────────────                            │  │
│  │  Add intensity and variety                                │  │
│  │                                                           │  │
│  │  □ Zone 2 cardio: 150 min/week                            │  │
│  │  □ Daily stress practice (10 min)                         │  │
│  │  □ Sleep optimization (7-8 hours)                         │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  PHASE 3: OPTIMIZE (Weeks 7-12)                           │  │
│  │  ─────────────────────────────────                        │  │
│  │  Fine-tune and validate                                   │  │
│  │                                                           │  │
│  │  □ Advanced nutrition adjustments                         │  │
│  │  □ Exercise intensity progression                         │  │
│  │  □ Re-test biomarkers at Day 75                           │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  EXPECTED OUTCOME AT 90 DAYS:                             │  │
│  │                                                           │  │
│  │  • LDL: 145 → ~105 mg/dL                                  │  │
│  │  • hs-CRP: 3.2 → ~1.5 mg/L                                │  │
│  │  • Triglycerides: 180 → ~120 mg/dL                        │  │
│  │  • Health Score: 78 → ~85                                 │  │
│  │                                                           │  │
│  │  *Based on similar profiles with 70%+ consistency         │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │   Start My Journey →        │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                     I want to adjust this                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### SCREEN 7: FIRST ACTION (MICRO-WIN)

**Purpose:** Get the user to complete ONE action immediately

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│                     Let's Start Right Now                       │
│                                                                 │
│          The best time to begin is this moment.                 │
│          Here's your first action:                              │
│                                                                 │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │                         🥣                                │  │
│  │                                                           │  │
│  │            Add Fiber to Your Next Meal                    │  │
│  │                                                           │  │
│  │  ─────────────────────────────────────────                │  │
│  │                                                           │  │
│  │  Why this matters:                                        │  │
│  │  Soluble fiber binds to cholesterol in your gut,          │  │
│  │  preventing absorption. It's one of the simplest          │  │
│  │  ways to lower LDL naturally.                             │  │
│  │                                                           │  │
│  │  ─────────────────────────────────────────                │  │
│  │                                                           │  │
│  │  Easy options:                                            │  │
│  │  • Add oatmeal to breakfast                               │  │
│  │  • Include beans in lunch or dinner                       │  │
│  │  • Snack on an apple with skin                            │  │
│  │  • Add chia seeds to smoothie/yogurt                      │  │
│  │                                                           │  │
│  │  ─────────────────────────────────────────                │  │
│  │                                                           │  │
│  │  Time needed: 2 minutes                                   │  │
│  │  Impact: LDL ↓ 5-10% over time                            │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │   I'll Do This Today ✓      │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                  Remind me later                                │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key Insight:** This screen is about **commitment**, not completion. The user commits to doing ONE small thing. This psychological commitment is the foundation of habit formation.

---

### SCREEN 8: ONBOARDING COMPLETE

**Purpose:** Celebrate, set expectations for daily interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                                                                 │
│                         🎉                                      │
│                                                                 │
│                   You're All Set                                │
│                                                                 │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  YOUR JOURNEY STARTS NOW                                  │  │
│  │                                                           │  │
│  │  Goal: Lower Cardiovascular Risk                          │  │
│  │  Duration: 90 days                                        │  │
│  │  Daily commitment: ~30 minutes                            │  │
│  │                                                           │  │
│  │  ─────────────────────────────────────────                │  │
│  │                                                           │  │
│  │  What happens next:                                       │  │
│  │                                                           │  │
│  │  📱 Daily: Check in to log your actions                   │  │
│  │  📊 Weekly: See your progress summary                     │  │
│  │  💬 Anytime: Ask me questions via chat                    │  │
│  │  🔬 Day 75: Re-test to validate improvement               │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                                                                 │
│          "Every day you show up, you're investing              │
│           in a longer, healthier life. Let's go."              │
│                                                                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────────┐                   │
│               │    Go to Dashboard →        │                   │
│               └─────────────────────────────┘                   │
│                                                                 │
│                                                                 │
│                 Enable daily reminders?                         │
│                      [ Yes ]  [ Not now ]                       │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💬 CHAT INTERFACE: CONVERSATION PATTERNS

### Pattern 1: Biomarker Explanation

**User:** "What does my APO-B mean?"

```
┌───────────────────────────────────────────────────────────────┐
│  🤖 VYTAL                                                     │
│                                                               │
│  Great question. APO-B is one of the most important           │
│  cardiovascular markers—often more telling than LDL alone.    │
│                                                               │
│  **What it is:**                                              │
│  APO-B measures the number of "bad" cholesterol particles     │
│  in your blood. Each particle carries cholesterol into your   │
│  artery walls.                                                │
│                                                               │
│  **Your number:**                                             │
│  Your APO-B is **128 mg/dL**                                  │
│  • Optimal: <90 mg/dL                                         │
│  • Yours: Elevated ⚠️                                         │
│                                                               │
│  **Why this matters:**                                        │
│  High APO-B means more particles trying to deposit            │
│  cholesterol in your arteries. Even if your LDL looks         │
│  okay-ish, this tells us there's more traffic than ideal.     │
│                                                               │
│  **Your plan addresses this:**                                │
│  • Soluble fiber (reduces particle count)                     │
│  • Fish oil (improves particle quality)                       │
│  • Exercise (improves clearance)                              │
│                                                               │
│  Want me to explain how this connects to your other           │
│  cardiovascular markers?                                      │
│                                                               │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│  SUGGESTED FOLLOW-UPS:                                        │
│                                                               │
│  [Yes, show me the full picture]                              │
│  [How long until this improves?]                              │
│  [What foods specifically help?]                              │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Pattern 2: Multi-System Signal Explanation

**User:** "You mentioned metabolic inflammation—what does that mean?"

```
┌───────────────────────────────────────────────────────────────┐
│  🤖 VYTAL                                                     │
│                                                               │
│  Metabolic inflammation is when multiple systems in your      │
│  body show signs of chronic, low-grade inflammation           │
│  driven by metabolic stress.                                  │
│                                                               │
│  **What we see in your results:**                             │
│                                                               │
│  Your pattern connects three markers:                         │
│                                                               │
│  1. **HbA1c (5.9%)** — Slightly elevated                      │
│     Your blood sugar has been running high-ish                │
│                                                               │
│  2. **Triglycerides (180 mg/dL)** — Elevated                  │
│     High blood fats, often from sugar/carbs                   │
│                                                               │
│  3. **hs-CRP (3.2 mg/L)** — Elevated                          │
│     Your inflammatory marker is up                            │
│                                                               │
│  **How these connect:**                                       │
│                                                               │
│  When blood sugar stays elevated → your body produces         │
│  more triglycerides → this creates inflammation →             │
│  inflammation makes insulin work less well →                  │
│  blood sugar rises further.                                   │
│                                                               │
│  It's a cycle. And it affects your heart, liver, and          │
│  metabolism simultaneously.                                   │
│                                                               │
│  **The good news:**                                           │
│  Breaking this cycle is very doable. Your action plan         │
│  targets the root cause—not just individual markers.          │
│                                                               │
│  The post-meal walks? They blunt glucose spikes.              │
│  The fish oil? Anti-inflammatory.                             │
│  The fiber? Slows carb absorption.                            │
│                                                               │
│  All working together on this pattern.                        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Pattern 3: Motivation/Struggling

**User:** "I'm struggling to stay consistent"

```
┌───────────────────────────────────────────────────────────────┐
│  🤖 VYTAL                                                     │
│                                                               │
│  That's completely normal. Week 2-3 is often the hardest—     │
│  the novelty has worn off, but the habits aren't automatic    │
│  yet.                                                         │
│                                                               │
│  Let me share something:                                      │
│                                                               │
│  **Your current stats:**                                      │
│  • 14 of 21 days completed (67%)                              │
│  • Current streak: 2 days                                     │
│  • Longest streak: 5 days                                     │
│                                                               │
│  67% is actually solid for the first few weeks. Perfect       │
│  isn't the goal—**consistently good** is.                     │
│                                                               │
│  **What might help:**                                         │
│                                                               │
│  1. **Shrink the actions.** Instead of a 10-min walk,         │
│     could you commit to a 5-min walk? Completion beats        │
│     perfection.                                               │
│                                                               │
│  2. **Stack habits.** Attach your new habits to existing      │
│     ones. "After I brush my teeth, I take my fish oil."       │
│                                                               │
│  3. **Identify the blocker.** What's the specific thing       │
│     making it hard? Time? Energy? Forgetting?                 │
│                                                               │
│  Would you like me to adjust your plan to make it             │
│  more sustainable?                                            │
│                                                               │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│  SUGGESTED FOLLOW-UPS:                                        │
│                                                               │
│  [Yes, let's simplify my plan]                                │
│  [I keep forgetting—help with reminders]                      │
│  [Time is the issue—shorter alternatives?]                    │
│  [I'm just not motivated anymore]                             │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Pattern 4: Progress Check

**User:** "Am I on track?"

```
┌───────────────────────────────────────────────────────────────┐
│  🤖 VYTAL                                                     │
│                                                               │
│  Let me check...                                              │
│                                                               │
│  **📊 Your Progress at Day 28:**                              │
│                                                               │
│  Overall consistency: **74%** ✓                               │
│  (Good! Benchmark for results is 70%+)                        │
│                                                               │
│  **Habit breakdown:**                                         │
│                                                               │
│  🥗 Fiber intake: 22/28 days (79%) ✓                          │
│  🚶 Post-meal walks: 18/28 days (64%) ⚠️                       │
│  💊 Fish oil: 26/28 days (93%) ✓✓                             │
│  😴 Sleep goal: 16/28 days (57%) ⚠️                            │
│                                                               │
│  **Projected biomarker changes:**                             │
│                                                               │
│  Based on your consistency, by Day 90 we estimate:            │
│                                                               │
│  • LDL: 145 → ~115 mg/dL (on track)                           │
│  • hs-CRP: 3.2 → ~2.0 mg/L (slightly behind)                  │
│  • Triglycerides: 180 → ~135 mg/dL (on track)                 │
│                                                               │
│  **My take:**                                                 │
│  You're making real progress. The areas lagging (walks        │
│  and sleep) are the ones that would move hs-CRP most.         │
│  Even a small improvement there could accelerate results.     │
│                                                               │
│  Want me to suggest ways to boost those two habits?           │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Pattern 5: Food/Meal Guidance

**User:** "What should I eat for dinner tonight?"

```
┌───────────────────────────────────────────────────────────────┐
│  🤖 VYTAL                                                     │
│                                                               │
│  Given your goals (lower LDL, reduce inflammation), here      │
│  are some dinner ideas that work double-duty:                 │
│                                                               │
│  **🐟 Salmon + Roasted Vegetables**                           │
│  Why: Omega-3s (anti-inflammatory, lowers triglycerides)      │
│  + fiber from veggies (binds cholesterol)                     │
│  Bonus: Add avocado for healthy fats                          │
│                                                               │
│  **🥗 Large Salad with Beans**                                │
│  Why: Soluble fiber from beans directly lowers LDL.           │
│  Add olive oil dressing for HDL support.                      │
│  Bonus: Top with walnuts                                      │
│                                                               │
│  **🍲 Lentil Soup**                                           │
│  Why: Lentils are fiber powerhouses. Easy to make,            │
│  very filling, hits your fiber target easily.                 │
│  Bonus: Add turmeric for anti-inflammatory effect             │
│                                                               │
│  **Quick tip for tonight:**                                   │
│  Whatever you make, add a side of beans or lentils.           │
│  That's an easy +8g fiber toward your daily goal.             │
│                                                               │
│  And remember: take a 10-min walk after eating!               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 📲 NOTIFICATION COPY

### Daily Reminders

```yaml
morning_check_in:
  time: "8:00 AM"
  variants:
    - "Good morning! Ready to invest in yourself today? 3 actions waiting for you."
    - "Day {day_count} of your health journey. What will you accomplish today?"
    - "Your future self is counting on you. Here's today's plan →"

midday_nudge:
  time: "1:00 PM"
  condition: "actions_incomplete"
  variants:
    - "Quick check: have you had fiber yet today? Still time to hit your targets."
    - "Halfway through the day. Your walk and fish oil are still waiting."
    - "Don't forget: small actions compound into big results."

evening_wrap:
  time: "8:00 PM"
  variants:
    - "How did today go? Quick log helps build consistency →"
    - "Almost time for your {streak_count}-day streak check. Don't break it!"
    - "Evening check-in: 2 minutes to log your progress."

streak_at_risk:
  time: "9:30 PM"
  condition: "no_activity_logged"
  variants:
    - "⚠️ Your {streak_count}-day streak is at risk! Log one action to save it."
    - "Don't let today be a zero. Even one small thing counts."
    - "Quick save: log your fiber or walk to keep your streak alive."

sleep_reminder:
  time: "9:30 PM (or 1hr before goal)"
  variants:
    - "Wind-down time. Remember: sleep is when your body heals."
    - "Your sleep goal is 10:30 PM. Start wrapping up!"
    - "Reminder: 7-8 hours of sleep = lower inflammation tomorrow."
```

### Weekly Summary

```yaml
weekly_summary:
  time: "Sunday 6:00 PM"
  template: |
    📊 Your Week in Review
    
    Consistency: {consistency}%
    Streak: {streak_count} days
    
    Top wins:
    {win_1}
    {win_2}
    
    Focus for next week:
    {focus_area}
    
    Keep it up—you're building something real.
```

### Milestone Celebrations

```yaml
milestones:
  
  streak_7:
    message: "🔥 7-day streak! Your brain is starting to automate these habits."
    
  streak_21:
    message: "🏆 21 days! Science says this is where habits become wired in."
    
  streak_30:
    message: "🎉 30 DAYS! This is no longer a goal—it's becoming who you are."
    
  consistency_90:
    message: "⭐ 90% consistency this week! Your biomarkers are definitely responding."
    
  halfway:
    message: "📍 Day 45 - Halfway there! Time to check in on your progress →"
    
  retest_due:
    message: "🔬 Day 75 - Perfect time to retest and see your real results."
```

---

## 🎨 EMOTIONAL DESIGN NOTES

### Color Psychology

```
GREEN (#22C55E)
- Use for: Progress, completed actions, strengths, wins
- Emotion: Confidence, growth, safety

AMBER (#F59E0B)  
- Use for: Watch closely, borderline values, attention needed
- Emotion: Awareness without alarm

RED (muted: #DC2626 at 80% opacity)
- Use for: Needs attention, missed streaks
- Emotion: Urgency without panic

BLUE (#3B82F6)
- Use for: Information, explanations, neutral data
- Emotion: Trust, calm, clarity

PURPLE (#8B5CF6)
- Use for: Premium features, achievements, biological age
- Emotion: Special, aspirational
```

### Tone Shifts by Context

```
ONBOARDING: Warm, optimistic, supportive
"You're in good hands. Let's build something together."

DAILY USE: Efficient, encouraging, action-oriented  
"Done! One more brick in the foundation."

STRUGGLING: Empathetic, practical, non-judgmental
"Everyone has hard days. What matters is you're here now."

CELEBRATING: Genuine, specific, earned
"14-day streak. That's discipline compounding."

EDUCATING: Clear, authoritative, approachable
"Here's what your body is telling us..."
```

---

## 📐 LAYOUT PRINCIPLES

1. **Scannable first, detailed second**
   - Show the key number/status prominently
   - Details available on tap/expand

2. **Action-forward**
   - Primary CTA always visible
   - Never more than one tap to log an action

3. **Progress always visible**
   - Some form of progress indicator on every screen
   - Streak count, consistency %, or health score delta

4. **Emotional breathing room**
   - Don't cram too much on one screen
   - White space = calm = sustainable engagement

5. **Personalized content first**
   - User's numbers before ranges
   - "Your LDL is 145" not "LDL (optimal: <100)"

---

*This document provides the complete UX copy and flow for the Vytal dashboard. All copy is designed to be warm, actionable, and data-informed while avoiding medical jargon or anxiety-inducing language.*

