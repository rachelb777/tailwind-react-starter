import { motion } from "motion/react";

export type MoodKey = "energy" | "mood" | "focus" | "pain";

export const MOOD_ROWS: Array<{ key: MoodKey; label: string }> = [
  { key: "energy", label: "Energy" },
  { key: "mood", label: "Mood" },
  { key: "focus", label: "Focus" },
  { key: "pain", label: "Pain" },
];

export const CYCLE_LENGTH = 14;

export type GridValues = Record<MoodKey, Array<number | null>>;

type Props = {
  activity: string;
  values: GridValues;
  insight: string;
  position?: number;
};

function average(vals: Array<number | null>): number | null {
  const nums = vals.filter((v): v is number => typeof v === "number");
  if (nums.length !== CYCLE_LENGTH) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function WellnessDashboardGrid({ activity, values, insight, position = 0 }: Props) {
  const dayNumbers = Array.from({ length: CYCLE_LENGTH }, (_, i) => i + 1);

  const averages: Record<MoodKey, number | null> = {
    energy: average(values.energy),
    mood: average(values.mood),
    focus: average(values.focus),
    pain: average(values.pain),
  };

  const isComplete = MOOD_ROWS.every(({ key }) => averages[key] !== null);
  const filledDays = MOOD_ROWS.reduce((max, { key }) => {
    const lastFilled = values[key].reduce(
      (acc, v, i) => (typeof v === "number" ? i + 1 : acc),
      0,
    );
    return Math.max(max, lastFilled);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: position * 0.05 }}
      className="space-y-4"
    >
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className="font-display text-2xl md:text-3xl text-foreground">{activity}</h2>
        <span className="font-body text-xs uppercase tracking-wider text-foreground/50">
          {isComplete
            ? "14-Day Cycle • Complete"
            : `Day ${filledDays} of ${CYCLE_LENGTH}`}
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
              <div className="flex-shrink-0 w-32 px-5 py-4 font-body text-xs uppercase tracking-wider text-foreground/70 font-medium">
                Mood
              </div>
              <div className="flex-1 flex items-stretch min-w-0">
                {dayNumbers.map((n) => (
                  <div
                    key={n}
                    className="flex-1 min-w-[40px] px-1 py-4 text-center font-body text-xs text-foreground/60 border-l"
                    style={{ borderColor: "hsl(var(--grid-cell-border) / 0.6)" }}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div
                className="flex-shrink-0 w-32 px-3 py-4 font-body text-xs uppercase tracking-wider font-medium text-center border-l"
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
            {MOOD_ROWS.map((row) => {
              const avg = averages[row.key];
              return (
                <div
                  key={row.key}
                  className="flex items-stretch border-t"
                  style={{ borderColor: "hsl(var(--grid-cell-border) / 0.5)" }}
                >
                  <div
                    className="flex-shrink-0 w-32 px-5 py-4 flex items-center font-body text-sm text-foreground"
                    style={{ backgroundColor: "hsl(var(--grid-surface-deep))" }}
                  >
                    {row.label}
                  </div>

                  <div className="flex-1 flex items-stretch min-w-0">
                    {dayNumbers.map((n) => {
                      const val = values[row.key][n - 1];
                      const filled = typeof val === "number";
                      return (
                        <div
                          key={n}
                          className="flex-1 min-w-[40px] px-1 py-4 flex items-center justify-center border-l"
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
                    className="flex-shrink-0 w-32 px-3 py-4 flex items-center justify-center border-l"
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

      {isComplete && (
        <p
          className="font-body italic text-sm md:text-base leading-relaxed pt-2"
          style={{ color: "hsl(var(--grid-accent-foreground))" }}
        >
          {insight}
        </p>
      )}
    </motion.div>
  );
}