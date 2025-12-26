
import { BLOG_REGISTRY } from './blogs/registry.ts';

export const NEOFETCH_INFO = {
  user: "guest@macos-catppuccin",
  os: "Catppuccin Mocha (Hyprland)",
  host: "Gemini-Powered Portfolio",
  kernel: "6.12.0-termi-blog",
  uptime: "1 hour, 42 mins",
  packages: "1337 (pacman)",
  shell: "zsh 5.9",
  resolution: "1920x1080",
  wm: "Hyprland",
  cpu: "Google Gemini 3 Flash",
  gpu: "WebGL 2.0 (M1 Ultra)",
  memory: "16GB / 64GB"
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
