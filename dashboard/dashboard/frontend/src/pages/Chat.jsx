import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, Bot, User, Sparkles, Heart, Zap, 
  Brain, Apple, Pill, Moon, HelpCircle,
  Loader2
} from 'lucide-react'
import { useUser } from '../context/UserContext'

// Quick topic suggestions
const quickTopics = [
  { id: 'ldl', text: 'Explain my LDL result', icon: Heart },
  { id: 'inflammation', text: 'Why is inflammation bad?', icon: Zap },
  { id: 'foods', text: 'What foods should I eat?', icon: Apple },
  { id: 'progress', text: 'Am I on track?', icon: Brain },
]

// Simulated AI responses based on context
const getAIResponse = (message, user) => {
  const msg = message.toLowerCase()
  
  // LDL explanation
  if (msg.includes('ldl') || msg.includes('cholesterol')) {
    return {
      content: `Great question! Let me explain your LDL result.

**Your number: ${user.biomarkers.ldl.value} mg/dL**
• Optimal: <100 mg/dL
• Your status: ${user.biomarkers.ldl.status === 'high' ? 'Elevated ⚠️' : 'Borderline'}

**What LDL is:**
LDL (Low-Density Lipoprotein) carries cholesterol to your artery walls. When there's too much, it can build up as plaque, narrowing your arteries over time.

**Why yours is elevated:**
Looking at your full profile, your elevated LDL combined with high hs-CRP (${user.biomarkers.hsCRP.value} mg/L) suggests inflammation is actively promoting plaque buildup. This is the pattern we're targeting.

**Your action plan addresses this:**
• **Fiber** → Binds to cholesterol, prevents absorption
• **Fish oil** → Reduces inflammation (hs-CRP)
• **Post-meal walks** → Improves lipid metabolism

**Expected improvement:**
With 70%+ consistency, you could see LDL drop to ~105-115 mg/dL in 90 days.`,
      suggestions: [
        'How does fiber lower cholesterol?',
        'What about medications like statins?',
        'Show me my APO-B result'
      ]
    }
  }
  
  // Inflammation explanation
  if (msg.includes('inflammation') || msg.includes('hscrp') || msg.includes('crp')) {
    return {
      content: `Inflammation is a crucial concept. Let me break it down.

**Your hs-CRP: ${user.biomarkers.hsCRP.value} mg/L**
• Optimal: <1 mg/L
• Moderate risk: 1-3 mg/L
• High risk: >3 mg/L
• Your status: Elevated ⚠️

**What inflammation is:**
Think of chronic inflammation as a slow-burning fire inside your body. A little is normal (it's how your body heals). But when it stays elevated, it damages tissues—especially blood vessels.

**Why this matters for you:**
Chronic inflammation:
1. Damages artery walls, making them sticky for cholesterol
2. Makes existing plaque unstable (heart attack risk)
3. Worsens insulin resistance
4. Accelerates biological aging

**What's driving yours:**
Based on your profile, likely contributors are:
• Diet patterns (possibly high in refined carbs)
• Sleep quality (impacts recovery)
• Possible visceral fat accumulation

**Your plan targets this directly:**
• Fish oil → Strong anti-inflammatory
• Sleep optimization → Reduces inflammatory markers
• Post-meal walks → Reduces glucose spikes (which drive inflammation)`,
      suggestions: [
        'How long until my hs-CRP improves?',
        'What foods cause inflammation?',
        'Tell me about sleep and inflammation'
      ]
    }
  }
  
  // Food recommendations
  if (msg.includes('food') || msg.includes('eat') || msg.includes('diet') || msg.includes('meal')) {
    return {
      content: `Based on your goals (lower cardiovascular risk), here are your power foods:

**🟢 PRIORITIZE THESE:**

**Fiber-Rich Foods** (target: 25-35g/day)
• Oatmeal, beans, lentils, apples
• Why: Binds cholesterol, improves gut health

**Omega-3 Sources**
• Salmon, mackerel, sardines (3x/week)
• Walnuts, chia seeds, flaxseed
• Why: Powerful anti-inflammatory

**Colorful Vegetables**
• Leafy greens, broccoli, peppers
• Why: Antioxidants combat oxidation

**Healthy Fats**
• Olive oil, avocados, nuts
• Why: Supports HDL, reduces inflammation

---

**🔴 REDUCE OR AVOID:**

• **Refined carbs**: White bread, pasta, pastries
• **Added sugars**: Sodas, candy, many packaged foods
• **Seed oils**: Soybean, corn, canola (use olive oil)
• **Processed meats**: Bacon, sausage, deli meats
• **Excess alcohol**: Limit to 3 drinks/week

---

**🍽️ SAMPLE DINNER TONIGHT:**

**Salmon + Roasted Vegetables**
• Salmon fillet (omega-3s)
• Roasted broccoli and peppers
• Side of quinoa or cauliflower rice
• Drizzle with olive oil

This single meal hits fiber, omega-3s, and antioxidants! 🎯`,
      suggestions: [
        'What about breakfast options?',
        'Can I have coffee?',
        'How much protein do I need?'
      ]
    }
  }
  
  // Progress check
  if (msg.includes('track') || msg.includes('progress') || msg.includes('doing')) {
    const completedToday = user.actions.filter(a => a.todayStatus === 'completed').length
    const totalActions = user.actions.length
    const consistency = totalActions > 0 ? Math.round((completedToday / totalActions) * 100) : 0
    
    return {
      content: `Let me check your progress... 📊

**Day ${user.daysActive || 1} Summary:**

• Overall consistency: **${consistency}%** ${consistency >= 70 ? '✓' : '⚠️'}
• Current streak: **${user.streak || 0} days** ${user.streak >= 7 ? '🔥' : ''}
• Actions completed today: **${completedToday}/${totalActions}**

**Action Breakdown:**
${user.actions.map(a => `• ${a.icon} ${a.name}: ${a.todayStatus === 'completed' ? '✅ Done' : '⏳ Pending'} (${a.streak} day streak)`).join('\n')}

**My Assessment:**
${consistency >= 70 
  ? "You're doing great! At this pace, you're on track to see meaningful biomarker improvements by Day 90. Keep it up!" 
  : "There's room to improve. Remember, consistency beats perfection. Even completing 3 out of 4 actions is better than skipping entirely."}

**Projected Biomarker Changes:**
Based on similar users with your consistency level:
• LDL: ${user.biomarkers.ldl.value} → ~${Math.round(user.biomarkers.ldl.value * 0.85)} mg/dL
• hs-CRP: ${user.biomarkers.hsCRP.value} → ~${(user.biomarkers.hsCRP.value * 0.7).toFixed(1)} mg/L`,
      suggestions: [
        'How can I improve my consistency?',
        'What if I miss a day?',
        'When should I retest?'
      ]
    }
  }
  
  // Motivation / struggling
  if (msg.includes('struggling') || msg.includes('hard') || msg.includes('difficult') || msg.includes('motivation')) {
    return {
      content: `I hear you. Building new habits is genuinely hard—anyone who says otherwise hasn't tried. 💪

**First, some perspective:**
Week 2-3 is often the hardest. The novelty has worn off, but the habits aren't automatic yet. This is completely normal.

**Your current stats:**
• ${user.daysActive || 1} days in
• Consistency: ${user.consistency || 0}%
• Current streak: ${user.streak || 0} days

**What might help:**

1. **Shrink the actions**
   Instead of a 10-min walk, could you commit to 5 min? Completion beats perfection. Once you start, you often continue.

2. **Stack habits**
   Attach new habits to existing ones:
   "After I brush my teeth, I take my fish oil"
   "After I eat dinner, I walk around the block"

3. **Identify the blocker**
   What's the specific thing making it hard?
   • Time? → Shorter alternatives exist
   • Forgetting? → Set phone reminders
   • Energy? → Try different times of day
   • Motivation? → Remember your "why"

4. **Celebrate small wins**
   Did you complete 2 out of 4 today? That's not failure—that's 50% progress. It compounds.

**Remember:**
Every day you show up—even imperfectly—you're building something. Your future self is counting on you. And I'm here to help whenever you need it. 🌱`,
      suggestions: [
        'Help me simplify my plan',
        'Set up better reminders',
        'Remind me why this matters'
      ]
    }
  }
  
  // Default response
  return {
    content: `Thanks for your question! Let me help with that.

Based on your health profile, I can see you're working on:
• Lowering cardiovascular risk (LDL: ${user.biomarkers.ldl.value}, hs-CRP: ${user.biomarkers.hsCRP.value})
• Managing metabolic health (Glucose: ${user.biomarkers.glucose.value}, HbA1c: ${user.biomarkers.hba1c.value})

I'm here to help you understand your biomarkers, answer questions about your action plan, or provide motivation when you need it.

**Try asking me about:**
• Any specific biomarker (LDL, hs-CRP, glucose, etc.)
• Why certain actions are in your plan
• Food and nutrition guidance
• Your progress and projections
• Tips for staying consistent

What would you like to explore?`,
    suggestions: [
      'Explain my cardiovascular risk',
      'What should I eat today?',
      'How am I progressing?'
    ]
  }
}

