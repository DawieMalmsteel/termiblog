
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
