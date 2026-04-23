import { motion } from "motion/react";
import { useMemo } from "react";

import { TRACKED_ACTIVITIES, type DailyEntry, type MoodScores } from "../lib/stats";

type Props = {
  entries: DailyEntry[];
};

const MOOD_ROWS: Array<{ key: keyof MoodScores; label: string }> = [
  { key: "focus", label: "Focus" },
  { key: "energy", label: "Energy" },
  { key: "mood", label: "Mood" },
  { key: "sleepQuality", label: "Sleep Quality" },
  { key: "pain", label: "Pain" },
];

const CYCLE_LENGTH = 14;

type CycleDay = {
  date: string;
  scores: MoodScores;
};

type ActivityCycle = {
  activity: string;
  index: number; // cycle index (0 = first 14-day block)
  days: CycleDay[]; // length 1..14
};

/**
 * Build per-activity 14-day cycles from saved daily entries.
 * A "completed day" for an activity = the activity is in completedActivities AND
 * the user has saved at least one mood score for that activity that day.
 * Days are sorted chronologically and grouped into 14-day blocks per activity.
 */
function buildCycles(entries: DailyEntry[]): ActivityCycle[] {
  const sorted = [...entries].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
  );

  const cyclesByActivity: Record<string, ActivityCycle[]> = {};

  TRACKED_ACTIVITIES.forEach((activity) => {
    const completedDays: CycleDay[] = [];
    sorted.forEach((e) => {
      const isCompleted = e.completedActivities?.includes(activity);
      const scores = e.moodByActivity?.[activity];
      const hasAnyScore =
        scores &&
        MOOD_ROWS.some(({ key }) => typeof scores[key] === "number");
      if (isCompleted && hasAnyScore) {
        completedDays.push({ date: e.date, scores: scores! });
      }
    });

    const cycles: ActivityCycle[] = [];
    for (let i = 0; i < completedDays.length; i += CYCLE_LENGTH) {
      cycles.push({
        activity,
        index: cycles.length,
        days: completedDays.slice(i, i + CYCLE_LENGTH),
      });
    }
    if (cycles.length > 0) cyclesByActivity[activity] = cycles;
  });

  // Flatten and order so the most-recent cycle (across any activity) sits on top.
  // We use the latest date inside the cycle as its sort key.
  const all: ActivityCycle[] = [];
  Object.values(cyclesByActivity).forEach((cs) => all.push(...cs));
  all.sort((a, b) => {
    const aLast = a.days[a.days.length - 1]?.date ?? "";
    const bLast = b.days[b.days.length - 1]?.date ?? "";
    if (aLast === bLast) return 0;
    return aLast < bLast ? 1 : -1; // descending
  });
  return all;
}

