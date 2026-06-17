import React, { useState, useRef, useEffect, useCallback } from "react";

const LUA_KEYWORDS = [
  "and", "break", "do", "else", "elseif", "end", "false", "for", "function",
  "if", "in", "local", "nil", "not", "or", "repeat", "return", "then",
  "true", "until", "while"
];

const ROBLOX_GLOBALS = [
  "game", "workspace", "script", "Instance", "Vector3", "CFrame", "Color3",
  "BrickColor", "Enum", "Players", "Lighting", "ReplicatedStorage",
  "ServerStorage", "ServerScriptService", "StarterGui", "StarterPack",
  "wait", "spawn", "delay", "tick", "pairs", "ipairs", "print",
  "tostring", "tonumber", "type", "require", "math", "string", "table",
  "coroutine", "error", "pcall", "xpcall", "select", "unpack"
];

const BUILT_IN_FUNCTIONS = ["print", "tostring", "tonumber", "type", "pairs", "ipairs", "require", "error", "pcall", "xpcall", "select", "unpack", "wait", "spawn", "delay"];

function highlightLua(code) {
  if (!code) return "";

  let result = "";
  let i = 0;

  while (i < code.length) {
    // Multi-line comment
    if (code[i] === "-" && code[i + 1] === "-" && code[i + 2] === "[" && code[i + 3] === "[") {
      const endIdx = code.indexOf("]]", i + 4);
      const end = endIdx === -1 ? code.length : endIdx + 2;
      result += `<span class="lua-comment">${escapeHtml(code.slice(i, end))}</span>`;
      i = end;
      continue;
    }

    // Single-line comment
    if (code[i] === "-" && code[i + 1] === "-") {
      const end = code.indexOf("\n", i);
      const lineEnd = end === -1 ? code.length : end;
      result += `<span class="lua-comment">${escapeHtml(code.slice(i, lineEnd))}</span>`;
      i = lineEnd;
      continue;
    }

    // String (double)
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === "\\") j++;
        j++;
      }
      j++;
      result += `<span class="lua-string">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // String (single)
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && code[j] !== "'") {
        if (code[j] === "\\") j++;
        j++;
      }
      j++;
      result += `<span class="lua-string">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]) && (i === 0 || /[\s\(\[{,=<>~+\-*/%^]/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[0-9.xXa-fA-F]/.test(code[j])) j++;
      result += `<span class="lua-number">${escapeHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (LUA_KEYWORDS.includes(word)) {
        result += `<span class="lua-keyword">${word}</span>`;
      } else if (BUILT_IN_FUNCTIONS.includes(word)) {
        result += `<span class="lua-builtin">${word}</span>`;
      } else if (ROBLOX_GLOBALS.includes(word)) {
        result += `<span class="lua-global">${word}</span>`;
      } else {
        result += `<span class="lua-ident">${word}</span>`;
      }
      i = j;
      continue;
    }

    // Operators
    if ("+-*/%^#=<>~.,:;()[]{}".includes(code[i])) {
      result += `<span class="lua-operator">${escapeHtml(code[i])}</span>`;
      i++;
      continue;
    }

    result += escapeHtml(code[i]);
    i++;
  }

  return result;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function CodeEditor({ value, onChange, readOnly = false }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const lines = (value || "").split("\n").length;
    setLineCount(Math.max(lines, 10));
  }, [value]);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const handleKeyDown = (e) => {
    if (readOnly) return;
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="relative flex h-full bg-[#05070A] rounded-lg overflow-hidden border border-border/50">
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="flex-shrink-0 w-12 bg-[#05070A] border-r border-border/30 overflow-hidden select-none"
        style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.5" }}
      >
        <div className="pt-3 pb-3">
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="px-2 text-right text-muted-foreground/40"
              style={{ height: "21px", lineHeight: "21px", fontSize: "12px" }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Highlight layer */}
      <div className="relative flex-1 overflow-hidden">
        <pre
          ref={highlightRef}
          className="absolute inset-0 p-3 m-0 overflow-hidden pointer-events-none whitespace-pre-wrap break-words"
          style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.5" }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightLua(value) + "\n" }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => !readOnly && onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="absolute inset-0 w-full h-full p-3 m-0 bg-transparent text-transparent caret-primary resize-none outline-none whitespace-pre-wrap break-words"
          style={{ fontFamily: "var(--font-mono)", fontSize: "14px", lineHeight: "1.5" }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      <style>{`
        .lua-keyword { color: #FF79C6; font-weight: 600; }
        .lua-string { color: #F1FA8C; }
        .lua-number { color: #BD93F9; }
        .lua-comment { color: #6272A4; font-style: italic; }
        .lua-builtin { color: #00F0FF; }
        .lua-global { color: #8BE9FD; font-style: italic; }
        .lua-operator { color: #FF79C6; }
        .lua-ident { color: #E0E6ED; }
      `}</style>
    </div>
  );
}