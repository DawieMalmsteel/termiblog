import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronRight, ChevronDown, Code, Server, Cloud, Brain, Blocks } from 'lucide-react';

interface SubSkillNode {
    id: string;
    label: string;
}

interface CategoryNode {
    id: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    angle: number; // Degrees relative to Root
    distance: number; // px from EXTENDED Root
    skills: SubSkillNode[];
    childAngleBase?: number;
}

const useTransitionValue = (targetValue: number, duration: number = 500) => {
    const [value, setValue] = useState(targetValue);
    const frameRef = useRef<number>();
    const startTimeRef = useRef<number>();
    const startValueRef = useRef<number>(targetValue);

    useEffect(() => {
        startValueRef.current = value;
        startTimeRef.current = performance.now();

        const animate = (time: number) => {
            const elapsed = time - (startTimeRef.current || time);
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            const current = startValueRef.current + (targetValue - startValueRef.current) * ease;
            setValue(current);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [targetValue, duration]);

    return value;
};

export const InteractiveSkillTree: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTextExpanded, setIsTextExpanded] = useState(false);
    const [activeCategoryIds, setActiveCategoryIds] = useState<string[]>([]);
    const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

    // Node Drag State
    const [nodeOffsets, setNodeOffsets] = useState<Record<string, { x: number, y: number }>>({});
    const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
    const [dragStartMousePos, setDragStartMousePos] = useState({ x: 0, y: 0 });
    const [dragStartNodeOffset, setDragStartNodeOffset] = useState({ x: 0, y: 0 });

    const rootWidth = useTransitionValue(isExpanded ? 320 : 40, 500);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isCanvasDragging, setIsCanvasDragging] = useState(false);
    const [canvasStartPos, setCanvasStartPos] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

    const bio = "Building decentralized experiences and scalable architectures. Always curious about the intersection of AI, Web3, and human-centric design.";

    // Compact & Varied Layout
    // Reduced distances generally (was 220).
    // Staggered distances for organic feel.
    const categories: CategoryNode[] = [
        {
            id: 'cloud', label: 'Cloud & DevOps', icon: <Cloud size={16} />, color: '#89b4fa',
            angle: -80, distance: 150, // Short  
            childAngleBase: -10,
            skills: [
                { id: 'aws', label: 'AWS' },
                { id: 'docker', label: 'Docker' },
                { id: 'k8s', label: 'Kubernetes' },
                { id: 'terraform', label: 'Terraform' },
                { id: 'cicd', label: 'CI/CD' }
            ]
        },
        {
            id: 'ai', label: 'AI & Data', icon: <Brain size={16} />, color: '#f5c2e7',
            angle: -40, distance: 190, // Long
            childAngleBase: -5,
            skills: [
                { id: 'python', label: 'Python' },
                { id: 'pytorch', label: 'PyTorch' },
                { id: 'rag', label: 'RAG Systems' },
                { id: 'langchain', label: 'LangChain' },
                { id: 'hugface', label: 'HuggingFace' }
            ]
        },
        {
            id: 'backend', label: 'Backend', icon: <Server size={16} />, color: '#a6e3a1',
            angle: 0, distance: 140, // Shortest (Middle)
            childAngleBase: 0,
            skills: [
                { id: 'node', label: 'Node.js' },
                { id: 'go', label: 'Go' },
                { id: 'rust', label: 'Rust' },
                { id: 'postgres', label: 'PostgreSQL' },
                { id: 'redis', label: 'Redis' }
            ]
        },
        {
            id: 'web3', label: 'Web3', icon: <Blocks size={16} />, color: '#fab387',
            angle: 40, distance: 180, // Long
            childAngleBase: 5,
            skills: [
                { id: 'solidity', label: 'Solidity' },
                { id: 'ethereum', label: 'Ethereum' },
                { id: 'smart-contracts', label: 'Smart Contracts' },
                { id: 'hardhat', label: 'Hardhat' },
                { id: 'ipfs', label: 'IPFS' }
            ]
        },
        {
            id: 'frontend', label: 'Frontend', icon: <Code size={16} />, color: '#f38ba8',
            angle: 80, distance: 150, // Short
            childAngleBase: 10,
            skills: [
                { id: 'react', label: 'React' },
                { id: 'ts', label: 'TypeScript' },
                { id: 'next', label: 'Next.js' },
                { id: 'tailwind', label: 'Tailwind' },
                { id: 'framer', label: 'Framer Motion' }
            ]
        },
    ];

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 190;
        }
    }, []);

    useEffect(() => {
        if (!isExpanded) {
            setNodeOffsets({});
            setActiveCategoryIds([]);
            setIsTextExpanded(false);
        }
    }, [isExpanded]);

    const handleRootClick = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        } else {
            setIsExpanded(false);
        }
    };

    const handleTextClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsTextExpanded(!isTextExpanded);
    };

    const handleCategoryClick = (e: React.MouseEvent, catId: string) => {
        setActiveCategoryIds(current => {
            if (current.includes(catId)) {
                return current.filter(id => id !== catId);
            } else {
                return [...current, catId];
            }
        });
    };

    const onMouseDownContainer = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        if (draggingNodeId) return;

        setIsCanvasDragging(true);
        setCanvasStartPos({
            x: e.pageX - scrollContainerRef.current.offsetLeft,
            y: e.pageY - scrollContainerRef.current.offsetTop
        });
        setScrollPos({
            left: scrollContainerRef.current.scrollLeft,
            top: scrollContainerRef.current.scrollTop
        });
    };

    const onMouseDownNode = (e: React.MouseEvent, catId: string) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingNodeId(catId);
        setDragStartMousePos({ x: e.pageX, y: e.pageY });
        setDragStartNodeOffset(nodeOffsets[catId] || { x: 0, y: 0 });
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (draggingNodeId) {
            e.preventDefault();
            const dx = e.pageX - dragStartMousePos.x;
            const dy = e.pageY - dragStartMousePos.y;

            setNodeOffsets(prev => ({
                ...prev,
                [draggingNodeId]: {
                    x: dragStartNodeOffset.x + dx,
                    y: dragStartNodeOffset.y + dy
                }
            }));
            return;
        }

        if (isCanvasDragging && scrollContainerRef.current) {
            e.preventDefault();
            const x = e.pageX - scrollContainerRef.current.offsetLeft;
            const y = e.pageY - scrollContainerRef.current.offsetTop;
            const walkX = (x - canvasStartPos.x) * 1.5;
            const walkY = (y - canvasStartPos.y) * 1.5;
            scrollContainerRef.current.scrollLeft = scrollPos.left - walkX;
            scrollContainerRef.current.scrollTop = scrollPos.top - walkY;
        }
    };

    const onMouseUp = () => {
        setIsCanvasDragging(false);
        setDraggingNodeId(null);
    };

    const onMouseLeave = () => {
        setIsCanvasDragging(false);
        setDraggingNodeId(null);
    };

    return (
        <div
            className="w-full h-[320px] overflow-hidden relative cursor-grab active:cursor-grabbing border-y border-[#45475a]/30 bg-[#1e1e2e]/50 backdrop-blur-sm"
            ref={scrollContainerRef}
            onMouseDown={onMouseDownContainer}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
        >
            <div className="min-w-[1000px] h-[700px] relative pl-10 flex items-center select-none">

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    {categories.map((cat) => {
                        const originX = 40 + rootWidth;
                        const originY = 350;

                        const rad = cat.angle * (Math.PI / 180);
                        const baseX = originX + Math.cos(rad) * cat.distance;
                        const baseY = originY + Math.sin(rad) * cat.distance;

                        const offsetX = nodeOffsets[cat.id]?.x || 0;
                        const offsetY = nodeOffsets[cat.id]?.y || 0;

                        const catX = baseX + offsetX;
                        const catY = baseY + offsetY;

                        return (
                            <React.Fragment key={`group-${cat.id}`}>
                                <line
                                    x1={originX} y1={originY}
                                    x2={catX} y2={catY}
                                    stroke={cat.color} strokeWidth="2" strokeDasharray="4 4"
                                    style={{ opacity: isExpanded ? 0.4 : 0, transition: 'opacity 0.3s' }}
                                />
                                {cat.skills.map((skill, i) => {
                                    const isActive = activeCategoryIds.includes(cat.id);

                                    const baseAngle = cat.childAngleBase ?? 0;
                                    const spread = 18;
                                    const skillAngle = baseAngle + (i - (cat.skills.length - 1) / 2) * spread;

                                    const skillRad = skillAngle * (Math.PI / 180);
                                    const skillDist = 130;

                                    const skillX = catX + Math.cos(skillRad) * skillDist;
                                    const skillY = catY + Math.sin(skillRad) * skillDist;

                                    return (
                                        <line
                                            key={`line-${skill.id}`}
                                            x1={catX} y1={catY}
                                            x2={skillX} y2={skillY}
                                            stroke={cat.color} strokeWidth="1"
                                            style={{
                                                opacity: isActive ? 0.6 : 0,
                                                transition: 'opacity 0.3s',
                                                transformOrigin: `${catX}px ${catY}px`,
                                                transform: isActive ? 'scale(1)' : 'scale(0)'
                                            }}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </svg>

                {categories.map((cat) => {
                    const originX = 40 + rootWidth;
                    const originY = 350;
                    const rad = cat.angle * (Math.PI / 180);
                    const baseX = originX + Math.cos(rad) * cat.distance;
                    const baseY = originY + Math.sin(rad) * cat.distance;

                    const offsetX = nodeOffsets[cat.id]?.x || 0;
                    const offsetY = nodeOffsets[cat.id]?.y || 0;

                    const catX = baseX + offsetX;
                    const catY = baseY + offsetY;

                    const isActive = activeCategoryIds.includes(cat.id);

                    return (
                        <div key={cat.id} className="absolute z-10"
                            style={{
                                left: 0, top: 0,
                                transform: `translate(${catX}px, ${catY}px) translate(-50%, -50%)`,
                                pointerEvents: isExpanded ? 'auto' : 'none',
                                transaction: draggingNodeId === cat.id ? 'none' : 'transform 0.1s linear'
                            }}
                        >
                            <div
                                onMouseDown={(e) => onMouseDownNode(e, cat.id)}
                                onClick={(e) => {
                                    handleCategoryClick(e, cat.id);
                                }}
                                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#1e1e2e] border border-[#45475a] shadow-md cursor-grab active:cursor-grabbing group transition-all duration-300 ease-out hover:border-[var(--node-color)] hover:shadow-[0_0_15px_var(--node-color)]`}
                                style={{
                                    transform: isExpanded ? (isActive ? 'scale(1.15)' : 'scale(1)') : 'scale(0)',
                                    opacity: isExpanded ? 1 : 0,
                                    '--node-color': cat.color
                                } as React.CSSProperties}
                            >
                                <div className="flex items-center gap-2">
                                    <div style={{ color: cat.color }}>{cat.icon}</div>
                                    <span className="text-[#cdd6f4] text-xs font-medium">{cat.label}</span>
                                </div>
                            </div>

                            {cat.skills.map((skill, i) => {
                                const baseAngle = cat.childAngleBase ?? 0;
                                const spread = 18;
                                const skillAngle = baseAngle + (i - (cat.skills.length - 1) / 2) * spread;

                                const skillRad = skillAngle * (Math.PI / 180);
                                const skillDist = 130;
                                const sx = Math.cos(skillRad) * skillDist;
                                const sy = Math.sin(skillRad) * skillDist;
                                const isSkillHovered = hoveredSkillId === skill.id;

                                return (
                                    <div
                                        key={skill.id}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onMouseEnter={() => setHoveredSkillId(skill.id)}
                                        onMouseLeave={() => setHoveredSkillId(null)}
                                        className={`absolute flex items-center justify-center px-3 py-1.5 rounded-md bg-[#181825] border border-[#313244] shadow-sm whitespace-nowrap transition-all duration-300 cubic-bezier(0.34,1.56,0.64,1) cursor-pointer hover:bg-[#313244] hover:z-20`}
                                        style={{
                                            left: '50%', top: '50%',
                                            transform: isActive
                                                ? `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px)) scale(${isSkillHovered ? 1.2 : 1})`
                                                : `translate(-50%, -50%) scale(0)`,
                                            opacity: isActive ? 1 : 0,
                                            pointerEvents: isActive ? 'auto' : 'none',
                                            transitionDelay: isActive ? `${i * 50}ms` : '0ms',
                                            borderColor: isSkillHovered ? cat.color : '#313244',
                                        }}
                                    >
                                        <span className="text-[#a6adc8] text-[10px]" style={{ color: isSkillHovered ? cat.color : undefined }}>
                                            {skill.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                <div
                    className={`absolute z-20 rounded-[2rem] bg-[#313244] border border-[#45475a] overflow-hidden shadow-lg flex flex-col items-start
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isExpanded
                            ? 'max-w-[320px] pr-2'
                            : 'max-w-[2.5rem] border-transparent hover:scale-110 pr-0'
                        }`}
                    style={{
                        top: 330,
                        left: 40,
                        maxHeight: isExpanded
                            ? (isTextExpanded ? '280px' : '40px')
                            : '40px'
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={handleRootClick}
                >
                    <div className="flex items-center w-full min-h-[40px]">
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center z-10`}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] flex items-center justify-center text-[#1e1e2e]">
                                <User size={20} />
                            </div>
                        </div>

                        <div
                            className={`flex flex-col justify-center overflow-hidden transition-all duration-300 ease-out whitespace-nowrap ${isExpanded
                                    ? 'opacity-100 ml-2'
                                    : 'opacity-0 w-0 h-0 ml-0'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-[#cba6f7] font-bold text-xs">hoang.sh</span>
                                <div
                                    className={`flex items-center gap-2 transition-opacity duration-300 ${!isTextExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden absolute'
                                        }`}
                                >
                                    <div className="w-0.5 h-3 bg-[#45475a]"></div>
                                    <div
                                        className="text-[#a6adc8] text-[11px] cursor-pointer flex items-center gap-1 group/text"
                                        onClick={handleTextClick}
                                    >
                                        <span className="truncate max-w-[150px] block">"{bio}"</span>
                                        <ChevronRight size={10} className="text-[#6c7086] opacity-0 group-hover/text:opacity-100 transition-opacity flex-shrink-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`w-full px-12 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden ${isTextExpanded
                                ? 'max-h-[240px] opacity-100 pb-3 h-auto'
                                : 'max-h-0 opacity-0 pb-0'
                            }`}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div
                            className="text-[#a6adc8] text-[11px] leading-relaxed cursor-pointer whitespace-normal border-t border-[#45475a]/50 pt-2 mt-1"
                            onClick={handleTextClick}
                        >
                            "{bio}"
                            <div className="mt-1 text-[#6c7086] flex items-center gap-1 text-[9px] justify-end">
                                <ChevronDown size={10} /> collapse
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-2 right-4 text-[10px] text-[#45475a] pointer-events-none">
                    drag individual nodes • drag empty space to pan
                </div>
            </div>
        </div>
    );
};
