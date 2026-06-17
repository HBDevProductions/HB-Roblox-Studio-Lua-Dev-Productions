import React from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, CheckSquare, Zap, BookOpen, Trophy } from "lucide-react";

const FEATURES = [
  {
    icon: Code2,
    title: "Lua Code Editor",
    description: "Full syntax highlighting for Lua with Roblox globals, auto-indent, and line numbers. Write code right in your browser.",
    color: "text-primary"
  },
  {
    icon: Terminal,
    title: "Live Console",
    description: "See your print() output instantly. Errors are explained with helpful corrections, not cryptic messages.",
    color: "text-accent"
  },
  {
    icon: CheckSquare,
    title: "Step-by-Step Checklist",
    description: "Every lesson breaks down into bite-sized tasks. Complete each one, get instant feedback, and track your progress.",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Code Validation",
    description: "Your code is checked against expected output and patterns. Know immediately if your solution works.",
    color: "text-yellow-400"
  },
  {
    icon: BookOpen,
    title: "8 Complete Lessons",
    description: "From Hello World to Roblox Events — covering variables, loops, functions, tables, instances, and more.",
    color: "text-primary"
  },
  {
    icon: Trophy,
    title: "Progress Tracking",
    description: "Your completed lessons and steps are saved locally. Pick up right where you left off any time.",
    color: "text-accent"
  }
];

export default function FeaturesSection({ featureImage }) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // System.Features
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mt-4 tracking-tight">
            Everything You Need to
            <span className="text-primary"> Code</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            A complete learning environment built for aspiring Roblox developers. No setup required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center mb-4 ${feature.color} group-hover:shadow-lg transition-shadow`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="relative max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-2xl" />
            <img
              src={featureImage}
              alt="Glowing translucent sphere with circuit patterns in cyan and green"
              className="relative rounded-2xl border border-border/20 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}