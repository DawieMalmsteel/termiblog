import React from 'react';
import { Minimize2, Square, X, Home, ArrowLeft, ArrowRight } from 'lucide-react';

interface MacHeaderProps {
  title: string;
  active?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showControls?: boolean;
  variant?: 'default' | 'blog' | 'terminal';
}

export const MacHeader = ({ 
  title, 
  active = true, 
  onClose, 
  onMinimize, 
  onMaximize,
  showControls = true,
  variant = 'default'
}: MacHeaderProps) => {
  const renderButtons = () => {
    if (variant === 'blog') {
      return (
        <>
          <button 
            onClick={onClose}
            className="mac-btn bg-[#f38ba8]/80 hover:bg-[#f38ba8] transition-all relative overflow-hidden group/close"
            title="Home"
          >
            <Home size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
          <button 
            onClick={onMinimize}
            className="mac-btn bg-[#f9e2af]/80 hover:bg-[#f9e2af] transition-all relative overflow-hidden group/min"
            title="Back"
          >
            <ArrowLeft size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
          <button 
            onClick={onMaximize}
            className="mac-btn bg-[#a6e3a1]/80 hover:bg-[#a6e3a1] transition-all relative overflow-hidden group/max"
            title="Forward"
          >
            <ArrowRight size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
        </>
      );
    }
    
    if (variant === 'terminal') {
      return (
        <>
          <button 
            onClick={onClose}
            className="mac-btn bg-[#f38ba8]/80 hover:bg-[#f38ba8] transition-all relative overflow-hidden group/close"
            title="Clear"
          >
            <X size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
          </button>
          <button 
            className="mac-btn bg-[#f9e2af]/80 cursor-default"
            title="No action"
          >
            <Minimize2 size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0" />
          </button>
          <button 
            className="mac-btn bg-[#a6e3a1]/80 cursor-default"
            title="No action"
          >
            <Square size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0" />
          </button>
        </>
      );
    }
    
    return (
      <>
        <button 
          onClick={onClose}
          className="mac-btn bg-[#f38ba8]/80 hover:bg-[#f38ba8] transition-all relative overflow-hidden group/close"
          title="Close"
        >
          <X size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
        </button>
        <button 
          onClick={onMinimize}
          className="mac-btn bg-[#f9e2af]/80 hover:bg-[#f9e2af] transition-all relative overflow-hidden group/min"
          title="Minimize"
        >
          <Minimize2 size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
        </button>
        <button 
          onClick={onMaximize}
          className="mac-btn bg-[#a6e3a1]/80 hover:bg-[#a6e3a1] transition-all relative overflow-hidden group/max"
          title="Maximize"
        >
          <Square size={8} className="absolute inset-0 m-auto text-[#11111b] opacity-0 group-hover/btns:opacity-100 transition-opacity" />
        </button>
      </>
    );
  };

  return (
    <div className={`flex items-center justify-between px-4 py-2.5 border-b border-[#313244] shrink-0 ${active ? 'bg-[#313244]/30' : 'bg-[#181825]/30'}`}>
      <div className="flex gap-1.5 group/btns">
        {showControls ? renderButtons() : (
          <>
            <div className="mac-btn bg-[#f38ba8]/80" />
            <div className="mac-btn bg-[#f9e2af]/80" />
            <div className="mac-btn bg-[#a6e3a1]/80" />
          </>
        )}
      </div>
      <div className="text-[10px] font-black tracking-[0.2em] text-[#a6adc8] uppercase opacity-80 select-none leading-none max-w-[60%] truncate">{title}</div>
      <div className="w-12" />
    </div>
  );
};
