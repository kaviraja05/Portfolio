"use client"

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion"
import { Briefcase, Trophy, Brain, Code, FileText, X, ExternalLink, Leaf } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"

const experiences = [
  {
    title: "Java SpringBoot Intern",
    company: "Digisailor",
    period: "Nov 2025",
    description: "Worked on Java SpringBoot projects under the guidance of experienced professionals, building enterprise-grade backend applications.",
    icon: Leaf,
    iconColor: "bg-green-500/20 text-green-400 border-green-500/30",
    glowColor: "green",
    certificate: "/certificates/digisailor-springboot-certificate.jpg",
  },
  {
    title: "Frontend Web Development Intern",
    company: "IBM SkillsBuild & Edunet Foundation",
    period: "Aug 2025 - Sep 2025",
    description: "Built responsive web applications using React.js and modern CSS frameworks. Developed UI components and implemented best practices for web development.",
    icon: Code,
    iconColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    glowColor: "blue",
    certificate: "/certificates/ibm-frontend-certificate.jpg",
  },
  {
    title: "Full Stack Development Intern",
    company: "CodeAlpha",
    period: "Jul 2025 - Aug 2025",
    description: "Full-stack development with MERN stack, focusing on scalable solutions. Built complete web applications from frontend to backend.",
    icon: Code,
    iconColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    glowColor: "emerald",
    certificate: "/certificates/codealpha-fullstack-certificate.jpg",
  },
  {
    title: "Artificial Intelligence Intern",
    company: "DLK Technologies",
    period: "Jun 2025 - Jul 2025",
    description: "Worked on AI and machine learning projects, gaining hands-on experience with Python, TensorFlow, and NLP technologies.",
    icon: Brain,
    iconColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    glowColor: "purple",
    certificate: "/certificates/dlk-ai-certificate.jpg",
  },
]

// Certificate Modal Component
function CertificateModal({ 
  isOpen, 
  onClose, 
  certificate, 
  title, 
  company 
}: { 
  isOpen: boolean
  onClose: () => void
  certificate: string
  title: string
  company: string
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
                <p className="text-sm text-neutral-400">{company}</p>
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

function ExperienceCard({ 
  exp, 
  index, 
  onViewCertificate 
}: { 
  exp: typeof experiences[0]
  index: number
  onViewCertificate: (exp: typeof experiences[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const IconComponent = exp.icon
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50, rotateY: -10 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="relative pl-20"
    >
      {/* Timeline node */}
      <motion.div
        className={`absolute left-4 w-8 h-8 rounded-full border flex items-center justify-center ${exp.iconColor}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ 
          delay: index * 0.2 + 0.3, 
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ scale: 1.2, rotate: 360 }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(163, 163, 163, 0)",
              "0 0 0 12px rgba(163, 163, 163, 0.1)",
              "0 0 0 0 rgba(163, 163, 163, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
          className="absolute inset-0 rounded-full"
        />
        <IconComponent className="w-4 h-4" />
      </motion.div>
      
      {/* Connector line animation */}
      <motion.div
        className="absolute left-[31px] -top-12 w-0.5 h-12 origin-top"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${
            exp.glowColor === 'purple' ? 'rgb(168, 85, 247)' :
            exp.glowColor === 'blue' ? 'rgb(59, 130, 246)' :
            exp.glowColor === 'emerald' ? 'rgb(16, 185, 129)' :
            exp.glowColor === 'green' ? 'rgb(34, 197, 94)' :
            'rgb(234, 179, 8)'
          })`
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ delay: index * 0.2, duration: 0.5 }}
      />

      <motion.div
        whileHover={{ scale: 1.02, x: 8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`group relative rounded-2xl p-6 border transition-all duration-300 overflow-hidden ${
          exp.featured
            ? "bg-yellow-500/5 border-yellow-500/20 hover:border-yellow-500/40"
            : "bg-neutral-900/50 border-neutral-800 hover:border-emerald-500/30"
        }`}
      >
        {/* Hover glow */}
        <motion.div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            exp.featured ? "bg-gradient-to-r from-yellow-500/5 to-transparent" : "bg-gradient-to-r from-emerald-500/5 to-transparent"
          }`}
        />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <motion.h3 
              className="text-lg font-semibold text-neutral-100 group-hover:text-white transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.2 }}
            >
              {exp.title}
            </motion.h3>
            <motion.span 
              className="text-sm text-neutral-500 font-mono"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {exp.period}
            </motion.span>
          </div>
          <motion.p 
            className={`font-medium mb-2 ${exp.featured ? "text-yellow-400" : "text-neutral-400"}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            {exp.company}
          </motion.p>
          <motion.p 
            className="text-neutral-500 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {exp.description}
          </motion.p>

          {/* Certificate Button */}
          {exp.certificate && (
            <motion.button
              onClick={() => onViewCertificate(exp)}
              className="mt-4 mr-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-3 h-3" />
              View Certificate
            </motion.button>
          )}

          {exp.featured && (
            <motion.div 
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Trophy className="w-3 h-3" />
              </motion.span>
              State Level Winner
            </motion.div>
          )}
        </div>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: "-100px" })
  
  // Modal state
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleViewCertificate = (exp: typeof experiences[0]) => {
    if (exp.certificate) {
      setSelectedExp(exp)
      setIsModalOpen(true)
    }
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedExp(null), 300)
  }
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const timelineHeight = useSpring(
    useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
    { stiffness: 100, damping: 30 }
  )

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
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
            <Briefcase className="w-4 h-4" />
            Career Journey
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
            <motion.span 
              className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Experience & Journey
            </motion.span>
          </h2>
          <motion.p 
            className="text-neutral-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            My professional journey in software development and achievements.
          </motion.p>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Animated timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px overflow-hidden">
            <div className="h-full bg-neutral-800" />
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-emerald-500 via-purple-500 to-yellow-500"
              style={{ height: timelineHeight }}
            />
          </div>
          
          {/* Glowing dot at current position */}
          <motion.div 
            className="absolute left-[29px] w-3 h-3 rounded-full bg-emerald-500"
            style={{ 
              top: timelineHeight,
              boxShadow: "0 0 20px 5px rgba(16, 185, 129, 0.5)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={exp.title} 
                exp={exp} 
                index={index} 
                onViewCertificate={handleViewCertificate}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Certificate Modal */}
      {selectedExp && selectedExp.certificate && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          certificate={selectedExp.certificate}
          title={selectedExp.title}
          company={selectedExp.company}
        />
      )}
    </section>
  )
}
