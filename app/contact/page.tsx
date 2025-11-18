"use client"

import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const socialLinks = [
    { name: "Email", icon: Mail, href: "mailto:jamesenietan@gmail.com", label: "jamesenietan@gmail.com" },
    { name: "GitHub", icon: Github, href: "https://github.com/Jim-devENG", label: "github.com/Jim-devENG" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/enietan-jimmy", label: "linkedin.com/in/enietan-jimmy" },
    { name: "Twitter", icon: Twitter, href: "#", label: "@jimmy" },
  ]

  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Get In Touch"
            subtitle="Let's discuss your next project or just say hello"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-neutral-300 mb-2"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-300 mb-2"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-neutral-300 mb-2"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                          rows={6}
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="Your message..."
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <Card className="bg-neutral-900/50 border-neutral-800">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Let's Connect
                    </h3>
                    <p className="text-neutral-300 mb-6">
                      I'm always open to discussing new projects, creative ideas,
                      or opportunities to be part of your vision.
                    </p>
                    <div className="space-y-4">
                      {socialLinks.map((link) => {
                        const Icon = link.icon
                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors group"
                          >
                            <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{link.name}</div>
                              <div className="text-xs text-neutral-500">{link.label}</div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Response Time
                    </h3>
                    <p className="text-neutral-300 text-sm">
                      I typically respond within 24-48 hours. For urgent matters,
                      feel free to reach out via email.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

