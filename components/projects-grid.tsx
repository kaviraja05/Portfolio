"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion"
import { ArrowUpRight, Trophy, Sparkles, Blocks, Users, Github, ExternalLink } from "lucide-react"
import type { MouseEvent } from "react"
import { useRef } from "react"

const projects = [
  {
    title: "Event Management & Ticketing System",
    description: "A scalable, production-grade event management system built using a microservices architecture. Enables organizations to manage events, users to register, process payments, and generate secure QR-based tickets.",
    badges: ["Microservices", "Full Stack", "Spring Boot"],
    featured: true,
    highlights: [
      "Microservices with Spring Cloud & Eureka",
      "JWT auth with role-based access",
      "PostgreSQL with 6 independent databases",
      "QR-based ticket generation",
      "Dockerized services",
      "Next.js 16 + TypeScript frontend",
    ],
    icon: Sparkles,
    iconColor: "text-emerald-500",
    github: "https://github.com/Sharikarajan07/NM_Hackathon_Level2",
    live: null,
    award: null,
  },
  {
    title: "ProjectFlow – Project Management Platform",
    description: "A modern project management platform enabling teams to track tasks, manage workflows, and collaborate efficiently with a clean, intuitive interface.",
    badges: ["Full Stack", "SaaS-style App"],
    featured: false,
    highlights: ["Next.js & TypeScript", "Supabase backend", "Real-time updates", "Team collaboration"],
    icon: Users,
    iconColor: "text-blue-500",
    github: "https://github.com/kaviraja05/CodeAlpha_Project_Management_Tool",
    live: null,
    award: null,
  },
  {
    title: "AI Resume Analyzer",
    description: "An AI-powered web tool that analyzes resumes and provides actionable feedback to improve job readiness. Includes analytics, scoring, and admin features.",
    badges: ["AI", "Python", "NLP"],
    featured: false,
    highlights: ["spaCy NLP engine", "Resume scoring", "Admin dashboard", "SQLite database"],
    icon: Sparkles,
    iconColor: "text-purple-500",
    github: "https://github.com/kaviraja05/AI-Resume-Analyzer",
    live: null,
    award: null,
  },
  {
    title: "Decentralized Event Ticketing DApp",
    description: "NFT-based event ticketing platform built on Ethereum with wallet integration and QR-based verification for secure ticket ownership.",
    badges: ["Blockchain", "NFT", "Web3"],
    featured: false,
    highlights: ["Ethereum smart contracts", "MetaMask integration", "NFT tickets", "QR verification"],
    icon: Blocks,
    iconColor: "text-emerald-500",
    github: "https://github.com/kaviraja05/Event-ticketing-dapp",
    live: "https://kaviraja05.github.io/Event-ticketing-dapp/",
    award: null,
  },
  {
    title: "Chennai Community Funding DApp",
    description: "A transparent blockchain-based crowdfunding platform for local community initiatives with public fund traceability and decentralized governance.",
    badges: ["Blockchain", "Crowdfunding"],
    featured: false,
    highlights: ["Smart contract treasury", "Transparent funding", "Community voting", "Fund tracking"],
    icon: Blocks,
    iconColor: "text-orange-500",
    github: "https://github.com/kaviraja05/Chennai-Funding-Dapp",
    live: null,
    award: null,
  },
]

function ProjectCard({
  project,
  className = "",
  index,
}: {
  project: (typeof projects)[0]
  className?: string
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])
  const scale = useTransform(mouseXSpring, [-0.5, 0, 0.5], [1.02, 1, 1.02])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
    glowX.set(mouseX)
    glowY.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const IconComponent = project.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      style={{ 
        rotateX, 
        rotateY, 
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm ${className}`}
    >
      {/* Animated border gradient */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${glowX.get()}px ${glowY.get()}px, rgba(16, 185, 129, 0.15), transparent 40%)`
        }}
      />
      
      {/* Hover gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
      />

      <div className="relative p-6 md:p-8 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge, badgeIdx) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 + badgeIdx * 0.05 + 0.3 }}
                className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                  badge === "Hackathon Winner"
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-neutral-800 text-neutral-300"
                }`}
              >
                {badge}
              </motion.span>
            ))}
          </div>
          <motion.div 
            className={`p-2 rounded-xl bg-neutral-800/50 ${project.iconColor}`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3 
            className="text-xl md:text-2xl font-semibold text-neutral-100 mb-3 group-hover:text-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="text-neutral-400 text-sm md:text-base leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Highlights for featured project */}
          {project.featured && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.highlights.map((highlight, hIdx) => (
                <motion.div 
                  key={highlight} 
                  className="flex items-center gap-2 text-xs text-neutral-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.4 + hIdx * 0.05 }}
                >
                  <motion.span 
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.5 + hIdx * 0.05, type: "spring" }}
                  />
                  {highlight}
                </motion.div>
              ))}
            </div>
          )}

          {/* Award badge */}
          {project.award && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-4"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🏆
              </motion.span>
              {project.award.replace("🏆 ", "")}
            </motion.div>
          )}
        </div>

        {/* Actions */}
        <motion.div 
          className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5 }}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 hover:text-white transition-colors group/btn"
          >
            <motion.span
              className="inline-block"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="w-4 h-4" />
            </motion.span>
            View Code
            <motion.span
              className="inline-block opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all"
            >
              <ArrowUpRight className="w-3 h-3" />
            </motion.span>
          </motion.a>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-neutral-950 text-sm font-medium hover:bg-emerald-400 transition-colors group/btn"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="w-3 h-3" />
              </motion.span>
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={false}
      >
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-emerald-500/20 blur-sm" />
      </motion.div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-12" />
      </motion.div>
    </motion.div>
  )
}

export function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            My Work
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
            <motion.span 
              className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Featured Projects
            </motion.span>
          </h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            A collection of projects showcasing my expertise in full-stack development, AI, and blockchain technologies.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured project - spans 2 columns */}
          <ProjectCard project={projects[0]} className="md:col-span-2" index={0} />

          {/* Other projects */}
          {projects.slice(1).map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
