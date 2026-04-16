import { motion } from "motion/react";
import { Bell, Play, Sun, Wind } from "lucide-react";

export function Morning() {
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
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${practice.color} flex items-center justify-center shadow-lg`}
                      >
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
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">
                          {practice.title}
                        </h2>
                        <p className="text-sm text-foreground/50 font-body">Best time: {practice.bestTime}</p>
                      </div>
                    </div>

                    <p className="font-body text-foreground/70 leading-relaxed mb-6">{practice.description}</p>

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

                    {/* Go to Community Section Button */}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = "/profile#connect-and-bloom")}
                      className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-body text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                    >
                      <Bell className="w-5 h-5" />
                      Get inspired— visit Community {practice.title}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>{" "}
          {/* Closes the Grid */}
        </div>{" "}
        {/* Closes the Max-Width Container */}
      </section>{" "}
      {/* Closes the Practices Grid Section */}
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
    </div>
  );
}
