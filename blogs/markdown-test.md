---
id: markdown-test
title: Complete Markdown Feature Test
excerpt: A comprehensive test document showcasing all Markdown features - code highlighting, tables, lists, images, and more.
date: 2024-12-26 21:45
categories: Tech, Testing, Markdown
tags: Markdown, Test, Features
---

# Complete Markdown Feature Test

This is a comprehensive test document that showcases **all** Markdown features supported by this blog system.

## Table of Contents

1. [Text Formatting](#text-formatting)
2. [Code Examples](#code-examples)
3. [Lists and Tasks](#lists-and-tasks)
4. [Tables](#tables)
5. [Links and Images](#links-and-images)
6. [Blockquotes](#blockquotes)

---

## Text Formatting

### Bold and Italic

You can make text **bold**, *italic*, or ***both bold and italic***. You can also use ~~strikethrough~~ text.

### Inline Code

Use `const variable = "inline code"` for inline code snippets. Perfect for mentioning `React.useState()` or `npm install`.

### Subscript and Superscript

Water molecule: H~2~O  
Einstein's equation: E = mc^2^

---

## Code Examples

### JavaScript/TypeScript

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const createUser = async (data: Partial<User>): Promise<User> => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
```

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n numbers."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    
    return sequence

# Usage
numbers = fibonacci(10)
print(f"First 10 Fibonacci numbers: {numbers}")
```

### Bash/Shell

```bash
#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

# Deploy to production
if [ "$NODE_ENV" = "production" ]; then
    echo "Deploying to production..."
    npm run deploy
else
    echo "Running in development mode"
    npm run dev
fi
```

### JSON

```json
{
  "name": "termiblog-portfolio",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.2.3",
    "react-router-dom": "^7.11.0",
    "react-markdown": "^10.1.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

### CSS/SCSS

```css
.button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #cba6f7, #89b4fa);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(203, 166, 247, 0.3);
}
```

---

## Lists and Tasks

### Unordered Lists

- First item
- Second item
  - Nested item 1
  - Nested item 2
    - Deep nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task Lists

- [x] Complete project setup
- [x] Install dependencies
- [ ] Write documentation
- [ ] Deploy to production
- [x] Test all features
  - [x] Test markdown rendering
  - [ ] Test routing
  - [ ] Test mobile responsive

---

## Tables

### Simple Table

| Feature | Status | Priority |
|---------|--------|----------|
| Routing | ✅ Done | High |
| Markdown | ✅ Done | High |
| Mobile UI | 🚧 In Progress | Medium |
| Dark Mode | ✅ Done | Low |

### Complex Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Row 1 Col 1  | Row 1 Col 2    | Row 1 Col 3   |
| Row 2 Col 1  | Row 2 Col 2    | Row 2 Col 3   |
| Row 3 Col 1  | Row 3 Col 2    | Row 3 Col 3   |

### Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.3 | UI Framework |
| TypeScript | 5.8.2 | Type Safety |
| Vite | 6.2.0 | Build Tool |
| React Router | 7.11.0 | Routing |
| Tailwind CSS | Latest | Styling |

---

## Links and Images

### Internal Links

Check out the [blog list](/blog) or go back to the [terminal](/).

### External Links

Visit [GitHub](https://github.com) or [React Documentation](https://react.dev).

### Reference Links

I love using [React][1] and [TypeScript][2] for web development.

[1]: https://react.dev "React Official Site"
[2]: https://www.typescriptlang.org "TypeScript Official Site"

### Images

![Placeholder Image](https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=800&h=400)

*Image caption: A beautiful placeholder image from Unsplash*

---

## Blockquotes

### Simple Quote

> "The only way to do great work is to love what you do."
> 
> — Steve Jobs

### Nested Quotes

> This is the first level of quoting.
>
> > This is nested blockquote.
> >
> > > And this is even deeper!

### Quote with Code

> **Pro Tip:** Always use `const` or `let` instead of `var` in modern JavaScript.
> 
> ```javascript
> const message = "Hello, World!";
> console.log(message);
> ```

---

## Advanced Features

### Footnotes

Here's a sentence with a footnote[^1].

And another one[^2].

[^1]: This is the first footnote.
[^2]: This is the second footnote with more details.

### HTML in Markdown

<div style="background: linear-gradient(135deg, #cba6f7, #89b4fa); padding: 20px; border-radius: 10px; color: white; text-align: center; margin: 20px 0;">
  <strong>Custom HTML Block</strong><br>
  You can also use HTML directly in markdown!
</div>

### Emoji Support

:rocket: :sparkles: :fire: :heart: :star:

### Math Expressions (if supported)

Inline math: $E = mc^2$

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

---

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

---

## Horizontal Rules

You can create horizontal rules with:

Three dashes:
---

Three asterisks:
***

Three underscores:
___

---

## Escape Characters

You can escape special characters using backslash:

\*Not italic\* \`Not code\` \[Not a link\]

---

## Summary

This document demonstrates:

1. ✅ All heading levels (H1-H4)
2. ✅ Text formatting (bold, italic, strikethrough)
3. ✅ Code blocks with syntax highlighting
4. ✅ Inline code
5. ✅ Unordered and ordered lists
6. ✅ Task lists with checkboxes
7. ✅ Tables with alignment
8. ✅ Links (internal, external, reference)
9. ✅ Images with captions
10. ✅ Blockquotes (simple and nested)
11. ✅ Horizontal rules
12. ✅ HTML embedding
13. ✅ Escape characters

**Perfect for testing the full markdown rendering capabilities!** 🎉
