import { motion } from "motion/react";
import { useState } from "react";

export function AnimationLab() {
  const [pulseKey, setPulseKey] = useState(0);

  return (
    <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-20">
      <header className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-4 tracking-tight">
          Animation Lab
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
          A playground for testing web animations — Tailwind utilities, CSS keyframes, and Motion.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tailwind fade-in */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Fade In</h2>
          <div className="h-24 w-24 rounded-lg bg-primary animate-fade-in" />
          <p className="text-sm text-muted-foreground text-center">Tailwind <code>animate-fade-in</code></p>
        </section>

        {/* Tailwind scale-in */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Scale In</h2>
          <div className="h-24 w-24 rounded-full bg-secondary animate-scale-in" />
          <p className="text-sm text-muted-foreground text-center">Tailwind <code>animate-scale-in</code></p>
        </section>

        {/* Hover scale */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Hover Scale</h2>
          <div className="h-24 w-24 rounded-lg bg-accent transition-transform duration-200 hover:scale-110 cursor-pointer" />
          <p className="text-sm text-muted-foreground text-center">Hover the square</p>
        </section>

        {/* Built-in pulse */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Pulse</h2>
          <div className="h-24 w-24 rounded-full bg-primary/60 animate-pulse" />
          <p className="text-sm text-muted-foreground text-center">Tailwind <code>animate-pulse</code></p>
        </section>

        {/* Spin */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Spin</h2>
          <div className="h-24 w-24 rounded-md border-4 border-secondary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground text-center">Tailwind <code>animate-spin</code></p>
        </section>

        {/* Bounce */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Bounce</h2>
          <div className="h-24 w-24 rounded-full bg-accent animate-bounce" />
          <p className="text-sm text-muted-foreground text-center">Tailwind <code>animate-bounce</code></p>
        </section>

        {/* Motion: spring */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Motion Spring</h2>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="h-24 w-24 rounded-lg bg-primary cursor-pointer"
          />
          <p className="text-sm text-muted-foreground text-center">Hover & tap</p>
        </section>

        {/* Motion: replay */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Replay Pop</h2>
          <motion.div
            key={pulseKey}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="h-24 w-24 rounded-full bg-secondary"
          />
          <button
            onClick={() => setPulseKey((k) => k + 1)}
            className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-body"
          >
            Replay
          </button>
        </section>

        {/* Motion: infinite loop */}
        <section className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <h2 className="font-display text-xl text-foreground">Float Loop</h2>
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-24 w-24 rounded-lg bg-accent"
          />
          <p className="text-sm text-muted-foreground text-center">Looping y-axis</p>
        </section>
      </div>
    </div>
  );
}