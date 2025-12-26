
import React from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  categories: string[]; // Changed from category: string
  tags: string[];
}

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'info' | 'success';
  content: string | React.ReactNode;
}

export enum AppMode {
  TERMINAL = 'TERMINAL',
  READING = 'READING',
  SEARCHING = 'SEARCHING'
}
