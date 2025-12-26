import React, { useState, useEffect, useRef } from 'react';
import { 
    Terminal as TerminalIcon, 
    Cpu, 
    Search, 
    ChevronLeft, 
    ChevronRight, 
    Command, 
    User, 
    Github, 
    Globe, 
    Settings, 
    Sparkles, 
    BookOpen, 
    Trash2, 
    Terminal, 
    Activity, 
    MapPin, 
    Briefcase, 
    GitBranch, 
    Wifi, 
    Database, 
    HelpCircle,
    Layout,
    Monitor,
    Server,
    Clock,
    Package,
    Maximize,
    Layers,
    Zap,
    Calendar,
    Eye,
    Link as LinkIcon,
    Code2,
    Box,
    Layers as LayersIcon,
    Cpu as CpuIcon,
    ShieldCheck,
    Shapes,
    Link,
    Tag
} from 'lucide-react';
import { MOCK_POSTS, NEOFETCH_INFO } from './constants.ts';
import { BlogPost, TerminalLine, AppMode } from './types.ts';
import MarkdownRenderer from './components/MarkdownRenderer.tsx';
import { skillsData } from './skills.ts';

const VALID_COMMANDS = ['help', 'neofetch', 'about', 'whoami', 'date', 'ls', 'blog', 'read', 'ai', 'clear'];

// Mapping for dynamic icons from JSON
const ICON_MAP: Record<string, any> = {
    Server,
    Monitor,
    Database,
    Link,
    Code2,
    Box,
    Cpu,
    ShieldCheck,
    Layout,
    Sparkles,
    Shapes,
    Layers,
    Search,
    Zap,
    Globe,
    Wifi
};

const MacHeader = ({ title, active = true }: { title: string, active?: boolean }) => (
    <div className={`flex items-center justify-between px-4 py-2.5 border-b border-[#313244] shrink-0 ${active ? 'bg-[#313244]/30' : 'bg-[#181825]/30'}`}>
        <div className="flex gap-1.5">
            <div className="mac-btn bg-[#f38ba8]/80" />
            <div className="mac-btn bg-[#f9e2af]/80" />
            <div className="mac-btn bg-[#a6e3a1]/80" />
        </div>
        <div className="text-[10px] font-black tracking-[0.2em] text-[#a6adc8] uppercase opacity-80 select-none leading-none max-w-[60%] truncate">{title}</div>
        <div className="w-12" />
    </div>
);

const SidebarProfile = () => {
    const stats = [
        { icon: <Activity size={14} />, label: "Status", value: "Online", color: "text-[#a6e3a1]" },
        { icon: <MapPin size={14} />, label: "Location", value: "Hanoi, VN", color: "text-[#fab387]" },
        { icon: <Briefcase size={14} />, label: "Work", value: "Available", color: "text-[#89b4fa]" }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-col items-center">
                <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] rounded-2xl opacity-40 group-hover:opacity-100 blur transition duration-500"></div>
                    <div className="relative w-24 h-24 rounded-2xl bg-[#11111b] flex items-center justify-center overflow-hidden border-2 border-[#313244] transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-hover:border-[#cba6f7]/50 shadow-2xl">
                        <User size={44} className="text-[#cba6f7] group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#cba6f7]/5 to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-linear pointer-events-none" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#a6e3a1] rounded-lg border-4 border-[#181825] shadow-lg shadow-[#a6e3a1]/20 status-active z-20" />
                </div>

                <div className="mt-6 text-center">
                    <h2 className="text-xl font-black text-[#cdd6f4] tracking-tight group-hover:text-[#cba6f7] transition-colors leading-tight">Hoàng <span className="text-[#cba6f7]">.sh</span></h2>
                    <div className="flex items-center gap-2 justify-center mt-1">
                        <span className="w-2 h-0.5 bg-[#45475a]" />
                        <p className="text-[10px] text-[#9399b2] uppercase font-bold tracking-[0.15em] leading-none">Main Execution Thread</p>
                        <span className="w-2 h-0.5 bg-[#45475a]" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {stats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#1e1e2e]/50 rounded-xl border border-[#313244]/50 hover:bg-[#313244]/30 transition-all group/stat">
                        <div className="flex items-center gap-3">
                            <div className={`${stat.color} opacity-70 group-hover/stat:opacity-100 transition-opacity`}>{stat.icon}</div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#6c7086] leading-none">{stat.label}</span>
                        </div>
                        <span className={`text-xs font-bold ${stat.color} opacity-90 leading-none`}>{stat.value}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#45475a] ml-1 leading-none">Connectivity</div>
                <div className="flex justify-between px-2 text-[#a6adc8]">
                    <Github className="cursor-pointer hover:text-[#cba6f7] transition-all hover:-translate-y-1" size={18} />
                    <Globe className="cursor-pointer hover:text-[#89b4fa] transition-all hover:-translate-y-1" size={18} />
                    <Settings className="cursor-pointer hover:text-[#f9e2af] transition-all hover:-translate-y-1" size={18} />
                    <Briefcase className="cursor-pointer hover:text-[#fab387] transition-all hover:-translate-y-1" size={18} />
                </div>
            </div>
        </div>
    );
};

