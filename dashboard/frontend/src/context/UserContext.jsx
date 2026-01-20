import { createContext, useContext, useState, useEffect } from 'react'

// Mock user data - would come from API
const mockUserProfile = {
  id: 'user_123',
  name: 'Ankur',
  chronologicalAge: 42,
  biologicalAge: 38,
  healthScore: 78,
  onboardingComplete: false,
  
  // Biomarkers
  biomarkers: {
    ldl: { value: 145, unit: 'mg/dL', status: 'high', optimal: '<100' },
    hdl: { value: 42, unit: 'mg/dL', status: 'borderline_low', optimal: '>40' },
    totalCholesterol: { value: 220, unit: 'mg/dL', status: 'borderline_high', optimal: '<200' },
    triglycerides: { value: 180, unit: 'mg/dL', status: 'borderline_high', optimal: '<150' },
    apoB: { value: 128, unit: 'mg/dL', status: 'high', optimal: '<90' },
    apoA1: { value: 135, unit: 'mg/dL', status: 'normal', optimal: '>120' },
    hsCRP: { value: 3.2, unit: 'mg/L', status: 'high', optimal: '<1' },
    homocysteine: { value: 12, unit: 'µmol/L', status: 'borderline_high', optimal: '<10' },
    lipoA: { value: 25, unit: 'mg/dL', status: 'normal', optimal: '<30' },
    glucose: { value: 108, unit: 'mg/dL', status: 'borderline_high', optimal: '<100' },
    hba1c: { value: 5.9, unit: '%', status: 'borderline_high', optimal: '<5.7' },
    creatinine: { value: 0.9, unit: 'mg/dL', status: 'normal', optimal: '0.7-1.2' },
    eGFR: { value: 95, unit: 'mL/min/1.73m²', status: 'normal', optimal: '>90' },
    uricAcid: { value: 6.2, unit: 'mg/dL', status: 'normal', optimal: '<7' },
    ast: { value: 28, unit: 'U/L', status: 'normal', optimal: '<40' },
    alt: { value: 32, unit: 'U/L', status: 'normal', optimal: '<40' },
    ggt: { value: 35, unit: 'U/L', status: 'normal', optimal: '<60' },
    tsh: { value: 2.1, unit: 'mIU/L', status: 'normal', optimal: '0.4-4.0' },
    vitaminD: { value: 32, unit: 'ng/mL', status: 'normal', optimal: '>30' },
    vitaminB12: { value: 450, unit: 'pg/mL', status: 'normal', optimal: '>200' },
    hemoglobin: { value: 14.5, unit: 'g/dL', status: 'normal', optimal: '13.5-17.5' },
    ferritin: { value: 120, unit: 'ng/mL', status: 'normal', optimal: '30-300' },
  },
  
  // Signals
  signals: {
    attention: [
      {
        id: 'cardio_inflammation',
        title: 'Cardiovascular Inflammation',
        system: 'cardiovascular',
        priority: 'high',
        biomarkers: ['ldl', 'hsCRP', 'apoB'],
        insight: 'Your LDL (145) combined with elevated hs-CRP (3.2) and APO-B (128) indicates your arteries are under stress. This pattern suggests inflammation is actively promoting plaque buildup.',
        action: 'This is the #1 lever for your health right now.'
      }
    ],
    watch: [
      {
        id: 'pre_diabetes',
        title: 'Pre-Diabetic Pattern',
        system: 'metabolic',
        priority: 'medium',
        biomarkers: ['glucose', 'hba1c'],
        insight: 'Your fasting glucose (108) and HbA1c (5.9%) are in the warning zone. This is reversible with the right lifestyle changes.',
        action: 'Early intervention = full reversal'
      }
    ],
    strengths: [
      { system: 'Liver Function', biomarkers: ['ast', 'alt', 'ggt'] },
      { system: 'Kidney Health', biomarkers: ['creatinine', 'eGFR'] },
      { system: 'Thyroid Balance', biomarkers: ['tsh'] },
      { system: 'Blood Health', biomarkers: ['hemoglobin', 'ferritin', 'vitaminB12'] }
    ]
  },
  
  // Current goal (set during onboarding)
  goal: null,
  
  // Active actions
  actions: [],
  
  // Progress
  streak: 0,
  daysActive: 0,
  consistency: 0
}

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading user data
    const loadUser = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check localStorage for saved state
      const savedUser = localStorage.getItem('vytal_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else {
        setUser(mockUserProfile)
      }
      setIsLoading(false)
    }
    
    loadUser()
  }, [])
  
  const updateUser = (updates) => {
    setUser(prev => {
      const newUser = { ...prev, ...updates }
      localStorage.setItem('vytal_user', JSON.stringify(newUser))
      return newUser
    })
  }
  
  const setGoal = (goal) => {
    updateUser({ goal })
  }
  
  const completeOnboarding = (goal, actions) => {
    updateUser({
      onboardingComplete: true,
      goal,
      actions,
      streak: 0,
      daysActive: 1
    })
  }
  
  const logAction = (actionId, status) => {
    setUser(prev => {
      const newActions = prev.actions.map(action => 
        action.id === actionId 
          ? { 
              ...action, 
              todayStatus: status,
              streak: status === 'completed' ? action.streak + 1 : 0,
              totalCompletions: status === 'completed' ? action.totalCompletions + 1 : action.totalCompletions
            }
          : action
      )
      
      const completedToday = newActions.filter(a => a.todayStatus === 'completed').length
      const totalActions = newActions.length
      const consistency = Math.round((completedToday / totalActions) * 100)
      
      const newUser = {
        ...prev,
        actions: newActions,
        consistency,
        streak: completedToday === totalActions ? prev.streak + 1 : prev.streak
      }
      
      localStorage.setItem('vytal_user', JSON.stringify(newUser))
      return newUser
    })
  }
  
  const resetUser = () => {
    localStorage.removeItem('vytal_user')
    setUser(mockUserProfile)
  }
  
  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      updateUser, 
      setGoal, 
      completeOnboarding,
      logAction,
      resetUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

