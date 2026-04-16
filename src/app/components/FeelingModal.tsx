import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const SCALES = ["Energy Level", "Mood", "Focus", "Pain", "Sleep Quality"] as const;

type Ratings = Record<(typeof SCALES)[number], number | null>;

export function FeelingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [ratings, setRatings] = useState<Ratings>(() =>
    SCALES.reduce((acc, k) => ({ ...acc, [k]: null }), {} as Ratings),
  );

  const setValue = (scale: (typeof SCALES)[number], val: number) =>
    setRatings((prev) => ({ ...prev, [scale]: val }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">How are you feeling?</DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
}
