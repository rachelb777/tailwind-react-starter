import { useState } from "react";
import { motion } from "motion/react";
import { Play, Sun, Wind, Check } from "lucide-react";
import { FeelingModal } from "./FeelingModal";
import { toggleCompletedActivity, isActivityCompleted } from "../lib/dailyEntry";

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
              Build a morning routine that aligns with nature's rhythms and sets a positive tone for your entire day
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
                className={`flex flex-col text-center ${
                  practice.id === "sun-gazing" ? "items-start" "text-center" : "items-end text-right md:mt-32"
                }`}
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
                <h2 className="font-display text-xl md:text-2xl text-center text-foreground mb-1">{practice.title}</h2>
                <p className="text-sm text-foreground/50 font-body mb-4">{practice.bestTime}</p>

                {/* Short description */}
                <p className="font-body text-center text-foreground/60 leading-relaxed mb-8 max-w-xs text-sm">
                  {practice.id === "sun-gazing"
                    ? "Connect with the sun's energy, regulate your circadian rhythm."
                    : "Gentle stretching awakens your body and prepares you for the day."}
                </p>

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
                    className="w-full px-6 py-3 rounded-xl border border-border font-body text-sm text-foreground hover:bg-muted/50 transition-colors"
                  >
                    How are you feeling?
                  </button>
                  <button
                    onClick={() => (window.location.href = "/profile#connect-and-bloom")}
                    className="w-full px-6 py-3 rounded-xl border border-border font-body text-sm text-foreground hover:bg-muted/50 transition-colors underline underline-offset-2"
                  >
                    Visit community
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Quick Tips Section */}
      {/* Quick Tips Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">Morning Routine Tips</h2>
            <p className="font-body text-sm md:text-base lg:text-lg">Make the most of your morning practices</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Start Small",
                description:
                  "Begin with just 5 minutes and gradually increase duration as it becomes an enjoyable habit",
              },
              {
                title: "Stay Consistent",
                description: "Practice at the same time each day to anchor the routine into your natural rhythm",
              },
              {
                title: "Listen to Your Body",
                description: "Adjust practices based on how you feel - some days call for gentleness, others for vigor",
              },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card rounded-2xl border border-border"
              >
                <h3 className="font-display text-2xl text-foreground mb-3">{tip.title}</h3>
                <p className="font-body text-foreground/60 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FeelingModal open={feelingOpen} onOpenChange={setFeelingOpen} activity={activeActivity} />
    </div>
  );
}
