import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Calendar, Target, Award,
  ChevronRight, Flame, Heart, Zap, Activity
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { useUser } from '../context/UserContext'

// Mock progress data - would come from API
const mockWeeklyData = [
  { day: 'Mon', consistency: 75, actions: 3 },
  { day: 'Tue', consistency: 100, actions: 4 },
  { day: 'Wed', consistency: 75, actions: 3 },
  { day: 'Thu', consistency: 100, actions: 4 },
  { day: 'Fri', consistency: 50, actions: 2 },
  { day: 'Sat', consistency: 75, actions: 3 },
  { day: 'Sun', consistency: 100, actions: 4 },
]

const mockBiomarkerProjections = [
  { 
    id: 'ldl',
    name: 'LDL Cholesterol',
    baseline: 145,
    current: 125,
    target: 100,
    unit: 'mg/dL',
    trend: 'improving',
    projection: 105
  },
  { 
    id: 'hscrp',
    name: 'hs-CRP',
    baseline: 3.2,
    current: 2.4,
    target: 1.0,
    unit: 'mg/L',
    trend: 'improving',
    projection: 1.5
  },
  { 
    id: 'triglycerides',
    name: 'Triglycerides',
    baseline: 180,
    current: 150,
    target: 100,
    unit: 'mg/dL',
    trend: 'improving',
    projection: 115
  },
  { 
    id: 'glucose',
    name: 'Fasting Glucose',
    baseline: 108,
    current: 102,
    target: 95,
    unit: 'mg/dL',
    trend: 'improving',
    projection: 96
  }
]

function ProgressRing({ value, max, size = 120, color = '#22c55e' }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / max) * circumference
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-display font-bold text-slate-800">{value}%</span>
      </div>
    </div>
  )
}

function BiomarkerCard({ biomarker }) {
  const progressPercent = Math.round(
    ((biomarker.baseline - biomarker.current) / (biomarker.baseline - biomarker.target)) * 100
  )
  
  return (
    <motion.div 
      className="card p-5"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">{biomarker.name}</h3>
          <p className="text-xs text-slate-500">Target: {biomarker.target} {biomarker.unit}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          biomarker.trend === 'improving' 
            ? 'bg-vytal-100 text-vytal-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {biomarker.trend === 'improving' ? (
            <TrendingDown className="w-3 h-3" />
          ) : (
            <TrendingUp className="w-3 h-3" />
          )}
          {biomarker.trend === 'improving' ? 'Improving' : 'Watch'}
        </div>
      </div>
      
      {/* Values */}
      <div className="flex items-end gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-400">Started</p>
          <p className="text-lg font-semibold text-slate-500">{biomarker.baseline}</p>
        </div>
        <div className="text-vytal-500">→</div>
        <div>
          <p className="text-xs text-slate-400">Current (est.)</p>
          <p className="text-2xl font-bold text-vytal-600">{biomarker.current}</p>
        </div>
        <div className="text-slate-300">→</div>
        <div>
          <p className="text-xs text-slate-400">Projected</p>
          <p className="text-lg font-semibold text-slate-600">~{biomarker.projection}</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="relative">
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-vytal-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercent, 100)}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          {progressPercent > 0 
            ? `${progressPercent}% of the way to your target` 
            : 'Getting started'}
        </p>
      </div>
    </motion.div>
  )
}

export default function Progress() {
  const { user } = useUser()
  const [timeRange, setTimeRange] = useState('week')
  
  // Calculate stats
  const actions = user?.actions || []
  const totalCompletions = actions.reduce((sum, a) => sum + a.totalCompletions, 0)
  const avgStreak = actions.length > 0 
    ? Math.round(actions.reduce((sum, a) => sum + a.streak, 0) / actions.length)
    : 0
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-slate-800 mb-1">
          Your Progress
        </h1>
        <p className="text-slate-500">
          Track your journey to better health
        </p>
      </motion.div>
      
      {/* Goal progress card */}
      <motion.div 
        className="card p-6 mb-6 bg-gradient-to-br from-vytal-50 to-emerald-50 border-vytal-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Goal Progress</h2>
            <p className="text-sm text-slate-600">
              {user?.goal?.id === 'cardiovascular' && 'Lower Cardiovascular Risk'}
              {user?.goal?.id === 'metabolic' && 'Reverse Pre-Diabetes Pattern'}
              {user?.goal?.id === 'biological_age' && 'Reduce Biological Age'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Day {user?.daysActive || 1} of 90</p>
            <p className="text-2xl font-bold text-vytal-600">
              {Math.round(((user?.daysActive || 1) / 90) * 100)}%
            </p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          <div className="w-full h-3 bg-white rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-vytal-500 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((user?.daysActive || 1) / 90) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Start</span>
            <span>Day 30</span>
            <span>Day 60</span>
            <span>Day 90</span>
          </div>
        </div>
      </motion.div>
      
      {/* Stats grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-vytal-100 flex items-center justify-center">
            <Target className="w-6 h-6 text-vytal-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalCompletions}</p>
          <p className="text-xs text-slate-500">Actions Done</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-orange-100 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{user?.streak || 0}</p>
          <p className="text-xs text-slate-500">Current Streak</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-blue-100 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{user?.daysActive || 1}</p>
          <p className="text-xs text-slate-500">Days Active</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-purple-100 flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">{user?.consistency || 0}%</p>
          <p className="text-xs text-slate-500">Consistency</p>
        </div>
      </motion.div>
      
      {/* Weekly chart */}
      <motion.div 
        className="card p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Weekly Consistency</h2>
          <div className="flex gap-2">
            {['week', 'month'].map(range => (
              <button
                key={range}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockWeeklyData}>
              <defs>
                <linearGradient id="colorConsistency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Consistency']}
              />
              <Area 
                type="monotone" 
                dataKey="consistency" 
                stroke="#22c55e" 
                strokeWidth={2}
                fill="url(#colorConsistency)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      
      {/* Biomarker projections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Biomarker Projections</h2>
        <p className="text-sm text-slate-500 mb-4">
          Based on your consistency and similar user outcomes
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {mockBiomarkerProjections.map((biomarker, index) => (
            <motion.div
              key={biomarker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <BiomarkerCard biomarker={biomarker} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Re-test CTA */}
      <motion.div
        className="card p-6 mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1">Validate Your Progress</h3>
            <p className="text-sm text-slate-600">
              Schedule a re-test around Day 75 to see your real biomarker improvements.
            </p>
          </div>
          <button className="btn-primary whitespace-nowrap">
            Schedule Re-test
          </button>
        </div>
      </motion.div>
    </div>
  )
}

