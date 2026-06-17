import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, GitBranch, Boxes, Gamepad2, Check, ChevronRight, Clock, BookOpen, FunctionSquare, Database, Calculator, Trophy, Zap } from "lucide-react";
import NavBar from "@/components/home/NavBar";
import FooterSection from "@/components/home/FooterSection";
import { LESSONS, MODULES } from "@/lib/lessonData";

const ICON_MAP = { Code2, GitBranch, Boxes, Gamepad2, FunctionSquare, Database, Calculator, Trophy, Zap };

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem("luaforge_progress") || "{}");
  } catch { return {}; }
}

function getLessonCompletion(lessonId, progress) {
  const lesson = LESSONS.find(l => l.id === lessonId);
  if (!lesson) return 0;
  const completed = progress[lessonId] || [];
  return Math.round((completed.length / lesson.steps.length) * 100);
}

function isLessonComplete(lessonId, progress) {
  return getLessonCompletion(lessonId, progress) === 100;
}

const DIFFICULTY_COLORS = {
  beginner: "text-accent border-accent/30 bg-accent/10",
  intermediate: "text-primary border-primary/30 bg-primary/10",
  advanced: "text-secondary border-secondary/30 bg-secondary/10"
};

export default function Lessons() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const totalSteps = LESSONS.reduce((sum, l) => sum + l.steps.length, 0);
  const completedSteps = LESSONS.reduce((sum, l) => sum + (progress[l.id] || []).length, 0);
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="pt-24 pb-16 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            // Lesson.Hub
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-4xl mt-3 tracking-tight">
            Learning <span className="text-primary">Modules</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Work through each module in order. Complete all steps to master Roblox Lua scripting.
          </p>

          {/* Overall progress */}
          <div className="mt-6 p-4 rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-muted-foreground">Overall Progress</span>
              <span className="font-mono text-xs text-primary">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/60 mt-2">
              {completedSteps} / {totalSteps} steps completed
            </p>
          </div>
        </motion.div>

        {/* Modules */}
        {MODULES.map((module, moduleIdx) => {
          const moduleLessons = LESSONS.filter(l => l.moduleIndex === module.index);
          const Icon = ICON_MAP[module.icon] || Code2;

          return (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIdx * 0.1 }}
              className="mb-10"
            >
              {/* Module header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h2 className="font-heading font-semibold text-lg text-foreground">{module.name}</h2>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Module {module.index + 1} · {moduleLessons.length} lessons
                  </span>
                </div>
              </div>

              {/* Lesson cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {moduleLessons.map((lesson, i) => {
                  const completion = getLessonCompletion(lesson.id, progress);
                  const complete = completion === 100;

                  return (
                    <Link
                      key={lesson.id}
                      to={`/lessons/${lesson.id}`}
                      className="group"
                    >
                      <div className={`relative h-full p-5 rounded-xl border transition-all duration-300 ${
                        complete
                          ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                          : "border-border/30 bg-card/50 hover:border-primary/30 hover:bg-card/80"
                      }`}>
                        {/* Completion badge */}
                        {complete && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-accent-foreground" />
                          </div>
                        )}

                        <div className="flex items-center gap-2 mb-2">
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${DIFFICULTY_COLORS[lesson.difficulty]}`}>
                            {lesson.difficulty}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} min
                          </span>
                        </div>

                        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                          {lesson.description}
                        </p>

                        {/* Progress bar */}
                        {completion > 0 && !complete && (
                          <div className="mt-3">
                            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary/60 rounded-full transition-all"
                                style={{ width: `${completion}%` }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-muted-foreground mt-1 inline-block">
                              {completion}% complete
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 mt-3 font-mono text-xs text-primary/60 group-hover:text-primary transition-colors">
                          <BookOpen className="w-3 h-3" />
                          {lesson.steps.length} steps
                          <ChevronRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <FooterSection />
    </div>
  );
}