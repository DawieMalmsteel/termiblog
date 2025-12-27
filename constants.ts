
import { BLOG_REGISTRY } from './blogs/registry.ts';

export const NEOFETCH_INFO = {
  user: "Hoàng@portfolio",
  role: "Full-stack Developer",
  location: "Việt Nam 🇻🇳",
  experience: "3+ years",
  editor: "Neovim / VS Code",
  terminal: "Kitty + Zsh",
  os: "Arch Linux / macOS",
  languages: "TypeScript, Go, Rust",
  frameworks: "React, Next.js, Node",
  databases: "PostgreSQL, MongoDB",
  tools: "Docker, Git, Figma"
};

export const MOCK_POSTS = BLOG_REGISTRY;

export const COMMANDS = [
  'help - List available commands',
  'neofetch - Display system information',
  'about - Learn about me',
  'blog - Enter the blog browser',
  'read [id] - Read a specific post',
  'ai [query] - Ask my AI assistant',
  'clear - Clear the terminal screen'
];

export const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/hoang-sh", icon: "Github", color: "text-[#cba6f7]" },
  { label: "LinkedIn", url: "https://linkedin.com/in/hoang-sh", icon: "Linkedin", color: "text-[#89b4fa]" },
  { label: "Twitter", url: "https://twitter.com/hoang_sh", icon: "Twitter", color: "text-[#89dceb]" },
  { label: "Email", url: "mailto:contact@hoang.sh", icon: "Mail", color: "text-[#a6e3a1]" }
];

export const PROFILE_STATS = [
  { label: "Status", value: "Online", icon: "Activity", color: "text-[#a6e3a1]" },
  { label: "Location", value: "Hanoi, VN", icon: "MapPin", color: "text-[#fab387]" },
  { label: "Work", value: "Open to Offers", icon: "Briefcase", color: "text-[#89b4fa]" }
];

export const STACK_OVERVIEW = [
  { label: "TS/React", icon: "Code2", color: "text-[#89b4fa]" },
  { label: "Rust/Go", icon: "Cpu", color: "text-[#fab387]" },
  { label: "Postgres", icon: "Database", color: "text-[#a6e3a1]" },
  { label: "DevOps", icon: "Settings", color: "text-[#f38ba8]" }
];
