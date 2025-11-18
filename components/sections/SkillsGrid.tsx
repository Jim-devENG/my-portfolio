"use client"

import { motion } from "framer-motion"
import { skills } from "@/data/skills"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Palette, Wrench } from "lucide-react"

const categoryIcons = {
  "Languages & Frameworks": Code2,
  "Front-End Tools": Palette,
  "Databases": Database,
  "Tools & Others": Wrench,
}

export function SkillsGrid() {
  return (
    <section className="py-20 bg-[#09090b] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, index) => {
            const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code2
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-neutral-900/50 border-neutral-800 hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden h-full">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="h-5 w-5 text-blue-400" />
                      </motion.div>
                      <CardTitle className="text-white text-lg">
                        {category.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.1 + skillIndex * 0.05,
                            duration: 0.3
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                          }}
                          className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-sm rounded-full cursor-default transition-colors border border-transparent hover:border-blue-500/30"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

