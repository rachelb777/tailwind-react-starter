import { motion } from "motion/react";
import { useEffect, useState } from "react";

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

      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-12">
            {/* Main Content */}
            <div className="space-y-8">
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
