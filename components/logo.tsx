"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

export function Logo({ size = "md", animated = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
          
          <svg
            className="w-4/5 h-4/5 text-white relative z-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.23A2.5 2.5 0 0 1 4.5 12a2.5 2.5 0 0 1 1.54-2.31A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.23A2.5 2.5 0 0 0 19.5 12a2.5 2.5 0 0 0-1.54-2.31A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          
          {animated && (
            <>
              <motion.div
                className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full"
                animate={{
                  y: [0, -4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="absolute top-2 right-2 w-0.5 h-0.5 bg-white/40 rounded-full"
                animate={{
                  y: [0, -3, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </>
          )}
        </div>
        
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-500/30 rounded-xl blur-sm"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      <motion.span
        className={`font-bold text-slate-900 dark:text-white font-['Lexend_Deca'] ${textSizes[size]}`}
        initial={animated ? { opacity: 0, x: -10 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        TalkFlow
      </motion.span>
    </div>
  )
} 