"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView, AnimatePresence } from "framer-motion"
import { Award, ExternalLink, Trophy, Brain, Sparkles, GraduationCap, Bot, FileText, X, Cpu, Zap } from "lucide-react"
import type { MouseEvent } from "react"
import { useRef, useState } from "react"
import Image from "next/image"

const certifications = [
  {
    title: "Generative AI & Artificial Intelligence for Leaders",
    organization: "Udemy — MTF Institute of Management, Technology & Finance",
    description: "Gained strategic and practical insights into Generative AI and modern AI systems, with a strong focus on business applications and leadership-driven AI adoption.",
    keyLearnings: [
      "Fundamentals of Generative AI",
      "Real-world AI applications for business and leadership",
      "Strategic decision-making using AI technologies",
    ],
    icon: Brain,
    iconColor: "text-purple-400",
    bgColor: "from-purple-500/10",
    certificate: "/certificates/udemy-genai-leaders.jpg",
  },
  {
    title: "Prompt Engineering Basics",
    organization: "Coursera",
    description: "Learned how to design effective, structured prompts to guide AI models for more accurate and reliable outputs—a core skill in modern AI-driven development.",
    keyLearnings: [
      "Prompt design principles",
      "Optimizing AI responses",
      "Practical prompt strategies for real projects",
    ],
    icon: Bot,
    iconColor: "text-blue-400",
    bgColor: "from-blue-500/10",
    certificate: "/certificates/coursera-prompt-engineering.jpg",
  },
  {
    title: "Introduction to Machine Learning",
    organization: "NPTEL (Offered by IITs)",
    description: "Completed a rigorous 12-week Machine Learning program covering foundational theory and practical concepts, demonstrating strong academic consistency.",
    keyLearnings: [
      "Supervised & unsupervised learning",
      "Model evaluation & performance metrics",
      "Core ML algorithms (regression, decision trees, clustering)",
    ],
    performance: {
      assignments: "23.13 / 25",
      finalExam: "51.62 / 75",
    },
    icon: GraduationCap,
    iconColor: "text-emerald-400",
    bgColor: "from-emerald-500/10",
    certificate: "/certificates/nptel-ml.jpg",
  },
  {
    title: "Generative AI Intensive Program (5-Day)",
    organization: "Google",
    description: "Successfully completed a hands-on Generative AI Intensive Program focused on both theoretical understanding and real-world application.",
    keyLearnings: [
      "Expert-led AI seminars",
      "White paper studies",
      "Practical assignments",
      "Capstone project on Generative AI",
    ],
    icon: Cpu,
    iconColor: "text-cyan-400",
    bgColor: "from-cyan-500/10",
    certificate: "/certificates/google-genai-intensive.jpg",
  },
]

const achievements = [
  {
    title: "Winner — Naan Mudhalvan Hackathon (State Level)",
    organization: "State Level Competition",
    description: "Recognized as a Hackathon Winner for developing a production-grade Event Management & Ticketing System using a microservices architecture.",
    highlights: [
      "Designed and implemented a scalable full stack system",
      "Built with Spring Boot microservices and Next.js frontend",
      "Integrated authentication, payments, QR-based ticketing, and Dockerized deployment",
      "Delivered a solution aligned with real-world industry standards",
    ],
    icon: Trophy,
    iconColor: "text-yellow-400",
    bgColor: "from-yellow-500/10",
    featured: true,
  },
]

