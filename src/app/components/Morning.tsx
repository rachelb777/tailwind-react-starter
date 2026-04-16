import { useState } from "react";
import { motion } from "motion/react";
import { Play, Sun, Wind } from "lucide-react";
import { FeelingModal } from "./FeelingModal";

export function Morning() {
  const [feelingOpen, setFeelingOpen] = useState(false);
  const practices = [
    {
      id: "sun-gazing",
      title: "Sun Gazing",
      icon: Sun,
      description:
        "Connect with the sun's energy during the first hour after sunrise. This ancient practice helps regulate your circadian rhythm, boost vitamin D production, and enhance mental clarity.",
      benefits: ["Regulates sleep-wake cycle", "Improves mood and energy", "Supports eye health", "Enhances focus"],
      duration: "5-15 minutes",
      bestTime: "Within 1 hour of sunrise",
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
            <div className="inline-block mb-6 px-6 py-2 bg-accent/10 rounded-full border border-accent/20">
              <span className="text-accent font-body text-sm tracking-wide">Morning Practices</span>
            </div>
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
                className={`flex flex-col items-center text-center ${index === 1 ? "md:mt-32" : ""}`}
              >
                {/* Circle with gradient */}
                <div
                  className={`relative w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full flex items-center justify-center mb-8 ${
                    practice.id === "sun-gazing"
                      ? "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400"
                      : "bg-gradient-to-br from-green-100 via-green-200 to-green-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        practice.id === "sun-gazing"
                          ? "bg-white/80"
                          : "bg-white/70"
                      }`}
                    >
                      <Play
                        className={`w-6 h-6 ml-0.5 ${
                          practice.id === "sun-gazing" ? "text-amber-700" : "text-green-800"
                        }`}
                        fill="currentColor"
                      />
                    </motion.button>
                    <span
                      className={`text-sm font-body ${
                        practice.id === "sun-gazing" ? "text-amber-800/70" : "text-green-800/70"
                      }`}
                    >
                      {practice.duration}
                    </span>
                  </div>
                </div>

                {/* Title & subtitle */}
                <h2 className="font-display text-xl md:text-2xl text-foreground mb-1">
                  {practice.title}
                </h2>
                <p className="text-sm text-foreground/50 font-body mb-4">{practice.bestTime}</p>

                {/* Short description */}
                <p className="font-body text-foreground/60 leading-relaxed mb-8 max-w-xs text-sm">
                  {practice.id === "sun-gazing"
                    ? "Connect with the sun's energy, regulate your circadian rhythm."
                    : "Gentle stretching awakens your body and prepares you for the day."}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button
                    onClick={() => setFeelingOpen(true)}
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
                description: "Begin with just 5 minutes and gradually increase duration as it becomes a habit",
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
      <FeelingModal open={feelingOpen} onOpenChange={setFeelingOpen} />
    </div>
  );
}
