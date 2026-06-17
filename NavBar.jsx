import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code2, Menu, X } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="font-heading font-bold text-foreground tracking-tight">
            HB Dev Productions
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-mono text-sm transition-colors ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ~/home
          </Link>
          <Link
            to="/lessons"
            className={`font-mono text-sm transition-colors ${
              location.pathname.startsWith("/lessons") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ~/lessons
          </Link>
          <Link
            to="/lessons"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
          >
            Start Coding
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border/30 px-6 py-4 space-y-3">
          <Link to="/" className="block font-mono text-sm text-foreground/80 hover:text-primary py-2">
            ~/home
          </Link>
          <Link to="/lessons" className="block font-mono text-sm text-foreground/80 hover:text-primary py-2">
            ~/lessons
          </Link>
          <Link to="/lessons" className="block px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-medium text-center mt-2">
            Start Coding
          </Link>
        </div>
      )}
    </nav>
  );
}