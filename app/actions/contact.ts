"use server"

import nodemailer from "nodemailer"

// Rate limiting - simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // Max 3 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true
  }

  record.count++
  return false
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export interface ContactFormState {
  success: boolean
  message: string
  errors?: {
    name?: string
    email?: string
    messageText?: string
  }
}

export async function sendContactMessage(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // Rate limiting (using a placeholder IP for server actions)
  const clientId = formData.get("_clientId") as string || "unknown"
  if (isRateLimited(clientId)) {
    return {
      success: false,
      message: "Too many requests. Please wait a moment before trying again.",
    }
  }

  // Extract and sanitize form data
  const name = sanitizeInput(formData.get("name") as string || "")
  const email = sanitizeInput(formData.get("email") as string || "")
  const messageText = sanitizeInput(formData.get("message") as string || "")

  // Validation
  const errors: ContactFormState["errors"] = {}

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  if (!email || !isValidEmail(email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!messageText || messageText.length < 10) {
    errors.messageText = "Message must be at least 10 characters"
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors,
    }
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Email content
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    })

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff; border-radius: 12px;">
        <h1 style="color: #10b981; margin-bottom: 24px; border-bottom: 1px solid #333; padding-bottom: 16px;">
          📬 New Portfolio Message
        </h1>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #9ca3af; margin-bottom: 8px; font-size: 14px;">FROM</h3>
          <p style="color: #ffffff; margin: 0; font-size: 16px;">${name}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #9ca3af; margin-bottom: 8px; font-size: 14px;">EMAIL</h3>
          <p style="color: #10b981; margin: 0; font-size: 16px;">
            <a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a>
          </p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #9ca3af; margin-bottom: 8px; font-size: 14px;">MESSAGE</h3>
          <div style="background-color: #262626; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="color: #e5e5e5; margin: 0; line-height: 1.6; white-space: pre-wrap;">${messageText}</p>
          </div>
        </div>
        
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #333;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            ⏰ Received: ${timestamp}
          </p>
        </div>
      </div>
    `

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: htmlContent,
      text: `New Portfolio Message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${messageText}\n\nReceived: ${timestamp}`,
    })

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Email send error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
