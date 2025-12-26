import React, { useState, useRef, useEffect } from 'react';
import { User, X } from 'lucide-react';
import { SidebarProfile } from './SidebarProfile';

interface FloatingSidebarToggleProps {
    isVisible?: boolean;
    onToggle?: () => void;
}

export const FloatingSidebarToggle: React.FC<FloatingSidebarToggleProps> = ({ 
    isVisible = false,
    onToggle 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Set initial position (bottom-right)
        const updatePosition = () => {
            setPosition({
                x: window.innerWidth - 72, // 4rem (16px) from right + 56px button width
                y: window.innerHeight - 96  // bottom-20 (80px) + 16px
            });
        };
        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        const touch = e.touches[0];
        setDragStart({
            x: touch.clientX - position.x,
            y: touch.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - 56));
        const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 56));
        
        setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const newX = Math.max(0, Math.min(touch.clientX - dragStart.x, window.innerWidth - 56));
        const newY = Math.max(0, Math.min(touch.clientY - dragStart.y, window.innerHeight - 56));
        
        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleMouseUp);
            
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleMouseUp);
            };
        }
    }, [isDragging, dragStart]);

    const handleClick = (e: React.MouseEvent) => {
        // Only open if not dragging (small threshold for click vs drag)
        if (Math.abs(e.clientX - (position.x + dragStart.x)) < 5 && 
            Math.abs(e.clientY - (position.y + dragStart.y)) < 5) {
            if (onToggle) {
                onToggle();
            } else {
                setIsOpen(true);
            }
        }
    };

    // Show on mobile OR when sidebar is hidden/minimized on desktop
    const shouldShow = window.innerWidth < 1024 || isVisible;

    if (!shouldShow) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                ref={buttonRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onClick={handleClick}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
                className={`${window.innerWidth >= 1024 && !isVisible ? 'hidden' : 'fixed'} z-50 w-14 h-14 rounded-full group ${isDragging ? 'scale-110' : ''} transition-transform duration-200`}
            >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] p-[2px] shadow-lg shadow-[#cba6f7]/30 group-hover:shadow-[#cba6f7]/50 transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-[#1e1e2e] flex items-center justify-center">
                        {/* Gradient Icon */}
                        <div className="bg-gradient-to-br from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] bg-clip-text">
                            <User size={24} className="text-transparent" style={{ 
                                filter: 'drop-shadow(0 0 8px rgba(203, 166, 247, 0.3))',
                                stroke: 'url(#icon-gradient)'
                            }} />
                        </div>
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#cba6f7" />
                                    <stop offset="50%" stopColor="#89b4fa" />
                                    <stop offset="100%" stopColor="#a6e3a1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#cba6f7] via-[#89b4fa] to-[#a6e3a1] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </button>

            {/* Overlay */}
            {isOpen && !onToggle && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            {!onToggle && (
                <aside
                    className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1e1e2e] border-l border-[#313244] z-[70] transition-transform duration-300 shadow-2xl ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#313244]">
                        <div className="text-[10px] font-black tracking-[0.2em] text-[#cba6f7] uppercase">Profile</div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-lg bg-[#313244]/50 hover:bg-[#313244] flex items-center justify-center transition-colors"
                        >
                            <X size={16} className="text-[#a6adc8]" />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto h-[calc(100%-60px)] scrollbar-hide">
                        <SidebarProfile />
                    </div>
                </aside>
            )}
        </>
    );
};
