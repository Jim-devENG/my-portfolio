"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animated gradient orbs - use fixed animation values to avoid hydration mismatch
  const orbs = [
    { x: [-20, 20, -20], y: [-15, 15, -15], duration: 20 },
    { x: [15, -15, 15], y: [-20, 20, -20], duration: 25 },
    { x: [-25, 25, -25], y: [10, -10, 10], duration: 30 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: `${300 + i * 200}px`,
            height: `${300 + i * 200}px`,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 25}%`,
            background: i === 0 
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)"
              : i === 1
              ? "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: orb.x,
            y: orb.y,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating sparkle icons */}
          <motion.div
            className="absolute -top-10 left-10 text-blue-400/30"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Sparkles size={40} />
          </motion.div>
          <motion.div
            className="absolute -bottom-10 right-10 text-purple-400/30"
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            <Sparkles size={40} />
          </motion.div>

          <motion.div
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative leading-[1.15]"
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-5">
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] block text-center"
                  animate={{
                    backgroundPosition: ["0% center", "200% center", "0% center"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Software Engineer
                </motion.span>
                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                  <motion.span
                    className="text-white/95 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  >
                    AI Integrations
                  </motion.span>
                  <motion.span
                    className="text-blue-400/40 text-lg sm:text-xl md:text-2xl font-light"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    className="text-white/95 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  >
                    Intelligent Product Builder
                  </motion.span>
                </div>
              </div>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Building full-stack systems,{" "}
            <span className="text-blue-400 font-semibold">integrating AI</span> where it drives impact, and{" "}
            <span className="text-purple-400 font-semibold">shipping products</span> that{" "}
            <span className="text-pink-400 font-semibold">solve real problems</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 border-0">
                <Link href="/projects" className="relative z-10">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className="group border-2 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                <Link href="/contact">
                  Get In Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "5+", label: "Years Experience" },
              { number: "10+", label: "Projects" },
              { number: "100%", label: "Dedicated" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-blue-500/50 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
            />
          </div>
          <motion.span
            className="text-xs text-neutral-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}

