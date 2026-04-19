import { useState } from "react";
import { motion } from "motion/react";
import { Play, Activity, Footprints, Check } from "lucide-react";
import { FeelingModal } from "./FeelingModal";
import { toggleCompletedActivity, isActivityCompleted } from "../lib/dailyEntry";
import earthingImage from "@/assets/earthing-barefoot.jpg";

export function Movement() {
  const [feelingOpen, setFeelingOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState<string | undefined>(undefined);
  const openFeeling = (title: string) => {
    setActiveActivity(title);
    setFeelingOpen(true);
  };
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => ({
    Rebounding: isActivityCompleted("Rebounding"),
    Earthing: isActivityCompleted("Earthing"),
  }));
  const handleToggle = (title: string) => {
    const next = toggleCompletedActivity(title);
    setCompleted((p) => ({ ...p, [title]: next }));
  };
  const practices = [
    {
      id: "rebounding",
      title: "Rebounding",
      icon: Activity,
      description:
        "Low-impact exercise using a mini trampoline that stimulates lymphatic drainage, improves circulation, and provides cardiovascular benefits without stressing your joints.",
      benefits: [
        "Boosts lymphatic system",
        "Improves balance and coordination",
        "Low-impact cardio",
        "Increases bone density",
      ],
      duration: "15-30 minutes",
      bestTime: "Mid-morning or afternoon",
      color: "from-secondary to-secondary/70",
    },
    {
      id: "earthing",
      title: "Earthing",
      icon: Footprints,
      description:
        "Also known as grounding, this practice involves direct skin contact with the earth's surface to absorb beneficial electrons and reconnect with nature's healing energy.",
      benefits: ["Reduces inflammation", "Improves sleep quality", "Decreases stress", "Balances body's energy"],
      duration: "20-40 minutes",
      bestTime: "Anytime outdoors",
      color: "from-primary to-primary/70",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Move with <span className="text-secondary italic">Purpose</span>
            </h1>
            <p className="font-body text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Reconnect with your body and the earth through gentle, intentional movement practices
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
                className={`flex flex-col items-center text-center ${index === 1 ? "md:mt-32" : ""}`}
              >
                {/* Circle with gradient */}
                {practice.id === "earthing" ? (
                  <div className="relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden mb-8">
                    <img src={earthingImage} alt="Barefoot earthing in nature" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden mb-8">

                    <iframe
                      src="https://www.youtube.com/embed/dL4U-IFPQ7U?autoplay=0&controls=1"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Rebounding"
                    />
                  </div>
                )}

                {/* Title & subtitle */}
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-1">{practice.title}</h2>
                <p className="text-sm text-foreground/50 font-body mb-4">{practice.bestTime}</p>

                {/* Short description */}
                <p className="font-body text-foreground/60 leading-relaxed mb-8 max-w-xs text-sm">
                  {practice.description}
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
                    className="w-full px-6 py-3 rounded-xl font-body text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    How are you feeling?
                  </button>
                  <button
                    onClick={() => (window.location.href = "/profile#connect-and-bloom")}
                    className="w-full px-6 py-3 rounded-xl border border-accent font-body text-sm text-accent hover:bg-accent/10 transition-colors"
                  >
                    Visit community
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <FeelingModal open={feelingOpen} onOpenChange={setFeelingOpen} activity={activeActivity} />

      {/* Integration Tips */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">Movement Integration</h2>
            <p className="font-body text-sm md:text-base lg:text-lg">Enhance your practice with these suggestions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Combine Practices",
                description: "Try rebounding followed by earthing for a complete mind-body-earth connection",
              },
              {
                title: "Track Progress",
                description: "Notice how your energy, mood, and physical sensations evolve with regular practice",
              },
              {
                title: "Outdoor Focus",
                description: "When possible, take rebounding outside and practice earthing on natural surfaces",
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
                <p className="font-body text-foreground/70 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
