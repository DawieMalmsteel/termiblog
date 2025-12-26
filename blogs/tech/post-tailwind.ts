
export const content = `# Mastering Tailwind CSS for Terminal UIs

Tailwind makes it easy to build *pixel-perfect* designs. For a terminal look, focus on monochrome palettes and monospace fonts.

![Tailwind Theme](https://tailwindcss.com/_next/static/media/social-card.04164ed2.jpg)

### Key Utilities
1. \`font-mono\`
2. \`bg-black\`
3. \`text-green-500\`
4. \`animate-pulse\` for the cursor.

\`\`\`css
.terminal-cursor {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
\`\`\`

Experiment with shadows and scanline overlays to complete the effect.`;
