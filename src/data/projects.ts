import type { Project } from "@/types";
import { GITHUB_URL } from "@/lib/constants";

export const projects: Project[] = [
  {
    id: "ai-workflow-platform",
    title: "Automation & Workflow System",
    description: "Internal automation and workflow management system.",
    longDescription:
      "A workflow automation system for managing business processes. Built with Next.js and Node.js, featuring workflow configuration and integration with Make.com and n8n for process automation.",
    tags: ["Automation", "Workflow"],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Type", value: "Internal Tool" },
      { label: "Status", value: "Active" },
    ],
    features: [
      "Workflow configuration interface",
      "Process automation",
      "Integration support",
      "Execution monitoring",
    ],
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
    category: "Automation",
    featured: true,
  },
  {
    id: "enterprise-eprocurement",
    title: "E-Procurement System",
    description:
      "Procurement management platform built at Vertex with workflow automation and vendor management.",
    longDescription:
      "A procurement system with purchase order management, approval workflows, vendor management, and reporting dashboards.",
    tags: ["Enterprise", "Procurement", "Workflow"],
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
    metrics: [
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Duration", value: "6 months" },
      { label: "Team Size", value: "5-10" },
    ],
    features: [
      "Multi-tier approval workflow",
      "Vendor management system",
      "Purchase order tracking",
      "Reporting dashboards",
      "ERP system integration",
    ],
    github: GITHUB_URL,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    category: "Enterprise",
    featured: true,
  },
  {
    id: "web3-nft-platform",
    title: "Web3 dApp Interface",
    description:
      "NFT and Web3 application frontend built using modern blockchain technologies.",
    longDescription:
      "A Web3 dApp interface built with Next.js and React, featuring wallet connectivity using Wagmi and Ethers.js. Worked on responsive UI components and blockchain integration at The Block Labs.",
    tags: ["Web3", "NFT", "Blockchain", "Frontend"],
    stack: ["Next.js", "React", "TypeScript", "Wagmi", "Ethers.js"],
    metrics: [
      { label: "Role", value: "Frontend Developer" },
      { label: "Duration", value: "2 years" },
      { label: "Chains", value: "EVM-compatible" },
    ],
    features: [
      "Wallet integration (MetaMask, WalletConnect)",
      "NFT minting interface",
      "Responsive UI components",
      "Blockchain interaction handling",
      "Gas estimation display",
    ],
    github: GITHUB_URL,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    category: "Web3",
    featured: true,
  },
  {
    id: "click-tracking-system",
    title: "URL Tracking System",
    description: "URL shortening and basic analytics tracking system.",
    longDescription:
      "A URL shortening and tracking system built with Node.js and React. Tracks clicks and provides basic analytics including geographic location and referrer information.",
    tags: ["Analytics", "Backend"],
    stack: ["Node.js", "Express", "PostgreSQL", "React"],
    metrics: [
      { label: "Type", value: "Portfolio Project" },
      { label: "Status", value: "Complete" },
    ],
    features: [
      "URL shortening",
      "Click tracking",
      "Basic analytics dashboard",
      "Geographic data tracking",
      "Referrer logging",
    ],
    github: GITHUB_URL,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    category: "Analytics",
  },
  {
    id: "campaign-dashboard",
    title: "Campaign Dashboard",
    description: "Marketing campaign management and reporting dashboard.",
    longDescription:
      "A dashboard for managing and tracking marketing campaigns. Built with React and Node.js, featuring campaign creation, performance tracking, and basic analytics reporting.",
    tags: ["Marketing", "Dashboard"],
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    metrics: [
      { label: "Type", value: "Portfolio Project" },
      { label: "Status", value: "Complete" },
    ],
    features: [
      "Campaign management interface",
      "Performance tracking",
      "Reporting dashboards",
      "Campaign statistics",
      "Basic segmentation",
    ],
    github: GITHUB_URL,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    category: "Analytics",
  },
  {
    id: "csv-analytics-tool",
    title: "Data Processing Tool",
    description: "CSV upload and data processing application for analytics.",
    longDescription:
      "A data processing tool for uploading, analyzing, and exporting CSV files. Built with Next.js and Node.js, featuring file upload, basic data transformation, and reporting.",
    tags: ["Analytics", "Data"],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Type", value: "Portfolio Project" },
      { label: "Status", value: "Complete" },
    ],
    features: [
      "CSV file upload",
      "Data transformation",
      "Report generation",
      "Data export",
      "Basic visualization",
    ],
    github: GITHUB_URL,
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    category: "Data",
  },
];
