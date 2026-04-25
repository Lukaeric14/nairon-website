import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Layer 1: CLI Runtime - Terminal simulation showing slash commands
 */
export function TerminalIllustration({ isActive }: { isActive: boolean }) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    { prompt: "❯", text: "/flux:scope Add dark mode toggle", delay: 0 },
    { prompt: "", text: "→ Scoping feature requirements...", delay: 1200, isOutput: true },
    { prompt: "", text: "✓ Brief ready: 4 tasks identified", delay: 2400, isOutput: true, isSuccess: true },
    { prompt: "❯", text: "/flux:work task-1", delay: 3600 },
    { prompt: "", text: "→ Implementing ThemeProvider...", delay: 4800, isOutput: true },
  ];

  useEffect(() => {
    if (!isActive) {
      setTypedIndex(0);
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    commands.forEach((cmd, i) => {
      const timer = setTimeout(() => setTypedIndex(i + 1), cmd.delay);
      timers.push(timer);
    });

    // Loop animation
    const loopTimer = setTimeout(() => setTypedIndex(0), 6500);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-56 rounded-lg border border-[#0C0C0C]/10 bg-white p-3 font-mono text-[10px] shadow-xl">
      {/* Terminal header */}
      <div className="mb-2 flex items-center gap-1.5">
        <div className="size-2 rounded-full bg-red-500/80" />
        <div className="size-2 rounded-full bg-yellow-500/80" />
        <div className="size-2 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[9px] text-[#1A1916]/40">claude-code</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1 min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {commands.slice(0, typedIndex).map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-1 ${
                cmd.isOutput
                  ? cmd.isSuccess
                    ? "text-emerald-400/90"
                    : "text-[#1A1916]/50"
                  : "text-[#1A1916]/90"
              }`}
            >
              {cmd.prompt && <span className="text-[#C9A96E]">{cmd.prompt}</span>}
              <span className={cmd.isOutput ? "pl-2" : ""}>{cmd.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {typedIndex < commands.length && (
          <div className="flex items-center gap-1 text-[#1A1916]/90">
            <span className="text-[#C9A96E]">❯</span>
            <span
              className={`inline-block w-1.5 h-3 bg-[#C9A96E] ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Layer 2: Recommendation DB + Nightcrawler - Database with polling
 */
export function NightcrawlerIllustration({ isActive }: { isActive: boolean }) {
  return (
    <div className="w-56 h-[120px] relative">
      {/* Twitter/X source */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        className="absolute left-0 top-2 flex flex-col items-center gap-1"
      >
        <div className="size-8 rounded-lg bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 flex items-center justify-center">
          <svg className="size-4 text-[#1A1916]/70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <span className="text-[8px] text-[#1A1916]/40">X/Twitter</span>
      </motion.div>

      {/* GitHub source */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ delay: 0.1 }}
        className="absolute left-0 bottom-2 flex flex-col items-center gap-1"
      >
        <div className="size-8 rounded-lg bg-[#0C0C0C]/5 border border-[#0C0C0C]/10 flex items-center justify-center">
          <svg className="size-4 text-[#1A1916]/70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
        <span className="text-[8px] text-[#1A1916]/40">GitHub</span>
      </motion.div>

      {/* Animated data flow arrows */}
      <svg className="absolute left-10 top-0 w-16 h-full" viewBox="0 0 60 120">
        <motion.path
          d="M 5 20 Q 30 20 45 45"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: isActive ? [0, -16] : 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 5 100 Q 30 100 45 75"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: isActive ? [0, -16] : 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(201,169,110,0.3)" />
            <stop offset="100%" stopColor="rgba(201,169,110,0.8)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Database cylinder */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      >
        <svg width="40" height="50" viewBox="0 0 40 50">
          {/* Cylinder body */}
          <ellipse cx="20" cy="8" rx="18" ry="6" fill="rgba(201,169,110,0.15)" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
          <rect x="2" y="8" width="36" height="32" fill="rgba(201,169,110,0.1)" />
          <ellipse cx="20" cy="40" rx="18" ry="6" fill="rgba(201,169,110,0.15)" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
          <line x1="2" y1="8" x2="2" y2="40" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
          <line x1="38" y1="8" x2="38" y2="40" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
          {/* Data lines */}
          <line x1="8" y1="18" x2="32" y2="18" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
          <line x1="8" y1="24" x2="32" y2="24" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
          <line x1="8" y1="30" x2="32" y2="30" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
        </svg>
        <span className="text-[8px] text-[#1A1916]/40 mt-1">Recs DB</span>
      </motion.div>
    </div>
  );
}

/**
 * Layer 3: Observability - Dashboard with metrics
 */
export function DashboardIllustration({ isActive }: { isActive: boolean }) {
  const [barHeights, setBarHeights] = useState([40, 55, 35, 70, 50, 65, 45]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setBarHeights((prev) =>
        prev.map((h) => Math.max(20, Math.min(80, h + (Math.random() - 0.5) * 15)))
      );
    }, 800);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-56 rounded-lg border border-[#0C0C0C]/10 bg-white p-3 shadow-xl">
      {/* Dashboard header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-medium text-[#1A1916]/70">Team Metrics</span>
        <span className="text-[8px] text-emerald-400">● Live</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          className="rounded bg-[#0C0C0C]/5 p-1.5 text-center"
        >
          <div className="text-[10px] font-medium text-[#C9A96E]">87%</div>
          <div className="text-[7px] text-[#1A1916]/40">Quality</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ delay: 0.1 }}
          className="rounded bg-[#0C0C0C]/5 p-1.5 text-center"
        >
          <div className="text-[10px] font-medium text-emerald-400">+12%</div>
          <div className="text-[7px] text-[#1A1916]/40">Trend</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ delay: 0.2 }}
          className="rounded bg-[#0C0C0C]/5 p-1.5 text-center"
        >
          <div className="text-[10px] font-medium text-[#1A1916]/80">24</div>
          <div className="text-[7px] text-[#1A1916]/40">Engineers</div>
        </motion.div>
      </div>

      {/* Bar chart */}
      <div className="h-16 flex items-end gap-1">
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-[#C9A96E]/60 to-[#C9A96E]/20"
            initial={{ height: "30%" }}
            animate={{ height: isActive ? `${h}%` : "30%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-1">
        <span className="text-[7px] text-[#1A1916]/30">Mon</span>
        <span className="text-[7px] text-[#1A1916]/30">Today</span>
      </div>
    </div>
  );
}

/**
 * Combined component that switches based on active index
 */
export function ArchitectureIllustration({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative h-[120px] w-56">
      <AnimatePresence mode="wait">
        {activeIndex === 0 && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <TerminalIllustration isActive={true} />
          </motion.div>
        )}
        {activeIndex === 1 && (
          <motion.div
            key="nightcrawler"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <NightcrawlerIllustration isActive={true} />
          </motion.div>
        )}
        {activeIndex === 2 && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <DashboardIllustration isActive={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
