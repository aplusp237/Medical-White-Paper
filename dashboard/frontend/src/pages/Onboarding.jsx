import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, ArrowLeft, Heart, Zap, Brain, Sparkles, 
  Activity, TrendingDown, Shield, Check, Flame
} from 'lucide-react'
import { useUser } from '../context/UserContext'

// Onboarding steps
const STEPS = {
  WELCOME: 'welcome',
  BIO_AGE: 'bio_age',
  SIGNALS: 'signals',
  GOAL_SELECT: 'goal_select',
  INTENSITY: 'intensity',
  PLAN_PREVIEW: 'plan_preview',
  FIRST_ACTION: 'first_action',
  COMPLETE: 'complete'
}

// Action templates based on goals
const actionTemplates = {
  cardiovascular: [
    { id: 'fiber', name: 'Add 10g Fiber Daily', icon: '🥗', category: 'nutrition', impact: ['ldl', 'glucose'], phase: 1 },
    { id: 'walk', name: '10-Min Post-Meal Walk', icon: '🚶', category: 'movement', impact: ['glucose', 'triglycerides'], phase: 1 },
    { id: 'fish_oil', name: 'Fish Oil Supplement', icon: '💊', category: 'supplement', impact: ['triglycerides', 'hsCRP'], phase: 1 },
    { id: 'sleep', name: 'Sleep by 10:30 PM', icon: '😴', category: 'lifestyle', impact: ['hsCRP', 'cortisol'], phase: 2 },
    { id: 'cardio', name: '150 Min Cardio/Week', icon: '🏃', category: 'movement', impact: ['hdl', 'triglycerides'], phase: 2 },
  ],
  metabolic: [
    { id: 'low_carb', name: 'Reduce Refined Carbs', icon: '🍞', category: 'nutrition', impact: ['glucose', 'hba1c'], phase: 1 },
    { id: 'walk', name: '10-Min Post-Meal Walk', icon: '🚶', category: 'movement', impact: ['glucose', 'triglycerides'], phase: 1 },
    { id: 'protein', name: 'Protein at Breakfast', icon: '🥚', category: 'nutrition', impact: ['glucose', 'energy'], phase: 1 },
    { id: 'strength', name: 'Strength Training 2x/Week', icon: '💪', category: 'movement', impact: ['glucose', 'metabolism'], phase: 2 },
    { id: 'sleep', name: 'Sleep by 10:30 PM', icon: '😴', category: 'lifestyle', impact: ['hsCRP', 'glucose'], phase: 2 },
  ],
  biological_age: [
    { id: 'fiber', name: 'Add 10g Fiber Daily', icon: '🥗', category: 'nutrition', impact: ['ldl', 'gut_health'], phase: 1 },
    { id: 'walk', name: 'Daily Movement (8K Steps)', icon: '🚶', category: 'movement', impact: ['overall_health'], phase: 1 },
    { id: 'sleep', name: '7-8 Hours Quality Sleep', icon: '😴', category: 'lifestyle', impact: ['recovery', 'hormones'], phase: 1 },
    { id: 'stress', name: '10-Min Stress Practice', icon: '🧘', category: 'lifestyle', impact: ['cortisol', 'inflammation'], phase: 2 },
    { id: 'strength', name: 'Strength Training 2x/Week', icon: '💪', category: 'movement', impact: ['muscle', 'metabolism'], phase: 2 },
  ]
}

// Health Score Ring Component
function HealthScoreRing({ score, size = 180 }) {
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (score / 100) * circumference
  
  const getScoreColor = (score) => {
    if (score >= 85) return '#22c55e'
    if (score >= 70) return '#14b8a6'
    if (score >= 55) return '#f59e0b'
    return '#f43f5e'
  }
  
  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 55) return 'Fair'
    return 'Needs Work'
  }
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="progress-ring health-score-ring" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-slate-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <motion.circle
          className="progress-ring-circle"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={getScoreColor(score)}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className="text-5xl font-display font-bold text-slate-800"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <motion.span 
          className="text-sm font-medium text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {getScoreLabel(score)}
        </motion.span>
      </div>
    </div>
  )
}

