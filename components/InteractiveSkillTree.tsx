import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronRight, ChevronDown, Github } from 'lucide-react';
import { BIO, SKILL_CATEGORIES } from '../skills.tsx';
import { CategoryNode } from '../types';

const useTransitionValue = (targetValue: number, duration: number = 500) => {
    const [value, setValue] = useState(targetValue);
    const frameRef = useRef<number>(null);
    const startTimeRef = useRef<number>(null);
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
    const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

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

    const categories = SKILL_CATEGORIES;
    const bio = BIO;

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
            setExpandedSkillId(null);
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
        if (activeCategoryIds.includes(catId)) {
            // Case: Closing a category
            // Check if any skill in this category is currently expanded
            const cat = categories.find(c => c.id === catId);
            if (cat && expandedSkillId) {
                const hasActiveSkill = cat.skills.some(s => s.id === expandedSkillId);
                if (hasActiveSkill) {
                    setExpandedSkillId(null);
                }
            }
            setActiveCategoryIds(prev => prev.filter(id => id !== catId));
        } else {
            // Case: Opening a category
            setActiveCategoryIds(prev => [...prev, catId]);
        }
    };

    const handleSkillClick = (e: React.MouseEvent, skillId: string) => {
        e.stopPropagation();
        setExpandedSkillId(curr => curr === skillId ? null : skillId);
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

    const onTouchStartContainer = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        if (draggingNodeId) return;

        const touch = e.touches[0];
        setIsCanvasDragging(true);
        setCanvasStartPos({
            x: touch.pageX - scrollContainerRef.current.offsetLeft,
            y: touch.pageY - scrollContainerRef.current.offsetTop
        });
        setScrollPos({
            left: scrollContainerRef.current.scrollLeft,
            top: scrollContainerRef.current.scrollTop
        });
    };

    const onMouseDownNode = (e: React.MouseEvent, nodeId: string) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingNodeId(nodeId);
        setDragStartMousePos({ x: e.pageX, y: e.pageY });
        setDragStartNodeOffset(nodeOffsets[nodeId] || { x: 0, y: 0 });
    };

    const onTouchStartNode = (e: React.TouchEvent, nodeId: string) => {
        e.stopPropagation();
        const touch = e.touches[0];
        setDraggingNodeId(nodeId);
        setDragStartMousePos({ x: touch.pageX, y: touch.pageY });
        setDragStartNodeOffset(nodeOffsets[nodeId] || { x: 0, y: 0 });
    };

    const handleMove = (pageX: number, pageY: number) => {
        if (draggingNodeId) {
            const dx = pageX - dragStartMousePos.x;
            const dy = pageY - dragStartMousePos.y;

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
            const x = pageX - scrollContainerRef.current.offsetLeft;
            const y = pageY - scrollContainerRef.current.offsetTop;
            const walkX = (x - canvasStartPos.x) * 1.5;
            const walkY = (y - canvasStartPos.y) * 1.5;
            scrollContainerRef.current.scrollLeft = scrollPos.left - walkX;
            scrollContainerRef.current.scrollTop = scrollPos.top - walkY;
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!draggingNodeId && !isCanvasDragging) return;
        e.preventDefault();
        handleMove(e.pageX, e.pageY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!draggingNodeId && !isCanvasDragging) return;
        // Don't preventDefault if we aren't dragging something specifically in our UI
        // to allow standard scroll if needed. But here we want to drag the canvas.
        if (e.cancelable) e.preventDefault();
        const touch = e.touches[0];
        handleMove(touch.pageX, touch.pageY);
    };

    const onEnd = () => {
        setIsCanvasDragging(false);
        setDraggingNodeId(null);
    };

    return (
        <div
            className="w-full h-[320px] overflow-hidden relative cursor-grab active:cursor-grabbing border-y border-[#45475a]/30 bg-[#1e1e2e]/50 backdrop-blur-sm"
            ref={scrollContainerRef}
            onMouseDown={onMouseDownContainer}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStartContainer}
            onTouchMove={onTouchMove}
            onTouchEnd={onEnd}
        >
            <div className="min-w-[1200px] h-[700px] relative pl-10 flex items-center select-none">

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
                                    const skillDist = 170;

                                    // Base calculate relative to Parent Base
                                    const sxBase = Math.cos(skillRad) * skillDist;
                                    const syBase = Math.sin(skillRad) * skillDist;

                                    // Add Skill Offset (Drag)
                                    const skillOffX = nodeOffsets[skill.id]?.x || 0;
                                    const skillOffY = nodeOffsets[skill.id]?.y || 0;

                                    // Final Skill Position
                                    const skillX = catX + sxBase + skillOffX;
                                    const skillY = catY + syBase + skillOffY;

                                    const isProjectExpanded = expandedSkillId === skill.id;

                                    return (
                                        <React.Fragment key={`lines-${skill.id}`}>
                                            <line
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
                                            {/* Project Connection Lines */}
                                            {skill.projects && skill.projects.map((proj, pi) => {
                                                const projDist = 140;
                                                const projSpread = 80;
                                                // Unique ID for project logic
                                                const projId = `proj-${skill.id}-${pi}`;
                                                // Base relative position
                                                const pxBase = skillX + projDist;
                                                const pyBase = skillY + (pi - (skill.projects!.length - 1) / 2) * projSpread;

                                                const pOff = nodeOffsets[projId] || { x: 0, y: 0 };
                                                const px = pxBase + pOff.x;
                                                const py = pyBase + pOff.y;

                                                return (
                                                    <line
                                                        key={`pline-${skill.id}-${pi}`}
                                                        x1={skillX} y1={skillY}
                                                        x2={px} y2={py}
                                                        stroke={cat.color} strokeWidth="1" strokeDasharray="2 2"
                                                        style={{
                                                            opacity: isProjectExpanded ? 0.5 : 0,
                                                            transition: 'opacity 0.3s',
                                                            transformOrigin: `${skillX}px ${skillY}px`,
                                                            transform: isProjectExpanded ? 'scale(1)' : 'scale(0)'
                                                        }}
                                                    />
                                                );
                                            })}
                                        </React.Fragment>
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
                                transition: draggingNodeId === cat.id ? 'none' : 'transform 0.1s linear'
                            }}
                        >
                            <div
                                onMouseDown={(e) => onMouseDownNode(e, cat.id)}
                                onTouchStart={(e) => onTouchStartNode(e, cat.id)}
                                onClick={(e) => handleCategoryClick(e, cat.id)}
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
                                const skillDist = 170; // Sync with SVG Dist

                                const sxBase = Math.cos(skillRad) * skillDist;
                                const syBase = Math.sin(skillRad) * skillDist;

                                const skillOffX = nodeOffsets[skill.id]?.x || 0;
                                const skillOffY = nodeOffsets[skill.id]?.y || 0;

                                const sx = sxBase + skillOffX;
                                const sy = syBase + skillOffY;

                                const isSkillHovered = hoveredSkillId === skill.id;
                                const isProjectExpanded = expandedSkillId === skill.id;

                                return (
                                    <React.Fragment key={skill.id}>
                                        <div
                                            onMouseDown={(e) => onMouseDownNode(e, skill.id)}
                                            onTouchStart={(e) => onTouchStartNode(e, skill.id)}
                                            onClick={(e) => handleSkillClick(e, skill.id)}
                                            onMouseEnter={() => setHoveredSkillId(skill.id)}
                                            onMouseLeave={() => setHoveredSkillId(null)}
                                            className={`absolute flex items-center justify-center px-3 py-1.5 rounded-md bg-[#181825] border border-[#313244] shadow-sm whitespace-nowrap transition-all duration-300 cubic-bezier(0.34,1.56,0.64,1) cursor-grab active:cursor-grabbing hover:bg-[#313244] hover:z-20`}
                                            style={{
                                                left: '50%', top: '50%',
                                                transform: isActive
                                                    ? `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px)) scale(${isSkillHovered || isProjectExpanded ? 1.2 : 1})`
                                                    : `translate(-50%, -50%) scale(0)`,
                                                opacity: isActive ? 1 : 0,
                                                pointerEvents: isActive ? 'auto' : 'none',
                                                transition: draggingNodeId === skill.id ? 'none' : 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                                borderColor: isSkillHovered || isProjectExpanded ? cat.color : '#313244',
                                                boxShadow: isProjectExpanded ? `0 0 10px ${cat.color}40` : 'none',
                                                zIndex: draggingNodeId === skill.id ? 50 : 20
                                            }}
                                        >
                                            <span className="text-[#a6adc8] text-[10px]" style={{ color: isSkillHovered || isProjectExpanded ? cat.color : undefined }}>
                                                {skill.label}
                                            </span>
                                            {skill.projects && <ChevronRight size={10} className={`ml-1 text-[#6c7086] transition-transform ${isProjectExpanded ? 'rotate-90' : ''}`} />}
                                        </div>

                                        {/* Render Project Nodes physically attached to skill */}
                                        {skill.projects && skill.projects.map((proj, pi) => {
                                            const projDist = 140;
                                            const projSpread = 80;
                                            // Unique ID for project node
                                            const projId = `proj-${skill.id}-${pi}`;

                                            // Relative to Category Center (which is 0,0 here)
                                            const pxBase = sx + projDist;
                                            const pyBase = sy + (pi - (skill.projects!.length - 1) / 2) * projSpread;

                                            const pOff = nodeOffsets[projId] || { x: 0, y: 0 };
                                            const px = pxBase + pOff.x;
                                            const py = pyBase + pOff.y;

                                            return (
                                                <div
                                                    key={projId}
                                                    onMouseDown={(e) => onMouseDownNode(e, projId)}
                                                    onTouchStart={(e) => onTouchStartNode(e, projId)}
                                                    className="absolute flex flex-col items-start p-2 rounded-lg bg-[#11111b] border border-[#313244] w-[180px] hover:border-[#cba6f7] group/proj transition-all duration-300 cursor-grab active:cursor-grabbing"
                                                    style={{
                                                        left: '50%', top: '50%',
                                                        transform: isProjectExpanded
                                                            ? `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`
                                                            : `translate(calc(-50% + ${sx}px), calc(-50% + ${sy}px)) scale(0)`,
                                                        opacity: isProjectExpanded ? 1 : 0,
                                                        pointerEvents: isProjectExpanded ? 'auto' : 'none',
                                                        zIndex: draggingNodeId === projId ? 60 : (isProjectExpanded ? 40 : 1),
                                                        transition: draggingNodeId === projId ? 'none' : 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="text-[#cdd6f4] text-[10px] font-bold truncate">{proj.name}</span>
                                                        <a href={proj.repoUrl} target="_blank" className="text-[#6c7086] hover:text-[#fff] p-1 hover:bg-[#313244] rounded transition-colors group/link" title="Source Code">
                                                            <Github size={16} />
                                                        </a>
                                                    </div>
                                                    <span className="text-[#6c7086] text-[9px] mt-1 leading-tight line-clamp-2">
                                                        {proj.description}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    );
                })}


                {/* Root Node Container */}
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
                    drag individual nodes • Level 4 Draggable
                </div>
            </div>
        </div>
    );
};
