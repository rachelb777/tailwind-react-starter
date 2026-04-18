import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Heart, Users, Calendar } from "lucide-react";
import heroImage from "../../imports/jesse-uli-7f7C-8u_VIo-unsplash.jpg";

export function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-start justify-start  overflow-hidden">
        {/* Full-width Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Person in field at sunset"
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-24 w-full pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-3xl md:text-5xl lg:text-7xl xl:text-7xl text-slate-900 mb-0 leading-[1.1] tracking-tight text-left"
            >
              Reclaim Your <br /> Natural Balance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-body text-lg md:text-xl lg:text-2xl text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6 md:mb-16 leading-relaxed max-w-2xl text-left"
            >
              A free community resource for holistic wellness
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-start mt-40"
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
      <section className="pt-24 pb-0 bg-background">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Your Wellness Journey
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg font-medium text-foreground/80 max-w-2xl mx-auto">
              Explore daily practices, log how you feel, and watch your personalized wellness picture emerge — alongside
              a community doing the same
            </p>
          </motion.div>

          <div className="py-20 flex justify-center">
            <div className="relative w-full max-w-[640px] h-[520px] mx-auto">
              {/* Largest circle — upper left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute left-0 top-0"
              >
                <Link
                  to="/morning"
                  className="group flex items-center justify-center w-[340px] h-[340px] rounded-full bg-gradient-to-br from-amber-200/50 to-amber-100/30 transition-transform duration-300 hover:scale-105 mix-blend-multiply"
                >
                  <div className="text-center px-8">
                    <Sun className="w-10 h-10 text-foreground mx-auto mb-3" />
                    <h3 className="font-display text-2xl text-foreground mb-2">Morning Practices</h3>
                    <p className="font-body text-sm text-foreground/70 leading-snug">
                      Sun gazing and gentle stretching to align with natural light cycles
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Medium circle — above and slightly right of the smaller one */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="absolute right-0 top-[80px]"
              >
                <Link
                  to="/profile"
                  className="group flex items-center justify-center w-[260px] h-[260px] rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 transition-transform duration-300 hover:scale-105 mix-blend-multiply"
                >
                  <div className="text-center px-6">
                    <Calendar className="w-9 h-9 text-foreground mx-auto mb-3" />
                    <h3 className="font-display text-xl text-foreground mb-2">Wellness Report</h3>
                    <p className="font-body text-sm text-foreground/70 leading-snug">
                      Discover which practices benefit you most
                    </p>
                  </div>
                </Link>
              </motion.div>

              {/* Smaller circle — lower right overlapping the largest */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-[200px] bottom-0"
              >
                <Link
                  to="/movement"
                  className="group flex items-center justify-center w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/30 to-primary/10 transition-transform duration-300 hover:scale-105 mix-blend-multiply"
                >
                  <div className="text-center px-7">
                    <Heart className="w-10 h-10 text-foreground mx-auto mb-3" />
                    <h3 className="font-display text-2xl text-foreground mb-2">Movement</h3>
                    <p className="font-body text-sm text-foreground/70 leading-snug">
                      Rebounding and earthing to connect you to the earth
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
