import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-vytal-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-vytal-500/30"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-3xl font-display font-bold text-white">V</span>
        </motion.div>
        
        {/* Loading bar */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-vytal-500 to-emerald-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Loading text */}
        <motion.p 
          className="mt-4 text-slate-500 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading your health journey...
        </motion.p>
      </motion.div>
    </div>
  )
}

