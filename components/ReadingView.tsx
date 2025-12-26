import React from 'react';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import { BlogPost, AppMode } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface ReadingViewProps {
    currentPost: BlogPost;
    setMode: (mode: AppMode) => void;
    handleCategoryClick: (category: string) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({
    currentPost,
    setMode,
    handleCategoryClick
}) => {
    return (
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
    );
};
