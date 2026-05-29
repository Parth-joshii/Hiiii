import {
  Award,
  Bot,
  BrainCircuit,
  Code2,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Network,
  Sparkles,
  Stethoscope,
  Workflow,
  Image as ImageIcon,
} from "lucide-react";

export const profile = {
  name: "Parth Joshi",
  brand: "PARTH.AI",
  title: "AI/ML Engineer",
  location: "Indore, India",
  email: "parthjoshi1605@gmail.com",
  github: "https://github.com/Parth-joshii",
  linkedin: "https://www.linkedin.com/in/parthjoshi-16parth",
  graduation: "B.Tech AI & ML, expected June 2026",
  summary:
    "Motivated AI & ML Engineer specializing in RAG systems, NLP, and computer vision. Experienced in building intelligent AI systems using Python, LangChain, OpenAI APIs, and modern AI workflows.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "AI Projects", value: 20, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Certifications", value: 5, suffix: "+" },
  { label: "Internship Experience", value: 2, suffix: "" },
];

export const skillGroups = [
  {
    title: "AI / ML",
    icon: BrainCircuit,
    accent: "from-amber-300 via-rose-300 to-violet-300",
    skills: [
      { name: "Machine Learning", level: 92 },
      { name: "Deep Learning", level: 86 },
      { name: "NLP", level: 90 },
      { name: "Computer Vision", level: 84 },
      { name: "RAG", level: 91 },
      { name: "MCP", level: 76 },
      { name: "n8n", level: 82 },
    ],
  },
  {
    title: "Development",
    icon: Code2,
    accent: "from-sky-300 via-emerald-300 to-amber-300",
    skills: [
      { name: "Python", level: 94 },
      { name: "React", level: 86 },
      { name: "FastAPI", level: 88 },
      { name: "Flask", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    title: "AI Tools",
    icon: Sparkles,
    accent: "from-violet-300 via-fuchsia-300 to-amber-300",
    skills: [
      { name: "ChatGPT", level: 94 },
      { name: "Claude", level: 88 },
      { name: "Cursor", level: 90 },
      { name: "Gemini", level: 84 },
      { name: "GitHub Copilot", level: 88 },
      { name: "Codex", level: 86 },
    ],
  },
];

export const projects = [
  {
    title: "Multilingual Educational RAG Chatbot",
    icon: Bot,
    signal: "Hybrid retrieval / 8+ Indian languages",
    description:
      "Built a multilingual RAG chatbot for CA, CMA, CS, and ACCA course discovery with onboarding personalization, chat memory, metadata filtering, and faculty/pricing lookup.",
    highlights: ["FastAPI", "React", "Qdrant", "OpenAI embeddings", "LangChain", "MongoDB"],
    architecture: ["Query", "Embedding", "Qdrant", "Answer"],
    metric: "8+ languages",
    githubUrl: profile.github,
    demoUrl: "#contact",
  },
  {
    title: "AI Agent WhatsApp Automation",
    icon: MessageCircle,
    signal: "Autonomous messaging workflow",
    description:
      "Built an AI-powered WhatsApp automation system with n8n and WhatsApp Cloud API, automating routine message handling workflows without manual intervention.",
    highlights: ["WhatsApp Cloud API", "n8n", "Python", "REST APIs"],
    architecture: ["WhatsApp", "n8n", "AI Agent", "Reply"],
    metric: "100% routine flow automation",
    githubUrl: profile.github,
    demoUrl: "#contact",
  },
  {
    title: "Medical Recommendation System",
    icon: Stethoscope,
    signal: "NLP + CNN + LSTM diagnosis assist",
    description:
      "Developed a disease prediction system trained on 15,000+ patient records and deployed with a Flask API for cloud-ready inference.",
    highlights: ["NLP", "CNN", "LSTM", "TensorFlow", "Flask", "Python"],
    architecture: ["Symptoms", "CNN/LSTM", "Prediction", "Advice"],
    metric: "91% accuracy",
    githubUrl: profile.github,
    demoUrl: "#contact",
  },
  {
    title: "Image Quality Analyzer",
    icon: ImageIcon,
    signal: "Sharpness / noise / clarity intelligence",
    description:
      "Built a Streamlit dashboard that analyzes image quality across sharpness, noise, and clarity metrics using OpenCV processing pipelines.",
    highlights: ["OpenCV", "Streamlit", "Python", "HTML/CSS"],
    architecture: ["Image", "OpenCV", "Metrics", "Dashboard"],
    metric: "3 quality metrics",
    githubUrl: profile.github,
    demoUrl: "#contact",
  },
];

export const experiences = [
  {
    role: "AI/ML Intern",
    company: "Codiotic Technologies",
    location: "Indore, Onsite",
    period: "May 2026 - Present",
    icon: Network,
    bullets: [
      "Building production RAG pipelines for enterprise document retrieval using LangChain, Qdrant, and OpenAI embeddings.",
      "Collaborating with a 5-member cross-functional team and contributed to 2 client deployments within the first month.",
    ],
  },
  {
    role: "AI/ML Intern",
    company: "LaunchSpring",
    location: "Chennai, Remote",
    period: "September 2025",
    icon: Workflow,
    bullets: [
      "Developed ML classification models on 10,000+ record datasets, achieving about 88% accuracy with scikit-learn and pandas.",
      "Built preprocessing pipelines that reduced inference error rate by about 12% across sprint cycles.",
    ],
  },
];

export const certifications = [
  { name: "Applications of AI for Anomaly Detection", provider: "Nvidia", date: "March 2025" },
  { name: "Data Analytics & Visualization EDA", provider: "Accenture", date: "March 2025" },
  { name: "Getting Started with AI on Jetson Nano", provider: "Nvidia", date: "December 2024" },
  { name: "Career Essentials in Generative AI", provider: "Microsoft", date: "November 2024" },
  { name: "End-to-End ML Project", provider: "Independent", date: "November 2024" },
];

export const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];
