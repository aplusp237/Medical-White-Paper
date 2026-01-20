import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Actions from './pages/Actions'
import Progress from './pages/Progress'
import Chat from './pages/Chat'

// Components
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'

// Context
import { UserProvider, useUser } from './context/UserContext'

function AppRoutes() {
  const { user, isLoading } = useUser()
  
  if (isLoading) {
    return <LoadingScreen />
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Onboarding flow */}
        {!user?.onboardingComplete ? (
          <Route path="*" element={<Onboarding />} />
        ) : (
          <>
            {/* Main app routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App

