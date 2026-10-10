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
    title: "MyJobTests",
    description: "Career success platform for practising real exam-style aptitude tests, past questions and exam simulations for Nigeria's top employers and exams, with instant scoring, AI tutoring and personalised feedback.",
    stack: ["Next.js"],
    liveUrl: "https://myjobtests.com",
    thumbnail: "/project-screenshots/myjobtests.png",
  },
  {
    id: "2",
    title: "Travel Nurse Houses",
    description: "Furnished housing marketplace for travel nurses and professionals across Canada. Search by destination, dates and guests, with calendar sync for Airbnb, Vrbo, Booking.com and Google.",
    stack: ["Next.js"],
    liveUrl: "https://travelnursehouses.ca",
    thumbnail: "/project-screenshots/travelnursehouses.png",
  },
  {
    id: "3",
    title: "Teqxure",
    description: "Africa's product engineering company, preparing engineers, designers, founders and teams to build real products with AI through its studio, academy, community and research programmes.",
    stack: ["Next.js"],
    liveUrl: "https://teqxure.xyz",
    thumbnail: "/project-screenshots/teqxure.png",
  },
  {
    id: "4",
    title: "VisionSmith",
    description: "Thinking and strategic architecture practice for people building businesses, products, organisations and movements, examining the assumptions, incentives and constraints underneath a build before they get expensive to change.",
    stack: ["Next.js"],
    liveUrl: "https://visionsmith.world",
    thumbnail: "/project-screenshots/visionsmith.png",
  },
  {
    id: "5",
    title: "Kotka Finance",
    description: "Professional routine for traders: pre-trade checklist, daily risk limit, journal, market research, a community and a practice arena, with an AI mentor that never gives signals.",
    stack: ["React.js", "Vite"],
    liveUrl: "https://kotkafinance.online",
    thumbnail: "/project-screenshots/kotka.png",
  },
  {
    id: "6",
    title: "Selecta",
    description: "Nigeria's marketplace for pre-loved fashion. Buy and sell quality fashion finds from trusted sellers nearby, with an AI shopping assistant.",
    stack: ["Next.js"],
    liveUrl: "https://selectapick.store",
    thumbnail: "/project-screenshots/selecta.png",
  },
  {
    id: "7",
    title: "Staffintra",
    description: "Workforce management SaaS to manage people, work, time, productivity and performance from one connected workspace, with custom organisation branding.",
    stack: ["Next.js"],
    liveUrl: "https://staffintra.com",
    thumbnail: "/project-screenshots/staffintra.png",
  },
  {
    id: "8",
    title: "Just Believe International Missions",
    description: "Ministry website for JBIM, a hub of transformation proclaiming the Gospel and equipping believers worldwide, with ministries, prayer, resources and online giving.",
    stack: ["Next.js", "Payload CMS"],
    liveUrl: "https://justbelieveintmissions.org",
    thumbnail: "/project-screenshots/justbelieve.png",
  },
  {
    id: "9",
    title: "Webifant - Cyber Security Service",
    description: "Responsive Cybersecurity service application",
    stack: ["React.js", "Node.js", "Firebase"],
    liveUrl: "https://webifant.com",
    githubUrl: "https://github.com/Jim-devENG/webifant-security",
    thumbnail: "/project-screenshots/webifant.png",
  },
  {
    id: "10",
    title: "Trumpet Ink",
    description: "Creative writing and content platform with elegant design",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    liveUrl: "https://trumpet.ink",
    thumbnail: "/project-screenshots/trumpet.png",
  },
  {
    id: "11",
    title: "Ispora",
    description: "Social collaboration platform with modern user experience",
    stack: ["React.js", "Next.js", "Node.js", "Laravel"],
    liveUrl: "https://ispora.com",
    thumbnail: "/project-screenshots/ispora.png",
  },
  {
    id: "12",
    title: "AI Counseling",
    description: "Counseling and mental health support platform",
    stack: ["Next.js", "TypeScript", "OpenAI API"],
    liveUrl: "https://aicounselng.com",
    thumbnail: "/project-screenshots/aicounseling.png",
  },
  {
    id: "13",
    title: "Snaxyzobolicious",
    description: "Unique brand website with engaging user experience",
    stack: ["Next.js", "TypeScript", "Framer Motion"],
    liveUrl: "https://snaxyzobolicious.com",
    thumbnail: "/project-screenshots/snaxyzobolicious.png",
  },
  {
    id: "14",
    title: "Liquid Canvas",
    description: "Autonomous art outreach platform for automated lead generation. Discovers websites (art galleries, interior decor, home tech, mom blogs, NFT platforms, editorial media), scrapes contact information, verifies emails, generates personalized emails with AI (Google Gemini). Includes pipeline workflow with dashboard for monitoring prospects, jobs, and email campaigns.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Supabase", "TypeScript", "Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://agent.liquidcanvas.art",
    thumbnail: "/project-screenshots/liquidcanvas.png",
  },
]
