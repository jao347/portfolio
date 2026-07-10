import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Material UI', level: 88 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'NestJS', level: 88 },
      { name: 'Laravel', level: 85 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 88 },
      { name: 'MySQL', level: 90 },
      { name: 'MSSQL', level: 80 },
    ],
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'Wagmi', level: 85 },
      { name: 'Ethers.js', level: 82 },
      { name: 'Solidity', level: 75 },
      { name: 'Wallet Connect', level: 88 },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'Make', level: 88 },
      { name: 'n8n', level: 85 },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'Claude', level: 95 },
      { name: 'ChatGPT', level: 92 },
      { name: 'Gemini', level: 88 },
      { name: 'Cursor', level: 90 },
      { name: 'Google Flow', level: 85 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: '⬡',
    gradient: 'from-[#00ADB5] to-[#00ADB5]',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'GitHub', level: 95 },
      { name: 'Vercel', level: 92 },
      { name: 'Figma', level: 80 },
    ],
  },
]