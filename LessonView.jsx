import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, RotateCcw, ChevronRight, ChevronLeft,
  Check, Code2, BookOpen, Trophy, Sparkles
} from "lucide-react";
import CodeEditor from "@/components/ide/CodeEditor";
import Console from "@/components/ide/Console";
import LessonChecklist from "@/components/ide/LessonChecklist";
import { LESSONS } from "@/lib/lessonData";
import { executeLua, validateCode } from "@/lib/luaEngine";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem("luaforge_progress") || "{}");
  } catch { return {}; }
}

function saveProgress(p) {
  localStorage.setItem("luaforge_progress", JSON.stringify(p));
}

export default function LessonView() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState("");
  const [consoleEntries, setConsoleEntries] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scanRef = useRef(null);

  // Load progress
  useEffect(() => {
    if (!lesson) return;
    const progress = getProgress();
    const saved = progress[lessonId] || [];
    setCompletedSteps(saved);

    // Find first uncompleted step
    const firstIncomplete = lesson.steps.findIndex((s) => !saved.includes(s.id));
    const idx = firstIncomplete === -1 ? 0 : firstIncomplete;
    setCurrentStepIndex(idx);
    setCode(lesson.steps[idx]?.starterCode || "");
    setShowHint(false);
    setShowSolution(false);
    setConsoleEntries([
      { type: "system", message: `[LuaForge] Loaded: ${lesson.title}` },
      { type: "system", message: `[LuaForge] Step ${idx + 1}/${lesson.steps.length}: ${lesson.steps[idx]?.title}` }
    ]);
  }, [lessonId]);

  const currentStep = lesson?.steps[currentStepIndex];

  const addConsoleEntry = useCallback((type, message) => {
    setConsoleEntries((prev) => [...prev, { type, message }]);
  }, []);

  // Run code
  const handleRun = useCallback(() => {
    if (!currentStep || scanning) return;

    // Scanning animation
    setScanning(true);
    addConsoleEntry("system", "⟩ Executing code...");

    if (scanRef.current) clearTimeout(scanRef.current);
    scanRef.current = setTimeout(() => {
      setScanning(false);

      const result = executeLua(code);

      // Show output
      result.output.forEach((line) => {
        addConsoleEntry("output", line);
      });

      // Show errors
      result.errors.forEach((err) => {
        addConsoleEntry("error", `[Line ${err.line}] ${err.message}`);
      });

      if (result.errors.length === 0 && result.output.length === 0) {
        addConsoleEntry("system", "Code executed — no output produced");
      }
    }, 600);
  }, [code, currentStep, scanning, addConsoleEntry]);

  // Check code
  const handleCheck = useCallback(() => {
    if (!currentStep || scanning) return;

    setScanning(true);
    addConsoleEntry("system", "⟩ Validating solution...");

    if (scanRef.current) clearTimeout(scanRef.current);
    scanRef.current = setTimeout(() => {
      setScanning(false);

      // Run first
      const result = executeLua(code);
      result.output.forEach((line) => addConsoleEntry("output", line));
      result.errors.forEach((err) => addConsoleEntry("error", `[Line ${err.line}] ${err.message}`));

      // Validate
      const validation = validateCode(code, currentStep.validation);

      if (validation.passed) {
        addConsoleEntry("success", `✓ ${validation.message}`);

        // Mark step complete
        if (!completedSteps.includes(currentStep.id)) {
          const newCompleted = [...completedSteps, currentStep.id];
          setCompletedSteps(newCompleted);

          const progress = getProgress();
          progress[lessonId] = newCompleted;
          saveProgress(progress);

          // Check if lesson is complete
          if (newCompleted.length === lesson.steps.length) {
            setTimeout(() => setShowComplete(true), 500);
          } else {
            // Auto advance
            setTimeout(() => {
              const nextIdx = currentStepIndex + 1;
              if (nextIdx < lesson.steps.length) {
                setCurrentStepIndex(nextIdx);
                setCode(lesson.steps[nextIdx].starterCode || "");
                setShowHint(false);
                setShowSolution(false);
                addConsoleEntry("system", `⟩ Step ${nextIdx + 1}: ${lesson.steps[nextIdx].title}`);
              }
            }, 1000);
          }
        }
      } else {
        addConsoleEntry("error", `✗ ${validation.message}`);
      }
    }, 800);
  }, [code, currentStep, scanning, completedSteps, lessonId, lesson, currentStepIndex, addConsoleEntry]);

  const handleStepClick = (idx) => {
    setCurrentStepIndex(idx);
    setCode(lesson.steps[idx].starterCode || "");
    setShowHint(false);
    setShowSolution(false);
    addConsoleEntry("system", `⟩ Switched to Step ${idx + 1}: ${lesson.steps[idx].title}`);
  };

  const handleReset = () => {
    if (currentStep) {
      setCode(currentStep.starterCode || "");
      addConsoleEntry("system", "⟩ Code reset to starter template");
    }
  };

  // Next lesson
  const currentLessonIdx = LESSONS.findIndex((l) => l.id === lessonId);
  const nextLesson = LESSONS[currentLessonIdx + 1];
  const prevLesson = LESSONS[currentLessonIdx - 1];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-mono">Lesson not found</p>
          <Link to="/lessons" className="text-primary font-mono text-sm mt-2 inline-block hover:underline">
            ← Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 h-12 border-b border-border/30 bg-card/50 backdrop-blur-xl flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link to="/lessons" className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="hidden sm:block h-4 w-px bg-border/50" />
          <div className="hidden sm:flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">{lesson.module}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            <span className="font-mono text-xs text-foreground">{lesson.title}</span>
          </div>
          <span className="sm:hidden font-mono text-xs text-foreground">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Lesson nav */}
          <div className="hidden md:flex items-center gap-1">
            {prevLesson && (
              <Link
                to={`/lessons/${prevLesson.id}`}
                className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                title={prevLesson.title}
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
            )}
            <span className="font-mono text-[10px] text-muted-foreground">
              {currentLessonIdx + 1}/{LESSONS.length}
            </span>
            {nextLesson && (
              <Link
                to={`/lessons/${nextLesson.id}`}
                className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                title={nextLesson.title}
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Toggle sidebar on mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground"
          >
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Scanning overlay */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left sidebar — Instructions & Checklist */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 border-r border-border/30 bg-card/30 flex flex-col overflow-hidden absolute lg:relative z-10 h-full"
            >
              {/* Lesson info */}
              <div className="p-4 border-b border-border/20">
                <h2 className="font-heading font-semibold text-foreground">{lesson.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{lesson.description}</p>

                {/* Step progress */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-[10px] text-muted-foreground">Progress</span>
                    <span className="font-mono text-[10px] text-primary">
                      {completedSteps.length}/{lesson.steps.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      animate={{ width: `${(completedSteps.length / lesson.steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="flex-1 overflow-y-auto p-4">
                <LessonChecklist
                  steps={lesson.steps}
                  completedSteps={completedSteps}
                  currentStepIndex={currentStepIndex}
                  onStepClick={handleStepClick}
                  showHint={showHint}
                  onToggleHint={() => setShowHint(!showHint)}
                  showSolution={showSolution}
                  onToggleSolution={() => setShowSolution(!showSolution)}
                  onUseCode={(code) => setCode(code)}
                />
              </div>

              {/* Close on mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-3 border-t border-border/20 text-center font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                Close Instructions
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right — Editor + Console */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-border/20 bg-muted/10">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                Editor — Step {currentStepIndex + 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
                title="Reset code"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
              <button
                onClick={handleRun}
                disabled={scanning}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-muted/30 text-foreground hover:bg-muted/50 transition-all disabled:opacity-50"
              >
                <Play className="w-3 h-3" />
                Run
              </button>
              <button
                onClick={handleCheck}
                disabled={scanning}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all disabled:opacity-50"
              >
                <Check className="w-3 h-3" />
                Check
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden p-2">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Console */}
          <div className="flex-shrink-0 h-44 border-t border-border/20 p-2">
            <Console
              entries={consoleEntries}
              onClear={() => setConsoleEntries([])}
            />
          </div>
        </div>
      </div>

      {/* Lesson complete modal */}
      <AnimatePresence>
        {showComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setShowComplete(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border/50 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-foreground">
                Lesson Complete!
              </h2>
              <p className="mt-2 text-muted-foreground">
                You've mastered <span className="text-primary font-medium">{lesson.title}</span>.
              </p>

              <div className="flex flex-col gap-3 mt-6">
                {nextLesson ? (
                  <Link
                    to={`/lessons/${nextLesson.id}`}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
                  >
                    Next Lesson: {nextLesson.title}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-accent">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">All lessons completed!</span>
                  </div>
                )}
                <Link
                  to="/lessons"
                  className="px-5 py-3 rounded-lg border border-border hover:border-primary/30 text-foreground/70 text-sm transition-all"
                >
                  Back to Modules
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}