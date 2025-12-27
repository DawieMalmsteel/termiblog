
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

export interface Project {
  name: string;
  description: string;
  repoUrl: string;
}

export interface SubSkillNode {
  id: string;
  label: string;
  projects?: Project[];
}

export interface CategoryNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  angle: number; // Degrees relative to Root
  distance: number; // px from EXTENDED Root
  skills: SubSkillNode[];
  childAngleBase?: number;
}
