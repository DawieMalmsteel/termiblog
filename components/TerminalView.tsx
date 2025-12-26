import React, { useRef, useEffect } from 'react';
import { TerminalLine } from '../types';

interface TerminalViewProps {
    history: TerminalLine[];
    inputValue: string;
    setInputValue: (value: string) => void;
    handleCommand: (cmd: string) => void;
    getGhostText: (input: string) => string;
    isCommandValid: (input: string) => boolean;
    handleAutocomplete: () => void;
    handleArrowUp: () => void;
    handleArrowDown: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
    history,
    inputValue,
    setInputValue,
    handleCommand,
    getGhostText,
    isCommandValid,
    handleAutocomplete,
    handleArrowUp,
    handleArrowDown
}) => {
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

    return (
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
    );
};
