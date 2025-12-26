import React from 'react';
import { Cpu, Database, Wifi, GitBranch } from 'lucide-react';

interface FooterProps {
    footerTheme: {
        color: string;
        hex: string;
        text: string;
        icon: React.ReactNode;
    };
}

export const Footer: React.FC<FooterProps> = ({ footerTheme }) => {
    return (
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
    );
};
