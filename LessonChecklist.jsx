import React from "react";
import { Check, Circle, Lock, Lightbulb, ChevronRight, BookOpenCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SolutionPanel from "./SolutionPanel";

export default function LessonChecklist({ steps, completedSteps, currentStepIndex, onStepClick, showHint, onToggleHint, showSolution, onToggleSolution, onUseCode }) {
  return (
    <div className="space-y-2">
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = idx === currentStepIndex;
        const isLocked = idx > currentStepIndex && !isCompleted;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <button
              onClick={() => !isLocked && onStepClick(idx)}
              disabled={isLocked}
              className={`w-full text-left p-3 rounded-lg border transition-all duration-300 group ${
                isCurrent
                  ? "border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(0,240,255,0.05)]"
                  : isCompleted
                  ? "border-accent/30 bg-accent/5"
                  : "border-border/30 bg-muted/20 opacity-50"
              } ${!isLocked ? "hover:border-primary/30 cursor-pointer" : "cursor-not-allowed"}`}
            >
              <div className="flex items-start gap-3">
                {/* Status icon */}
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  isCompleted
                    ? "bg-accent text-accent-foreground"
                    : isCurrent
                    ? "border-2 border-primary text-primary"
                    : "border border-muted-foreground/30 text-muted-foreground/30"
                }`}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3" />
                  ) : (
                    <Circle className="w-3 h-3 fill-current" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      Step {idx + 1}
                    </span>
                    {isCompleted && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded"
                      >
                        COMPLETE
                      </motion.span>
                    )}
                  </div>
                  <p className={`text-sm font-medium mt-0.5 ${isCurrent ? "text-foreground" : "text-foreground/70"}`}>
                    {step.title}
                  </p>

                  <AnimatePresence>
                    {isCurrent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {step.instruction}
                        </p>

                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          {step.hint && (
                            <button
                              onClick={(e) => { e.stopPropagation(); onToggleHint(); }}
                              className="flex items-center gap-1.5 text-[11px] text-primary/70 hover:text-primary transition-colors font-mono"
                            >
                              <Lightbulb className="w-3 h-3" />
                              {showHint ? "Hide hint" : "Show hint"}
                            </button>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); onToggleSolution(); }}
                            className="flex items-center gap-1.5 text-[11px] text-secondary/80 hover:text-secondary transition-colors font-mono"
                          >
                            <BookOpenCheck className="w-3 h-3" />
                            {showSolution ? "Hide solution" : "I'm confused — show me"}
                          </button>
                        </div>

                        <AnimatePresence>
                          {showHint && step.hint && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 p-2 rounded bg-primary/5 border border-primary/10"
                            >
                              <p className="text-xs font-mono text-primary/70">{step.hint}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {showSolution && (
                            <SolutionPanel step={step} visible={showSolution} onUseCode={onUseCode} />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {isCurrent && !isCompleted && (
                  <ChevronRight className="w-4 h-4 text-primary/50 flex-shrink-0 mt-1" />
                )}
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}