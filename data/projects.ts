export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  thumbnail?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Crys Garage Studio",
    description: "Professional audio mastering platform designed for African by African. Get studio-quality masters in minutes, not hours.",
    stack: ["React.js", "TypeScript", "Python", "FastAPI", "Firebase"],
    liveUrl: "https://crysgarage.studio",
    githubUrl: "https://github.com/Jim-devENG/crysgarage-production",
    thumbnail: "/project-screenshots/crysgarage.png",
  },
  {
    id: "2",
    title: "Dellyman Logistics App",
    description: "Full-featured logistics platform for parcel and delivery tracking",
    stack: ["Laravel", "JavaScript", "MySQL"],
    githubUrl: "https://github.com/Jim-devENG/dellyman-appliication",
  },
  {
    id: "3",
    title: "Learning Management System (LMS)",
    description: "Custom-built LMS with course management and user authentication",
    stack: ["Laravel", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/Jim-devENG/LMS",
  },
  {
    id: "4",
    title: "Food E-commerce App",
    description: "Full-stack e-commerce platform with cart, order, and payment features",
    stack: ["React.js", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/Jim-devENG/Food-ecommerce-application",
  },
  {
    id: "5",
    title: "Webifant - Cyber Security Service",
    description: "Responsive Cybersecurity service application",
    stack: ["React.js", "Node.js", "Firebase"],
    liveUrl: "https://webifant.com",
    githubUrl: "https://github.com/Jim-devENG/webifant-security",
    thumbnail: "/project-screenshots/webifant.png",
  },
  {
    id: "6",
    title: "Music Streaming App",
    description: "Responsive streaming interface with playlists and user uploads",
    stack: ["Laravel", "HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Jim-devENG/musicApp",
  },
  {
    id: "7",
    title: "Trumpet Ink",
    description: "Creative writing and content platform with elegant design",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    liveUrl: "https://trumpet.ink",
    thumbnail: "/project-screenshots/trumpet.png",
  },
  {
    id: "8",
    title: "Ispora",
    description: "Social collaboration platform with modern user experience",
    stack: ["React.js", "Next.js", "Node.js", "Laravel"],
    liveUrl: "https://ispora.com",
    thumbnail: "/project-screenshots/ispora.png",
  },
  {
    id: "9",
    title: "AI Counseling",
    description: "Counseling and mental health support platform",
    stack: ["Next.js", "TypeScript", "OpenAI API"],
    liveUrl: "https://aicounselng.com",
    thumbnail: "/project-screenshots/aicounseling.png",
  },
  {
    id: "10",
    title: "Snaxyzobolicious",
    description: "Unique brand website with engaging user experience",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    liveUrl: "https://snaxyzobolicious.com",
    thumbnail: "/project-screenshots/snaxyzobolicious.png",
  },
  {
    id: "11",
    title: "Liquid Canvas",
    description: "Autonomous art outreach platform for automated lead generation. Discovers websites (art galleries, interior decor, home tech, mom blogs, NFT platforms, editorial media), scrapes contact information, verifies emails, generates personalized emails with AI (Google Gemini). Includes pipeline workflow with dashboard for monitoring prospects, jobs, and email campaigns.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "TypeScript", "Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://agent.liquidcanvas.art",
    thumbnail: "/project-screenshots/liquidcanvas.png",
  },
  {
    id: "12",
    title: "Goodwill Staffing Compliance Tracker",
    description: "Full-stack web app for managing candidate credentials, certifications, and compliance documents. Tracks expiry dates, sends email reminders (30, 14, and 7 days before expiry), and provides a dashboard for credential management with analytics and charts. Features token-based authentication with role-based access (Super Admin, Admin, Recruiter) and automatic status tracking.",
    stack: ["PHP 8.2+", "Laravel 12", "JavaScript", "React 19", "Tailwind CSS 3.4", "SQLite", "MySQL", "Vite 7"],
    liveUrl: "http://cpdemo.blueinctech.com",
    thumbnail: "/project-screenshots/cpdemo.png",
  },
]

