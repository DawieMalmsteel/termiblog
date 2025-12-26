import React from 'react';
import { Activity, MapPin, Briefcase, User, Github, Globe, Settings } from 'lucide-react';

export const SidebarProfile = () => {
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