// Step components
function WelcomeStep({ user, onNext }) {
  const getSubheadline = (score) => {
    if (score >= 85) return "Exceptional. You're in the top 15%. Let's protect and optimize what you've built."
    if (score >= 70) return "Good foundation. A few focused changes can unlock your next level of health."
    if (score >= 55) return "Room to grow. The good news? Small, consistent steps can create remarkable change."
    return "Time to take control. We've identified clear opportunities to improve your health trajectory."
  }
  
  return (
    <motion.div 
      className="text-center max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      {/* Sparkle decoration */}
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="relative">
          <Sparkles className="w-12 h-12 text-vytal-500" />
          <div className="absolute inset-0 animate-pulse-ring rounded-full bg-vytal-400/30" />
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-hero gradient-text mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your Health Blueprint is Ready
      </motion.h1>
      
      {/* Health Score */}
      <motion.div 
        className="my-10 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <HealthScoreRing score={user.healthScore} />
      </motion.div>
      
      <motion.p 
        className="text-subtitle mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {getSubheadline(user.healthScore)}
      </motion.p>
      
      <motion.p 
        className="text-sm text-slate-500 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        You're healthier than <span className="font-semibold text-vytal-600">68%</span> of people your age
      </motion.p>
      
      <motion.button
        className="btn-primary text-lg px-8 py-4"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Explore My Blueprint
        <ArrowRight className="inline-block ml-2 w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

function BioAgeStep({ user, onNext, onBack }) {
  const ageDelta = user.chronologicalAge - user.biologicalAge
  const isYounger = ageDelta > 0
  
  return (
    <motion.div 
      className="text-center max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <motion.h2 
        className="text-title text-slate-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Your Body's True Age
      </motion.h2>
      
      <motion.p 
        className="text-slate-500 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Beyond the calendar
      </motion.p>
      
      {/* Age comparison */}
      <motion.div 
        className="flex items-center justify-center gap-8 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Chronological */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center mb-2">
            <span className="text-3xl font-display font-bold text-slate-600">{user.chronologicalAge}</span>
          </div>
          <p className="text-sm text-slate-500">Calendar Age</p>
        </div>
        
        {/* Arrow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <ArrowRight className="w-8 h-8 text-slate-300" />
        </motion.div>
        
        {/* Biological */}
        <div className="text-center">
          <motion.div 
            className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-2 ${
              isYounger 
                ? 'bg-gradient-to-br from-vytal-500 to-emerald-500 shadow-lg shadow-vytal-500/30' 
                : 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <span className="text-3xl font-display font-bold text-white">{user.biologicalAge}</span>
          </motion.div>
          <p className="text-sm text-slate-500">Biological Age</p>
        </div>
      </motion.div>
      
      {/* Delta badge */}
      <motion.div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
          isYounger 
            ? 'bg-vytal-100 text-vytal-700' 
            : 'bg-amber-100 text-amber-700'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {isYounger ? (
          <>
            <TrendingDown className="w-4 h-4" />
            {ageDelta} years younger
          </>
        ) : (
          <>
            <Activity className="w-4 h-4" />
            {Math.abs(ageDelta)} years older
          </>
        )}
      </motion.div>
      
      <motion.p 
        className="text-subtitle mb-10 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isYounger 
          ? "Your cells are performing younger than your calendar age. This is the compound effect of choices you've already made."
          : "Your biological age is running ahead. This isn't a verdict—it's a starting point. Most of this is reversible with the right focus."
        }
      </motion.p>
      
      <motion.div 
        className="flex gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
        <button className="btn-primary" onClick={onNext}>
          See What's Driving This
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

function SignalsStep({ user, onNext, onBack }) {
  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-title text-slate-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          What Your Body is Telling Us
        </motion.h2>
        <motion.p 
          className="text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We analyzed 51 biomarkers and found these patterns
        </motion.p>
      </div>
      
      {/* Attention signals */}
      {user.signals.attention.map((signal, index) => (
        <motion.div
          key={signal.id}
          className="card p-6 mb-4 border-l-4 border-coral-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-coral-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-coral-100 text-coral-700">
                  NEEDS ATTENTION
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{signal.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{signal.insight}</p>
              <div className="flex items-center gap-2 text-sm">
                <Flame className="w-4 h-4 text-coral-500" />
                <span className="text-coral-600 font-medium">{signal.action}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Watch signals */}
      {user.signals.watch.map((signal, index) => (
        <motion.div
          key={signal.id}
          className="card p-6 mb-4 border-l-4 border-amber-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  WATCH CLOSELY
                </span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{signal.title}</h3>
              <p className="text-sm text-slate-600 mb-2">{signal.insight}</p>
              <p className="text-sm text-amber-600 font-medium">{signal.action}</p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Strengths */}
      <motion.div
        className="card p-6 border-l-4 border-vytal-500"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-vytal-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-vytal-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-vytal-100 text-vytal-700">
                YOUR STRENGTHS
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.signals.strengths.map((strength, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                  ✓ {strength.system}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex gap-4 justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
        <button className="btn-primary" onClick={onNext}>
          I'm Ready to Act
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

function GoalSelectStep({ onGoalSelect, onBack }) {
  const goals = [
    {
      id: 'cardiovascular',
      icon: Heart,
      title: 'Lower Cardiovascular Risk',
      description: 'Your LDL, hs-CRP, and APO-B pattern suggests your arteries need support. This is the single biggest lever for longevity.',
      impact: ['LDL: 145 → <100 mg/dL', 'hs-CRP: 3.2 → <1 mg/L', '15-25% lower risk'],
      recommended: true,
      color: 'coral'
    },
    {
      id: 'metabolic',
      icon: Zap,
      title: 'Reverse Pre-Diabetes Pattern',
      description: 'Your glucose and HbA1c are in the warning zone. Caught now, this is fully reversible. Wait, and it becomes permanent.',
      impact: ['Glucose: 108 → <100 mg/dL', 'HbA1c: 5.9 → <5.7%', 'Return to normal in 90 days'],
      color: 'amber'
    },
    {
      id: 'biological_age',
      icon: Brain,
      title: 'Reduce Biological Age',
      description: 'This is the ultimate compound metric. Improve this, and everything else follows.',
      impact: ['Target: 3-5 years younger', 'Improvements across all systems', 'Timeline: 6 months'],
      color: 'purple'
    }
  ]
  
  const colorClasses = {
    coral: { bg: 'bg-coral-100', text: 'text-coral-600', border: 'border-coral-500', icon: 'text-coral-500' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-500', icon: 'text-amber-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-500', icon: 'text-purple-500' }
  }
  
  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-title text-slate-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          What Matters Most to You?
        </motion.h2>
        <motion.p 
          className="text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Based on your results, these goals could create the biggest transformation
        </motion.p>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const colors = colorClasses[goal.color]
          return (
            <motion.button
              key={goal.id}
              className={`card p-6 w-full text-left hover:shadow-lg transition-all relative overflow-hidden ${
                goal.recommended ? `ring-2 ring-${goal.color}-400 ring-offset-2` : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => onGoalSelect(goal.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {goal.recommended && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-coral-500 text-white text-xs font-medium rounded-bl-lg">
                  ★ RECOMMENDED
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                  <goal.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">{goal.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{goal.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {goal.impact.map((item, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-md ${colors.bg} ${colors.text}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
              </div>
            </motion.button>
          )
        })}
      </div>
      
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
      </motion.div>
    </motion.div>
  )
}

function IntensityStep({ goal, onIntensitySelect, onBack }) {
  const intensities = [
    {
      id: 'gentle',
      emoji: '🐢',
      name: 'Gentle',
      tagline: 'Sustainable and easy',
      details: ['2-3 small daily habits', '~10% improvement expected', '15-20 min/day commitment'],
      best: 'Busy schedules, building momentum'
    },
    {
      id: 'balanced',
      emoji: '⚖️',
      name: 'Balanced',
      tagline: 'Meaningful progress, totally doable',
      details: ['4-5 targeted habits', '~20% improvement expected', '30-45 min/day commitment'],
      best: 'Most people, proven results',
      recommended: true
    },
    {
      id: 'intensive',
      emoji: '🚀',
      name: 'Intensive',
      tagline: 'Maximum transformation',
      details: ['6-8 significant changes', '~30% improvement expected', '60+ min/day commitment'],
      best: 'High motivation, dramatic change needed'
    }
  ]
  
  return (
    <motion.div 
      className="max-w-xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-title text-slate-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          How Aggressive Do You Want to Be?
        </motion.h2>
        <motion.p 
          className="text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Choose the pace that works for your life
        </motion.p>
      </div>
      
      <div className="space-y-4">
        {intensities.map((intensity, index) => (
          <motion.button
            key={intensity.id}
            className={`card p-6 w-full text-left hover:shadow-lg transition-all ${
              intensity.recommended ? 'ring-2 ring-vytal-400 ring-offset-2' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onIntensitySelect(intensity.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {intensity.recommended && (
              <span className="inline-block px-2 py-0.5 bg-vytal-100 text-vytal-700 text-xs font-medium rounded mb-2">
                ★ RECOMMENDED
              </span>
            )}
            
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{intensity.emoji}</span>
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">{intensity.name}</h3>
                <p className="text-sm text-slate-500">{intensity.tagline}</p>
              </div>
            </div>
            
            <ul className="space-y-1 mb-3">
              {intensity.details.map((detail, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                  <Check className="w-4 h-4 text-vytal-500" />
                  {detail}
                </li>
              ))}
            </ul>
            
            <p className="text-xs text-slate-400">Best for: {intensity.best}</p>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
      </motion.div>
    </motion.div>
  )
}

function PlanPreviewStep({ goal, intensity, actions, onNext, onBack }) {
  const phases = [
    { num: 1, name: 'Foundation', weeks: '1-2', description: 'Build the base habits' },
    { num: 2, name: 'Build', weeks: '3-6', description: 'Add intensity and variety' },
    { num: 3, name: 'Optimize', weeks: '7-12', description: 'Fine-tune and validate' }
  ]
  
  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-title text-slate-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your 90-Day Action Plan
        </motion.h2>
        <motion.p 
          className="text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Focused effort. Measurable results.
        </motion.p>
      </div>
      
      {/* Phases */}
      <div className="space-y-4 mb-8">
        {phases.map((phase, pIndex) => {
          const phaseActions = actions.filter(a => a.phase === phase.num)
          return (
            <motion.div
              key={phase.num}
              className="card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + pIndex * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-vytal-100 flex items-center justify-center">
                  <span className="font-bold text-vytal-600">{phase.num}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Phase {phase.num}: {phase.name}
                    <span className="text-slate-400 font-normal text-sm ml-2">Weeks {phase.weeks}</span>
                  </h3>
                  <p className="text-xs text-slate-500">{phase.description}</p>
                </div>
              </div>
              
              <div className="grid gap-2">
                {phaseActions.map((action, aIndex) => (
                  <div 
                    key={action.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{action.name}</span>
                    <span className="ml-auto text-xs text-slate-400 capitalize">{action.category}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {/* Expected outcomes */}
      <motion.div
        className="card p-5 bg-gradient-to-br from-vytal-50 to-emerald-50 border-vytal-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="font-semibold text-slate-800 mb-3">Expected Outcome at 90 Days</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-vytal-500" />
            <span className="text-slate-600">LDL: 145 → ~105 mg/dL</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-vytal-500" />
            <span className="text-slate-600">hs-CRP: 3.2 → ~1.5 mg/L</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-vytal-500" />
            <span className="text-slate-600">Health Score: 78 → ~85</span>
          </li>
        </ul>
        <p className="text-xs text-slate-400 mt-3">*Based on similar profiles with 70%+ consistency</p>
      </motion.div>
      
      <motion.div 
        className="flex gap-4 justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft className="inline-block mr-2 w-4 h-4" />
          Adjust
        </button>
        <button className="btn-primary" onClick={onNext}>
          Start My Journey
          <ArrowRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  )
}

function FirstActionStep({ firstAction, onComplete }) {
  return (
    <motion.div 
      className="max-w-lg mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <motion.h2 
        className="text-title text-slate-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Let's Start Right Now
      </motion.h2>
      
      <motion.p 
        className="text-slate-500 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        The best time to begin is this moment
      </motion.p>
      
      <motion.div
        className="card p-8 text-left"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center mb-6">
          <span className="text-6xl">{firstAction.icon}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-slate-800 text-center mb-4">
          {firstAction.name}
        </h3>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-600 mb-3">
            <strong className="text-slate-800">Why this matters:</strong><br />
            Soluble fiber binds to cholesterol in your gut, preventing absorption. It's one of the simplest ways to lower LDL naturally.
          </p>
          
          <p className="text-sm text-slate-600">
            <strong className="text-slate-800">Easy options:</strong>
          </p>
          <ul className="text-sm text-slate-600 mt-1 space-y-1">
            <li>• Add oatmeal to breakfast</li>
            <li>• Include beans in lunch or dinner</li>
            <li>• Snack on an apple with skin</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
          <span>⏱ Time needed: 2 minutes</span>
          <span>📈 Impact: LDL ↓ 5-10%</span>
        </div>
        
        <button 
          className="btn-primary w-full text-lg"
          onClick={onComplete}
        >
          I'll Do This Today ✓
        </button>
      </motion.div>
      
      <motion.button
        className="text-slate-400 text-sm mt-4 hover:text-slate-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onComplete}
      >
        Remind me later
      </motion.button>
    </motion.div>
  )
}

function CompleteStep({ user, onFinish }) {
  return (
    <motion.div 
      className="max-w-lg mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <motion.div
        className="text-6xl mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        🎉
      </motion.div>
      
      <motion.h2 
        className="text-title text-slate-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        You're All Set
      </motion.h2>
      
      <motion.p 
        className="text-slate-500 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Your health journey starts now
      </motion.p>
      
      <motion.div
        className="card p-6 text-left mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vytal-100 flex items-center justify-center">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <p className="font-medium text-slate-800">Daily Check-in</p>
              <p className="text-sm text-slate-500">Log your actions each day</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vytal-100 flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="font-medium text-slate-800">Weekly Progress</p>
              <p className="text-sm text-slate-500">See your improvement over time</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vytal-100 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="font-medium text-slate-800">AI Health Chat</p>
              <p className="text-sm text-slate-500">Ask me anything about your results</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vytal-100 flex items-center justify-center">
              <span className="text-xl">🔬</span>
            </div>
            <div>
              <p className="font-medium text-slate-800">Re-test at Day 75</p>
              <p className="text-sm text-slate-500">Validate your improvement</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.p 
        className="text-slate-600 italic mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        "Every day you show up, you're investing in a longer, healthier life."
      </motion.p>
      
      <motion.button
        className="btn-primary text-lg px-8 py-4"
        onClick={onFinish}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Go to Dashboard
        <ArrowRight className="inline-block ml-2 w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}

// Main Onboarding Component
export default function Onboarding() {
  const { user, completeOnboarding } = useUser()
  const [step, setStep] = useState(STEPS.WELCOME)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [selectedIntensity, setSelectedIntensity] = useState(null)
  const [actions, setActions] = useState([])
  
  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId)
    setStep(STEPS.INTENSITY)
  }
  
  const handleIntensitySelect = (intensityId) => {
    setSelectedIntensity(intensityId)
    
    // Generate actions based on goal and intensity
    const goalActions = actionTemplates[selectedGoal] || actionTemplates.cardiovascular
    const actionCount = intensityId === 'gentle' ? 3 : intensityId === 'balanced' ? 5 : 8
    const selectedActions = goalActions.slice(0, actionCount).map((action, index) => ({
      ...action,
      streak: 0,
      totalCompletions: 0,
      todayStatus: 'pending'
    }))
    
    setActions(selectedActions)
    setStep(STEPS.PLAN_PREVIEW)
  }
  
  const handleFinish = () => {
    completeOnboarding(
      { id: selectedGoal, intensity: selectedIntensity },
      actions
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12 px-4">
      {/* Progress indicator */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex justify-center gap-2">
          {Object.values(STEPS).slice(0, -1).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                Object.values(STEPS).indexOf(step) >= i
                  ? 'w-8 bg-vytal-500'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Step content */}
      <AnimatePresence mode="wait">
        {step === STEPS.WELCOME && (
          <WelcomeStep 
            key="welcome"
            user={user} 
            onNext={() => setStep(STEPS.BIO_AGE)} 
          />
        )}
        
        {step === STEPS.BIO_AGE && (
          <BioAgeStep 
            key="bio_age"
            user={user}
            onNext={() => setStep(STEPS.SIGNALS)}
            onBack={() => setStep(STEPS.WELCOME)}
          />
        )}
        
        {step === STEPS.SIGNALS && (
          <SignalsStep 
            key="signals"
            user={user}
            onNext={() => setStep(STEPS.GOAL_SELECT)}
            onBack={() => setStep(STEPS.BIO_AGE)}
          />
        )}
        
        {step === STEPS.GOAL_SELECT && (
          <GoalSelectStep 
            key="goal_select"
            onGoalSelect={handleGoalSelect}
            onBack={() => setStep(STEPS.SIGNALS)}
          />
        )}
        
        {step === STEPS.INTENSITY && (
          <IntensityStep 
            key="intensity"
            goal={selectedGoal}
            onIntensitySelect={handleIntensitySelect}
            onBack={() => setStep(STEPS.GOAL_SELECT)}
          />
        )}
        
        {step === STEPS.PLAN_PREVIEW && (
          <PlanPreviewStep 
            key="plan_preview"
            goal={selectedGoal}
            intensity={selectedIntensity}
            actions={actions}
            onNext={() => setStep(STEPS.FIRST_ACTION)}
            onBack={() => setStep(STEPS.INTENSITY)}
          />
        )}
        
        {step === STEPS.FIRST_ACTION && (
          <FirstActionStep 
            key="first_action"
            firstAction={actions[0]}
            onComplete={() => setStep(STEPS.COMPLETE)}
          />
        )}
        
        {step === STEPS.COMPLETE && (
          <CompleteStep 
            key="complete"
            user={user}
            onFinish={handleFinish}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

