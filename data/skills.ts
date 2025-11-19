export interface SkillCategory {
  category: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: ["PHP (Laravel)", "JavaScript", "React.js", "Vue.js", "TypeScript", "Node.js", "Python", "FastAPI"],
  },
  {
    category: "Front-End Tools",
    skills: ["HTML5", "CSS3", "Bootstrap", "TailwindCSS", "WordPress", "Next.js"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "MongoDB"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "GitHub", "REST APIs", "Figma", "Adobe Photoshop", "Responsive Design"],
  },
]

