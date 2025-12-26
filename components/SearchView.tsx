import React from 'react';
import { Search, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { BlogPost, AppMode } from '../types';

interface SearchViewProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    currentPosts: BlogPost[];
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number | ((prev: number) => number)) => void;
    setCurrentPost: (post: BlogPost) => void;
    setMode: (mode: AppMode) => void;
    handleCategoryClick: (category: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
    searchQuery,
    setSearchQuery,
    currentPosts,
    currentPage,
    totalPages,
    setCurrentPage,
    setCurrentPost,
    setMode,
    handleCategoryClick
}) => {
    return (
        <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col bg-[#1e1e2e]/50 animate-in zoom-in-95 duration-500 scrollbar-hide min-h-0">
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-16 shrink-0">
                <div>
                    <h1 className="text-4xl font-black text-[#cdd6f4] mb-3 uppercase tracking-tighter">Knowledge Archive</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-0.5 bg-[#cba6f7]"></div>
                        <p className="text-[#9399b2] text-[10px] font-black uppercase tracking-[0.25em] leading-none">Centralized Metadata Hub</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full md:w-80 bg-[#11111b]/80 rounded-xl flex items-center px-5 border border-[#313244] focus-within:border-[#cba6f7] transition-all">
                        <Search size={16} className="text-[#6c7086] mr-3" />
                        <input 
                            className="bg-transparent py-3.5 w-full outline-none text-xs text-[#cdd6f4] placeholder-[#45475a]" 
                            placeholder="Scan datastore or category..."
                            value={searchQuery}
                            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                {currentPosts.map(post => (
                    <div 
                        key={post.id} 
                        className="group p-6 bg-[#181825]/40 rounded-2xl border border-[#313244]/50 hover:border-[#cba6f7]/40 hover:bg-[#313244]/20 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full hover:-translate-y-1 shadow-sm"
                        onClick={() => { setCurrentPost(post); setMode(AppMode.READING); }}
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.map(cat => (
                                <span 
                                    key={cat} 
                                    onClick={(e) => { e.stopPropagation(); handleCategoryClick(cat); }}
                                    className="text-[8px] font-black px-2 py-0.5 rounded bg-[#cba6f7]/10 text-[#cba6f7] uppercase tracking-wider leading-none hover:bg-[#cba6f7] hover:text-[#11111b] transition-colors"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-[#cdd6f4] mb-3 leading-tight tracking-tight group-hover:text-[#cba6f7] transition-colors">{post.title}</h3>
                        <p className="text-xs text-[#9399b2] line-clamp-2 mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#313244]/30 text-[9px] font-black uppercase text-[#6c7086]">
                            <span className="group-hover:text-[#cba6f7] transition-colors tracking-widest leading-none">Read Document</span>
                            <span className="leading-none flex items-center gap-1.5"><Clock size={10} /> {post.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-auto py-10 flex items-center justify-center gap-6">
                    <button 
                        disabled={currentPage === 1}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p - 1); }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#313244]/40 hover:bg-[#cba6f7] transition-all disabled:opacity-10 group/btn"
                    >
                        <ChevronLeft size={16} className="text-[#a6adc8] group-hover/btn:text-[#11111b]" />
                    </button>
                    <span className="text-[10px] font-black font-mono text-[#6c7086] tracking-widest leading-none">{currentPage} / {totalPages}</span>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(p => p + 1); }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#313244]/40 hover:bg-[#cba6f7] transition-all disabled:opacity-10 group/btn"
                    >
                        <ChevronRight size={16} className="text-[#a6adc8] group-hover/btn:text-[#11111b]" />
                    </button>
                </div>
            )}
        </div>
    );
};
