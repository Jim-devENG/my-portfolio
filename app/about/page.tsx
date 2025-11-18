"use client"

import Image from "next/image"
import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"


const experiences = [
  {
    year: "2025",
    title: "CTO/Developer",
    company: "iSpora — Ogbomoso",
    description: "Designed and implemented end-to-end features for a social collaboration platform using React.js, Next.js, Node.js, and Laravel. Engineered smooth API integrations and fine-tuned MySQL queries.",
  },
  {
    year: "2025",
    title: "Software Developer",
    company: "Getbusy — Jos",
    description: "Built and maintained full-stack software and applications with React.js, Next.js, Node.js, PHP Laravel. Integrated APIs and optimized database interactions for performance.",
  },
  {
    year: "2023",
    title: "Web Developer",
    company: "Flincap — Lagos",
    description: "Built and maintained full-stack fintech applications with React.js and Node.js. Integrated financial APIs and optimized MongoDB database interactions.",
  },
  {
    year: "2023",
    title: "Web Developer",
    company: "BlueInc — Abuja",
    description: "Designed front-end interfaces using Vue.js and Bootstrap. Optimized page load speed by 25% using lazy loading and performance audits.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="About Me"
            subtitle="A glimpse into my journey and philosophy"
          />

          <div className="max-w-4xl mx-auto">
            {/* Bio Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-xl overflow-hidden border border-neutral-800">
                  <Image
                    src="/BIRTHDw.png"
                    alt="James Olorunfemi Enietan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Full Stack Developer
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Results-driven Full Stack Developer with 5+ years of experience building scalable, 
                  secure, and user-focused web applications. Proficient in React.js, Vue.js, TypeScript, 
                  PHP (Laravel), Node.js, and WordPress.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  I have a strong understanding of RESTful APIs, relational/non-relational databases, 
                  and cross-platform development. Known for collaborative problem-solving, continuous 
                  learning, and delivering high-quality software solutions in fast-paced environments.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  Passionate about technology, clean code, and working in a team that values innovation, 
                  learning, and humanity. Based in Plateau State, Nigeria.
                </p>
              </motion.div>
            </div>

            {/* Philosophy Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                My Philosophy
              </h3>
              <div className="space-y-4">
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <p className="text-neutral-300 leading-relaxed">
                      <strong className="text-white">Collaborative Problem-Solving:</strong> I believe
                      in working closely with teams to solve complex challenges. Every solution is 
                      better when built through collaboration and diverse perspectives.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <p className="text-neutral-300 leading-relaxed">
                      <strong className="text-white">User-Focused Development:</strong> Technology
                      should serve people. I prioritize creating intuitive, accessible experiences 
                      that users love to interact with, ensuring responsive design and security in 
                      production code.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <p className="text-neutral-300 leading-relaxed">
                      <strong className="text-white">Continuous Learning:</strong> The
                      tech landscape evolves rapidly. I stay current with industry trends, 
                      continuously expand my skill set, and value working in teams that prioritize 
                      innovation, learning, and humanity.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Timeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 border-l-2 border-neutral-800"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-[#09090b]" />
                    <div className="mb-2">
                      <span className="text-blue-400 text-sm font-medium">
                        {exp.year}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1">
                        {exp.title}
                      </h4>
                      <p className="text-neutral-400 text-sm">{exp.company}</p>
                    </div>
                    <p className="text-neutral-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Education & Certifications
              </h3>
              <div className="space-y-4">
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <h4 className="text-xl font-bold text-white mb-2">
                      Diploma in Computer Networking
                    </h4>
                    <p className="text-neutral-400 mb-2">
                      Federal University of Technology, Minna
                    </p>
                    <p className="text-neutral-300">2021</p>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <h4 className="text-xl font-bold text-white mb-4">
                      Certifications & Training
                    </h4>
                    <ul className="space-y-2 text-neutral-300">
                      <li>• Full Stack Web Development Certification — 2022</li>
                      <li>• DevOps Training — Ongoing</li>
                      <li>• Blockchain — Ongoing</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

