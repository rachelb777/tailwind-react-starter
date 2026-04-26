import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import { WellnessDashboardGrid, type GridValues, type MoodKey } from "./WellnessDashboardGrid";

const SUN_GAZING_BASE: GridValues = {
  energy: [3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, null, null, null],
  mood:   [2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, null, null, null],
  focus:  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, null, null, null],
  pain:   [4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, null, null, null],
};

const MORNING_STRETCHES: GridValues = {
  energy: [2, 2, 3, 3, 3, 4, 3, 4, 4, 4, 5, 5, 5, 5],
  mood:   [2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 4, 5, 5, 5],
  focus:  [3, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 4, 4, 5],
  pain:   [4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1],
};

const REBOUNDING: GridValues = {
  energy: [2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5],
  mood:   [3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 4, 5],
  focus:  [2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
  pain:   [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
};

const EARTHING: GridValues = {
  energy: [2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 4, 5],
  mood:   [2, 3, 2, 3, 3, 3, 4, 4, 4, 4, 4, 5, 4, 5],
  focus:  [3, 3, 3, 3, 2, 3, 3, 3, 3, 4, 3, 4, 4, 4],
  pain:   [4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1],
};

const SUN_GAZING_INSIGHT =
  "Sun Gazing shows a positive association with improved mood and reduced pain based on your completed days.";
const MORNING_STRETCHES_INSIGHT =
  "Morning Stretches shows a positive association with increased energy and improved mood based on your completed days.";
const REBOUNDING_INSIGHT =
  "Rebounding shows a positive association with increased focus and energy based on your completed days.";
const EARTHING_INSIGHT =
  "Earthing shows a positive association with reduced pain and improved mood based on your completed days.";

// Live entries for Sun Gazing days 12-14 are stored under this localStorage
// key so they persist while the user navigates between pages. A sessionStorage
// "alive" flag lets us detect a fresh page refresh and clear them.
const SUN_LIVE_KEY = "sunGazingLiveEntries";
const SESSION_ALIVE_KEY = "sunGazingSessionAlive";

type LiveEntry = Partial<Record<MoodKey, number | null>>;

function readLiveEntries(): LiveEntry[] {
  try {
    const raw = localStorage.getItem(SUN_LIVE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.slice(0, 3);
  } catch {
    /* ignore */
  }
  return [];
}

function buildSunGazingValues(entries: LiveEntry[]): GridValues {
  const result: GridValues = {
    energy: [...SUN_GAZING_BASE.energy],
    mood: [...SUN_GAZING_BASE.mood],
    focus: [...SUN_GAZING_BASE.focus],
    pain: [...SUN_GAZING_BASE.pain],
  };
  entries.slice(0, 3).forEach((entry, i) => {
    const dayIdx = 11 + i; // Days 12, 13, 14 → indices 11, 12, 13
    (Object.keys(result) as MoodKey[]).forEach((k) => {
      const v = entry[k];
      if (typeof v === "number") result[k][dayIdx] = v;
    });
  });
  return result;
}

export function Profile() {
  const todaysPractices = [
    { name: "Sun Gazing", completed: true, time: "6:30 AM" },
    { name: "Morning Stretching", completed: false, time: "6:45 AM" },
    { name: "Rebounding", completed: true, time: "2:00 PM" },
    { name: "Earthing", completed: false, time: "5:30 PM" },
  ];

  // Detect a fresh page refresh: if the sessionStorage flag is missing, this
  // is a new browser session OR a hard reload — either way, clear days 12-14.
  // If the flag is present, we're navigating within the SPA and should keep
  // any live entries already captured.
  const [sunGazingValues, setSunGazingValues] = useState<GridValues>(() => {
    if (typeof window === "undefined") return buildSunGazingValues([]);
    const alive = sessionStorage.getItem(SESSION_ALIVE_KEY);
    if (!alive) {
      localStorage.removeItem(SUN_LIVE_KEY);
      sessionStorage.setItem(SESSION_ALIVE_KEY, "1");
      return buildSunGazingValues([]);
    }
    return buildSunGazingValues(readLiveEntries());
  });

  useEffect(() => {
    // Poll for new submissions made on Morning/Movement pages so the grid
    // updates the moment the user returns to the dashboard or a save lands.
    const sync = () => {
      setSunGazingValues(buildSunGazingValues(readLiveEntries()));
    };

    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    const interval = window.setInterval(sync, 500);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl
 text-foreground mb-4 leading-tight"
            >
              Welcome Back
            </h1>
            <p className="font-body text-2xl text-foreground/70 max-w-2xl">Your wellness flow and community insights</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="px-8 lg:px-16 py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">Insight</h3>
          <p className="font-body italic text-foreground/70 leading-relaxed" style={{ fontSize: "20px" }}>
            Sun Gazing shows a positive association with improved mood and energy levels based on completed days.
          </p>
          <p className="font-body italic text-foreground/70 leading-relaxed mt-4" style={{ fontSize: "20px" }}>
            Rebounding shows a positive association with increased focus and reduced pain levels based on recent
            activity.
          </p>
        </motion.div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar - Today's Practice */}
            <aside className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 rounded-2xl border border-border/40 mt-32"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
                    Today's Practice
                  </h2>
                </div>
                <div className="text-xs font-body text-foreground/50 mb-6">2 of 4 completed</div>

                <div className="space-y-1">
                  {todaysPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`flex items-center gap-3 py-3 pl-4 border-l-2 transition-all ${
                        practice.completed ? "border-primary" : "border-transparent hover:border-foreground/20"
                      }`}
                    >
                      {practice.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-foreground/30 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-body text-sm ${practice.completed ? "text-foreground/60 line-through" : "text-foreground"}`}
                        >
                          {practice.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-body text-foreground/40 mt-0.5">
                          {practice.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
              <div className="flex items-center gap-2">
                <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
                  Mood Tracking
                </h2>
              </div>
              <WellnessDashboardGrid
                activity="Sun Gazing"
                values={sunGazingValues}
                insight={SUN_GAZING_INSIGHT}
                position={0}
              />
              <WellnessDashboardGrid
                activity="Morning Stretches"
                values={MORNING_STRETCHES}
                insight={MORNING_STRETCHES_INSIGHT}
                position={1}
              />
              <WellnessDashboardGrid
                activity="Rebounding"
                values={REBOUNDING}
                insight={REBOUNDING_INSIGHT}
                position={2}
              />
              <WellnessDashboardGrid
                activity="Earthing"
                values={EARTHING}
                insight={EARTHING_INSIGHT}
                position={3}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
