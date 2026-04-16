export type DailyEntry = {
  date: string;
  completedActivities?: string[];
  moodScores?: {
    energy?: number | null;
    mood?: number | null;
    focus?: number | null;
    pain?: number | null;
    sleepQuality?: number | null;
  };
};

export const TRACKED_ACTIVITIES = [
  "Sun Gazing",
  "Morning Stretching",
  "Rebounding",
  "Earthing",
] as const;

export function getAllDailyEntries(): DailyEntry[] {
  const entries: DailyEntry[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("dailyEntry:")) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        entries.push(JSON.parse(raw) as DailyEntry);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
  return entries;
}

export function getActivityCounts(entries: DailyEntry[]): Record<string, number> {
  const counts: Record<string, number> = {};
  TRACKED_ACTIVITIES.forEach((a) => (counts[a] = 0));
  entries.forEach((e) => {
    (e.completedActivities ?? []).forEach((a) => {
      if (a in counts) counts[a] += 1;
    });
  });
  return counts;
}

export function getMoodAverages(entries: DailyEntry[]) {
  const keys = ["energy", "mood", "focus", "pain", "sleepQuality"] as const;
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};
  keys.forEach((k) => {
    sums[k] = 0;
    counts[k] = 0;
  });
  entries.forEach((e) => {
    const ms = e.moodScores;
    if (!ms) return;
    keys.forEach((k) => {
      const v = ms[k];
      if (typeof v === "number") {
        sums[k] += v;
        counts[k] += 1;
      }
    });
  });
  const averages: Record<string, number | null> = {};
  keys.forEach((k) => {
    averages[k] = counts[k] > 0 ? sums[k] / counts[k] : null;
  });
  return averages as {
    energy: number | null;
    mood: number | null;
    focus: number | null;
    pain: number | null;
    sleepQuality: number | null;
  };
}
