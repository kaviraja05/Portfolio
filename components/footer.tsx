"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles } from "lucide-react"
import type { MouseEvent } from "react"
import { useRef, useState } from "react"

function MagneticButton({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <span ref={ref} className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ 
            delay: i * 0.03,
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })
  
  const glowOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.3])
  const glowScale = useTransform(scrollYProgress, [0.5, 1], [0.5, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={sectionRef} className="relative bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6" ref={contentRef}>
        {/* Bottom section */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-neutral-500 flex items-center gap-1.5">
            Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </motion.span>
            by Kavi
          </p>

          <p className="text-sm text-neutral-500">
            © 2025. All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
