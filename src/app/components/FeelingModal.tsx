import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const SCALES = ["Energy Level", "Mood", "Focus", "Pain"] as const;

type Ratings = Record<(typeof SCALES)[number], number | null>;

const emptyRatings = (): Ratings =>
  SCALES.reduce((acc, k) => ({ ...acc, [k]: null }), {} as Ratings);

export function FeelingModal({
  open,
  onOpenChange,
  activity,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  activity?: string;
}) {
  const [ratings, setRatings] = useState<Ratings>(emptyRatings);

  // Reset ratings whenever the modal opens for a (possibly new) activity
  useEffect(() => {
    if (open) setRatings(emptyRatings());
  }, [open, activity]);

  const setValue = (scale: (typeof SCALES)[number], val: number) =>
    setRatings((prev) => ({ ...prev, [scale]: val }));

  const handleSave = () => {
    if (!activity) {
      onOpenChange(false);
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    const key = `dailyEntry:${today}`;
    const existing = (() => {
      try {
        return JSON.parse(localStorage.getItem(key) || "{}");
      } catch {
        return {};
      }
    })();
    const moodScores = {
      energy: ratings["Energy Level"],
      mood: ratings["Mood"],
      focus: ratings["Focus"],
      pain: ratings["Pain"],
    };
    const entry = {
      date: today,
      completedActivities: existing.completedActivities ?? [],
      // Per-activity mood scores keyed by activity name
      moodByActivity: {
        ...(existing.moodByActivity ?? {}),
        [activity]: moodScores,
      },
    };
    localStorage.setItem(key, JSON.stringify(entry));

    // Sun Gazing: also append this submission to the live Sun Gazing entries
    // used by the Wellness Dashboard grid (days 12-14).
    if (activity === "Sun Gazing") {
      try {
        const SUN_KEY = "sunGazingLiveEntries";
        const raw = localStorage.getItem(SUN_KEY);
        const list: Array<{
          energy: number | null;
          mood: number | null;
          focus: number | null;
          pain: number | null;
        }> = raw ? JSON.parse(raw) : [];
        if (Array.isArray(list) && list.length < 3) {
          list.push(moodScores);
          localStorage.setItem(SUN_KEY, JSON.stringify(list));
        }
      } catch {
        /* ignore */
      }
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            How are you feeling?
            {activity ? <span className="block text-base text-foreground/60 mt-1">{activity}</span> : null}
          </DialogTitle>
          <DialogDescription className="font-body">
            Rate each area from low to high to check in with yourself.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          {SCALES.map((scale) => (
            <div key={scale} className="flex flex-col gap-2">
              <label className="font-body text-sm text-foreground">{scale}</label>
              <div className="flex items-center justify-between gap-2">
                {[1, 2, 3, 4, 5].map((n) => {
                  const selected = ratings[scale] === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setValue(scale, n)}
                      aria-label={`${scale} rating ${n}`}
                      aria-pressed={selected}
                      className={`w-9 h-9 rounded-full border font-body text-sm transition-all flex items-center justify-center ${
                        selected
                          ? "bg-primary text-primary-foreground border-primary scale-110 shadow-md"
                          : "bg-background text-foreground/60 border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between text-xs text-foreground/50 font-body px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm hover:bg-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
