import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ListChecks, TrendingUp, MessageCircle, Settings, LogOut } from 'lucide-react'
import { useUser } from '../context/UserContext'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/actions', icon: ListChecks, label: 'Actions' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/chat', icon: MessageCircle, label: 'Chat' },
]

export default function Layout() {
  const location = useLocation()
  const { user, resetUser } = useUser()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Top header - desktop */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="glass border-b border-slate-200/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-vytal-500/20">
                  <span className="text-lg font-display font-bold text-white">V</span>
                </div>
                <span className="text-xl font-display font-semibold text-slate-800">Vytal</span>
              </div>
              
              {/* Nav */}
              <nav className="flex items-center gap-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                      ${isActive 
                        ? 'bg-vytal-500 text-white shadow-lg shadow-vytal-500/25' 
                        : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              
              {/* User menu */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">Health Score: {user?.healthScore}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vytal-400 to-emerald-400 flex items-center justify-center text-white font-medium">
                    {user?.name?.[0]}
                  </div>
                </div>
                <button 
                  onClick={resetUser}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Reset (Demo)"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="md:pt-20 pb-24 md:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Bottom nav - mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-slate-200/50">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                ${isActive 
                  ? 'text-vytal-600' 
                  : 'text-slate-400'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-vytal-100' : ''}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

