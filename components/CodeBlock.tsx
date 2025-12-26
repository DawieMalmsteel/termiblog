import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
    const [copied, setCopied] = useState(false);

    // Extract text content for copying
    const getTextContent = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(getTextContent).join('');
        if (React.isValidElement(node) && node.props.children) {
            return getTextContent(node.props.children);
        }
        return '';
    };

    const textContent = getTextContent(children);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Extract language from className (format: language-xxx or hljs language-xxx)
    const match = className?.match(/language-(\w+)/);
    const language = match ? match[1] : 'code';

    return (
        <div className="relative group not-prose">
            {/* Header with language and copy button */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#313244] rounded-t-lg">
                <span className="text-xs font-mono text-[#a6adc8] uppercase tracking-wide">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-[#45475a] text-[#a6adc8] hover:text-[#cdd6f4] transition-colors"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-[#a6e3a1]" /> : <Copy size={14} />}
                </button>
            </div>
            
            {/* Code Content - Catppuccin themed */}
            <pre className="!mt-0 !mb-0 bg-[#1e1e2e] px-4 py-3 rounded-b-lg overflow-x-auto border border-[#313244] border-t-0 catppuccin-code">
                <code className={`${className} font-mono text-sm`}>{children}</code>
            </pre>
            
            <style>{`
                .catppuccin-code {
                    color: #cdd6f4;
                }
                .catppuccin-code .hljs-keyword { color: #cba6f7; }
                .catppuccin-code .hljs-built_in { color: #f38ba8; }
                .catppuccin-code .hljs-type { color: #f9e2af; }
                .catppuccin-code .hljs-literal { color: #fab387; }
                .catppuccin-code .hljs-number { color: #fab387; }
                .catppuccin-code .hljs-operator { color: #89dceb; }
                .catppuccin-code .hljs-punctuation { color: #bac2de; }
                .catppuccin-code .hljs-property { color: #89b4fa; }
                .catppuccin-code .hljs-regexp { color: #f5c2e7; }
                .catppuccin-code .hljs-string { color: #a6e3a1; }
                .catppuccin-code .hljs-char.escape_ { color: #a6e3a1; }
                .catppuccin-code .hljs-subst { color: #bac2de; }
                .catppuccin-code .hljs-symbol { color: #f2cdcd; }
                .catppuccin-code .hljs-variable { color: #cdd6f4; }
                .catppuccin-code .hljs-variable.language_ { color: #cba6f7; }
                .catppuccin-code .hljs-variable.constant_ { color: #fab387; }
                .catppuccin-code .hljs-title { color: #89b4fa; }
                .catppuccin-code .hljs-title.class_ { color: #f9e2af; }
                .catppuccin-code .hljs-title.function_ { color: #89b4fa; }
                .catppuccin-code .hljs-params { color: #cdd6f4; }
                .catppuccin-code .hljs-comment { color: #6c7086; font-style: italic; }
                .catppuccin-code .hljs-doctag { color: #f38ba8; }
                .catppuccin-code .hljs-meta { color: #fab387; }
                .catppuccin-code .hljs-section { color: #89b4fa; }
                .catppuccin-code .hljs-tag { color: #cba6f7; }
                .catppuccin-code .hljs-name { color: #89b4fa; }
                .catppuccin-code .hljs-attr { color: #f9e2af; }
                .catppuccin-code .hljs-attribute { color: #f9e2af; }
                .catppuccin-code .hljs-bullet { color: #94e2d5; }
                .catppuccin-code .hljs-code { color: #a6e3a1; }
                .catppuccin-code .hljs-emphasis { font-style: italic; }
                .catppuccin-code .hljs-strong { font-weight: bold; }
                .catppuccin-code .hljs-formula { color: #94e2d5; }
                .catppuccin-code .hljs-link { color: #89b4fa; text-decoration: underline; }
                .catppuccin-code .hljs-quote { color: #6c7086; font-style: italic; }
                .catppuccin-code .hljs-selector-tag { color: #89b4fa; }
                .catppuccin-code .hljs-selector-id { color: #f9e2af; }
                .catppuccin-code .hljs-selector-class { color: #f9e2af; }
                .catppuccin-code .hljs-selector-attr { color: #cba6f7; }
                .catppuccin-code .hljs-selector-pseudo { color: #94e2d5; }
                .catppuccin-code .hljs-template-tag { color: #f38ba8; }
                .catppuccin-code .hljs-template-variable { color: #f38ba8; }
                .catppuccin-code .hljs-addition { color: #a6e3a1; background-color: rgba(166, 227, 161, 0.1); }
                .catppuccin-code .hljs-deletion { color: #f38ba8; background-color: rgba(243, 139, 168, 0.1); }
            `}</style>
        </div>
    );
};
