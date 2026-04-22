import { motion } from "motion/react";
import { Users, Heart, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function SolaraCircle() {
  const features = [
    {
      icon: Users,
      title: "Connect with Members",
      description:
        "Meet like-minded people on a shared path to natural wellness, balance, and sustainable daily rhythms.",
    },
    {
      icon: Calendar,
      title: "Live Group Sessions",
      description:
        "Join weekly morning practices, movement classes, and guided reflections led by experienced facilitators.",
    },
    {
      icon: Heart,
      title: "Share Your Journey",
      description:
        "Celebrate milestones, ask questions, and exchange encouragement in a supportive, judgment-free space.",
    },
    {
      icon: Sparkles,
      title: "Member-Only Resources",
      description:
        "Access curated practices, seasonal challenges, and recordings exclusive to circle members.",
    },
  ];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary mb-6 font-body text-sm">
              <Sparkles className="w-4 h-4" />
              <span>A community for natural wellness</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-[1.1] tracking-tight">
              The Solara Circle
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A welcoming space to gather, grow, and root your wellness practice in community. Together we
              create the rhythm that carries us through every season.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-8 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-muted/40 border border-border rounded-2xl p-8 md:p-10 hover:bg-muted/60 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">{feature.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-8 lg:px-16 pb-24 md:pb-32">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-white mb-4 leading-tight">
            Ready to join the circle?
          </h2>
          <p className="font-body text-base md:text-lg text-white/90 max-w-xl mx-auto mb-8 leading-relaxed">
            Membership is free and always will be. Step into a community that grows with you.
          </p>
          <Link
            to="/morning"
            className="inline-flex items-center gap-2 bg-white text-foreground font-body font-medium px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
          >
            Begin Your Practice
          </Link>
        </div>
      </section>
    </div>
  );
}