import React, { useState, useEffect } from 'react';
import { TerminalView } from '../components/TerminalView';
import { useTerminal } from '../hooks/useTerminal';
import { createCommandHandler, handleNeofetch } from '../utils/commandHandlers';
import { AppMode, BlogPost } from '../types';
import { useNavigate } from 'react-router-dom';
import { MacHeader } from '../components/MacHeader';

export const TerminalPage: React.FC = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    
    const { 
        history, 
        addLine, 
        getGhostText, 
        isCommandValid, 
        addToHistory, 
        handleArrowUp: terminalArrowUp, 
        handleArrowDown: terminalArrowDown, 
        clearHistory 
    } = useTerminal();

    useEffect(() => {
        handleNeofetch(addLine);
    }, []);

    // Modified handler to navigate to blog
    const setMode = (mode: AppMode) => {
        if (mode === AppMode.SEARCHING) {
            navigate('/blog');
        }
    };

    const setCurrentPost = (post: BlogPost | null) => {
        if (post) {
            navigate(`/blog/${post.id}`);
        }
    };

    const handleCommand = createCommandHandler(addLine, setMode, setCurrentPost, clearHistory);

    const wrappedHandleCommand = async (cmd: string) => {
        if (!cmd.trim()) return;
        addToHistory(cmd);
        setInputValue('');
        await handleCommand(cmd);
    };

    const handleAutocomplete = () => {
        const ghost = getGhostText(inputValue);
        if (ghost) setInputValue(inputValue + ghost);
    };

    const handleArrowUpWrapper = () => {
        const cmd = terminalArrowUp();
        if (cmd !== null) setInputValue(cmd);
    };

    const handleArrowDownWrapper = () => {
        const cmd = terminalArrowDown();
        if (cmd !== null) setInputValue(cmd);
    };

    const handleClear = () => {
        clearHistory();
    };

    return (
        <>
            <MacHeader 
                title="zsh — terminal"
                variant="terminal"
                onClose={handleClear}
                showControls={true}
            />
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <TerminalView
                    history={history}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleCommand={wrappedHandleCommand}
                    getGhostText={getGhostText}
                    isCommandValid={isCommandValid}
                    handleAutocomplete={handleAutocomplete}
                    handleArrowUp={handleArrowUpWrapper}
                    handleArrowDown={handleArrowDownWrapper}
                />
            </div>
        </>
    );
};
