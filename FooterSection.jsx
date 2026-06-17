import React from "react";
import { Link } from "react-router-dom";
import { Terminal, Code2, BookOpen, Trophy, ExternalLink } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-border/30 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-heading font-bold text-foreground">HB Dev Productions</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn Roblox Lua scripting with interactive, hands-on lessons and a built-in code editor.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              ── Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-foreground/60 hover:text-primary transition-colors font-mono">
                  ~/home
                </Link>
              </li>
              <li>
                <Link to="/lessons" className="text-sm text-foreground/60 hover:text-primary transition-colors font-mono">
                  ~/lessons
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              ── Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://create.roblox.com/docs" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-primary transition-colors font-mono inline-flex items-center gap-1">
                  Roblox Docs <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.lua.org/manual/5.1/" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-primary transition-colors font-mono inline-flex items-center gap-1">
                  Lua 5.1 Manual <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://devforum.roblox.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-primary transition-colors font-mono inline-flex items-center gap-1">
                  DevForum <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
              ── System
            </h4>
            <div className="space-y-3 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Status: <span className="text-accent">Online</span></span>
              </div>
              <div>
                <span>Version: <span className="text-foreground/60">1.0.0</span></span>
              </div>
              <div>
                <span>Engine: <span className="text-foreground/60">Lua 5.1</span></span>
              </div>
              <div>
                <span>Platform: <span className="text-foreground/60">Roblox Studio</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground/50">
            &gt; Process.exit(0) — © {new Date().getFullYear()} HB Dev Productions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="font-mono text-xs text-muted-foreground/50 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/" className="font-mono text-xs text-muted-foreground/50 hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}