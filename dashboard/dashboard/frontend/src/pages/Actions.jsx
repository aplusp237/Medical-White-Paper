import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Check, Flame, Info, ChevronDown, ChevronUp,
  Utensils, Footprints, Pill, Moon, Heart,
  TrendingDown, Clock, Target
} from 'lucide-react'
import { useUser } from '../context/UserContext'

const categoryIcons = {
  nutrition: Utensils,
  movement: Footprints,
  supplement: Pill,
  lifestyle: Moon
}

const categoryColors = {
  nutrition: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
  movement: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  supplement: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  lifestyle: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' }
}

// Action details - what each action impacts
const actionDetails = {
  fiber: {
    why: "Soluble fiber binds to cholesterol in your gut, preventing absorption. It's one of the most effective natural ways to lower LDL.",
    howTo: [
      "Add oatmeal to breakfast (5g fiber)",
      "Include beans or lentils in one meal (8g fiber)",
      "Snack on an apple with skin (4g fiber)",
      "Add chia seeds to smoothies (5g per tbsp)"
    ],
    targets: ['LDL Cholesterol ↓', 'Blood Glucose ↓'],
    timeNeeded: '2 minutes',
    science: "Studies show 5-10g daily soluble fiber can reduce LDL by 5-10%"
  },
  walk: {
    why: "Post-meal walking blunts glucose spikes by 30-50%. The muscles absorb glucose directly, reducing insulin demand.",
    howTo: [
      "Walk for 10-15 minutes after your largest meal",
      "Even slow walking works—pace doesn't matter much",
      "Indoor walking counts (stairs, hallways)",
      "Set a recurring calendar reminder"
    ],
    targets: ['Blood Glucose ↓', 'Triglycerides ↓'],
    timeNeeded: '10-15 minutes',
    science: "Research shows post-meal walking reduces glucose AUC by ~30%"
  },
  fish_oil: {
    why: "EPA and DHA in fish oil are potent anti-inflammatory compounds that directly lower triglycerides and reduce hs-CRP.",
    howTo: [
      "Take 2-3g combined EPA/DHA daily",
      "Take with a meal containing fat for better absorption",
      "Store in refrigerator to prevent oxidation",
      "Look for third-party tested brands"
    ],
    targets: ['Triglycerides ↓', 'hs-CRP ↓', 'Inflammation ↓'],
    timeNeeded: '30 seconds',
    science: "Fish oil can lower triglycerides by 15-30% at therapeutic doses"
  },
  sleep: {
    why: "Sleep is when your body repairs, hormones rebalance, and inflammation clears. Poor sleep drives up hs-CRP and cortisol.",
    howTo: [
      "Set a consistent bedtime (same time daily)",
      "Create a wind-down routine starting 1 hour before",
      "Keep room dark, cool (65-68°F), and quiet",
      "No screens 30-60 minutes before bed"
    ],
    targets: ['hs-CRP ↓', 'Cortisol ↓', 'Recovery ↑'],
    timeNeeded: '7-8 hours',
    science: "Each hour of sleep debt increases hs-CRP by ~8%"
  },
  cardio: {
    why: "Zone 2 cardio (where you can hold a conversation) builds metabolic efficiency and raises HDL while lowering triglycerides.",
    howTo: [
      "Aim for 150 minutes per week (30 min × 5 days)",
      "Heart rate: 60-70% of max",
      "Options: brisk walking, cycling, swimming",
      "Can break into 10-minute chunks"
    ],
    targets: ['HDL ↑', 'Triglycerides ↓', 'VO2 Max ↑'],
    timeNeeded: '30 minutes × 5/week',
    science: "Regular cardio can raise HDL by 5-15% and lower triglycerides by 10-20%"
  },
  low_carb: {
    why: "Refined carbs spike blood sugar rapidly, leading to insulin resistance over time. Reducing them stabilizes glucose and HbA1c.",
    howTo: [
      "Replace white rice with cauliflower rice or quinoa",
      "Swap bread for lettuce wraps",
      "Choose whole grains when you do eat carbs",
      "Read labels—sugar hides in many foods"
    ],
    targets: ['Glucose ↓', 'HbA1c ↓', 'Triglycerides ↓'],
    timeNeeded: 'Meal planning',
    science: "Low-carb diets can reduce HbA1c by 0.5-1% in 3 months"
  },
  protein: {
    why: "Protein at breakfast reduces glucose spikes throughout the day and keeps you fuller longer, preventing snacking.",
    howTo: [
      "Aim for 20-30g protein at breakfast",
      "Options: eggs, Greek yogurt, cottage cheese",
      "Add protein powder to smoothies",
      "Nuts and seeds also contribute"
    ],
    targets: ['Glucose ↓', 'Satiety ↑', 'Muscle ↑'],
    timeNeeded: '5-10 minutes',
    science: "High-protein breakfast reduces daily glucose variability by 20%"
  },
  strength: {
    why: "Muscle is metabolically active tissue that improves glucose disposal. More muscle = better blood sugar control.",
    howTo: [
      "2-3 sessions per week, 30-45 minutes each",
      "Focus on major muscle groups",
      "Progressive overload (gradually increase weight)",
      "Bodyweight exercises work well too"
    ],
    targets: ['Glucose ↓', 'Metabolism ↑', 'Bio Age ↓'],
    timeNeeded: '30-45 min × 2-3/week',
    science: "Resistance training improves insulin sensitivity by 10-20%"
  },
  stress: {
    why: "Chronic stress elevates cortisol, which drives inflammation and blood sugar up. Regular practice reverses this.",
    howTo: [
      "10 minutes daily: meditation, breathwork, or journaling",
      "Try box breathing: 4 sec in, 4 sec hold, 4 sec out, 4 sec hold",
      "Apps like Headspace or Calm can guide you",
      "Even 5 minutes helps"
    ],
    targets: ['Cortisol ↓', 'hs-CRP ↓', 'Sleep ↑'],
    timeNeeded: '10 minutes',
    science: "Regular meditation reduces cortisol by 20-25%"
  }
}