function CycleGrid({ cycle, position }: { cycle: ActivityCycle; position: number }) {
  const { activity, days } = cycle;
  const isComplete = days.length === CYCLE_LENGTH;

  // Per-row two-week average (only when 14 days complete)
  const rowAverage = (key: keyof MoodScores): number | null => {
    if (!isComplete) return null;
    const vals = days
      .map((d) => d.scores[key])
      .filter((v): v is number => typeof v === "number");
    if (vals.length === 0) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const dayNumbers = Array.from({ length: CYCLE_LENGTH }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: position * 0.05 }}
      className="space-y-4"
    >
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className="font-display text-2xl md:text-3xl text-foreground">
          {activity}
        </h2>
        <span className="font-body text-xs uppercase tracking-wider text-foreground/50">
          {isComplete
            ? `Cycle ${cycle.index + 1} • Complete`
            : `Cycle ${cycle.index + 1} • Day ${days.length} of ${CYCLE_LENGTH}`}
        </span>
      </div>

      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          backgroundColor: "hsl(var(--grid-surface))",
          borderColor: "hsl(var(--grid-cell-border))",
        }}
      >
        <div className="overflow-x-auto">
          <div className="min-w-fit">
            {/* Header row */}
            <div
              className="flex items-stretch"
              style={{ backgroundColor: "hsl(var(--grid-surface-deep))" }}
            >
              <div className="flex-shrink-0 w-40 px-5 py-4 font-body text-xs uppercase tracking-wider text-foreground/70 font-medium">
                Mood
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div
                  className="px-5 py-2 font-body text-xs uppercase tracking-wider text-foreground/70 font-medium border-b"
                  style={{ borderColor: "hsl(var(--grid-cell-border) / 0.6)" }}
                >
                  Days Completed
                </div>
                <div className="flex items-stretch">
                  {dayNumbers.map((n) => (
                    <div
                      key={n}
                      className="flex-1 min-w-[44px] px-2 py-2 text-center font-body text-xs text-foreground/60 border-l"
                      style={{ borderColor: "hsl(var(--grid-cell-border) / 0.6)" }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="flex-shrink-0 w-32 px-4 py-4 font-body text-xs uppercase tracking-wider font-medium text-center border-l"
                style={{
                  borderColor: "hsl(var(--grid-cell-border))",
                  backgroundColor: "hsl(var(--grid-accent-soft))",
                  color: "hsl(var(--grid-accent-foreground))",
                }}
              >
                Two Week Average
              </div>
            </div>

            {/* Mood rows */}
            {MOOD_ROWS.map((row, rowIdx) => {
              const avg = rowAverage(row.key);
              return (
                <div
                  key={row.key}
                  className={`flex items-stretch ${
                    rowIdx < MOOD_ROWS.length - 1 ? "border-t" : "border-t"
                  }`}
                  style={{ borderColor: "hsl(var(--grid-cell-border) / 0.5)" }}
                >
                  <div
                    className="flex-shrink-0 w-40 px-5 py-4 flex items-center font-body text-sm text-foreground"
                    style={{ backgroundColor: "hsl(var(--grid-surface-deep))" }}
                  >
                    {row.label}
                  </div>

                  <div className="flex-1 flex items-stretch min-w-0">
                    {dayNumbers.map((n) => {
                      const day = days[n - 1];
                      const val = day?.scores[row.key];
                      const filled = typeof val === "number";
                      return (
                        <div
                          key={n}
                          className="flex-1 min-w-[44px] px-2 py-4 flex items-center justify-center border-l"
                          style={{ borderColor: "hsl(var(--grid-cell-border) / 0.5)" }}
                        >
                          {filled ? (
                            <span className="font-display text-foreground" style={{ fontSize: "16px" }}>
                              {val}
                            </span>
                          ) : (
                            <span className="text-foreground/20 font-body text-xs">·</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="flex-shrink-0 w-32 px-4 py-4 flex items-center justify-center border-l"
                    style={{
                      borderColor: "hsl(var(--grid-cell-border))",
                      backgroundColor: "hsl(var(--grid-accent-soft) / 0.6)",
                    }}
                  >
                    {avg === null ? (
                      <span className="font-body text-xs text-foreground/30">—</span>
                    ) : (
                      <span
                        className="font-display"
                        style={{
                          fontSize: "22px",
                          color: "hsl(var(--grid-accent-foreground))",
                        }}
                      >
                        {avg.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MoodTrackingGrid({ entries }: Props) {
  const cycles = useMemo(() => buildCycles(entries), [entries]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="py-4 space-y-12"
    >
      <div className="flex items-center gap-2">
        <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
          Mood Tracking
        </h2>
      </div>

      {cycles.length === 0 ? (
        <div
          className="rounded-2xl border px-6 py-10 text-center font-body text-sm text-foreground/50 italic"
          style={{
            backgroundColor: "hsl(var(--grid-surface))",
            borderColor: "hsl(var(--grid-cell-border))",
          }}
        >
          Complete an activity on the Morning or Movement page and rate how you feel to begin
          your first 14-day tracking cycle.
        </div>
      ) : (
        cycles.map((cycle, idx) => (
          <CycleGrid
            key={`${cycle.activity}-${cycle.index}`}
            cycle={cycle}
            position={idx}
          />
        ))
      )}

      <p className="font-body text-xs text-foreground/40">
        Each grid tracks one 14-day cycle for an activity. Cells fill in as you complete the
        activity and rate how you feel. The Two Week Average reveals once all 14 days are
        complete; a fresh empty grid then appears above for the next cycle.
      </p>
    </motion.div>
  );
}
