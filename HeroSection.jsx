import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ArrowRight, Terminal } from "lucide-react";

const CODE_LINES = [
  { text: "local", type: "keyword" },
  { text: " player ", type: "ident" },
  { text: "= ", type: "op" },
  { text: "game", type: "global" },
  { text: ":GetService(", type: "op" },
  { text: '"Players"', type: "string" },
  { text: ")", type: "op" },
];

const CODE_FULL = `-- Welcome to Roblox Lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    print("Welcome, " .. player.Name)
    
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats
end

Players.PlayerAdded:Connect(onPlayerAdded)`;

export default function HeroSection({ heroImage }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [codeIndex, setCodeIndex] = useState(0);

  useEffect(() => {
    if (codeIndex < CODE_FULL.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(CODE_FULL.slice(0, codeIndex + 1));
        setCodeIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [codeIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Abstract 3D geometric shapes connected by logic wires in a dark digital void"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* Execution line */}
      <motion.div
        className="absolute left-8 md:left-16 top-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        style={{ height: "100%" }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-accent tracking-widest uppercase">
                  System.Initialize()
                </span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight">
                <span className="text-foreground">Learn</span>
                <br />
                <span className="text-primary">Roblox Lua</span>
                <br />
                <span className="text-foreground/70">from Zero</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
                Interactive lessons with a built-in code editor, real-time validation, and a live console. Master scripting for Roblox Studio step by step.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/lessons"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 group"
                >
                  <Play className="w-4 h-4" />
                  Initialize Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/lessons"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border hover:border-primary/50 text-foreground/70 hover:text-foreground font-medium text-sm transition-all duration-300"
                >
                  <Terminal className="w-4 h-4" />
                  Browse Modules
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — Code preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-xl blur-xl opacity-50" />
              <div className="relative bg-[#0D121D] border border-border/50 rounded-xl overflow-hidden shadow-2xl">
                {/* Editor chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground ml-2">
                    ServerScriptService / GameScript.lua
                  </span>
                </div>

                {/* Code display */}
                <div className="p-4 min-h-[340px] font-mono text-sm leading-relaxed overflow-hidden">
                  <pre className="whitespace-pre-wrap">
                    {displayedCode.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-8 text-right mr-4 text-muted-foreground/30 text-xs select-none">{i + 1}</span>
                        <span>
                          {highlightLine(line)}
                        </span>
                      </div>
                    ))}
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function highlightLine(line) {
  const keywords = /\b(local|function|end|if|then|else|elseif|for|while|do|return|and|or|not|in|repeat|until|break|true|false|nil)\b/g;
  const strings = /"[^"]*"|'[^']*'/g;
  const comments = /--.*$/g;
  const numbers = /\b\d+(\.\d+)?\b/g;
  const globals = /\b(game|workspace|Instance|Vector3|Players|print)\b/g;

  if (line.trim().startsWith("--")) {
    return <span style={{ color: "#6272A4", fontStyle: "italic" }}>{line}</span>;
  }

  const parts = [];
  let lastIndex = 0;
  const allMatches = [];

  for (const match of line.matchAll(strings)) {
    allMatches.push({ start: match.index, end: match.index + match[0].length, type: "string", text: match[0] });
  }
  for (const match of line.matchAll(keywords)) {
    if (!allMatches.some(m => match.index >= m.start && match.index < m.end)) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, type: "keyword", text: match[0] });
    }
  }
  for (const match of line.matchAll(globals)) {
    if (!allMatches.some(m => match.index >= m.start && match.index < m.end)) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, type: "global", text: match[0] });
    }
  }
  for (const match of line.matchAll(numbers)) {
    if (!allMatches.some(m => match.index >= m.start && match.index < m.end)) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, type: "number", text: match[0] });
    }
  }

  allMatches.sort((a, b) => a.start - b.start);

  allMatches.forEach((m, idx) => {
    if (m.start > lastIndex) {
      parts.push(<span key={`t-${idx}`} style={{ color: "#E0E6ED" }}>{line.slice(lastIndex, m.start)}</span>);
    }
    const colorMap = {
      keyword: "#FF79C6",
      string: "#F1FA8C",
      global: "#8BE9FD",
      number: "#BD93F9",
    };
    parts.push(
      <span key={idx} style={{ color: colorMap[m.type], fontWeight: m.type === "keyword" ? 600 : 400 }}>
        {m.text}
      </span>
    );
    lastIndex = m.end;
  });

  if (lastIndex < line.length) {
    parts.push(<span key="rest" style={{ color: "#E0E6ED" }}>{line.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : <span style={{ color: "#E0E6ED" }}>{line}</span>;
}