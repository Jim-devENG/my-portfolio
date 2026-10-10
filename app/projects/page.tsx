import { Navbar } from "@/components/navigation/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SectionHeader } from "@/components/sections/SectionHeader"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { projectsPage } from "@/lib/content"

export const metadata = {
  title: "Projects | Jimmy Enietan",
  description: "A collection of my projects and work",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={projectsPage.title}
            subtitle={projectsPage.subtitle}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsPage.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

