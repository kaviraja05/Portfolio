"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle, Loader2, Sparkles, Github, Linkedin } from "lucide-react"
import { useActionState } from "react"
import { sendContactMessage, type ContactFormState } from "@/app/actions/contact"

// Generate a unique client ID for rate limiting
function getClientId(): string {
  if (typeof window === "undefined") return "server"
  let clientId = localStorage.getItem("portfolio_client_id")
  if (!clientId) {
    clientId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    localStorage.setItem("portfolio_client_id", clientId)
  }
  return clientId
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [clientId, setClientId] = useState("")
  const [formState, formAction, isPending] = useActionState<ContactFormState | null, FormData>(
    sendContactMessage,
    null
  )

  useEffect(() => {
    setClientId(getClientId())
  }, [])

  // Reset form on success
  useEffect(() => {
    if (formState?.success && formRef.current) {
      formRef.current.reset()
    }
  }, [formState?.success])

  const inputVariants = {
    focus: {
      boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.1)",
      borderColor: "rgba(16, 185, 129, 0.5)",
    },
  }

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-24 bg-neutral-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Let's Connect Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Let's Connect</span>
          </div>
        </motion.div>

        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-8"
        >
          <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.
          </p>
        </motion.div>

        {/* Get In Touch Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <motion.a
            href="mailto:kavitharraja.84@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
          >
            Get In Touch
            <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-16"
        >
          <motion.a
            href="https://github.com/kaviraja05"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-neutral-100 text-neutral-900 hover:bg-white transition-all duration-300 shadow-lg"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/kavithar84"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="mailto:kavitharraja.84@gmail.com"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all duration-300"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-16"
        />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Or Send a Message
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-neutral-400"
          >
            Fill out the form below and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative"
        >
          {/* Glassmorphic Card */}
          <div className="relative p-8 md:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-xl overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            {/* Success/Error Messages */}
            <AnimatePresence mode="wait">
              {formState && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    formState.success
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border border-red-500/30 text-red-300"
                  }`}
                >
                  {formState.success ? (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <span className="text-sm">{formState.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} action={formAction} className="relative space-y-6">
              {/* Hidden client ID for rate limiting */}
              <input type="hidden" name="_clientId" value={clientId} />

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <User className="w-4 h-4 text-emerald-400" />
                  Your Name
                </label>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  minLength={2}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:outline-none transition-all duration-300"
                />
                {formState?.errors?.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {formState.errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  Your Email
                </label>
                <motion.input
                  whileFocus="focus"
                  variants={inputVariants}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:outline-none transition-all duration-300"
                />
                {formState?.errors?.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {formState.errors.email}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Message
                </label>
                <motion.textarea
                  whileFocus="focus"
                  variants={inputVariants}
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  minLength={10}
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-neutral-100 placeholder:text-neutral-500 focus:outline-none transition-all duration-300 resize-none"
                />
                {formState?.errors?.messageText && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm"
                  >
                    {formState.errors.messageText}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: isPending ? 1 : 1.02 }}
                whileTap={{ scale: isPending ? 1 : 0.98 }}
                className="group relative w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <span className="relative flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