function ActionCard({ action, onToggle, onExpand, isExpanded }) {
  const details = actionDetails[action.id] || {}
  const colors = categoryColors[action.category] || categoryColors.nutrition
  const CategoryIcon = categoryIcons[action.category] || Heart
  
  return (
    <motion.div
      className={`card overflow-hidden ${action.todayStatus === 'completed' ? 'ring-2 ring-vytal-400' : ''}`}
      layout
    >
      {/* Main card content */}
      <div 
        className="p-5 cursor-pointer"
        onClick={() => onToggle(action.id, action.todayStatus)}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <motion.div 
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              action.todayStatus === 'completed'
                ? 'bg-vytal-500 text-white'
                : `${colors.bg} ${colors.text}`
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {action.todayStatus === 'completed' ? (
              <Check className="w-5 h-5" />
            ) : (
              <CategoryIcon className="w-5 h-5" />
            )}
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{action.icon}</span>
              <h3 className={`font-semibold ${
                action.todayStatus === 'completed' ? 'text-vytal-700' : 'text-slate-800'
              }`}>
                {action.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <span className={`px-2 py-0.5 rounded-md ${colors.bg} ${colors.text} text-xs font-medium capitalize`}>
                {action.category}
              </span>
              
              {action.streak > 0 && (
                <span className="flex items-center gap-1 text-orange-500">
                  <Flame className="w-4 h-4" />
                  <span className="font-medium">{action.streak} days</span>
                </span>
              )}
              
              <span className="text-slate-400">
                {action.totalCompletions} total
              </span>
            </div>
          </div>
          
          {/* Expand button */}
          <button
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              onExpand(action.id)
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
      
      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-slate-100 pt-4">
              {/* Why it matters */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  Why This Matters
                </h4>
                <p className="text-sm text-slate-600">{details.why}</p>
              </div>
              
              {/* Targets */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-vytal-500" />
                  What It Impacts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.targets?.map((target, i) => (
                    <span key={i} className="px-2 py-1 bg-vytal-100 text-vytal-700 rounded-md text-xs font-medium">
                      {target}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* How to do it */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-2">How To Do It</h4>
                <ul className="space-y-1">
                  {details.howTo?.map((step, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-vytal-500 mt-1">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Time and science */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {details.timeNeeded}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  {details.science}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Actions() {
  const { user, logAction } = useUser()
  const [expandedAction, setExpandedAction] = useState(null)
  const [filter, setFilter] = useState('all')
  
  const actions = user?.actions || []
  
  const filteredActions = filter === 'all' 
    ? actions 
    : filter === 'completed' 
      ? actions.filter(a => a.todayStatus === 'completed')
      : actions.filter(a => a.todayStatus !== 'completed')
  
  const completedCount = actions.filter(a => a.todayStatus === 'completed').length
  const pendingCount = actions.length - completedCount
  
  const handleToggle = (actionId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'
    logAction(actionId, newStatus)
  }
  
  const handleExpand = (actionId) => {
    setExpandedAction(expandedAction === actionId ? null : actionId)
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-slate-800 mb-1">
          Your Actions
        </h1>
        <p className="text-slate-500">
          Track and learn about each habit
        </p>
      </motion.div>
      
      {/* Filter tabs */}
      <motion.div 
        className="flex gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'all' 
              ? 'bg-slate-800 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          onClick={() => setFilter('all')}
        >
          All ({actions.length})
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'pending' 
              ? 'bg-amber-500 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            filter === 'completed' 
              ? 'bg-vytal-500 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          onClick={() => setFilter('completed')}
        >
          Done ({completedCount})
        </button>
      </motion.div>
      
      {/* Actions list */}
      <div className="space-y-4">
        {filteredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <ActionCard
              action={action}
              onToggle={handleToggle}
              onExpand={handleExpand}
              isExpanded={expandedAction === action.id}
            />
          </motion.div>
        ))}
      </div>
      
      {filteredActions.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-500">No actions found</p>
        </motion.div>
      )}
      
      {/* Tip */}
      <motion.div
        className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-sm text-blue-700">
          <strong>Pro tip:</strong> Tap an action to mark it complete. Tap the arrow to learn more about why it matters and how to do it.
        </p>
      </motion.div>
    </div>
  )
}

