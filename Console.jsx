import React, { useRef, useEffect } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";

export default function Console({ entries, onClear }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="flex flex-col h-full bg-[#05070A] border border-border/50 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-muted/30">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Output Console</span>
        </div>
        <button
          onClick={onClear}
          className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          title="Clear console"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
        role="log"
        aria-live="polite"
        aria-label="Code output console"
      >
        {entries.length === 0 && (
          <div className="flex items-center gap-2 text-muted-foreground/40 font-mono text-xs">
            <ChevronRight className="w-3 h-3" />
            <span>Waiting for execution...</span>
          </div>
        )}
        {entries.map((entry, i) => (
          <div key={i} className={`flex items-start gap-2 font-mono text-xs leading-relaxed ${
            entry.type === "error"
              ? "text-destructive"
              : entry.type === "warning"
              ? "text-yellow-400"
              : entry.type === "success"
              ? "text-accent"
              : entry.type === "system"
              ? "text-primary"
              : "text-foreground/80"
          }`}>
            <span className="flex-shrink-0 mt-0.5 opacity-50">
              {entry.type === "error" ? "✗" : entry.type === "success" ? "✓" : entry.type === "system" ? "⟩" : "›"}
            </span>
            <pre className="whitespace-pre-wrap break-words">{entry.message}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}