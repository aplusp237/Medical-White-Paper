import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Flame, TrendingUp, MessageCircle, Check, 
  ChevronRight, Sparkles, Target, Calendar,
  Award, Heart
} from 'lucide-react'
import { useUser } from '../context/UserContext'
import { format } from 'date-fns'

// Greeting based on time
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Motivational messages
const motivationalMessages = [
  "Every small action compounds into big results.",
  "Your future self will thank you for today's choices.",
  "Consistency beats perfection. Show up.",
  "You're building something most people won't attempt.",
  "Health is wealth. You're making daily deposits.",
]

export default function Dashboard() {
  const { user, logAction } = useUser()
  const [celebrateAction, setCelebrateAction] = useState(null)
  
  const todayActions = user?.actions || []
  const completedToday = todayActions.filter(a => a.todayStatus === 'completed').length
  const totalActions = todayActions.length
  const completionRate = totalActions > 0 ? Math.round((completedToday / totalActions) * 100) : 0
  
  const handleActionToggle = (actionId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'
    logAction(actionId, newStatus)
    
    if (newStatus === 'completed') {
      setCelebrateAction(actionId)
      setTimeout(() => setCelebrateAction(null), 2000)
    }
  }
  
  // Get random motivational message
  const motivationalMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-slate-800 mb-1">
          {getGreeting()}, {user?.name} 👋
        </h1>
        <p className="text-slate-500">
          Day {user?.daysActive || 1} of your health journey
        </p>
      </motion.div>
      
      {/* Stats row */}
      <motion.div 
        className="grid grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Health Score */}
        <div className="card p-4 text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-vytal-500/20">
            <span className="text-2xl font-display font-bold text-white">{user?.healthScore}</span>
          </div>
          <p className="text-sm font-medium text-slate-800">Health Score</p>
          <p className="text-xs text-slate-500">Good</p>
        </div>
        
        {/* Streak */}
        <div className="card p-4 text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <div className="text-center">
              <Flame className="w-6 h-6 text-white mx-auto" />
              <span className="text-lg font-bold text-white">{user?.streak || 0}</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-800">Day Streak</p>
          <p className="text-xs text-slate-500">Keep it going!</p>
        </div>
        
        {/* Bio Age */}
        <div className="card p-4 text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-2xl font-display font-bold text-white">{user?.biologicalAge}</span>
          </div>
          <p className="text-sm font-medium text-slate-800">Bio Age</p>
          <p className="text-xs text-vytal-600">
            {user?.chronologicalAge - user?.biologicalAge > 0 ? '↓' : '↑'} 
            {Math.abs(user?.chronologicalAge - user?.biologicalAge)} years
          </p>
        </div>
      </motion.div>
      
      {/* Today's Actions */}
      <motion.div 
        className="card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Today's Actions</h2>
            <p className="text-sm text-slate-500">{completedToday} of {totalActions} complete</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-2xl font-bold text-vytal-600">{completionRate}%</p>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-gradient-to-r from-vytal-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
        
        {/* Action list */}
        <div className="space-y-3">
          {todayActions.map((action, index) => (
            <motion.div
              key={action.id}
              className={`action-card relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                action.todayStatus === 'completed'
                  ? 'bg-vytal-50 border-vytal-200 completed'
                  : 'bg-white border-slate-100 hover:border-vytal-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => handleActionToggle(action.id, action.todayStatus)}
              whileTap={{ scale: 0.98 }}
            >
              {/* Celebration animation */}
              {celebrateAction === action.id && (
                <motion.div
                  className="absolute inset-0 bg-vytal-400/20 rounded-xl"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              
              {/* Checkbox */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                action.todayStatus === 'completed'
                  ? 'bg-vytal-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {action.todayStatus === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="w-3 h-3 rounded-sm border-2 border-current" />
                )}
              </div>
              
              {/* Icon and details */}
              <span className="text-2xl">{action.icon}</span>
              <div className="flex-1">
                <p className={`font-medium ${
                  action.todayStatus === 'completed' ? 'text-vytal-700' : 'text-slate-800'
                }`}>
                  {action.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400 capitalize">{action.category}</span>
                  {action.streak > 0 && (
                    <span className="text-xs text-orange-500 flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {action.streak} day streak
                    </span>
                  )}
                </div>
              </div>
              
              {/* Status indicator */}
              {action.todayStatus === 'completed' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0"
                >
                  <Sparkles className="w-5 h-5 text-vytal-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Quick access cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/progress" className="card p-5 block hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800">View Progress</h3>
            <p className="text-sm text-slate-500">Track your improvement</p>
          </Link>
        </motion.div>
        
        {/* Chat card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/chat" className="card p-5 block hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-800">Health Chat</h3>
            <p className="text-sm text-slate-500">Ask me anything</p>
          </Link>
        </motion.div>
      </div>
      
      {/* Goal reminder */}
      <motion.div
        className="card p-5 bg-gradient-to-br from-vytal-50 to-emerald-50 border-vytal-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-vytal-500 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Your Goal</h3>
            <p className="text-sm text-slate-600 mb-2">
              {user?.goal?.id === 'cardiovascular' && 'Lower Cardiovascular Risk'}
              {user?.goal?.id === 'metabolic' && 'Reverse Pre-Diabetes Pattern'}
              {user?.goal?.id === 'biological_age' && 'Reduce Biological Age'}
            </p>
            <p className="text-xs text-slate-500">
              90-day journey • {user?.goal?.intensity} intensity
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Motivational quote */}
      <motion.p
        className="text-center text-slate-400 text-sm italic mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        "{motivationalMessage}"
      </motion.p>
    </div>
  )
}

