import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Heart, Users, Calendar } from "lucide-react";
import heroImage from "../../imports/jesse-uli-7f7C-8u_VIo-unsplash.jpg";
import sunSaluteImage from "@/assets/sun-salute.jpg";

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
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Your Wellness Circle</h2>
            <p className="font-body text-sm md:text-base lg:text-lg font-medium text-foreground/80 max-w-2xl mx-auto">
              Explore daily practices, track your progress, discover what works — alongside a community on the same
              journey
            </p>
          </motion.div>

          <div className="relative flex items-center justify-center" style={{ height: "680px" }}>
            {/* Morning Practices — circle upper left, text to its left */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute"
              style={{ width: "280px", height: "280px", left: "calc(50% - 380px)", top: "20px" }}
            >
              <Link
                to="/morning"
                className="block w-full h-full rounded-full hover:scale-105 transition-transform duration-300"
                style={{ overflow: "hidden" }}
              >
                <img
                  src={sunSaluteImage}
                  alt="Morning sun salute practice"
                  className="w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Link>
            </motion.div>
            <div className="absolute text-left" style={{ width: "180px", left: "calc(50% - 560px)", top: "80px" }}>
              <h3 className="font-display text-xl text-foreground mb-2">Morning Practices</h3>
              <p className="font-body text-sm text-foreground/60">
                Start your day with sun gazing and gentle stretching
              </p>
            </div>

            {/* Movement — circle center, text underneath */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute"
              style={{ width: "220px", height: "220px", left: "calc(50% - 140px)", top: "340px" }}
            >
              <Link
                to="/movement"
                className="block w-full h-full rounded-full bg-primary/20 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <div className="absolute text-center" style={{ width: "220px", left: "calc(50% - 130px)", top: "580px" }}>
              <h3 className="font-display text-xl text-foreground mb-2">Movement & Grounding</h3>
              <p className="font-body text-sm text-foreground/60">Rebounding and earthing practices</p>
            </div>

            {/* Your Wellness Circle — upper right, text to its right */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute"
              style={{ width: "250px", height: "250px", right: "calc(50% - 330px)", top: "100px" }}
            >
              <Link
                to="/profile"
                className="block w-full h-full rounded-full bg-accent/20 hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <div className="absolute text-left" style={{ right: "calc(50% - 540px)", top: "140px" }}>
              <h3 className="font-display text-xl text-foreground mb-2 whitespace-nowrap">Your Wellness Circle</h3>
              <p className="font-body text-sm text-foreground/60">Track progress and grow with community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
