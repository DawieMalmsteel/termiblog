import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Terminal as TerminalIcon, Search, BookOpen, Layout } from 'lucide-react';
import { AppMode } from './types.ts';
import { MacHeader } from './components/MacHeader';
import { SidebarProfile } from './components/SidebarProfile';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';
import { FloatingSidebarToggle } from './components/FloatingSidebarToggle';
import { TerminalPage } from './pages/TerminalPage';
import { BlogList } from './pages/BlogList';
import { BlogPostPage } from './pages/BlogPostPage';

const AppContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [focusedTile, setFocusedTile] = useState<'sidebar' | 'main'>('main');
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [sidebarMinimized, setSidebarMinimized] = useState(false);

    // Determine current mode based on route
    const getCurrentMode = (): AppMode => {
        if (location.pathname.startsWith('/blog')) {
            return location.pathname === '/blog' ? AppMode.SEARCHING : AppMode.READING;
        }
        return AppMode.TERMINAL;
    };

    const mode = getCurrentMode();

    const setMode = (newMode: AppMode) => {
        if (newMode === AppMode.TERMINAL) {
            navigate('/');
        } else if (newMode === AppMode.SEARCHING) {
            navigate('/blog');
        }
    };

    const getFooterTheme = () => {
        if (focusedTile === 'sidebar') {
            return { color: 'bg-[#fab387]', hex: '#fab387', text: 'SIDEBAR', icon: <Layout size={12} className="text-[#11111b] shrink-0" /> };
        }
        switch (mode) {
            case AppMode.TERMINAL: return { color: 'bg-[#cba6f7]', hex: '#cba6f7', text: 'TERMINAL', icon: <TerminalIcon size={12} className="text-[#11111b] shrink-0" /> };
            case AppMode.SEARCHING: return { color: 'bg-[#a6e3a1]', hex: '#a6e3a1', text: 'EXPLORER', icon: <Search size={12} className="text-[#11111b] shrink-0" /> };
            case AppMode.READING: return { color: 'bg-[#89b4fa]', hex: '#89b4fa', text: 'READING', icon: <BookOpen size={12} className="text-[#11111b] shrink-0" /> };
            default: return { color: 'bg-[#cba6f7]', hex: '#cba6f7', text: 'TERMINAL', icon: <TerminalIcon size={12} className="text-[#11111b] shrink-0" /> };
        }
    };

    const footerTheme = getFooterTheme();

    const getWindowTitle = () => {
        if (mode === AppMode.TERMINAL) return "zsh — terminal";
        if (mode === AppMode.READING) {
            const postId = location.pathname.split('/').pop();
            return `reading — ${postId}`;
        }
        return "archive_viewer — KnowledgeBase";
    };

    return (
        <div className="h-screen flex flex-col p-4 md:p-5 bg-[#11111b] gap-4 overflow-hidden" onClick={() => setFocusedTile('main')}>
            <NavigationBar mode={mode} setMode={setMode} />

            <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
                {sidebarVisible && !sidebarMinimized && (
                    <aside
                        className={`hidden lg:flex w-72 flex-col hypr-tile shrink-0 overflow-hidden ${focusedTile === 'sidebar' ? 'hypr-tile-active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setFocusedTile('sidebar'); }}
                    >
                        <MacHeader
                            title="sys_info — guest"
                            active={focusedTile === 'sidebar'}
                            showControls={true}
                            onClose={() => setSidebarVisible(false)}
                            onMinimize={() => setSidebarMinimized(true)}
                            onMaximize={() => {
                                setSidebarMinimized(false);
                                setFocusedTile('sidebar');
                            }}
                        />
                        <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
                            <SidebarProfile />
                        </div>
                    </aside>
                )}

                <main
                    className={`flex-1 flex flex-col hypr-tile overflow-hidden min-w-0 min-h-0 ${!sidebarVisible || focusedTile === 'main' ? 'hypr-tile-active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setFocusedTile('main'); }}
                >
                    <Routes>
                        <Route path="/" element={<TerminalPage />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogPostPage />} />
                    </Routes>
                </main>
            </div>

            <FloatingSidebarToggle
                isVisible={!sidebarVisible || sidebarMinimized}
                onToggle={() => {
                    setSidebarVisible(true);
                    setSidebarMinimized(false);
                }}
            />

            <Footer footerTheme={footerTheme} />
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
};

export default App;
