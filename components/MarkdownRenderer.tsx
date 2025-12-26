
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Hàm highlight cú pháp Treesitter-style thủ công
  const highlightCode = (code: string, lang: string) => {
    if (!code) return code;

    // Các quy tắc Regex cho các thành phần ngôn ngữ
    const rules = [
      { name: 'comment', regex: /(\/\/.*|\/\*[\s\S]*?\*\/)/g, color: 'text-[#6c7086] italic' },
      { name: 'string', regex: /(["'`])(?:(?=(\\?))\2.)*?\1/g, color: 'text-[#a6e3a1]' },
      { name: 'keyword', regex: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|interface|type|async|await|default|new|try|catch|finally|throw|break|continue|case|switch|enum|in|of|as|static|public|private|protected|readonly)\b/g, color: 'text-[#cba6f7]' },
      { name: 'function', regex: /\b([a-zA-Z_]\w*)(?=\s*\()/g, color: 'text-[#89b4fa]' },
      { name: 'type', regex: /\b([A-Z][a-zA-Z0-9_]*)\b/g, color: 'text-[#f9e2af]' },
      { name: 'number', regex: /\b(\d+(\.\d+)?|0x[0-9a-fA-F]+)\b/g, color: 'text-[#fab387]' },
      { name: 'operator', regex: /(=>|===|==|!==|!=|>=|<=|[+\-*/%=&|^!<>])/g, color: 'text-[#89dceb]' },
    ];

    let highlighted: (string | React.ReactNode)[] = [code];

    rules.forEach(rule => {
      highlighted = highlighted.flatMap(part => {
        if (typeof part !== 'string') return part;

        const segments: (string | React.ReactNode)[] = [];
        let lastIndex = 0;
        let match;

        // Reset regex index for safety
        rule.regex.lastIndex = 0;

        while ((match = rule.regex.exec(part)) !== null) {
          // Push text before match
          if (match.index > lastIndex) {
            segments.push(part.substring(lastIndex, match.index));
          }
          // Push highlighted match
          segments.push(
            <span key={`${rule.name}-${match.index}`} className={rule.color}>
              {match[0]}
            </span>
          );
          lastIndex = rule.regex.lastIndex;
        }

        segments.push(part.substring(lastIndex));
        return segments;
      });
    });

    return highlighted;
  };

  const parseInline = (text: string) => {
    let parts: (string | React.ReactNode)[] = [text];

    // Image ![alt](url)
    parts = parts.flatMap(p => {
      if (typeof p !== 'string') return p;
      const regex = /!\[(.*?)\]\((.*?)\)/g;
      const split = p.split(regex);
      const result: (string | React.ReactNode)[] = [];
      for (let i = 0; i < split.length; i += 3) {
        result.push(split[i]);
        if (split[i + 1] !== undefined) {
          result.push(
            <div key={i} className="my-10 group relative flex flex-col items-center">
              <div className="absolute inset-0 bg-[#cba6f7]/10 blur-3xl rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={split[i + 2]} 
                alt={split[i + 1]} 
                className="relative z-10 rounded-3xl border-4 border-[#313244] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.02] group-hover:border-[#cba6f7]/50 max-w-full"
                loading="lazy"
              />
              {split[i + 1] && (
                <div className="relative z-10 mt-4 bg-[#181825] px-4 py-1.5 rounded-full border border-[#313244]">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#a6adc8]">{split[i + 1]}</p>
                </div>
              )}
            </div>
          );
        }
      }
      return result;
    });

    // Bold **text**
    parts = parts.flatMap(p => {
      if (typeof p !== 'string') return p;
      const regex = /\*\*(.*?)\*\*/g;
      const split = p.split(regex);
      return split.map((s, i) => (i % 2 === 1 ? <strong key={i} className="text-[#f5c2e7] font-bold">{s}</strong> : s));
    });

    // Italic *text*
    parts = parts.flatMap(p => {
      if (typeof p !== 'string') return p;
      const regex = /\*(.*?)\*/g;
      const split = p.split(regex);
      return split.map((s, i) => (i % 2 === 1 ? <em key={i} className="text-[#fab387] italic">{s}</em> : s));
    });

    // Inline code `text`
    parts = parts.flatMap(p => {
      if (typeof p !== 'string') return p;
      const regex = /`(.*?)`/g;
      const split = p.split(regex);
      return split.map((s, i) => (i % 2 === 1 ? <code key={i} className="bg-[#313244] px-1.5 py-0.5 rounded text-[#94e2d5] font-mono text-sm">{s}</code> : s));
    });

    return parts;
  };

  const renderTable = (tableLines: string[], key: number) => {
    if (tableLines.length < 2) return null;

    const headerLine = tableLines[0];
    const separatorLine = tableLines[1];
    const bodyLines = tableLines.slice(2);

    const parseRow = (line: string) => {
      return line
        .split('|')
        .filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
        .map(cell => cell.trim());
    };

    const headers = parseRow(headerLine);
    const rows = bodyLines.map(line => parseRow(line));

    return (
      <div key={key} className="my-10 overflow-x-auto rounded-2xl border border-[#313244] shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#181825]">
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#cba6f7] border-b border-[#313244]">
                  {parseInline(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#11111b]/50">
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#313244]/50 hover:bg-[#313244]/20 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-6 py-4 text-sm text-[#cdd6f4]">
                    {parseInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let isCodeBlock = false;
    let codeContent: string[] = [];
    let codeLang = '';
    let tableBuffer: string[] = [];

    const flushTable = (idx: number) => {
      if (tableBuffer.length > 0) {
        result.push(renderTable(tableBuffer, idx));
        tableBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        flushTable(idx);
        if (!isCodeBlock) {
          isCodeBlock = true;
          codeLang = line.replace('```', '').trim() || 'code';
          codeContent = [];
        } else {
          isCodeBlock = false;
          result.push(
            <div key={idx} className="my-10 rounded-3xl overflow-hidden border-2 border-[#313244] shadow-2xl animate-in fade-in zoom-in-95 duration-500 hover:border-[#cba6f7]/30 transition-colors group">
              <div className="bg-[#181825] px-6 py-3 flex items-center justify-between border-b border-[#313244] group-hover:bg-[#1e1e2e] transition-colors">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f38ba8] shadow-[0_0_8px_rgba(243,139,168,0.4)]" />
                  <div className="w-3 h-3 rounded-full bg-[#f9e2af] shadow-[0_0_8px_rgba(249,226,175,0.4)]" />
                  <div className="w-3 h-3 rounded-full bg-[#a6e3a1] shadow-[0_0_8px_rgba(166,227,161,0.4)]" />
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#a6e3a1] animate-pulse" />
                   <span className="text-[10px] font-black text-[#6c7086] uppercase tracking-[0.2em]">{codeLang}</span>
                </div>
              </div>
              <pre className="bg-[#0b0b12] p-8 overflow-x-auto font-mono text-[13px] leading-relaxed scrollbar-hide">
                <code className="block text-[#cdd6f4]">
                  {highlightCode(codeContent.join('\n'), codeLang)}
                </code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (isCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Handle tables
      if (line.trim().startsWith('|')) {
        tableBuffer.push(line.trim());
        return;
      } else {
        flushTable(idx);
      }

      if (line.startsWith('# ')) {
        result.push(<h1 key={idx} className="text-5xl md:text-6xl font-black mb-12 text-[#cba6f7] tracking-tighter border-b-4 border-[#313244] pb-6 mt-16 first:mt-0">{parseInline(line.replace('# ', ''))}</h1>);
      } else if (line.startsWith('## ')) {
        result.push(<h2 key={idx} className="text-3xl md:text-4xl font-black mb-8 text-[#89b4fa] tracking-tight mt-12">{parseInline(line.replace('## ', ''))}</h2>);
      } else if (line.startsWith('### ')) {
        result.push(<h3 key={idx} className="text-2xl font-bold mb-6 text-[#94e2d5] mt-10">{parseInline(line.replace('### ', ''))}</h3>);
      } else if (line.startsWith('- ')) {
        result.push(
          <li key={idx} className="ml-8 mb-4 list-none flex items-start gap-4 text-[#cdd6f4] group">
            <span className="text-[#f5c2e7] mt-2.5 w-2 h-2 rounded-full bg-[#f5c2e7] group-hover:scale-150 transition-transform" />
            <span className="text-xl leading-relaxed font-medium">{parseInline(line.replace('- ', ''))}</span>
          </li>
        );
      } else if (line.trim() === '') {
        result.push(<div key={idx} className="h-8" />);
      } else {
        result.push(<p key={idx} className="mb-8 leading-relaxed text-[#bac2de] text-xl font-medium antialiased">{parseInline(line)}</p>);
      }
    });

    flushTable(lines.length); // End of content flush
    return result;
  };

  return <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">{parseMarkdown(content)}</div>;
};

export default MarkdownRenderer;
