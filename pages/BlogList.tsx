import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { BLOG_REGISTRY } from '../blogs/registry';
import { BlogPost } from '../types';
import { MacHeader } from '../components/MacHeader';
import { Calendar, Tag, Filter } from 'lucide-react';

export const BlogList: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    // Get all unique categories and years
    const allCategories = Array.from(new Set(BLOG_REGISTRY.flatMap(post => post.categories)));
    const allYears = Array.from(new Set(BLOG_REGISTRY.map(post => new Date(post.date).getFullYear().toString()))).sort((a, b) => b.localeCompare(a));

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category === selectedCategory ? '' : category);
        setCurrentPage(1);
    };

    const filteredPosts = BLOG_REGISTRY.filter(post => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || (
            post.title.toLowerCase().includes(searchLower) || 
            post.categories.some(cat => cat.toLowerCase().includes(searchLower)) ||
            post.excerpt.toLowerCase().includes(searchLower)
        );
        const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
        const matchesYear = !selectedYear || new Date(post.date).getFullYear().toString() === selectedYear;
        
        return matchesSearch && matchesCategory && matchesYear;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return (
        <>
            <MacHeader 
                title="archive_viewer — KnowledgeBase"
                variant="blog"
                onClose={() => navigate('/blog')}
                onMinimize={() => navigate(-1)}
                onMaximize={() => navigate(1)}
            />
            <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col bg-[#1e1e2e]/50 animate-in zoom-in-95 duration-500 scrollbar-hide min-h-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 shrink-0">
                <div>
                    <h1 className="text-4xl font-black text-[#cdd6f4] mb-3 uppercase tracking-tighter">Knowledge Archive</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-0.5 bg-[#cba6f7]"></div>
                        <p className="text-[#9399b2] text-[10px] font-black uppercase tracking-[0.25em] leading-none">{filteredPosts.length} Articles Found</p>
                    </div>
                </div>
                <div className="w-full md:w-80 bg-[#11111b]/80 rounded-xl flex items-center px-5 border border-[#313244] focus-within:border-[#cba6f7] transition-all">
                    <Search size={16} className="text-[#6c7086] mr-3" />
                    <input 
                        className="bg-transparent py-3.5 w-full outline-none text-xs text-[#cdd6f4] placeholder-[#45475a]" 
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col gap-4 mb-8 shrink-0">
                {/* Year Filter */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[#9399b2] text-xs font-semibold">
                        <Calendar size={14} />
                        <span>Year:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setSelectedYear(''); setCurrentPage(1); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                !selectedYear 
                                    ? 'bg-[#cba6f7] text-[#11111b]' 
                                    : 'bg-[#313244]/40 text-[#9399b2] hover:bg-[#313244]'
                            }`}
                        >
                            All
                        </button>
                        {allYears.map(year => (
                            <button
                                key={year}
                                onClick={() => { setSelectedYear(year); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    selectedYear === year 
                                        ? 'bg-[#cba6f7] text-[#11111b]' 
                                        : 'bg-[#313244]/40 text-[#9399b2] hover:bg-[#313244]'
                                }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-[#9399b2] text-xs font-semibold">
                        <Tag size={14} />
                        <span>Category:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                !selectedCategory 
                                    ? 'bg-[#cba6f7] text-[#11111b]' 
                                    : 'bg-[#313244]/40 text-[#9399b2] hover:bg-[#313244]'
                            }`}
                        >
                            All
                        </button>
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    selectedCategory === cat 
                                        ? 'bg-[#cba6f7] text-[#11111b]' 
                                        : 'bg-[#313244]/40 text-[#9399b2] hover:bg-[#313244]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 shrink-0">
                {currentPosts.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <Filter size={48} className="text-[#6c7086] mx-auto mb-4 opacity-50" />
                        <p className="text-[#9399b2] text-sm">No articles found matching your filters</p>
                    </div>
                ) : (
                    currentPosts.map(post => (
                        <div 
                            key={post.id} 
                            className="group p-6 bg-[#181825]/60 rounded-2xl border border-[#313244]/50 hover:border-[#cba6f7]/40 hover:bg-[#313244]/20 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full hover:-translate-y-1 shadow-lg hover:shadow-[#cba6f7]/10"
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.categories.map(cat => (
                                    <span 
                                        key={cat} 
                                        onClick={(e) => { e.stopPropagation(); handleCategoryClick(cat); }}
                                        className="text-[9px] font-bold px-2.5 py-1 rounded-md bg-[#cba6f7]/10 text-[#cba6f7] uppercase tracking-wider leading-none hover:bg-[#cba6f7] hover:text-[#11111b] transition-colors border border-[#cba6f7]/20"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-xl font-bold text-[#cdd6f4] mb-3 leading-tight tracking-tight group-hover:text-[#cba6f7] transition-colors">{post.title}</h3>
                            <p className="text-xs text-[#9399b2] line-clamp-3 mb-6 leading-relaxed flex-grow">{post.excerpt}</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#313244]/30 text-[10px] font-semibold text-[#6c7086]">
                                <span className="group-hover:text-[#cba6f7] transition-colors tracking-wide leading-none">Read More →</span>
                                <span className="leading-none flex items-center gap-1.5">
                                    <Clock size={12} /> 
                                    {new Date(post.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
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
        </>
    );
};
