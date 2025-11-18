"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="bg-neutral-900/50 border-neutral-800 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col group overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold text-neutral-700">
                  {project.title.charAt(0)}
                </div>
              </div>
            </>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-white text-xl">{project.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-2 py-1 text-neutral-500 text-xs">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 mt-auto pt-4">
          {project.liveUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 min-w-0"
            >
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <ExternalLink className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Live</span>
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 min-w-0"
            >
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <Github className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Code</span>
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

