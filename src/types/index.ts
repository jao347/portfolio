export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  stack: string[]
  metrics: { label: string; value: string }[]
  features: string[]
  github?: string
  live?: string
  gradient: string
  category: string
  featured?: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  duration: string
  location: string
  description: string
  achievements: string[]
  tech: string[]
  type: 'full-time' | 'contract' | 'freelance' | 'part-time'
  logo?: string
}

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  gradient: string
  skills: Skill[]
}

export interface NavLink {
  label: string
  href: string
}
