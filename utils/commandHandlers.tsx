import React from 'react';
import {
    HelpCircle, Cpu, User, Eye, Calendar, Layout, Terminal,
    BookOpen, Sparkles, Trash2, GitBranch, Settings,
    Monitor, Server, Clock, Package, Maximize, Layers,
    Zap, Database, Code2
} from 'lucide-react';
import { MOCK_POSTS, NEOFETCH_INFO } from '../constants';
import { BlogPost, AppMode } from '../types';
import { InteractiveSkillTree } from '../components/InteractiveSkillTree';

const ICON_MAP: Record<string, any> = {
    Server, Monitor, Database, Link: BookOpen, Code2, Box: Package,
    Cpu, ShieldCheck: Settings, Layout, Sparkles, Shapes: GitBranch,
    Layers, Search: Eye, Zap, Globe: BookOpen, Wifi: Database
};

export const handleNeofetch = (addLine: (type: string, content: React.ReactNode) => void) => {
    const iconMap: Record<string, { icon: React.ReactNode; iconColor: string; textColor: string }> = {
        role: { icon: <User size={14} />, iconColor: 'text-[#cba6f7]', textColor: 'text-[#cba6f7]' },
        location: { icon: <Server size={14} />, iconColor: 'text-[#f5c2e7]', textColor: 'text-[#f5c2e7]' },
        experience: { icon: <Clock size={14} />, iconColor: 'text-[#fab387]', textColor: 'text-[#fab387]' },
        editor: { icon: <Code2 size={14} />, iconColor: 'text-[#a6e3a1]', textColor: 'text-[#a6e3a1]' },
        terminal: { icon: <Terminal size={14} />, iconColor: 'text-[#94e2d5]', textColor: 'text-[#94e2d5]' },
        os: { icon: <Monitor size={14} />, iconColor: 'text-[#89dceb]', textColor: 'text-[#89dceb]' },
        languages: { icon: <Cpu size={14} />, iconColor: 'text-[#74c7ec]', textColor: 'text-[#74c7ec]' },
        frameworks: { icon: <Layers size={14} />, iconColor: 'text-[#89b4fa]', textColor: 'text-[#89b4fa]' },
        databases: { icon: <Database size={14} />, iconColor: 'text-[#b4befe]', textColor: 'text-[#b4befe]' },
        tools: { icon: <Package size={14} />, iconColor: 'text-[#f9e2af]', textColor: 'text-[#f9e2af]' }
    };

    const userInfo = NEOFETCH_INFO.user.split('@');

    addLine('output', (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start md:items-center md:justify-center py-4 md:py-6 font-mono animate-in fade-in slide-in-from-left-4 duration-700 max-w-full overflow-hidden">
            {/* Left: Avatar + Username */}
            <div className="flex flex-col items-center gap-4 shrink-0 self-center md:self-auto">
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-[#313244] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=400&h=400"
                            alt="System User"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11111b]/80 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-0.5 items-center">
                    <div className="text-lg md:text-2xl font-black text-[#cba6f7] tracking-tighter leading-none">
                        {userInfo[0] || 'guest'}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-[#6c7086] tracking-widest">
                        @{userInfo[1] || 'macos'}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-[2px] self-stretch bg-gradient-to-b from-transparent via-[#45475a] to-transparent opacity-50"></div>

            {/* Right: Neofetch Info + Color Blocks */}
            <div className="flex flex-col gap-1 min-w-0">
                <div className="flex flex-col gap-y-2 lg:max-w-[390px]">
                    {Object.entries(NEOFETCH_INFO).map(([key, value]) => {
                        if (key === 'user') return null;
                        const config = iconMap[key] || { icon: <Settings size={12} />, iconColor: 'text-[#cba6f7]', textColor: 'text-[#89b4fa]' };
                        return (
                            <div key={key} className="flex justify-between items-center gap-4 text-xs md:text-sm group/item">
                                <span className={`${config.textColor} flex items-center gap-2 font-bold shrink-0 leading-none`}>
                                    <span className={`opacity-70 group-hover/item:opacity-100 transition-opacity ${config.iconColor}`}>
                                        {config.icon}
                                    </span>
                                    <span className="capitalize tracking-tight opacity-80 text-[10px] md:text-xs">{key}:</span>
                                </span>
                                <span className={`opacity-90 group-hover/item:opacity-100 transition-opacity truncate leading-none text-[10px] md:text-sm text-right`}>
                                    {value}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-2.5 justify-center md:justify-start">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                        <div key={i} className="w-6 h-4 md:w-10 md:h-6 rounded-md md:rounded-lg shadow-lg border border-white/5 transition-all hover:-translate-y-1 cursor-default active:scale-90" style={{
                            backgroundColor: i === 0 ? '#313244' : i === 1 ? '#f38ba8' : i === 2 ? '#a6e3a1' : i === 3 ? '#f9e2af' : i === 4 ? '#89b4fa' : i === 5 ? '#cba6f7' : i === 6 ? '#94e2d5' : '#cdd6f4'
                        }}></div>
                    ))}
                </div>
            </div>
        </div>
    ));
};

export const createCommandHandler = (
    addLine: (type: string, content: React.ReactNode) => void,
    setMode: (mode: AppMode) => void,
    setCurrentPost: (post: BlogPost | null) => void,
    clearHistory: () => void
) => {
    const executeCommand = async (cmd: string): Promise<void> => {
        const fullCmd = cmd.trim();
        if (!fullCmd) return;

        addLine('command', (
            <div className="flex gap-2 items-center">
                <span className="text-[#a6e3a1] font-bold">➜</span>
                <span className="text-[#89b4fa] font-bold">~</span>
                <span className="text-[#cdd6f4]">{fullCmd}</span>
            </div>
        ));

        const parts = fullCmd.toLowerCase().split(' ');
        const baseCmd = parts[0];
        const args = parts.slice(1);

        switch (baseCmd) {
            case 'help':
                const helpMap = [
                    { cmd: 'help', desc: 'Display this menu', icon: <HelpCircle size={14} className="text-[#cba6f7]" /> },
                    { cmd: 'neofetch', desc: 'Show system overview', icon: <Cpu size={14} className="text-[#f38ba8]" /> },
                    { cmd: 'about', desc: 'Display knowledge tree', icon: <User size={14} className="text-[#fab387]" /> },
                    { cmd: 'whoami', desc: 'Identity verification', icon: <Eye size={14} className="text-[#a6e3a1]" /> },
                    { cmd: 'date', desc: 'Temporal sync', icon: <Calendar size={14} className="text-[#fab387]" /> },
                    { cmd: 'ls', desc: 'List active nodes', icon: <GitBranch size={14} className="text-[#89b4fa]" /> },
                    { cmd: 'blog', desc: 'Open knowledge archive', icon: <Terminal size={14} className="text-[#89b4fa]" /> },
                    { cmd: 'read [id]', desc: 'Stream specific record', icon: <BookOpen size={14} className="text-[#fab387]" />, hasArgs: true },
                    { cmd: 'ai [query]', desc: 'Query Meow-Bot (Legacy AI)', icon: <Sparkles size={14} className="text-[#f5c2e7]" />, hasArgs: true },
                    { cmd: 'clear', desc: 'Purge terminal buffer', icon: <Trash2 size={14} className="text-[#94e2d5]" />, hasArgs: false }
                ];

                addLine('info', (
                    <div className="py-2 font-mono animate-in fade-in duration-500">
                        <div className="flex items-center gap-2 mb-4 border-b border-[#313244] pb-2">
                            <Terminal size={16} className="text-[#cba6f7]" />
                            <span className="text-[#cba6f7] font-black uppercase tracking-[0.2em] text-xs leading-none">System Commands Interface v2.5</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                            {helpMap.map((item, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-4 group transition-all ${item.hasArgs ? 'cursor-default opacity-70' : 'cursor-pointer hover:translate-x-1'}`}
                                    onClick={() => !item.hasArgs && executeCommand(item.cmd.split(' ')[0])}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#313244]/50 flex items-center justify-center group-hover:bg-[#313244] transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#f9e2af] text-sm font-bold lowercase tracking-tight leading-none mb-1">{item.cmd}</span>
                                        <span className="text-[#6c7086] text-[10px] uppercase font-black tracking-widest leading-none">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ));
                break;
            case 'about':
                addLine('info', <InteractiveSkillTree />);
                break;
            case 'neofetch':
                handleNeofetch(addLine);
                break;
            case 'whoami':
                addLine('success', (
                    <div className="flex items-center gap-3 font-mono py-1">
                        <span className="text-[#cba6f7] font-bold">User:</span>
                        <span className="text-[#cdd6f4]">guest (UID: 1000)</span>
                        <span className="text-[#6c7086]">|</span>
                        <span className="text-[#89b4fa]">Portfolio Domain Admin</span>
                    </div>
                ));
                break;
            case 'date':
                addLine('info', (
                    <div className="flex items-center gap-2 font-mono">
                        <Calendar size={14} className="text-[#fab387]" />
                        <span className="text-[#cdd6f4]">{new Date().toString()}</span>
                    </div>
                ));
                break;
            case 'ls':
                addLine('output', (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                        {['projects/', 'skills/', 'blog_posts/', 'resume.pdf', 'config.json', 'ai_model/'].map(file => (
                            <div key={file} className="flex items-center gap-2 text-sm">
                                {file.endsWith('/') ? <Layout size={14} className="text-[#89b4fa]" /> : <BookOpen size={14} className="text-[#a6adc8]" />}
                                <span className={file.endsWith('/') ? "text-[#cba6f7]" : "text-[#cdd6f4]"}>{file}</span>
                            </div>
                        ))}
                    </div>
                ));
                break;
            case 'blog':
                setMode(AppMode.SEARCHING);
                break;
            case 'clear':
                clearHistory();
                break;
            case 'ai':
                const query = args.join(' ');
                if (!query) { addLine('error', "usage: ai <prompt>"); return; }

                addLine('info', (
                    <div className="flex items-center gap-2">
                        <span className="animate-pulse text-[#f5e0dc]">Thinking... [Mainframe Busy]</span>
                    </div>
                ));

                const randomDelay = Math.floor(Math.random() * 2000);
                await new Promise(resolve => setTimeout(resolve, randomDelay));

                const meowCount = Math.floor(Math.random() * 49) + 1;
                const meowResponse = Array(meowCount).fill('meow').join(' ');

                addLine('success', (
                    <div className="flex flex-col gap-2 mt-2 border border-[#313244] p-4 rounded-xl bg-[#11111b]/50 animate-in fade-in zoom-in-95 duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#6c7086] text-[10px] italic font-mono uppercase tracking-[0.2em] leading-none">[ MEOW_BOT_V1.0 RESPONSE ]</span>
                        </div>
                        <div className="text-[#a6e3a1] leading-relaxed break-words font-mono text-sm">
                            {meowResponse}
                        </div>
                    </div>
                ));
                break;
            case 'read':
                const id = args[0];
                const p = MOCK_POSTS.find(x => x.id === id);
                if (p) {
                    setCurrentPost(p);
                    setMode(AppMode.READING);
                } else {
                    addLine('error', `ERR: Record (ID:${id}) not found in data lake.`);
                }
                break;
            default:
                addLine('error', `zsh: command not found: ${baseCmd}`);
        }
    };
    return executeCommand;
};
