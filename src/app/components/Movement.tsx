import { motion } from "motion/react";
import { Bell, Play, Activity, Footprints } from "lucide-react";

export function Movement() {
  const practices = [
    {
      id: "rebounding",
      title: "Rebounding",
      icon: Activity,
      description: "Low-impact exercise using a mini trampoline that stimulates lymphatic drainage, improves circulation, and provides cardiovascular benefits without stressing your joints.",
      benefits: ["Boosts lymphatic system", "Improves balance and coordination", "Low-impact cardio", "Increases bone density"],
      duration: "15-30 minutes",
      bestTime: "Mid-morning or afternoon",
      color: "from-secondary to-secondary/70",
    },
    {
      id: "earthing",
      title: "Earthing",
      icon: Footprints,
      description: "Also known as grounding, this practice involves direct skin contact with the earth's surface to absorb beneficial electrons and reconnect with nature's healing energy.",
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
            <div className="inline-block mb-6 px-6 py-2 bg-secondary/10 rounded-full border border-secondary/20">
              <span className="text-secondary font-body text-sm tracking-wide">
                Movement Practices
              </span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl text-foreground mb-6 leading-tight">
              Move with <span className="text-secondary italic">Purpose</span>
            </h1>
            <p className="font-body text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              Reconnect with your body and the earth through gentle, intentional movement practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practices Grid */}
      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5">
                  {/* Video Placeholder Section */}
                  <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${practice.color} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors"
                      >
                        <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
                      </motion.button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${practice.color} flex items-center justify-center shadow-lg`}>
                        <practice.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-sm font-body text-foreground">{practice.duration}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="font-display text-4xl text-foreground mb-2">
                          {practice.title}
                        </h2>
                        <p className="text-sm text-foreground/50 font-body">
                          Best time: {practice.bestTime}
                        </p>
                      </div>
                    </div>

                    <p className="font-body text-foreground/70 leading-relaxed mb-6">
                      {practice.description}
                    </p>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h3 className="font-display text-lg text-foreground mb-3">Benefits</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {practice.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Set Reminder Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-body text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                    >
                      <Bell className="w-5 h-5" />
                      Set Reminder for {practice.title}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            <h2 className="font-display text-4xl text-foreground mb-4">
              Movement Integration
            </h2>
            <p className="font-body text-lg text-foreground/60">
              Enhance your practice with these suggestions
            </p>
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
                <h3 className="font-display text-2xl text-foreground mb-3">
                  {tip.title}
                </h3>
                <p className="font-body text-foreground/60 leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
