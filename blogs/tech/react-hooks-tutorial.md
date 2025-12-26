---
id: react-hooks-deep-dive
title: React Hooks Deep Dive - useState & useEffect
excerpt: Master React Hooks with practical examples and best practices. Learn when and how to use useState, useEffect, and custom hooks effectively.
date: 2024-12-20 10:30
categories: Tech, Tutorial, Frontend
tags: React, Hooks, JavaScript, TypeScript
---

# React Hooks Deep Dive - useState & useEffect

React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore **useState** and **useEffect** with real-world examples.

## Table of Contents

1. [Introduction to Hooks](#introduction-to-hooks)
2. [useState - Managing State](#usestate---managing-state)
3. [useEffect - Side Effects](#useeffect---side-effects)
4. [Custom Hooks](#custom-hooks)
5. [Best Practices](#best-practices)

---

## Introduction to Hooks

Hooks were introduced in React 16.8 to allow you to use state and other React features **without writing a class**.

### Why Hooks?

- ✅ Simpler code - no class syntax
- ✅ Reusable logic - custom hooks
- ✅ Better performance - easier optimization
- ✅ Smaller bundle size

---

## useState - Managing State

The `useState` hook lets you add state to functional components.

### Basic Usage

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Multiple State Variables

```typescript
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input 
        type="number"
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
        placeholder="Age"
      />
      <input 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
    </form>
  );
}
```

### Object State

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

function UserForm() {
  const [user, setUser] = useState<User>({
    name: '',
    age: 0,
    email: ''
  });
  
  const updateField = (field: keyof User, value: any) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <p>Hello, {user.name}!</p>
    </div>
  );
}
```

### Lazy Initialization

When initial state requires expensive computation:

```typescript
function ExpensiveComponent() {
  // ❌ Bad - runs on every render
  const [data, setData] = useState(expensiveCalculation());
  
  // ✅ Good - only runs once
  const [data, setData] = useState(() => expensiveCalculation());
  
  return <div>{data}</div>;
}

function expensiveCalculation() {
  console.log('Computing...');
  return Array.from({ length: 10000 }, (_, i) => i * 2);
}
```

---

## useEffect - Side Effects

The `useEffect` hook lets you perform side effects in functional components.

### Basic Usage

```typescript
import { useState, useEffect } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);
  
  // Runs after every render
  useEffect(() => {
    document.title = `Count: ${count}`;
  });
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
```

### Dependency Array

```typescript
function UserData({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Only runs when userId changes
  useEffect(() => {
    setLoading(true);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // Dependencies
  
  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### Cleanup Functions

```typescript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []); // Empty array = run once
  
  return <div>Seconds: {seconds}</div>;
}
```

### Event Listeners

```typescript
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
}
```

---

## Custom Hooks

Create reusable logic by extracting hooks into custom hooks.

### useLocalStorage Hook

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use default
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  
  return [value, setValue] as const;
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {theme}
    </button>
  );
}
```

### useFetch Hook

```typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const { data, loading, error } = useFetch<User[]>('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Best Practices

### 1. Don't Call Hooks Conditionally

```typescript
// ❌ Bad
function MyComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // Error!
  }
}

// ✅ Good
function MyComponent({ condition }) {
  const [state, setState] = useState(0);
  
  if (condition) {
    // Use state here
  }
}
```

### 2. Use Multiple useEffect for Different Concerns

```typescript
// ❌ Bad - mixed concerns
useEffect(() => {
  document.title = title;
  fetchUserData();
  setupWebSocket();
}, [title, userId]);

// ✅ Good - separated concerns
useEffect(() => {
  document.title = title;
}, [title]);

useEffect(() => {
  fetchUserData();
}, [userId]);

useEffect(() => {
  const ws = setupWebSocket();
  return () => ws.close();
}, []);
```

### 3. Optimize with useMemo and useCallback

```typescript
import { useMemo, useCallback } from 'react';

function ExpensiveList({ items, filter }) {
  // Memoize expensive calculation
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);
  
  // Memoize callback
  const handleClick = useCallback((id: string) => {
    console.log('Clicked', id);
  }, []);
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item} onClick={() => handleClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

---

## Summary

**Key Takeaways:**

- ✅ `useState` for local component state
- ✅ `useEffect` for side effects and subscriptions
- ✅ Custom hooks for reusable logic
- ✅ Always include dependencies in useEffect
- ✅ Clean up subscriptions in useEffect
- ✅ Don't call hooks conditionally
- ✅ Optimize with useMemo and useCallback

**Next Steps:**

- Explore `useContext` for global state
- Learn `useReducer` for complex state logic
- Master `useRef` for DOM access
- Build more custom hooks!

Happy coding! 🚀
