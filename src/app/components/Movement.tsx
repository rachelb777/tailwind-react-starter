import { useState } from "react";
import { motion } from "motion/react";
import { Play, Activity, Footprints, Check } from "lucide-react";
import { FeelingModal } from "./FeelingModal";
import { toggleCompletedActivity, isActivityCompleted } from "../lib/dailyEntry";
import earthingImage from "@/assets/earthing-barefoot.jpg";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

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
      <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Ground Yourself in <span className="text-accent italic">Motion</span>
            </h1>
            <h2 className="font-body text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-[2] mt-4">
              Rebounding and earthing — practices that draw energy <br /> from the earth and restore your body's natural
              rhythm
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Practices Section */}
      <section className="pb-24 "mt-12">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-16">
          <p className="font-body text-base md:text-lg text-foreground/80 max-w-xl mx-auto leading-relaxed text-center mb-12">
            Watch the video, try the practice, check Completed, and record how you feel. Your Wellness Dashboard tracks
            your daily scores and reveals your patterns over time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20 items-start">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col items-center text-center ${practice.id === "earthing" ? "md:mt-32" : ""}`}
              >
                {/* Circle card */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden mb-8">
                  <iframe
                    src={
                      practice.id === "earthing"
                        ? "https://www.youtube.com/embed/sqB1EbJWKXU?autoplay=0&controls=1"
                        : "https://www.youtube.com/embed/dL4U-IFPQ7U?autoplay=0&controls=1"
                    }
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={practice.title}
                  />
                </div>

                {/* Title & subtitle */}
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-1">{practice.title}</h2>

                {/* Short description */}
                <p className="font-body text-foreground/60 leading-relaxed mb-8 max-w-xs text-sm">
                  {practice.description}
                </p>

                {/* Learn more collapsible */}
                <Collapsible className="w-full max-w-md mb-8">
                  <CollapsibleTrigger className="group inline-flex items-center gap-1 mx-auto font-body text-sm font-bold text-accent hover:text-accent/80 transition-colors">
                    {practice.id === "earthing" ? "Learn about Earthing" : "Learn about Rebounding"}
                    <ChevronDown className="w-3.5 h-3.5 text-accent-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="mt-4 rounded-2xl bg-accent/5 px-6 py-6 text-left font-body text-sm text-foreground/70 leading-relaxed space-y-4">
                      {practice.id === "earthing" ? (
                        <>
                          <p>
                            Direct contact with the earth's surface — bare feet on grass, soil, or sand — allows the
                            body to absorb the ground's natural electric charge. This simple practice has been linked to
                            reduced inflammation, improved sleep, and a subtle but profound sense of calm and
                            connection.
                          </p>
                          <p className="text-foreground/60">
                            <span className="text-accent">Benefits:</span> Reduces inflammation · Improves sleep quality
                            · Calms the nervous system · Restores natural rhythm
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Gentle bouncing on a mini trampoline engages the lymphatic system, which has no pump of its
                            own and relies on movement to circulate. Even a few minutes stimulates detoxification,
                            improves balance, and brings a quiet joy that heavier exercise rarely does.
                          </p>
                          <p className="text-foreground/60">
                            <span className="text-accent">Benefits:</span> Stimulates lymphatic flow · Improves balance
                            · Boosts circulation · Energizes without strain
                          </p>
                        </>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Buttons */}
                <div className="flex flex-col gap-5 w-full max-w-xs">
                  <label className="flex items-center justify-center gap-2 font-body text-sm text-foreground cursor-pointer select-none">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={!!completed[practice.title]}
                      onClick={() => handleToggle(practice.title)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        completed[practice.title]
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-foreground/30"
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

          <div className="flex flex-col items-center mt-32 gap-5">
            <p className="font-body italic text-2xl text-foreground/80">Ready to see your patterns?</p>
            <button
              onClick={() => (window.location.href = "/profile")}
              className="px-10 py-4 rounded-xl border-2 border-accent font-body text-base font-medium text-accent hover:bg-accent/10 transition-colors"
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
