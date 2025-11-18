"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { SkillsGrid } from "@/components/sections/SkillsGrid"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Client-only particles component to avoid hydration mismatch
function Particles() {
  const [mounted, setMounted] = useState(false)
  const [positions] = useState(() => 
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  // Only show projects with live URLs on the home page
  const liveProjects = projects.filter(project => project.liveUrl)
  const featuredProjects = liveProjects.slice(0, 3)

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <Hero />
      
      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title="Skills & Technologies"
            subtitle="Technologies I work with to bring ideas to life"
          />
          <SkillsGrid />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-neutral-950/50 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            title="Featured Projects"
            subtitle="A selection of my recent work"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button asChild variant="outline" size="lg" className="group border-2 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                <Link href="/projects" className="flex items-center">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="About Me"
              subtitle="A brief introduction"
            />
            <div className="prose prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                  Results-driven <span className="text-blue-400 font-semibold">Full Stack Developer</span> with{" "}
                  <span className="text-purple-400 font-semibold">5+ years</span> of experience building scalable, 
                  secure, and user-focused web applications. Proficient in{" "}
                  <span className="text-pink-400 font-semibold">React.js, Vue.js, TypeScript, 
                  PHP (Laravel), Node.js, and WordPress</span>.
                </p>
                <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                  Known for <span className="text-blue-400">collaborative problem-solving</span>,{" "}
                  <span className="text-purple-400">continuous learning</span>, and delivering 
                  high-quality software solutions in fast-paced environments. Passionate about 
                  technology, clean code, and working in teams that value innovation, learning, and humanity.
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button asChild size="lg" className="group bg-gradient-to-r from-blue-500 to-purple-500 border-0 hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                  <Link href="/about" className="flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.3),transparent_50%)]" />
        
        {/* Animated particles - client only to avoid hydration mismatch */}
        <Particles />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              animate={{
                backgroundPosition: ["0% center", "200% center", "0% center"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #fff 0%, #60a5fa 50%, #a78bfa 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-300 mb-8 leading-relaxed"
            >
              Have a project in mind? I'd love to hear about it. Let's create
              something <span className="text-blue-400 font-semibold">amazing</span> together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 hover:shadow-2xl hover:shadow-blue-500/50 transition-all text-lg px-8 py-6">
                <Link href="/contact" className="flex items-center">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

