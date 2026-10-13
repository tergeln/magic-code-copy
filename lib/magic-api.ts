import { fallbackContent } from "./content-fallback"

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(/\/$/, "")

const REVALIDATE = 60

export type Course = {
  id: string
  title: string
  slug: string
  tagline: string
  shortDescription: string
  fullDescription: string
  coverImage: string | null
  price: number | null
  currency: "MNT" | "USD"
  duration: string
  level: "beginner" | "intermediate" | "advanced" | "all-levels"
  featured: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export type SiteContent = typeof fallbackContent

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: REVALIDATE } })
    if (!res.ok) return null
    const body = await res.json()
    return body.success ? (body.data as T) : null
  } catch {
    return null
  }
}

export async function getCourses() {
  return (await get<Course[]>("/api/public/courses")) ?? []
}

export async function getSiteContent(): Promise<SiteContent> {
  return (await get<SiteContent>("/api/public/content")) ?? fallbackContent
}

const LEVELS: Record<Course["level"], string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  "all-levels": "All levels"
}

export const levelLabel = (level: Course["level"]) => LEVELS[level] ?? level

export function formatPrice(price: number | null, currency: Course["currency"]) {
  if (price == null) return null
  if (price === 0) return "Free"
  const amount = price.toLocaleString("en-US", { maximumFractionDigits: 2 })
  return currency === "USD" ? `$${amount}` : `${amount}₮`
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}

export async function submitLead(input: {
  email: string
  source: "syllabus" | "get-started"
  name?: string
  phone?: string
  course?: string
  message?: string
  website?: string
}) {
  const res = await fetch(`${API_URL}/api/public/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  })
  const body = await res.json().catch(() => null)
  if (!res.ok || !body?.success) {
    const fieldError = body?.errors ? Object.values(body.errors)[0] : null
    throw new Error((fieldError as string) ?? body?.message ?? "Something went wrong. Please try again.")
  }
}
