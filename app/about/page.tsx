"use client"

import Image from "next/image"
import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { about } from "@/lib/content"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={about.title}
            subtitle={about.subtitle}
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
                    src={about.photo}
                    alt={about.photoAlt}
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
                  {about.heading}
                </h3>
                {about.bio.map((paragraph, i) => (
                  <p key={i} className="text-neutral-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
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
                {about.philosophyTitle}
              </h3>
              <div className="space-y-4">
                {about.philosophy.map((item) => (
                  <Card key={item.title} className="bg-neutral-900/50 border-neutral-800">
                    <CardContent className="pt-6">
                      <p className="text-neutral-300 leading-relaxed">
                        <strong className="text-white">{item.title}:</strong> {item.text}
                      </p>
                    </CardContent>
                  </Card>
                ))}
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
                {about.experienceTitle}
              </h3>
              <div className="space-y-6">
                {about.experience.map((exp, index) => (
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
                        {exp.period}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1">
                        {exp.role}
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
                {about.educationTitle}
              </h3>
              <div className="space-y-4">
                {about.education.map((item) => (
                  <Card key={`${item.qualification}-${item.year}`} className="bg-neutral-900/50 border-neutral-800">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.qualification}
                      </h4>
                      <p className="text-neutral-400 mb-2">
                        {item.institution}
                      </p>
                      <p className="text-neutral-300">{item.year}</p>
                    </CardContent>
                  </Card>
                ))}
                {about.certifications.length > 0 && (
                  <Card className="bg-neutral-900/50 border-neutral-800">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-bold text-white mb-4">
                        {about.certificationsTitle}
                      </h4>
                      <ul className="space-y-2 text-neutral-300">
                        {about.certifications.map((cert) => (
                          <li key={cert}>• {cert}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