// Certificate Modal Component
function CertificateModal({ 
  isOpen, 
  onClose, 
  certificate, 
  title, 
  organization 
}: { 
  isOpen: boolean
  onClose: () => void
  certificate: string
  title: string
  organization: string
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-4xl w-full bg-neutral-900 rounded-2xl border border-neutral-700 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
                <p className="text-sm text-neutral-400">{organization}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Certificate Image */}
            <div className="relative aspect-[4/3] w-full bg-neutral-950">
              <Image
                src={certificate}
                alt={`${title} Certificate`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-neutral-800 flex justify-end">
              <motion.a
                href={certificate}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-neutral-950 text-sm font-medium hover:bg-emerald-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open Full Size
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CertCard({ 
  cert, 
  index,
  onViewCertificate
}: { 
  cert: typeof certifications[0]
  index: number
  onViewCertificate: (cert: typeof certifications[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

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
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  const IconComponent = cert.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 rounded-2xl backdrop-blur-md border cursor-pointer overflow-hidden transition-all duration-300 bg-white/5 border-white/10 hover:border-emerald-500/30"
    >
      {/* Glassmorphic glow on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${cert.bgColor} via-transparent to-transparent`} />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-2xl blur-sm" />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className={`p-3 rounded-xl bg-neutral-800/50 ${cert.iconColor}`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
        </div>

        <motion.h3 
          className="text-lg font-semibold text-neutral-100 mb-2 group-hover:text-white transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          {cert.title}
        </motion.h3>
        <motion.p 
          className="text-sm text-emerald-400 mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          {cert.organization}
        </motion.p>
        <motion.p 
          className="text-sm text-neutral-400 mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          {cert.description}
        </motion.p>

        {/* Key Learnings */}
        <div className="mb-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Key Learnings</p>
          <div className="space-y-1">
            {cert.keyLearnings.map((learning, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-2 text-xs text-neutral-400"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.5 + i * 0.05 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {learning}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance (for NPTEL) */}
        {cert.performance && (
          <div className="mb-4 p-3 rounded-xl bg-neutral-800/30 border border-neutral-700/50">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Performance</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-neutral-400">Assignments:</span>
                <span className="text-emerald-400 ml-1 font-mono">{cert.performance.assignments}</span>
              </div>
              <div>
                <span className="text-neutral-400">Final Exam:</span>
                <span className="text-emerald-400 ml-1 font-mono">{cert.performance.finalExam}</span>
              </div>
            </div>
          </div>
        )}

        <motion.button
          onClick={() => onViewCertificate(cert)}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-emerald-400 transition-colors group/link"
          whileHover={{ x: 5 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.6 }}
        >
          <FileText className="w-3.5 h-3.5" />
          View Certificate
          <motion.span
            animate={{ x: isHovered ? [0, 3, 0] : 0 }}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.span>
        </motion.button>
      </div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  )
}

function AchievementCard({ 
  achievement, 
  index,
  onViewCertificate
}: { 
  achievement: typeof achievements[0]
  index: number
  onViewCertificate: (achievement: typeof achievements[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = achievement.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-8 rounded-2xl backdrop-blur-md border cursor-pointer overflow-hidden transition-all duration-300 bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40"
    >
      {/* Animated glow */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-sm" />
      </motion.div>
      
      {/* Floating particles */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              initial={{ 
                x: Math.random() * 200, 
                y: 150,
                opacity: 0 
              }}
              animate={{ 
                y: -30,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <motion.div 
            className="p-4 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="w-8 h-8" />
          </motion.div>
          <div className="flex-1">
            <motion.span 
              className="px-3 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 inline-flex items-center gap-1 mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <Trophy className="w-3 h-3" />
              State-Level Recognition
            </motion.span>
            <motion.h3 
              className="text-xl font-bold text-neutral-100 group-hover:text-white transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {achievement.title}
            </motion.h3>
          </div>
        </div>
        
        <motion.p 
          className="text-neutral-400 mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          {achievement.description}
        </motion.p>

        {/* Achievement Highlights */}
        <div className="mb-6">
          <p className="text-sm text-yellow-400 font-medium mb-3">Achievement Highlights</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {achievement.highlights.map((highlight, i) => (
              <motion.div 
                key={i}
                className="flex items-start gap-2 text-sm text-neutral-400"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                {highlight}
              </motion.div>
            ))}
          </div>
        </div>

        {achievement.certificate && (
          <motion.button
            onClick={() => onViewCertificate(achievement)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            <FileText className="w-4 h-4" />
            View Certificate
          </motion.button>
        )}
      </div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<(typeof certifications[0] | typeof achievements[0]) | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleViewCertificate = (item: typeof certifications[0] | typeof achievements[0]) => {
    if (item.certificate) {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section id="certifications" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Certifications Section */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4" />
            📜 Certifications
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
            <motion.span 
              className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Professional Certifications
            </motion.span>
          </h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Continuous learning in AI, Machine Learning, and modern development practices.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {certifications.map((cert, index) => (
            <CertCard 
              key={cert.title} 
              cert={cert} 
              index={index} 
              onViewCertificate={handleViewCertificate}
            />
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6"
          >
            <Trophy className="w-4 h-4" />
            🏆 Achievements
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            <span className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Recognition & Awards
            </span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.title} 
              achievement={achievement} 
              index={index}
              onViewCertificate={handleViewCertificate}
            />
          ))}
        </div>
      </div>
      
      {/* Certificate Modal */}
      {selectedItem && selectedItem.certificate && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          certificate={selectedItem.certificate}
          title={selectedItem.title}
          organization={selectedItem.organization}
        />
      )}
    </section>
  )
}
