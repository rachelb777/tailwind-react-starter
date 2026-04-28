import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Heart, Users, Calendar } from "lucide-react";
import heroImage from "../../imports/jesse-uli-7f7C-8u_VIo-unsplash.jpg";
import sunSaluteImage from "@/assets/sun-salute.jpg";
import movementImage from "@/assets/movement-grounding.jpg";

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
              <a
                href="#how-solara-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-solara-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-8 py-4 bg-[#1B3022] text-white rounded-full font-body text-lg font-semibold hover:bg-[#4A5D4E] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 shadow-lg shadow-black/20"
              >
                How Solara Works
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/morning"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/40 text-white rounded-full font-body text-lg font-semibold hover:bg-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How Solara Works */}
      <section id="how-solara-works" className="py-24 bg-background">
        <div className="max-w-[1100px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">How Solara Works</h2>
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto text-left">
              Solara is a wellness companion designed to help you get in tune with your own body and discover what truly
              supports your wellbeing. Instead of pushing you toward generic goals, it listens — helping you notice what
              actually makes you feel better — your feelings, your energy, your patterns. By tracking both your daily
              practices and how you feel, Solara helps you become more self-aware and see how your activity choices
              actually affect you.
            </p>
          </motion.div>

          <motion.ol
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 max-w-3xl mx-auto mb-16"
          >
            {[
              "Choose one of four practices — sun gazing, morning stretches, rebounding, or earthing",
              "Each day, visit the Morning or Movement page to do your practice and log how you feel.",
              "Check your Wellness Dashboard to see your daily scores building over time",
              "After 14 days, receive your personal Insight — a real correlation drawn from your own data",
              "Visit The Solara Circle to see what the community is discovering and share your own journey",
            ].map((step, i) => (
              <li key={i} className="flex items-start">
                <p className="font-display italic font-bold text-lg md:text-xl text-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </motion.ol>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4 text-center">Making It Meaningful</h3>
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed text-left">
              Learn how your daily choices affect how you feel, and let your own patterns guide your path. For the
              clearest picture, focus on one practice at a time. The more consistently you log, the more accurate your
              insights become. After two weeks of consistent logging — enough time for genuine patterns to emerge — your
              personal dashboard will begin showing correlations that are uniquely yours — not generic wellness advice,
              but real feedback from your own experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="pt-12 pb-0 bg-background">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="relative flex items-center justify-center" style={{ height: "600px" }}>
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
                className="block w-full h-full rounded-full hover:scale-105 transition-transform duration-300"
                style={{ overflow: "hidden" }}
              >
                <img
                  src={movementImage}
                  alt="Movement and grounding practice"
                  className="w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Link>
            </motion.div>

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
                to="/solara-circle"
                className="block w-full h-full rounded-full hover:scale-105 transition-transform duration-300"
                style={{ overflow: "hidden" }}
              >
                <img
                  src="/hero/group_stretch.jpg"
                  alt="Solara Circle community group stretch"
                  className="w-full h-full"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