export const App: React.FC = () => {
    const [mode, setMode] = useState<AppMode>(AppMode.TERMINAL);
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
    const [focusedTile, setFocusedTile] = useState<'sidebar' | 'main'>('main');

    // Command History Logic
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState(-1);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    useEffect(() => {
        handleNeofetch();
    }, []);

    const addLine = (type: TerminalLine['type'], content: string | React.ReactNode) => {
        setHistory(prev => [...prev, { id: Math.random().toString(36).substring(2, 11), type, content }]);
    };

    const getGhostText = (input: string) => {
        if (!input) return '';
        const suggestion = VALID_COMMANDS.find(cmd => cmd.startsWith(input.toLowerCase()));
        if (suggestion && suggestion !== input.toLowerCase()) {
            return suggestion.slice(input.length);
        }
        return '';
    };

    const isCommandValid = (input: string) => {
        if (!input) return true;
        const baseCmd = input.trim().split(' ')[0].toLowerCase();
        return VALID_COMMANDS.includes(baseCmd);
    };

    const handleNeofetch = () => {
        const iconMap: Record<string, React.ReactNode> = {
            os: <Monitor size={14} />,
            host: <Server size={14} />,
            kernel: <Settings size={14} />,
            uptime: <Clock size={14} />,
            packages: <Package size={14} />,
            shell: <TerminalIcon size={14} />,
            resolution: <Maximize size={14} />,
            wm: <Layers size={14} />,
            cpu: <Cpu size={14} />,
            gpu: <Zap size={14} />,
            memory: <Database size={14} />
        };

        const userInfo = NEOFETCH_INFO.user.split('@');

        addLine('output', (
            <div className="flex flex-col md:flex-row gap-8 lg:gap-14 items-center py-6 font-mono animate-in fade-in slide-in-from-left-4 duration-700 max-w-full overflow-hidden px-4 md:px-2">
                <div className="relative shrink-0 group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 rounded-3xl overflow-hidden border-2 border-[#313244] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                        <img 
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=400&h=400" 
                            alt="System User"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11111b]/80 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 min-w-0 flex-1 w-full text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-3 justify-center md:justify-start">
                        <div className="text-3xl md:text-4xl font-black text-[#cba6f7] tracking-tighter truncate leading-none">
                            {userInfo[0] || 'guest'}
                        </div>
                        <div className="text-sm md:text-base font-bold text-[#6c7086] tracking-widest uppercase mb-0.5">
                            @{userInfo[1] || 'macos'}
                        </div>
                    </div>
          
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#45475a] via-[#313244] to-transparent mb-6 opacity-50"></div>
          
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2.5">
                        {Object.entries(NEOFETCH_INFO).map(([key, value]) => {
                            if (key === 'user') return null;
                            return (
                                <div key={key} className="flex gap-4 text-xs md:text-sm items-center group/item justify-center md:justify-start">
                                    <span className="text-[#89b4fa] flex items-center gap-2.5 font-bold w-32 shrink-0 leading-none">
                                        <span className="opacity-70 group-hover/item:opacity-100 transition-opacity text-[#cba6f7]">
                                            {iconMap[key] || <Settings size={14} />}
                                        </span>
                                        <span className="capitalize tracking-tight opacity-80">{key}</span>
                                    </span>
                                    <span className="text-[#cdd6f4] opacity-90 group-hover/item:opacity-100 transition-opacity truncate leading-none">
                                        {value}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex gap-2.5 justify-center md:justify-start">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                            <div key={i} className="w-8 md:w-10 h-5 md:h-6 rounded-lg shadow-lg border border-white/5 transition-all hover:-translate-y-1 cursor-default active:scale-90" style={{
                                backgroundColor: i === 0 ? '#313244' : i === 1 ? '#f38ba8' : i === 2 ? '#a6e3a1' : i === 3 ? '#f9e2af' : i === 4 ? '#89b4fa' : i === 5 ? '#cba6f7' : i === 6 ? '#94e2d5' : '#cdd6f4'
                            }}></div>
                        ))}
                    </div>
                </div>
            </div>
        ));
    };

    const handleCommand = async (cmd: string) => {
        const fullCmd = cmd.trim();
        if (!fullCmd) return;

        // Add to local history list
        setCmdHistory(prev => [fullCmd, ...prev]);
        setHistoryPointer(-1);

        addLine('command', (
            <div className="flex gap-2 items-center">
                <span className="text-[#a6e3a1] font-bold">➜</span>
                <span className="text-[#89b4fa] font-bold">~</span>
                <span className="text-[#cdd6f4]">{fullCmd}</span>
            </div>
        ));
        setInputValue('');

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
                    { cmd: 'read [id]', desc: 'Stream specific record', icon: <BookOpen size={14} className="text-[#fab387]" /> },
                    { cmd: 'ai [query]', desc: 'Query Meow-Bot (Legacy AI)', icon: <Sparkles size={14} className="text-[#f5c2e7]" /> },
                    { cmd: 'clear', desc: 'Purge terminal buffer', icon: <Trash2 size={14} className="text-[#94e2d5]" /> }
                ];
        
                addLine('info', (
                    <div className="py-2 font-mono animate-in fade-in duration-500">
                        <div className="flex items-center gap-2 mb-4 border-b border-[#313244] pb-2">
                            <Terminal size={16} className="text-[#cba6f7]" />
                            <span className="text-[#cba6f7] font-black uppercase tracking-[0.2em] text-xs leading-none">System Commands Interface v2.5</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                            {helpMap.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-default">
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
                addLine('info', (
                    <div className="py-4 font-mono animate-in fade-in duration-700 max-w-full">
                        <div className="flex items-center gap-3 mb-4 border-b border-[#313244] pb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#cba6f7]/10 flex items-center justify-center">
                                <User size={20} className="text-[#cba6f7]" />
                            </div>
                            <div>
                                <span className="text-[#cba6f7] font-black uppercase tracking-[0.2em] text-sm block leading-none">System Entity: Hoàng .sh</span>
                                <span className="text-[#6c7086] text-[10px] uppercase font-bold tracking-widest mt-1 block leading-none">Full-stack Developer & Web3 Enthusiast</span>
                            </div>
                        </div>

                        <div className="mb-6 text-sm text-[#bac2de] leading-relaxed italic border-l-2 border-[#cba6f7] pl-4 py-1">
                            "{skillsData.bio}"
                        </div>
            
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            {skillsData.categories.map((cat) => {
                                const IconComp = ICON_MAP[cat.icon] || Server;
                                return (
                                    <div key={cat.id} className="flex flex-col gap-2">
                                        <div className={`flex items-center gap-2 ${cat.color}`}>
                                            <IconComp size={14} className="shrink-0" /> 
                                            <span className="font-black tracking-widest uppercase text-[11px]">{cat.title}</span>
                                        </div>
                                        <div className="ml-4 text-[#a6adc8] space-y-1 text-xs">
                                            {cat.skills.map((skill, sIdx) => {
                                                const SkillIcon = ICON_MAP[skill.icon] || Code2;
                                                const isLast = sIdx === cat.skills.length - 1;
                                                return (
                                                    <div key={sIdx} className="flex items-center gap-2">
                                                        {isLast ? '└── ' : '├── '} 
                                                        <SkillIcon size={11} className={`${skill.iconColor} shrink-0`} /> 
                                                        {skill.label}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ));
                break;
            case 'neofetch': handleNeofetch(); break;
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
            case 'blog': setMode(AppMode.SEARCHING); break;
            case 'clear': setHistory([]); break;
            case 'ai':
                const query = args.join(' ');
                if (!query) { addLine('error', "usage: ai <prompt>"); return; }
        
                addLine('info', (
                    <div className="flex items-center gap-2">
                        <span className="animate-pulse text-[#f5e0dc]">Thinking... [Mainframe Busy]</span>
                    </div>
                ));
        
                // Randomize delay between 1000ms and 3000ms
                const randomDelay = Math.floor(Math.random() * 2000) + 1000;
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
                if (p) { setCurrentPost(p); setMode(AppMode.READING); } 
                else addLine('error', `ERR: Record (ID:${id}) not found in data lake.`);
                break;
            default:
                addLine('error', `zsh: command not found: ${baseCmd}`);
        }
    };

    const handleCategoryClick = (category: string) => {
        setSearchQuery(category);
        setMode(AppMode.SEARCHING);
        setCurrentPage(1);
    };

    const filteredPosts = MOCK_POSTS.filter(post => {
        const searchLower = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchLower) || 
            post.categories.some(cat => cat.toLowerCase().includes(searchLower))
        );
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const getFooterTheme = () => {
        if (focusedTile === 'sidebar') {
            return { color: 'bg-[#fab387]', hex: '#fab387', text: 'SIDEBAR', icon: <Layout size={12} className="text-[#11111b] shrink-0" /> };
        }
        switch (mode) {
            case AppMode.TERMINAL: return { color: 'bg-[#cba6f7]', hex: '#cba6f7', text: 'TERMINAL', icon: <TerminalIcon size={12} className="text-[#11111b] shrink-0" /> };
            case AppMode.SEARCHING: return { color: 'bg-[#a6e3a1]', hex: '#a6e3a1', text: 'EXPLORER', icon: <Search size={12} className="text-[#11111b] shrink-0" /> };
            case AppMode.READING: return { color: 'bg-[#89b4fa]', hex: '#89b4fa', text: 'READING', icon: <BookOpen size={12} className="text-[#11111b] shrink-0" /> };
            default: return { color: 'bg-[#cba6f7]', hex: '#cba6f7', text: 'TERMINAL', icon: <TerminalIcon size={12} className="text-[#11111b] shrink-0" /> };
        }
    };

    const footerTheme = getFooterTheme();

    const handleAutocomplete = () => {
        const ghost = getGhostText(inputValue);
        if (ghost) setInputValue(inputValue + ghost);
    };

    const handleArrowUp = () => {
        if (cmdHistory.length > 0) {
            const nextIndex = historyPointer + 1;
            if (nextIndex < cmdHistory.length) {
                setHistoryPointer(nextIndex);
                setInputValue(cmdHistory[nextIndex]);
            }
        }
    };

    const handleArrowDown = () => {
        if (historyPointer > 0) {
            const nextIndex = historyPointer - 1;
            setHistoryPointer(nextIndex);
            setInputValue(cmdHistory[nextIndex]);
        } else if (historyPointer === 0) {
            setHistoryPointer(-1);
            setInputValue('');
        }
    };

    const getWindowTitle = () => {
        if (mode === AppMode.TERMINAL) return "zsh — terminal";
        if (mode === AppMode.READING && currentPost) return `reading — ${currentPost.title}`;
        return "archive_viewer — KnowledgeBase";
    };

    return (
        <div className="h-screen flex flex-col p-4 md:p-5 bg-[#11111b] gap-4 overflow-hidden" onClick={() => setFocusedTile('main')}>
            <nav className="h-9 bg-[#1e1e2e]/80 backdrop-blur-md rounded-xl flex items-center justify-between px-6 border border-[#313244] shadow-lg shrink-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-[#cba6f7]">
                        <Command size={14} className="animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] leading-none">Workspace_01</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-[9px] text-[#a6adc8] font-black tracking-[0.2em]">
                        <span className={`cursor-pointer transition-all leading-none ${mode === AppMode.TERMINAL ? 'text-[#cba6f7] underline underline-offset-4' : 'hover:text-[#cdd6f4]'}`} onClick={() => setMode(AppMode.TERMINAL)}>TERMINAL</span>
                        <span className={`cursor-pointer transition-all leading-none ${mode !== AppMode.TERMINAL ? 'text-[#cba6f7] underline underline-offset-4' : 'hover:text-[#cdd6f4]'}`} onClick={() => setMode(AppMode.SEARCHING)}>KNOWLEDGE_BASE</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-[#a6adc8] text-[10px] font-mono">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#313244]/50 rounded-full border border-[#45475a]/50 leading-none">
                        <Cpu size={12} className="text-[#a6e3a1]" /> 1.8%
                    </div>
                    <div className="font-bold opacity-80 leading-none">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            </nav>

            <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
                <aside 
                    className={`hidden lg:flex w-72 flex-col hypr-tile shrink-0 overflow-hidden ${focusedTile === 'sidebar' ? 'hypr-tile-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setFocusedTile('sidebar'); }}
                >
                    <MacHeader title="sys_info — guest" active={focusedTile === 'sidebar'} />
                    <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
                        <SidebarProfile />
                    </div>
                </aside>

                <main 
                    className={`flex-1 flex flex-col hypr-tile overflow-hidden min-w-0 min-h-0 ${focusedTile === 'main' ? 'hypr-tile-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setFocusedTile('main'); }}
                >
                    <MacHeader title={getWindowTitle()} active={focusedTile === 'main'} />
          
                    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                        {mode === AppMode.TERMINAL && (
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 mono text-sm leading-relaxed scrollbar-hide flex flex-col min-h-0">
                                <div className="flex-1 flex flex-col min-h-0">
                                    <div className="space-y-1">
                                        {history.map(line => (
                                            <div key={line.id} className={`animate-in fade-in slide-in-from-left-2 duration-300 ${line.type === 'error' ? 'text-[#f38ba8]' : 
                                                    line.type === 'info' ? 'text-[#89b4fa]' : 
                                                        line.type === 'success' ? 'text-[#a6e3a1]' : 'text-[#cdd6f4]'
                                                }`}>
                                                {line.content}
                                            </div>
                                        ))}
                                        <div ref={terminalEndRef} className="h-px w-full"></div>
                                    </div>
                  
                                    <div className="mt-4 mb-2 pb-6 flex gap-3 items-center shrink-0">
                                        <span className="text-[#a6e3a1] font-bold">➜</span>
                                        <span className="text-[#89b4fa] font-bold">~</span>
                                        <div className="relative flex-1 group">
                                            {/* Ghost Text Layer */}
                                            <div className="absolute inset-0 flex items-center pointer-events-none text-[#6c7086] opacity-50 whitespace-pre">
                                                <span>{inputValue}</span>
                                                <span>{getGhostText(inputValue)}</span>
                                            </div>
                      
                                            {/* Real Input Layer */}
                                            <input 
                                                ref={inputRef}
                                                autoFocus
                                                className={`relative z-10 bg-transparent border-none outline-none w-full placeholder-[#45475a] caret-[#cba6f7] transition-colors duration-200 ${!inputValue ? 'text-[#cdd6f4]' : (isCommandValid(inputValue) ? 'text-[#a6e3a1]' : 'text-[#f38ba8]')
                                                    }`}
                                                placeholder="Type 'help'..."
                                                value={inputValue}
                                                onChange={e => setInputValue(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') {
                                                        handleCommand(inputValue);
                                                    } else if (e.key === 'Tab') {
                                                        e.preventDefault();
                                                        handleAutocomplete();
                                                    } else if (e.key === 'ArrowRight') {
                                                        // Only autocomplete if cursor is at the end of the text
                                                        if (inputRef.current && inputRef.current.selectionStart === inputValue.length) {
                                                            const ghost = getGhostText(inputValue);
                                                            if (ghost) {
                                                                e.preventDefault();
                                                                handleAutocomplete();
                                                            }
                                                        }
                                                    } else if (e.key === 'ArrowUp') {
                                                        e.preventDefault();
                                                        handleArrowUp();
                                                    } else if (e.key === 'ArrowDown') {
                                                        e.preventDefault();
                                                        handleArrowDown();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mode === AppMode.SEARCHING && (
                            <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col bg-[#1e1e2e]/50 animate-in zoom-in-95 duration-500 scrollbar-hide min-h-0">
                                <div className="flex flex-col md:flex-row justify-between gap-8 mb-16 shrink-0">
                                    <div>
                                        <h1 className="text-4xl font-black text-[#cdd6f4] mb-3 uppercase tracking-tighter">Knowledge Archive</h1>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-0.5 bg-[#cba6f7]"></div>
                                            <p className="text-[#9399b2] text-[10px] font-black uppercase tracking-[0.25em] leading-none">Centralized Metadata Hub</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="w-full md:w-80 bg-[#11111b]/80 rounded-xl flex items-center px-5 border border-[#313244] focus-within:border-[#cba6f7] transition-all">
                                            <Search size={16} className="text-[#6c7086] mr-3" />
                                            <input 
                                                className="bg-transparent py-3.5 w-full outline-none text-xs text-[#cdd6f4] placeholder-[#45475a]" 
                                                placeholder="Scan datastore or category..."
                                                value={searchQuery}
                                                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                                    {currentPosts.map(post => (
                                        <div 
                                            key={post.id} 
                                            className="group p-6 bg-[#181825]/40 rounded-2xl border border-[#313244]/50 hover:border-[#cba6f7]/40 hover:bg-[#313244]/20 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full hover:-translate-y-1 shadow-sm"
                                            onClick={() => { setCurrentPost(post); setMode(AppMode.READING); }}
                                        >
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.categories.map(cat => (
                                                    <span 
                                                        key={cat} 
                                                        onClick={(e) => { e.stopPropagation(); handleCategoryClick(cat); }}
                                                        className="text-[8px] font-black px-2 py-0.5 rounded bg-[#cba6f7]/10 text-[#cba6f7] uppercase tracking-wider leading-none hover:bg-[#cba6f7] hover:text-[#11111b] transition-colors"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#cdd6f4] mb-3 leading-tight tracking-tight group-hover:text-[#cba6f7] transition-colors">{post.title}</h3>
                                            <p className="text-xs text-[#9399b2] line-clamp-2 mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#313244]/30 text-[9px] font-black uppercase text-[#6c7086]">
                                                <span className="group-hover:text-[#cba6f7] transition-colors tracking-widest leading-none">Read Document</span>
                                                <span className="leading-none flex items-center gap-1.5"><Clock size={10} /> {post.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-auto py-10 flex items-center justify-center gap-6">
                                        <button 
                                            disabled={currentPage === 1}
                                            onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p - 1); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#313244]/40 hover:bg-[#cba6f7] transition-all disabled:opacity-10 group/btn"
                                        >
                                            <ChevronLeft size={16} className="text-[#a6adc8] group-hover/btn:text-[#11111b]" />
                                        </button>
                                        <span className="text-[10px] font-black font-mono text-[#6c7086] tracking-widest leading-none">{currentPage} / {totalPages}</span>
                                        <button 
                                            disabled={currentPage === totalPages}
                                            onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p + 1); }}
                                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#313244]/40 hover:bg-[#cba6f7] transition-all disabled:opacity-10 group/btn"
                                        >
                                            <ChevronRight size={16} className="text-[#a6adc8] group-hover/btn:text-[#11111b]" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {mode === AppMode.READING && currentPost && (
                            <div className="flex-1 overflow-y-auto p-8 md:p-16 bg-[#1e1e2e]/30 animate-in slide-in-from-right-4 duration-500 scrollbar-hide">
                                <div className="max-w-4xl mx-auto">
                                    <button 
                                        onClick={() => setMode(AppMode.SEARCHING)}
                                        className="mb-8 flex items-center gap-2 text-[10px] font-black text-[#6c7086] hover:text-[#cba6f7] transition-all uppercase tracking-widest leading-none"
                                    >
                                        <ChevronLeft size={14} /> Back to Archive
                                    </button>

                                    <div className="mb-10 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#181825] border border-[#313244] text-[#a6adc8] text-[10px] font-black uppercase tracking-widest leading-none">
                                            <Calendar size={12} className="text-[#cba6f7]" /> {currentPost.date}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentPost.categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => handleCategoryClick(cat)}
                                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cba6f7]/10 border border-[#cba6f7]/20 text-[#cba6f7] text-[10px] font-black uppercase tracking-widest leading-none hover:bg-[#cba6f7] hover:text-[#11111b] transition-all"
                                                >
                                                    <Tag size={10} /> {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                  
                                    <MarkdownRenderer content={currentPost.content} />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <footer className="h-7 flex justify-between items-center bg-[#181825] rounded-lg border border-[#313244] overflow-hidden shrink-0 shadow-2xl">
                <div className="flex h-full items-center overflow-hidden">
                    <div className={`${footerTheme.color} h-full px-4 flex items-center justify-center gap-2 transition-all duration-500 shrink-0`}>
                        {footerTheme.icon}
                        <span className="text-[10px] font-black text-[#11111b] uppercase tracking-widest leading-none">{footerTheme.text}</span>
                    </div>
          
                    <div 
                        className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[14px] transition-colors duration-500 shrink-0 bg-[#1e1e2e]" 
                        style={{ borderLeftColor: footerTheme.hex }}
                    ></div>

                    <div className="flex items-center justify-center gap-4 px-5 h-full bg-[#1e1e2e] shrink-0">
                        <span className="text-[9px] font-black text-[#cba6f7] flex items-center leading-none hidden sm:inline-flex">
                            <span className="opacity-50 text-[#cdd6f4] mr-1">~</span>/dev/portfolio
                        </span>
                        <div className="flex items-center justify-center gap-2 h-full text-[9px] text-[#a6e3a1] font-mono whitespace-nowrap">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1] animate-pulse shadow-[0_0_5px_rgba(166,227,161,0.5)] shrink-0"></div>
                            <span className="leading-none tracking-wider font-bold">SYSTEM_READY</span>
                        </div>
                    </div>
          
                    <div className="w-0 h-0 border-y-[14px] border-y-transparent border-l-[14px] border-l-[#1e1e2e] shrink-0 bg-[#181825]"></div>
          
                    <div className="px-4 text-[9px] font-black text-[#6c7086] uppercase tracking-widest hidden md:flex items-center justify-center whitespace-nowrap h-full leading-none overflow-hidden truncate">
                        <span className="hidden lg:inline mr-1.5 opacity-60">Hoàng@sh:</span>
                        <span className="text-[#89b4fa] leading-none">Main-Thread</span>
                    </div>
                </div>

                <div className="flex h-full items-center shrink-0">
                    <div className="hidden xl:flex items-center justify-center gap-2 px-4 h-full border-r border-[#313244]">
                        <span className="text-[9px] font-black text-[#9399b2] uppercase leading-none">Bot_Active</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-5 px-3 sm:px-5 h-full bg-[#1e1e2e]/50">
                        <div className="flex items-center justify-center gap-1.5 h-full">
                            <Cpu size={11} className="text-[#f38ba8] shrink-0" />
                            <span className="text-[9px] font-mono text-[#cdd6f4] font-bold leading-none">1.2G</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 h-full hidden sm:flex">
                            <div className="flex items-center justify-center gap-1.5 h-full">
                                <Database size={11} className="text-[#f9e2af] shrink-0" />
                                <span className="text-[9px] font-mono text-[#cdd6f4] font-bold leading-none">24ms</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 h-full">
                            <Wifi size={11} className="text-[#a6e3a1] shrink-0" />
                            <span className="text-[9px] font-mono text-[#cdd6f4] font-bold leading-none">1Gbps</span>
                        </div>
                    </div>

                    <div className="bg-[#313244] h-full px-4 flex items-center justify-center gap-4">
                        <div className="flex items-center justify-center gap-1.5 whitespace-nowrap h-full">
                            <GitBranch size={11} className="text-[#fab387] shrink-0" />
                            <span className="text-[9px] font-black text-[#cdd6f4] leading-none">main</span>
                        </div>
                        <span className="text-[9px] font-black text-[#9399b2] hidden lg:inline-flex items-center justify-center whitespace-nowrap leading-none h-full">UTF-8</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
