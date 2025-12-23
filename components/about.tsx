"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code2, Database, Brain, Server, Container, Blocks, MapPin, Sparkles } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Spring Boot, Node.js, REST APIs",
  },
  {
    icon: Database,
    title: "Databases",
    description: "PostgreSQL, MySQL, MongoDB",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Python, TensorFlow, spaCy, NLP",
  },
  {
    icon: Container,
    title: "DevOps & Tools",
    description: "Docker, Git, GitHub, CI/CD",
  },
  {
    icon: Blocks,
    title: "Blockchain",
    description: "Ethereum, Smart Contracts, Web3",
  },
]

// Animated text that reveals word by word
function AnimatedParagraph({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const words = children.split(" ")

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} id="about" className="relative py-24 bg-neutral-950 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent"
            >
              Passionate Developer
            </motion.span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text with word-by-word animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="space-y-6"
          >
            {/* Fresher Badge and Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(16, 185, 129, 0.3)",
                    "0 0 40px rgba(16, 185, 129, 0.5)",
                    "0 0 20px rgba(16, 185, 129, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full border border-emerald-500/50"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">Fresher - Open to Work</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </motion.div>
              
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-sm">Kanchipuram, Tamil Nadu, India</span>
              </div>
            </motion.div>

            {/* Content Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />
              
              <div className="relative space-y-4">
                <AnimatedParagraph className="text-lg text-neutral-300 leading-relaxed">
                  {"I'm a Software Developer with a strong passion for Full Stack Development and Artificial Intelligence."}
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.3} className="text-neutral-400 leading-relaxed">
                  With hands-on experience in Java, Python, and JavaScript, I specialize in building scalable web applications using modern frameworks like React, Next.js, and Spring Boot. My expertise spans across frontend and backend development, with additional exposure to AI technologies including TensorFlow and spaCy.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.6} className="text-neutral-400 leading-relaxed">
                  I have successfully built real-world projects, won state-level hackathons, and developed blockchain DApps. My experience includes working with Docker for containerization and managing databases like PostgreSQL, MySQL, and MongoDB.
                </AnimatedParagraph>
                <AnimatedParagraph delay={0.9} className="text-neutral-400 leading-relaxed">
                  Passionate about building clean, scalable, and production-ready applications that solve real problems and deliver exceptional user experiences.
                </AnimatedParagraph>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Grid with staggered reveal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.5,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="p-2 w-fit rounded-lg bg-neutral-800/50 mb-3 group-hover:bg-emerald-500/10 transition-colors"
                >
                  <skill.icon className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                </motion.div>
                <h3 className="text-sm font-medium text-neutral-200 mb-1 group-hover:text-white transition-colors">{skill.title}</h3>
                <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
