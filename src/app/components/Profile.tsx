import { motion } from "motion/react";
import { useMemo } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import { getAllDailyEntries, getActivityCounts, getMoodAverages, TRACKED_ACTIVITIES } from "../lib/stats";

export function Profile() {
  const { activityCounts, moodAverages } = useMemo(() => {
    const entries = getAllDailyEntries();
    return {
      activityCounts: getActivityCounts(entries),
      moodAverages: getMoodAverages(entries),
    };
  }, []);

  const moodLabels: Record<string, string> = {
    energy: "Energy",
    mood: "Mood",
    focus: "Focus",
    pain: "Pain",
    sleepQuality: "Sleep Quality",
  };

  const todaysPractices = [
    { name: "Sun Gazing", completed: true, time: "6:30 AM" },
    { name: "Morning Stretching", completed: false, time: "6:45 AM" },
    { name: "Rebounding", completed: true, time: "2:00 PM" },
    { name: "Earthing", completed: false, time: "5:30 PM" },
  ];

  const communityMembers = [
    { name: "Sarah M.", activity: "Sun Gazing", time: "2 min ago", avatar: "SM" },
    { name: "James K.", activity: "Rebounding", time: "15 min ago", avatar: "JK" },
    { name: "Elena R.", activity: "Earthing", time: "23 min ago", avatar: "ER" },
    { name: "Michael T.", activity: "Morning Stretching", time: "45 min ago", avatar: "MT" },
  ];

  const weeklyProgress = [
    { day: "Mon", completion: 75 },
    { day: "Tue", completion: 100 },
    { day: "Wed", completion: 50 },
    { day: "Thu", completion: 100 },
    { day: "Fri", completion: 75 },
    { day: "Sat", completion: 25 },
    { day: "Sun", completion: 50 },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl
 text-foreground mb-4 leading-tight"
            >
              Welcome Back
            </h1>
            <p className="font-body text-2xl text-foreground/70 max-w-2xl">Your wellness flow and community insights</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="px-8 lg:px-16 py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">Insight</h3>
          <p className="font-body italic text-foreground/70 leading-relaxed" style={{ fontSize: "20px" }}>
            Sun Gazing shows a positive association with improved mood and energy levels based on completed days.
          </p>
          <p className="font-body italic text-foreground/70 leading-relaxed mt-4" style={{ fontSize: "20px" }}>
            Rebounding shows a positive association with increased focus and reduced pain levels based on recent
            activity.
          </p>
        </motion.div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar - Today's Practice */}
            <aside className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 rounded-2xl border border-border/40 mt-32"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
                    Today's Practice
                  </h2>
                </div>
                <div className="text-xs font-body text-foreground/50 mb-6">2 of 4 completed</div>

                <div className="space-y-1">
                  {todaysPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`flex items-center gap-3 py-3 pl-4 border-l-2 transition-all ${
                        practice.completed ? "border-primary" : "border-transparent hover:border-foreground/20"
                      }`}
                    >
                      {practice.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-foreground/30 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-body text-sm ${practice.completed ? "text-foreground/60 line-through" : "text-foreground"}`}
                        >
                          {practice.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-body text-foreground/40 mt-0.5">
                          {practice.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
              {/* Activity Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="py-4"
              >
                <div className="flex items-center gap-2 mb-8">
                  <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
                    Activity Summary
                  </h2>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
                  {TRACKED_ACTIVITIES.map((activity) => (
                    <div key={activity} className="text-center flex-1 min-w-[120px]">
                      <div className="font-display text-foreground leading-none" style={{ fontSize: "36px" }}>
                        {activityCounts[activity] ?? 0}
                      </div>
                      <div className="text-sm font-body text-foreground/60 mt-3">{activity}</div>
                      <div className="text-xs font-body text-foreground/40 mt-1">days completed</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mood Averages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="py-4"
              >
                <div className="flex items-center gap-2 mb-8">
                  <h2 className="font-body text-base uppercase tracking-wider text-foreground/80 font-medium">
                    Mood Averages
                  </h2>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
                  {(Object.keys(moodLabels) as Array<keyof typeof moodAverages>).map((key) => {
                    const value = moodAverages[key];
                    return (
                      <div key={key} className="text-center flex-1 min-w-[100px]">
                        <div className="font-display text-foreground leading-none" style={{ fontSize: "36px" }}>
                          {value === null ? "—" : value.toFixed(1)}
                        </div>
                        <div className="text-sm font-body text-foreground/60 mt-3">{moodLabels[key]}</div>
                        <div className="text-xs font-body text-foreground/40 mt-1">avg / 5</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Connect & Bloom - Full Width */}
          <motion.div
            id="connect-and-bloom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="py-8 mt-8 scroll-mt-28"
          >
            <div className="flex items-center gap-3 mb-4 justify-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">The Solara Circle</h2>
            </div>

            <p className="font-body text-sm md:text-base lg:text-lg text-foreground/60 mb-12 leading-relaxed text-center max-w-2xl mx-auto">
              See what your community is practicing right now and draw inspiration from their dedication
            </p>

            {/* Members horizontal row */}
            <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-6 mb-16">
              {communityMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 flex-1 min-w-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-body">{member.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body text-foreground text-sm truncate">{member.name}</div>
                    <div className="text-xs text-foreground/50 truncate">{member.activity}</div>
                  </div>
                  <div className="text-xs text-foreground/40 whitespace-nowrap">{member.time}</div>
                </motion.div>
              ))}
            </div>

            {/* Open stats */}
            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 mb-12">
              <div className="text-center flex-1 min-w-[120px]">
                <div className="font-display text-foreground leading-none" style={{ fontSize: "46px" }}>
                  247
                </div>
                <div className="text-sm font-body text-foreground/60 mt-3">Active Members Today</div>
              </div>
              <div className="text-center flex-1 min-w-[120px]">
                <div className="font-display text-foreground leading-none" style={{ fontSize: "40px" }}>
                  89
                </div>
                <div className="text-sm font-body text-foreground/60 mt-3">Practicing Now</div>
              </div>
              <div className="text-center flex-1 min-w-[120px]">
                <div className="font-display text-foreground leading-none" style={{ fontSize: "46px" }}>
                  32
                </div>
                <div className="text-sm font-body text-foreground/60 mt-3">Live Sessions</div>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-xs px-6 py-3 rounded-xl font-body text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Join Live Session
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
