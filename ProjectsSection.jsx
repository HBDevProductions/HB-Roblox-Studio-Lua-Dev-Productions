import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const PROJECTS = [
  {
    title: "Obby Course Builder",
    category: "Game Mechanics",
    description: "Learn to create obstacle courses with checkpoints, kill bricks, and respawn logic.",
    topics: ["Parts", "Touched Events", "Respawning"]
  },
  {
    title: "Leaderboard System",
    category: "Data & UI",
    description: "Build a full leaderstats system with coins, XP tracking, and persistent data.",
    topics: ["IntValue", "PlayerAdded", "DataStores"]
  },
  {
    title: "GUI Tween Menu",
    category: "User Interface",
    description: "Create animated menus with TweenService — smooth open/close transitions and buttons.",
    topics: ["ScreenGui", "TweenService", "Events"]
  },
  {
    title: "NPC Dialog System",
    category: "Game Logic",
    description: "Build interactive NPCs with branching dialog trees and proximity detection.",
    topics: ["ProximityPrompt", "Tables", "Functions"]
  },
  {
    title: "Inventory System",
    category: "Advanced",
    description: "Create a full inventory with items, slots, equip/unequip, and drop mechanics.",
    topics: ["Tables", "ModuleScripts", "RemoteEvents"]
  }
];

export default function ProjectsSection({ projectsImage }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              // Blueprint.Gallery
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mt-3 tracking-tight">
              What You'll <span className="text-primary">Build</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              Real game systems you can take straight into Roblox Studio after mastering the fundamentals.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-80 snap-start"
            >
              <div className="h-full rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all duration-300">
                {/* Image area */}
                <div className="h-44 relative overflow-hidden bg-muted/20">
                  <img
                    src={projectsImage}
                    alt={`Visual for ${project.title}`}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] text-primary bg-primary/10 backdrop-blur-sm px-2 py-1 rounded border border-primary/20">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.topics.map((t) => (
                      <span key={t} className="font-mono text-[10px] text-primary/70 bg-muted/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}