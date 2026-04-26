import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";

import { TRACKED_ACTIVITIES, type DailyEntry, type MoodScores } from "../lib/stats";

type Props = {
  entries: DailyEntry[];
};

const MOOD_KEYS: Array<keyof MoodScores> = ["energy", "mood", "focus", "pain"];

function averageMoodScore(ms: MoodScores | undefined | null): number | null {
  if (!ms) return null;
  const vals = MOOD_KEYS.map((k) => ms[k]).filter((v): v is number => typeof v === "number");
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

/**
 * Renders a flex grid:
 *  - Left column: the 4 tracked activities (rows)
 *  - "Activities" header column shows the average mood for that activity across completed days
 *  - One column per day that has any completed activity, under the "Mood" heading
 *  - "Average" column shows overall average per activity (same value as under Activities header)
 */
export function ActivityMoodGrid({ entries }: Props) {
  // Sort entries by date ascending; only keep entries that have at least one completed activity
  const dayEntries = [...entries]
    .filter((e) => (e.completedActivities ?? []).length > 0)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  // Per-activity per-day mood average lookup
  const cellValue = (activity: string, entry: DailyEntry): number | null => {
    const completed = entry.completedActivities?.includes(activity);
    if (!completed) return null;
    const ms = entry.moodByActivity?.[activity];
    return averageMoodScore(ms);
  };

  // Per-activity overall average across all days where it was completed and rated
  const activityAverage = (activity: string): number | null => {
    const vals: number[] = [];
    dayEntries.forEach((e) => {
      const v = cellValue(activity, e);
      if (typeof v === "number") vals.push(v);
    });
    if (vals.length === 0) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const formatDay = (dateStr: string) => {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="py-4"
    >
      <div className="flex items-center gap-2 mb-8">
        <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
          Activity & Mood
        </h2>
      </div>

      <div className="rounded-2xl border border-border/40 overflow-x-auto">
        <div className="min-w-fit">
          {/* Header row */}
          <div className="flex items-stretch border-b border-border/40 bg-muted/20">
            <div className="flex-shrink-0 w-48 px-6 py-4 font-body text-xs uppercase tracking-wider text-foreground/60 font-medium">
              Activities
            </div>
            <div className="flex-1 flex items-stretch min-w-0">
              {/* Mood section header spans all day columns */}
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-2 font-body text-xs uppercase tracking-wider text-foreground/60 font-medium border-b border-border/30">
                  Mood
                </div>
                <div className="flex items-stretch flex-1">
                  {dayEntries.length === 0 ? (
                    <div className="flex-1 px-6 py-4 font-body text-sm text-foreground/40 italic">
                      No completed days yet — complete an activity and rate how you feel to populate this grid.
                    </div>
                  ) : (
                    dayEntries.map((e) => (
                      <div
                        key={e.date}
                        className="flex-1 min-w-[110px] px-4 py-3 text-center font-body text-xs text-foreground/60 border-l border-border/30"
                      >
                        {formatDay(e.date)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-32 px-6 py-4 font-body text-xs uppercase tracking-wider text-foreground/60 font-medium border-l border-border/40 text-center">
              Average
            </div>
          </div>

          {/* Activity rows */}
          {TRACKED_ACTIVITIES.map((activity, rowIdx) => {
            const overallAvg = activityAverage(activity);
            return (
              <motion.div
                key={activity}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + rowIdx * 0.05 }}
                className={`flex items-stretch ${
                  rowIdx < TRACKED_ACTIVITIES.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="flex-shrink-0 w-48 px-6 py-5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary/60 flex-shrink-0" />
                  <span className="font-body text-sm text-foreground">{activity}</span>
                </div>

                <div className="flex-1 flex items-stretch min-w-0">
                  {dayEntries.length === 0 ? (
                    <div className="flex-1 px-6 py-5" />
                  ) : (
                    dayEntries.map((e) => {
                      const completed = e.completedActivities?.includes(activity);
                      const val = cellValue(activity, e);
                      return (
                        <div
                          key={e.date}
                          className="flex-1 min-w-[110px] px-4 py-5 flex items-center justify-center border-l border-border/30"
                        >
                          {completed ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="font-display text-foreground" style={{ fontSize: "20px" }}>
                                {val === null ? "—" : val.toFixed(1)}
                              </span>
                            </div>
                          ) : (
                            <Circle className="w-4 h-4 text-foreground/15" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex-shrink-0 w-32 px-6 py-5 flex items-center justify-center border-l border-border/40">
                  <span className="font-display text-foreground" style={{ fontSize: "24px" }}>
                    {overallAvg === null ? "—" : overallAvg.toFixed(1)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="font-body text-xs text-foreground/40 mt-3">
        Each cell shows the average of your mood scales (Energy, Mood, Focus, Pain) for that activity on
        that day. The Average column reflects all completed days.
      </p>
    </motion.div>
  );
}