function MessageBubble({ message, isUser }) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center mr-2 flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'chat-bubble-user px-4 py-3' : 'chat-bubble-assistant px-4 py-3'}`}>
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="text-sm prose prose-sm max-w-none">
            {message.content.split('\n').map((line, i) => {
              // Handle bold text
              const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              return (
                <p 
                  key={i} 
                  className={`${line.startsWith('•') ? 'ml-2' : ''} ${line === '' ? 'h-2' : 'mb-1'}`}
                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
              )
            })}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center ml-2 flex-shrink-0">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </motion.div>
  )
}

function SuggestedReplies({ suggestions, onSelect }) {
  return (
    <motion.div 
      className="flex flex-wrap gap-2 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:bg-slate-50 hover:border-vytal-300 transition-colors"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </motion.div>
  )
}

export default function Chat() {
  const { user } = useUser()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = {
        role: 'assistant',
        content: `Hi ${user?.name}! 👋 I'm your Vytal health assistant.

I'm here to help you understand your health results and make progress on your goals. I can explain your biomarkers, answer questions about your action plan, or just chat about health.

What would you like to explore today?`
      }
      setMessages([greeting])
      setSuggestions(quickTopics.map(t => t.text))
    }
  }, [user])
  
  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  const handleSend = async (text = input) => {
    if (!text.trim()) return
    
    const userMessage = { role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setSuggestions([])
    setIsTyping(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Get AI response
    const response = getAIResponse(text, user)
    
    setMessages(prev => [...prev, { role: 'assistant', content: response.content }])
    setSuggestions(response.suggestions || [])
    setIsTyping(false)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <motion.div 
        className="px-4 py-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-800">Health Chat</h1>
            <p className="text-xs text-slate-500">Ask me anything about your health</p>
          </div>
        </div>
      </motion.div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Quick topics - show only at start */}
        {messages.length === 1 && (
          <motion.div 
            className="grid grid-cols-2 gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {quickTopics.map((topic) => (
              <button
                key={topic.id}
                className="card p-4 text-left hover:shadow-md transition-shadow"
                onClick={() => handleSend(topic.text)}
              >
                <topic.icon className="w-5 h-5 text-vytal-500 mb-2" />
                <p className="text-sm font-medium text-slate-700">{topic.text}</p>
              </button>
            ))}
          </motion.div>
        )}
        
        {/* Messages */}
        <AnimatePresence>
          {messages.map((message, i) => (
            <MessageBubble 
              key={i} 
              message={message} 
              isUser={message.role === 'user'} 
            />
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1">
                <motion.div 
                  className="w-2 h-2 bg-slate-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-slate-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div 
                  className="w-2 h-2 bg-slate-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Suggested replies */}
        {suggestions.length > 0 && !isTyping && (
          <SuggestedReplies 
            suggestions={suggestions} 
            onSelect={(text) => handleSend(text)}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="px-4 py-4 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-vytal-500/50 focus:border-vytal-500 transition-all"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-vytal-500 to-emerald-500 text-white rounded-xl hover:from-vytal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-vytal-500/25"
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          This is an AI assistant. For medical advice, consult your doctor.
        </p>
      </div>
    </div>
  )
}

