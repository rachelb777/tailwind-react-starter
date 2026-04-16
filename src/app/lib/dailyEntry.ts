export function toggleCompletedActivity(activity: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const key = `dailyEntry:${today}`;
  let entry: { date: string; completedActivities: string[]; moodScores?: unknown } = {
    date: today,
    completedActivities: [],
  };
  try {
    const raw = localStorage.getItem(key);
    if (raw) entry = { ...entry, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  const set = new Set(entry.completedActivities ?? []);
  if (set.has(activity)) set.delete(activity);
  else set.add(activity);
  entry.completedActivities = Array.from(set);
  localStorage.setItem(key, JSON.stringify(entry));
  return set.has(activity);
}

export function isActivityCompleted(activity: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  const key = `dailyEntry:${today}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const entry = JSON.parse(raw);
    return Array.isArray(entry.completedActivities) && entry.completedActivities.includes(activity);
  } catch {
    return false;
  }
}
