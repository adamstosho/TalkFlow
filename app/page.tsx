"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Brain, Mic, Zap, Download, Users, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Logo } from "@/components/logo"

const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  if (dimensions.width === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-indigo-400/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
      />
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, color, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <CardContent className="p-6 relative z-10">
          <motion.div
            className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          <motion.h3
            className="text-xl font-semibold text-slate-900 dark:text-white mb-2"
            animate={{ color: isHovered ? "#4F46E5" : "" }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const features = [
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "Advanced speech recognition converts your voice to text instantly with high accuracy.",
      color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-500"
    },
    {
      icon: Brain,
      title: "Smart Visualization",
      description: "AI automatically creates mind maps, flowcharts, and outlines from your speech patterns.",
      color: "bg-sky-100 dark:bg-sky-900 text-sky-500"
    },
    {
      icon: Download,
      title: "Persistence Storage of Diagrams",
      description: "Your diagrams are saved and can be accessed later. No need to worry about losing your work.",
      color: "bg-amber-100 dark:bg-amber-900 text-amber-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process and visualize your thoughts in real-time with minimal latency.",
      color: "bg-green-100 dark:bg-green-900 text-green-500"
    },
    {
      icon: Users,
      title: "Collaboration Ready",
      description: "Perfect for team meetings, brainstorming sessions, and collaborative planning.",
      color: "bg-purple-100 dark:bg-purple-900 text-purple-500"
    },
    {
      icon: Brain,
      title: "Visual Learning",
      description: "Transform complex ideas into clear, visual representations for better understanding.",
      color: "bg-rose-100 dark:bg-rose-900 text-rose-500"
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <AnimatedGradient />
      <FloatingParticles />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-6 relative z-10"
      >
        <nav className="flex items-center justify-between">
          <Logo size="md" animated={true} />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" asChild>
              <Link href="/meeting">Try Demo</Link>
            </Button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-['Lexend_Deca']"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Visualize Conversations.{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Think in Diagrams.
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform your voice into dynamic mind maps, flowcharts, and outlines in real-time. Perfect for visual
            thinkers, brainstorming sessions, and meeting notes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg"
                asChild
              >
                <Link href="/meeting">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Visualizing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            className="relative max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            whileHover={{ y: -10 }}
          >
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { color: "bg-sky-500", title: "Speak Naturally", desc: "Just talk - no special commands needed" },
                  { color: "bg-amber-500", title: "Watch It Build", desc: "See your ideas become visual diagrams" },
                  { color: "bg-indigo-500", title: "Persistence", desc: "Your diagrams are saved and can be accessed later" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`w-3 h-3 ${item.color} rounded-full`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 font-['Lexend_Deca']"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Powerful Features for Visual Thinking
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-12 text-white relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.h2
              className="text-3xl font-bold mb-4 font-['Lexend_Deca'] relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Conversations?
            </motion.h2>
            <motion.p
              className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of visual thinkers who are already using TalkFlow to make their ideas come alive.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button
                size="lg"
                className="bg-white text-indigo-500 hover:bg-slate-100 px-8 py-4 text-lg rounded-xl shadow-lg"
                asChild
              >
                <Link href="/meeting">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}
