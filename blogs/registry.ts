
import { BlogPost } from '../types';
import { content as geminiContent } from './tech/post-gemini.ts';
import { content as tailwindContent } from './tech/post-tailwind.ts';
import { content as futureContent } from './tech/post-future.ts';
import { content as myDayContent } from './life/post-my-day.ts';

export const BLOG_REGISTRY: BlogPost[] = [
  {
    id: 'gemini-intro',
    title: 'Getting Started with Gemini API',
    excerpt: 'Learn how to integrate Google\'s powerful AI into your React applications with multimodal capabilities.',
    content: geminiContent,
    date: '2024-03-20 14:30',
    categories: ['Tech', 'AI', 'Programming'],
    tags: ['Google', 'Gemini', 'React']
  },
  {
    id: 'tailwind-terminal',
    title: 'Mastering Tailwind CSS for Terminal UIs',
    excerpt: 'How to build beautiful, retro-style interfaces using utility classes and catppuccin colors.',
    content: tailwindContent,
    date: '2024-03-15 09:15',
    categories: ['Tech', 'Design', 'Frontend'],
    tags: ['CSS', 'Tailwind', 'UI/UX']
  },
  {
    id: 'future-web',
    title: 'The Future of Web',
    excerpt: 'A look into where the web is heading in 2025 and beyond with AI agents.',
    content: futureContent,
    date: '2024-03-10 16:45',
    categories: ['Tech', 'Future'],
    tags: ['Future', 'WebDev']
  },
  {
    id: 'my-day-hanoi',
    title: 'Một ngày làm việc tại Hanoi',
    excerpt: 'Chia sẻ về trải nghiệm làm việc Remote và cuộc sống thường nhật tại thủ đô.',
    content: myDayContent,
    date: '2024-03-25 08:00',
    categories: ['Life', 'Personal'],
    tags: ['Hanoi', 'Remote', 'Lifestyle']
  }
];
