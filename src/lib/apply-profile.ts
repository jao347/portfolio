import { experiences } from '@/data/experience'
import { skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/lib/constants'

/**
 * Plain-text candidate profile fed to the model as grounding context for the
 * /apply assistant. Built from the same data the public site renders, so it
 * never drifts. Contains no secrets.
 */
export function buildCandidateProfile(): string {
  const skills = skillCategories
    .map(c => `- ${c.title}: ${c.skills.map(s => s.name).join(', ')}`)
    .join('\n')

  const experience = experiences
    .map(e =>
      [
        `- ${e.role} @ ${e.company} (${e.period}, ${e.location}, ${e.type})`,
        `  ${e.description}`,
        ...e.achievements.map(a => `  • ${a}`),
        `  Tech: ${e.tech.join(', ')}`,
      ].join('\n')
    )
    .join('\n')

  const projs = projects
    .map(p => `- ${p.title} [${p.category}]: ${p.description} (Stack: ${p.stack.join(', ')})`)
    .join('\n')

  return `Name: Jay Cris Bahandi
Title: Senior Full-Stack Developer
Location: Cebu, Philippines (GMT+8, open to remote work worldwide)
Email: ${EMAIL}
GitHub: ${GITHUB_URL}
LinkedIn: ${LINKEDIN_URL}

SKILLS
${skills}

EXPERIENCE
${experience}

SELECTED PROJECTS
${projs}`
}
