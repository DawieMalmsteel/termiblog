import React from 'react';
import { Terminal, LayoutGrid, Cpu, Calendar, Wifi, Volume2, Battery } from 'lucide-react';
import { AppMode } from '../types';

interface NavigationBarProps {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ mode, setMode }) => {
    const batteryLevel = 85;
    
    return (
        <nav className="h-8 md:h-9 bg-[#1e1e2e] rounded-xl flex items-center justify-between px-3 md:px-4 border border-[#313244] shadow-lg shrink-0 z-50 overflow-hidden">
            {/* Left Section - Workspaces/Modes */}
            <div className="flex items-center gap-1 md:gap-2">
                {/* Terminal Mode */}
                <button
                    onClick={() => setMode(AppMode.TERMINAL)}
                    className={`flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-lg transition-all ${
                        mode === AppMode.TERMINAL 
                            ? 'bg-[#cba6f7]/20 text-[#cba6f7] border border-[#cba6f7]/30' 
                            : 'text-[#6c7086] hover:bg-[#313244]/50 hover:text-[#a6adc8]'
                    }`}
                >
                    <Terminal size={14} className="shrink-0" />
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider leading-none hidden sm:inline">Term</span>
                </button>

                {/* Explorer Mode */}
                <button
                    onClick={() => setMode(AppMode.SEARCHING)}
                    className={`flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-lg transition-all ${
                        mode === AppMode.SEARCHING || mode === AppMode.READING
                            ? 'bg-[#a6e3a1]/20 text-[#a6e3a1] border border-[#a6e3a1]/30' 
                            : 'text-[#6c7086] hover:bg-[#313244]/50 hover:text-[#a6adc8]'
                    }`}
                >
                    <LayoutGrid size={14} className="shrink-0" />
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider leading-none hidden sm:inline">Blog</span>
                </button>
            </div>

            {/* Center Section - Window Title (hidden on small screens) */}
            <div className="hidden md:flex items-center gap-2 text-[#9399b2] text-[10px] md:text-[11px] font-mono tracking-wide">
                <span className="opacity-60">~</span>
                <span className="font-bold">/dev/portfolio</span>
            </div>

            {/* Right Section - System Tray */}
            <div className="flex items-center gap-1.5 md:gap-3">
                {/* Volume (hidden on mobile) */}
                <div className="hidden lg:flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#313244]/30 text-[#89b4fa]">
                    <Volume2 size={11} className="shrink-0" />
                    <span className="text-[8px] font-mono">75%</span>
                </div>

                {/* Network (hidden on mobile) */}
                <div className="hidden md:flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#313244]/30 text-[#a6e3a1]">
                    <Wifi size={11} className="shrink-0" />
                </div>

                {/* CPU */}
                <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#313244]/30 text-[#f38ba8]">
                    <Cpu size={11} className="shrink-0" />
                    <span className="text-[8px] font-mono hidden sm:inline">2%</span>
                </div>

                {/* Battery (hidden on small mobile) */}
                <div className="hidden sm:flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#313244]/30 text-[#f9e2af]">
                    <Battery size={11} className="shrink-0" />
                    <span className="text-[8px] font-mono">{batteryLevel}%</span>
                </div>

                {/* Time */}
                <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-md bg-[#313244]/30 text-[#cba6f7]">
                    <Calendar size={11} className="shrink-0" />
                    <span className="text-[8px] font-mono font-bold">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </nav>
    );
};
