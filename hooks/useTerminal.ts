import { useState } from 'react';
import { TerminalLine } from '../types';

const VALID_COMMANDS = ['help', 'neofetch', 'about', 'whoami', 'date', 'ls', 'blog', 'read', 'ai', 'clear'];

export const useTerminal = () => {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyPointer, setHistoryPointer] = useState(-1);

    const addLine = (type: TerminalLine['type'], content: string | React.ReactNode) => {
        setHistory(prev => [...prev, { id: Math.random().toString(36).substring(2, 11), type, content }]);
    };

    const getGhostText = (input: string) => {
        if (!input) return '';
        const suggestion = VALID_COMMANDS.find(cmd => cmd.startsWith(input.toLowerCase()));
        if (suggestion && suggestion !== input.toLowerCase()) {
            return suggestion.slice(input.length);
        }
        return '';
    };

    const isCommandValid = (input: string) => {
        if (!input) return true;
        const baseCmd = input.trim().split(' ')[0].toLowerCase();
        return VALID_COMMANDS.includes(baseCmd);
    };

    const addToHistory = (cmd: string) => {
        setCmdHistory(prev => [cmd, ...prev]);
        setHistoryPointer(-1);
    };

    const handleArrowUp = () => {
        if (cmdHistory.length > 0) {
            const nextIndex = historyPointer + 1;
            if (nextIndex < cmdHistory.length) {
                setHistoryPointer(nextIndex);
                return cmdHistory[nextIndex];
            }
        }
        return null;
    };

    const handleArrowDown = () => {
        if (historyPointer > 0) {
            const nextIndex = historyPointer - 1;
            setHistoryPointer(nextIndex);
            return cmdHistory[nextIndex];
        } else if (historyPointer === 0) {
            setHistoryPointer(-1);
            return '';
        }
        return null;
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return {
        history,
        addLine,
        getGhostText,
        isCommandValid,
        addToHistory,
        handleArrowUp,
        handleArrowDown,
        clearHistory
    };
};
