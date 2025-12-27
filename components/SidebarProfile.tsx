import React from 'react';
import {
    Activity, MapPin, Briefcase, User, Github, Globe, Settings,
    Linkedin, Twitter, Mail, Download, Code2, Terminal, Cpu, Database
} from 'lucide-react';
import { SOCIAL_LINKS, PROFILE_STATS, STACK_OVERVIEW } from '../constants';

const TechBadge = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#313244]/40 border border-[#45475a]/30 hover:bg-[#313244]/60 transition-colors group cursor-default">
        <Icon size={12} className={`${color} opacity-80 group-hover:opacity-100`} />
        <span className="text-[10px] font-medium text-[#a6adc8] group-hover:text-[#cdd6f4]">{label}</span>
    </div>
);

export const SidebarProfile = () => {
    // Map string identifiers from constants to actual Lucide components
    const iconMap: any = {
        Activity, MapPin, Briefcase, User, Github, Globe,
        Settings, Linkedin, Twitter, Mail, Download,
        Code2, Terminal, Cpu, Database
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Header / Avatar */}
            <div className="flex flex-col items-center">
                <div className="group relative cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] rounded-2xl opacity-40 group-hover:opacity-100 blur transition duration-500"></div>
                    <div className="relative w-28 h-28 rounded-2xl bg-[#11111b] flex items-center justify-center overflow-hidden border-2 border-[#313244] transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 group-hover:border-[#cba6f7]/50 shadow-2xl">
                        <User size={48} className="text-[#cba6f7] group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#cba6f7]/5 to-transparent h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s] ease-linear pointer-events-none" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#a6e3a1] rounded-lg border-4 border-[#181825] shadow-lg shadow-[#a6e3a1]/20 status-active z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#181825] rounded-full animate-ping opacity-75"></div>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <h2 className="text-xl font-black text-[#cdd6f4] tracking-tight group-hover:text-[#cba6f7] transition-colors leading-tight">Hoàng <span className="text-[#cba6f7]">.sh</span></h2>
                    <div className="flex items-center gap-2 justify-center mt-1.5 opacity-80 hover:opacity-100 transition-opacity">
                        <Terminal size={12} className="text-[#9399b2]" />
                        <p className="text-[11px] text-[#9399b2] font-mono font-medium tracking-wide">Full-stack Engineer</p>
                    </div>
                </div>
            </div>

            {/* Quick Stats from Constants */}
            <div className="grid grid-cols-1 gap-2">
                {PROFILE_STATS.map((stat, i) => {
                    const Icon = iconMap[stat.icon] || Activity;
                    return (
                        <div key={i} className="flex items-center justify-between p-3 bg-[#1e1e2e]/50 rounded-xl border border-[#313244]/50 hover:bg-[#313244]/50 transition-all group/stat">
                            <div className="flex items-center gap-3">
                                <div className={`${stat.color} opacity-70 group-hover/stat:opacity-100 transition-opacity bg-[#313244]/30 p-1.5 rounded-lg`}>
                                    <Icon size={14} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6c7086]">{stat.label}</span>
                            </div>
                            <span className={`text-xs font-bold ${stat.color} opacity-90`}>{stat.value}</span>
                        </div>
                    );
                })}
            </div>

            {/* Tech Stack Preview from Constants */}
            <div className="flex flex-col gap-2">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#585b70] ml-1">Stack Overview</div>
                <div className="flex flex-wrap gap-2">
                    {STACK_OVERVIEW.map((tech, i) => {
                        const Icon = iconMap[tech.icon] || Code2;
                        return (
                            <TechBadge key={i} icon={Icon} label={tech.label} color={tech.color} />
                        );
                    })}
                </div>
            </div>

            <div className="h-[1px] bg-[#313244]/50 w-full my-1"></div>

            {/* Social Links from Constants */}
            <div className="flex flex-col gap-3">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#585b70] ml-1">Connect</div>
                <div className="grid grid-cols-4 gap-2">
                    {SOCIAL_LINKS.map((link, i) => {
                        const Icon = iconMap[link.icon] || Globe;
                        return (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-[#313244]/20 border border-transparent hover:border-[#45475a] hover:bg-[#313244]/50 transition-all group/link"
                                title={link.label}
                            >
                                <Icon size={18} className={`${link.color} opacity-70 group-hover/link:opacity-100 group-hover/link:-translate-y-1 transition-all`} />
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Resume Button */}
            <button className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 rounded-xl bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] text-[#1e1e2e] font-bold text-xs shadow-lg shadow-[#cba6f7]/20 hover:shadow-[#cba6f7]/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <Download size={14} />
                <span>Download Resume</span>
            </button>
        </div>
    );
};
