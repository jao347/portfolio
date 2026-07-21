import type { Project } from "@/types";
import { GITHUB_URL } from "@/lib/constants";

export const projects: Project[] = [
  {
    id: "puzzle-events",
    title: "PuzzleEvents",
    description:
      "Interactive event platform where guests collectively unlock a hero image tile-by-tile by scanning personalized QR codes.",
    longDescription:
      "An event-engagement SaaS that turns a shared image into a live puzzle reveal — each guest scans a unique QR code to unlock their tile on a projector-friendly dashboard. Handles automated image tiling by guest count, spreadsheet roster import, table assignment, and QR asset export.",
    tags: ["Events", "SaaS", "QR", "Real-time"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    metrics: [
      { label: "Type", value: "SaaS Product" },
      { label: "Status", value: "Live" },
      { label: "Role", value: "Full-Stack Developer" },
    ],
    features: [
      "QR-first guest-to-tile mapping",
      "Automated image tiling by guest count",
      "Live dual-view / projector dashboard",
      "Spreadsheet roster import & table assignment",
      "QR asset export (print / email)",
    ],
    live: "http://puzzle-events.xyz/",
    gradient: "from-[#00ADB5] to-[#00ADB5]",
    category: "SaaS",
    featured: true,
  },
  {
    id: "paddlego",
    title: "PaddleGo",
    description:
      "Booking & venue-management SaaS for pickleball and padel courts — 24/7 reservations, payments, and live open-play scoreboards.",
    longDescription:
      "A branded booking platform for racquet-sport venues combining online court reservations, QR/AI-verified payments, dynamic pricing, and an admin operations dashboard. Includes an open-play system with live scoreboard, rotation management, standings, and TV casting.",
    tags: ["SaaS", "Booking", "Sports", "Payments"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    metrics: [
      { label: "Type", value: "SaaS Product" },
      { label: "Status", value: "Live" },
      { label: "Role", value: "Full-Stack Developer" },
    ],
    features: [
      "24/7 online booking with double-book prevention",
      "Per-venue branded subdomain pages",
      "Dynamic time-of-day / peak / holiday pricing",
      "QRPH + AI-verified scan-to-pay",
      "Open-play live scoreboard with TV casting",
      "Admin dashboard: scheduler, refunds, revenue reports",
    ],
    live: "https://www.paddlego.fit/",
    gradient: "from-[#00ADB5] to-[#00ADB5]",
    category: "SaaS",
    featured: true,
  },
  {
    id: "leadhunter-ai",
    title: "LeadHunter AI",
    description:
      "AI SaaS for agencies to discover local business leads, audit their websites, score opportunities, and generate outreach.",
    longDescription:
      "A lead-generation platform that finds local businesses, runs parallel website audits (SEO, mobile, SSL, contact, social) via Playwright, scores each lead hot/warm/cold, discovers contact info, and generates AI-written outreach (cold email, follow-up, proposals) using Claude with an OpenAI fallback. Built on a queue-driven Express/MongoDB backend with JWT + RBAC auth.",
    tags: ["SaaS", "AI", "Automation", "Lead Gen"],
    stack: [
      "Next.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Playwright",
      "Claude API",
    ],
    metrics: [
      { label: "Type", value: "SaaS Product" },
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Status", value: "In Development" },
    ],
    features: [
      "Local lead discovery with CSV import",
      "Parallel website analysis (SEO / mobile / SSL / contact / social)",
      "Lead scoring — hot / warm / cold",
      "Automated contact discovery",
      "AI outreach generation (Claude + OpenAI fallback)",
      "JWT + RBAC auth with refresh tokens",
    ],
    gradient: "from-[#00ADB5] to-[#00ADB5]",
    category: "SaaS",
    featured: true,
  },
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
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
    gradient: "from-[#00ADB5] via-[#00ADB5] to-[#00ADB5]",
    category: "Data",
  },
];
