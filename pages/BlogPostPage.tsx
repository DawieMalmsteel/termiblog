import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag, Clock, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { MOCK_POSTS } from '../constants';
import { CodeBlock } from '../components/CodeBlock';
import { MacHeader } from '../components/MacHeader';

export const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const post = MOCK_POSTS.find(p => p.id === id);

    const handleHome = () => navigate('/blog');
    const handleBack = () => navigate(-1);
    const handleForward = () => navigate(1);

    if (!post) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#1e1e2e]/30">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-[#f38ba8] mb-4">Post Not Found</h2>
                    <button
                        onClick={() => navigate('/blog')}
                        className="text-[#cba6f7] hover:text-[#89b4fa] transition-colors"
                    >
                        ← Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    const handleCategoryClick = (category: string) => {
        navigate(`/blog?category=${category}`);
    };

    return (
        <>
            <MacHeader 
                title={post.title}
                variant="blog"
                onClose={handleHome}
                onMinimize={handleBack}
                onMaximize={handleForward}
            />
            <div className="flex-1 overflow-y-auto p-6 md:p-16 bg-[#1e1e2e]/30 animate-in slide-in-from-right-4 duration-500 scrollbar-hide">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/blog')}
                    className="mb-8 flex items-center gap-2 text-[10px] font-black text-[#6c7086] hover:text-[#cba6f7] transition-all uppercase tracking-widest leading-none group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to Archive
                </button>

                {/* Post Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-[#cdd6f4] mb-6 leading-tight tracking-tight">
                        {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[#9399b2] text-xs">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[#cba6f7]" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#89b4fa]" />
                            <span>5 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={14} className="text-[#a6e3a1]" />
                            <span>1.2k views</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {post.categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#cba6f7]/10 border border-[#cba6f7]/20 text-[#cba6f7] text-[10px] font-black uppercase tracking-widest leading-none hover:bg-[#cba6f7] hover:text-[#11111b] transition-all"
                            >
                                <Tag size={10} /> {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Excerpt */}
                {post.excerpt && (
                    <div className="mb-10 p-6 bg-[#313244]/20 border-l-4 border-[#cba6f7] rounded-r-xl">
                        <p className="text-[#bac2de] italic leading-relaxed">{post.excerpt}</p>
                    </div>
                )}

                {/* Markdown Content */}
                <article className="prose prose-invert prose-catppuccin max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[
                            rehypeSlug,
                            rehypeRaw,
                            rehypeHighlight
                        ]}
                        skipHtml={false}
                        components={{
                            h1: ({node, children, ...props}) => {
                                const id = props.id || String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                return <h1 id={id} className="text-3xl font-black text-[#cba6f7] mb-4 mt-8 border-b border-[#313244] pb-2 scroll-mt-24" {...props}>{children}</h1>;
                            },
                            h2: ({node, children, ...props}) => {
                                const id = props.id || String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                return <h2 id={id} className="text-2xl font-bold text-[#89b4fa] mb-3 mt-6 scroll-mt-24" {...props}>{children}</h2>;
                            },
                            h3: ({node, children, ...props}) => {
                                const id = props.id || String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                return <h3 id={id} className="text-xl font-bold text-[#a6e3a1] mb-2 mt-4 scroll-mt-24" {...props}>{children}</h3>;
                            },
                            h4: ({node, children, ...props}) => {
                                const id = props.id || String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                                return <h4 id={id} className="text-lg font-bold text-[#f9e2af] mb-2 mt-3 scroll-mt-24" {...props}>{children}</h4>;
                            },
                            p: ({node, children, ...props}) => {
                                return <p className="text-[#cdd6f4] leading-relaxed mb-4" {...props}>{children}</p>;
                            },
                            a: ({node, ...props}) => <a className="text-[#89b4fa] hover:text-[#cba6f7] underline decoration-[#89b4fa]/30 hover:decoration-[#cba6f7]/50 transition-colors" {...props} />,
                            code: ({node, inline, className, children, ...props}: any) => {
                                if (inline) {
                                    return (
                                        <code className="bg-[#313244] text-[#f38ba8] px-1.5 py-0.5 rounded font-mono text-sm">
                                            {children}
                                        </code>
                                    );
                                }
                                
                                // For block code, don't process here, let pre handle it
                                return <code className={className} {...props}>{children}</code>;
                            },
                            pre: ({node, children, ...props}) => {
                                // Extract code content from pre > code structure
                                const codeChild = React.Children.toArray(children)[0] as any;
                                
                                if (React.isValidElement(codeChild) && codeChild.props) {
                                    const { className, children: codeChildren } = codeChild.props;
                                    
                                    return (
                                        <CodeBlock className={className}>
                                            {codeChildren}
                                        </CodeBlock>
                                    );
                                }
                                
                                return <pre className="bg-[#1e1e2e] p-4 rounded-xl overflow-x-auto border border-[#313244]" {...props}>{children}</pre>;
                            },
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#89b4fa] pl-4 italic text-[#bac2de] my-4" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside text-[#cdd6f4] mb-4 space-y-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside text-[#cdd6f4] mb-4 space-y-2" {...props} />,
                            li: ({node, ...props}) => <li className="text-[#cdd6f4]" {...props} />,
                            table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-[#313244]" {...props} /></div>,
                            th: ({node, ...props}) => <th className="border border-[#313244] bg-[#313244]/30 px-4 py-2 text-left font-bold text-[#cba6f7]" {...props} />,
                            td: ({node, ...props}) => <td className="border border-[#313244] px-4 py-2 text-[#cdd6f4]" {...props} />,
                            img: ({node, ...props}) => <img className="rounded-xl my-6 border border-[#313244] w-full" {...props} />,
                            hr: ({node, ...props}) => <hr className="border-[#313244] my-8" {...props} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </article>

                {/* Navigation Footer */}
                <div className="mt-16 pt-8 border-t border-[#313244]">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-sm font-bold text-[#cba6f7] hover:text-[#89b4fa] transition-colors group"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to all posts
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};
