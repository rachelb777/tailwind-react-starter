import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Heart, Users, Calendar } from "lucide-react";
import heroImage from "../../imports/jesse-uli-7f7C-8u_VIo-unsplash.jpg";

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-start justify-start  overflow-hidden">
        {/* Full-width Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Person in field at sunset"
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="relative z-5 max-w-[1600px] mx-auto px-8 md:px-24 w-full pt-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl text-slate-900 mb-6 leading-[1.1] tracking-tight text-left"
            >
              Reclaim Your <br /> Natural Rhythms
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body text-xl md:text-2xl text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-0 leading-relaxed max-w-2xl text-left"
            >
              A free community resource for holistic wellness
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-start mt-16 md:mt-20 "
            >
              <Link
                to="/morning"
                className="group px-8 py-4 bg-[#1B3022] text-white rounded-full font-body text-lg font-semibold hover:bg-[#4A5D4E] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 shadow-lg shadow-black/20"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/profile"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/40 text-white rounded-full font-body text-lg font-semibold hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                View Your Progress
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4">Your Wellness Journey</h2>
            <p className="font-body text-xl text-foreground/60 max-w-2xl mx-auto">
              Explore practices designed to harmonize your daily routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sun,
                title: "Morning Practices",
                description: "Start your day with sun gazing and gentle stretching to align with natural light cycles",
                link: "/morning",
                color: "from-accent/20 to-accent/5",
              },
              {
                icon: Heart,
                title: "Movement",
                description: "Rejuvenate with rebounding and earthing practices that connect you to the earth",
                link: "/movement",
                color: "from-primary/20 to-primary/5",
              },
              {
                icon: Calendar,
                title: "Set Reminders",
                description: "Build consistency with personalized reminders for each practice throughout your day",
                link: "/morning",
                color: "from-secondary/20 to-secondary/5",
              },
              {
                icon: Users,
                title: "Community",
                description: "Join live sessions and connect with others practicing the same routines for motivation",
                link: "/profile",
                color: "from-accent/20 to-accent/5",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="block group h-full p-8 bg-card rounded-3xl border border-border hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">{feature.title}</h3>
                  <p className="font-body text-foreground/60 leading-relaxed">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-16 text-center"
          >
            <div className="relative z-10">
              <h2 className="font-display text-5xl md:text-6xl text-white mb-6">Begin Your Natural Rhythm</h2>
              <p className="font-body text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands discovering the power of daily wellness routines
              </p>
              <Link
                to="/morning"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-body text-lg hover:bg-white/95 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
              >
                Start Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
