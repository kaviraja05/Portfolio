"use client"

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState } from "react"

const technologies = [
  { name: "Java", icon: "☕", color: "from-orange-500/20 to-red-500/20" },
  { name: "Python", icon: "🐍", color: "from-blue-500/20 to-yellow-500/20" },
  { name: "JavaScript", icon: "💛", color: "from-yellow-500/20 to-yellow-600/20" },
  { name: "React", icon: "⚛️", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Next.js", icon: "▲", color: "from-neutral-500/20 to-neutral-600/20" },
  { name: "Node.js", icon: "💚", color: "from-green-500/20 to-green-600/20" },
  { name: "Spring Boot", icon: "🍃", color: "from-green-500/20 to-emerald-500/20" },
  { name: "MongoDB", icon: "🍃", color: "from-green-600/20 to-green-700/20" },
  { name: "MySQL", icon: "🐬", color: "from-blue-500/20 to-blue-600/20" },
  { name: "Docker", icon: "🐳", color: "from-blue-400/20 to-cyan-500/20" },
  { name: "TensorFlow", icon: "🧠", color: "from-orange-500/20 to-yellow-500/20" },
  { name: "Git", icon: "📦", color: "from-orange-600/20 to-red-600/20" },
  { name: "GitHub", icon: "🐙", color: "from-purple-500/20 to-purple-600/20" },
]

function TechCard({ tech, index }: { tech: typeof technologies[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 300, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1, y: -8 }}
      className={`group relative flex items-center gap-3 px-6 py-4 bg-neutral-900/50 rounded-xl border border-neutral-800 whitespace-nowrap cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:bg-neutral-800/50`}
    >
      {/* Glow background */}
      <motion.div 
        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
        initial={false}
        animate={{ scale: isHovered ? 1.2 : 1 }}
      />
      
      {/* Content */}
      <motion.span 
        className="text-2xl relative z-10"
        animate={{ 
          rotate: isHovered ? [0, -10, 10, 0] : 0,
          scale: isHovered ? 1.2 : 1 
        }}
        transition={{ duration: 0.4 }}
      >
        {tech.icon}
      </motion.span>
      <span className="text-neutral-300 font-medium group-hover:text-white transition-colors relative z-10">
        {tech.name}
      </span>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        initial={false}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(titleRef, { once: true })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const marqueeX = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-neutral-950 border-y border-neutral-900 relative overflow-hidden">
      {/* Background glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]) }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center text-neutral-500 uppercase tracking-widest text-sm"
        >
          {"Technologies I Work With".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 40,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          style={{ x: marqueeX }}
          className="flex gap-8"
        >
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
            <TechCard key={`${tech.name}-${index}`} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
