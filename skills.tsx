import React from 'react';
import { Cloud, Brain, Server, Blocks, Code } from 'lucide-react';
import { CategoryNode } from './types';

export const BIO = "Building decentralized experiences and scalable architectures. Always curious about the intersection of AI, Web3, and human-centric design.";

export const SKILL_CATEGORIES: CategoryNode[] = [
    {
        id: 'cloud', label: 'Cloud & DevOps', icon: <Cloud size={16} />, color: '#89b4fa',
        angle: -80, distance: 150,
        childAngleBase: -10,
        skills: [
            {
                id: 'aws', label: 'AWS',
                projects: [
                    { name: 'Serverless Video', description: 'Lambda pipeline', repoUrl: 'https://github.com/hoang-sh/aws-video' },
                    { name: 'ECS AutoScale', description: 'Container tools', repoUrl: '#' }
                ]
            },
            { id: 'docker', label: 'Docker' },
            {
                id: 'k8s', label: 'Kubernetes',
                projects: [{ name: 'GitOps ArgoCD', description: 'K8s deployment workflow', repoUrl: '#' }]
            },
            { id: 'terraform', label: 'Terraform' },
            { id: 'cicd', label: 'CI/CD' }
        ]
    },
    {
        id: 'ai', label: 'AI & Data', icon: <Brain size={16} />, color: '#f5c2e7',
        angle: -40, distance: 190,
        childAngleBase: -5,
        skills: [
            {
                id: 'python', label: 'Python',
                projects: [{ name: 'Async Scraper', description: 'High perf web scraping', repoUrl: '#' }]
            },
            {
                id: 'pytorch', label: 'PyTorch',
                projects: [{ name: 'StyleGAN', description: 'Art style transfer', repoUrl: '#' }]
            },
            { id: 'rag', label: 'RAG Systems' },
            { id: 'langchain', label: 'LangChain' },
            { id: 'hugface', label: 'HuggingFace' }
        ]
    },
    {
        id: 'backend', label: 'Backend', icon: <Server size={16} />, color: '#a6e3a1',
        angle: 0, distance: 140,
        childAngleBase: 0,
        skills: [
            {
                id: 'node', label: 'Node.js',
                projects: [
                    { name: 'Realtime Chat', description: 'WebSocket', repoUrl: '#' },
                    { name: 'Auth Service', description: 'JWT Microservice', repoUrl: '#' }
                ]
            },
            { id: 'go', label: 'Go' },
            { id: 'rust', label: 'Rust' },
            { id: 'postgres', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' }
        ]
    },
    {
        id: 'web3', label: 'Web3', icon: <Blocks size={16} />, color: '#fab387',
        angle: 40, distance: 180,
        childAngleBase: 5,
        skills: [
            {
                id: 'solidity', label: 'Solidity',
                projects: [{ name: 'DeFi AMM', description: 'Dex Swap Clone', repoUrl: '#' }]
            },
            { id: 'ethereum', label: 'Ethereum' },
            { id: 'smart-contracts', label: 'Smart Contracts' },
            { id: 'hardhat', label: 'Hardhat' },
            { id: 'ipfs', label: 'IPFS' }
        ]
    },
    {
        id: 'frontend', label: 'Frontend', icon: <Code size={16} />, color: '#f38ba8',
        angle: 80, distance: 150,
        childAngleBase: 10,
        skills: [
            {
                id: 'react', label: 'React',
                projects: [
                    { name: 'Portfolio', description: 'Interactive Terminal', repoUrl: '#' },
                    { name: 'Analytics', description: 'D3 Dashboard', repoUrl: '#' }
                ]
            },
            { id: 'ts', label: 'TypeScript' },
            { id: 'next', label: 'Next.js' },
            { id: 'tailwind', label: 'Tailwind' },
            { id: 'framer', label: 'Framer Motion' }
        ]
    },
];
