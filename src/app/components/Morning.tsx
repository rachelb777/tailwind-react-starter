import { useState } from "react";
import { motion } from "motion/react";
import { Play, Sun, Wind, Check } from "lucide-react";
import { FeelingModal } from "./FeelingModal";
import { toggleCompletedActivity, isActivityCompleted } from "../lib/dailyEntry";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

export function Morning() {
  const [feelingOpen, setFeelingOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState<string | undefined>(undefined);
  const openFeeling = (title: string) => {
    setActiveActivity(title);
    setFeelingOpen(true);
  };
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => ({
    "Sun Gazing": isActivityCompleted("Sun Gazing"),
    "Morning Stretching": isActivityCompleted("Morning Stretching"),
  }));
  const handleToggle = (title: string) => {
    const next = toggleCompletedActivity(title);
    setCompleted((p) => ({ ...p, [title]: next }));
  };
  const practices = [
    {
      id: "sun-gazing",
      title: "Sun Gazing",
      icon: Sun,
      description:
        "Connect with the sun's energy during the first hour after sunrise. This ancient practice helps regulate your circadian rhythm, boost vitamin D production, and enhance mental clarity.",
      benefits: ["Regulates sleep-wake cycle", "Improves mood and energy", "Supports eye health", "Enhances focus"],

      color: "from-accent to-accent/70",
    },
    {
      id: "stretching",
      title: "Morning Stretching",
      icon: Wind,
      description:
        "Gentle stretching awakens your body, increases blood flow, and prepares you for the day ahead. Focus on slow, mindful movements that honor your body's natural rhythms.",
      benefits: ["Increases flexibility", "Reduces muscle tension", "Improves circulation", "Enhances body awareness"],
      duration: "10-20 minutes",
      bestTime: "After sun gazing",
      color: "from-primary to-primary/70",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Greet the Day with <span className="text-accent italic">Intention</span>
            </h1>
            <p className="font-body text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Start your day with sun gazing and gentle stretching to align with natural light cycles.
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mt-4">
              Watch the video, try the practice, check Completed, then tell us how you feel.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Practices Section */}
      <section className="pb-24">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20 items-start">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col items-center text-center ${practice.id === "sun-gazing" ? "" : "md:mt-32"}`}
              >
                {/* Video card */}
                <div
                  className={`relative w-full ${
                    practice.id === "sun-gazing" ? "max-w-lg" : "max-w-md"
                  } aspect-video rounded-2xl overflow-hidden mb-8`}
                >
                  {practice.id === "sun-gazing" ? (
                    <iframe
                      src="https://www.youtube.com/embed/G6PxpBt7L78?start=280&autoplay=0&controls=1"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Sun Gazing"
                    />
                  ) : (
                    <iframe
                      src="https://www.youtube.com/embed/1Ujia2-a3Oc?autoplay=0&controls=1"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Morning Stretching"
                    />
                  )}
                </div>

                {/* Title & subtitle */}
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-1">{practice.title}</h2>
                <p className="text-sm text-foreground/50 font-body mb-4">{practice.bestTime}</p>

                {/* Short description */}
                <p className="font-body text-foreground/60 leading-relaxed mb-8 max-w-xs text-sm">
                  {practice.id === "sun-gazing"
                    ? "Connect with the sun's energy, regulate your circadian rhythm."
                    : "Gentle stretching awakens your body and prepares you for the day."}
                </p>

                {/* Learn more collapsible */}
                <Collapsible className="w-full max-w-md mb-8">
                  <CollapsibleTrigger className="group inline-flex items-center gap-1 mx-auto font-body text-sm text-accent hover:text-accent/80 transition-colors">
                    {practice.id === "sun-gazing"
                      ? "Learn about Sun Gazing"
                      : "Learn about Morning Stretching"}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="mt-4 rounded-2xl bg-accent/5 px-6 py-6 text-left font-body text-sm text-foreground/70 leading-relaxed space-y-4">
                      {practice.id === "sun-gazing" ? (
                        <>
                          <p>
                            Morning light is the daily signal that starts your biological clock. When sunlight enters the eyes, it travels directly to the brain's circadian center — triggering hormones, activating metabolism, and synchronizing internal systems across the body. The angle and movement of the sun also provides deeper orientation signals, telling living systems the time of day, the season, and where we are on the planet.
                          </p>
                          <p>
                            Some people extend this practice by briefly gazing toward the sun during the first few minutes after sunrise, when light intensity is at its lowest. Used this way, sun gazing reinforces circadian awareness and a felt sense of connection with the natural solar cycle.
                          </p>
                          <p className="text-foreground/60">
                            <span className="text-accent">Benefits:</span> Resets circadian rhythm · Stabilizes mood · Boosts morning energy · Supports hormonal balance
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Gentle movement in the morning warms the muscles, increases circulation, and signals the nervous system that the day has begun. Focusing on the legs and hips — where tension accumulates overnight — creates a grounded, supported feeling that carries through the day.
                          </p>
                          <p className="text-foreground/60">
                            <span className="text-accent">Benefits:</span> Reduces muscle tension · Improves circulation · Increases flexibility · Enhances body awareness
                          </p>
                        </>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <label className="flex items-center justify-center gap-2 font-body text-sm text-foreground cursor-pointer select-none">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={!!completed[practice.title]}
                      onClick={() => handleToggle(practice.title)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        completed[practice.title]
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-border"
                      }`}
                    >
                      {completed[practice.title] && <Check className="w-3.5 h-3.5" />}
                    </button>
                    Completed
                  </label>
                  <button
                    onClick={() => openFeeling(practice.title)}
                    className="w-full px-6 py-3 rounded-xl font-body text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    How are you feeling?
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <button
              onClick={() => (window.location.href = "/profile")}
              className="px-8 py-3 rounded-xl border border-accent font-body text-sm text-accent hover:bg-accent/10 transition-colors"
            >
              See My Progress
            </button>
          </div>
        </div>
      </section>

      <FeelingModal open={feelingOpen} onOpenChange={setFeelingOpen} activity={activeActivity} />
    </div>
  );
}
