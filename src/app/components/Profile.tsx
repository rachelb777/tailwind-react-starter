import { motion } from "motion/react";
import { useMemo } from "react";
import {
  Sun,
  Activity,
  Bell,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  BarChart3,
} from "lucide-react";
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
    { name: "Morning Stretching", completed: true, time: "6:45 AM" },
    { name: "Rebounding", completed: false, time: "2:00 PM" },
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
            <p className="font-body text-xl text-foreground/60 max-w-2xl">
              Your daily wellness snapshot and community connection
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Self-Care Meter & Progress */}
            <div className="lg:col-span-2 space-y-8">
              {/* Activity Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-3xl bg-card p-8 border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-foreground">Activity Summary</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {TRACKED_ACTIVITIES.map((activity) => (
                    <div key={activity} className="p-4 rounded-2xl bg-muted/40 border border-border text-center">
                      <div className="text-3xl font-display text-foreground">{activityCounts[activity] ?? 0}</div>
                      <div className="text-xs font-body text-foreground/60 mt-1">{activity}</div>
                      <div className="text-[10px] font-body text-foreground/40 mt-0.5">days completed</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mood Averages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl bg-card p-8 border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-foreground">Mood Averages</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {(Object.keys(moodLabels) as Array<keyof typeof moodAverages>).map((key) => {
                    const value = moodAverages[key];
                    return (
                      <div key={key} className="p-4 rounded-2xl bg-muted/40 border border-border text-center">
                        <div className="text-3xl font-display text-foreground">
                          {value === null ? "—" : value.toFixed(1)}
                        </div>
                        <div className="text-xs font-body text-foreground/60 mt-1">{moodLabels[key]}</div>
                        <div className="text-[10px] font-body text-foreground/40 mt-0.5">avg / 5</div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Insight Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 border border-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Insight</h3>
                    <p className="font-body text-foreground/70 leading-relaxed">
                      Sun Gazing shows a positive association with improved mood and energy levels based on completed
                      days.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Today's Schedule */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl bg-card p-8 border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">Today's Practice</h2>
                  </div>
                  <div className="px-4 py-2 bg-muted rounded-full">
                    <span className="text-sm font-body text-foreground">2 of 4 completed</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {todaysPractices.map((practice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        practice.completed
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/30 border-border hover:border-primary/30"
                      }`}
                    >
                      {practice.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-foreground/30 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div
                          className={`font-body ${practice.completed ? "text-foreground/60 line-through" : "text-foreground"}`}
                        >
                          {practice.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-body text-foreground/50">
                        <Bell className="w-4 h-4" />
                        {practice.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Connect & Bloom */}
            <div className="space-y-8">
              <motion.div
                id="connect-and-bloom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-3xl bg-card p-8 border border-border sticky top-24 scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">Connect & Bloom</h2>
                </div>

                <p className="font-body text-sm md:text-base lg:text-lg text-foreground/60 mb-6 leading-relaxed">
                  See what your community is practicing right now and draw inspiration from their dedication
                </p>

                <div className="space-y-4 mb-6">
                  {communityMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl font-body hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Join Live Session
                </motion.button>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-display text-foreground">247</div>
                    <div className="text-sm font-body text-foreground/60">Active Members Today</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <div className="text-xl font-display text-foreground">89</div>
                      <div className="text-xs font-body text-foreground/60">Practicing Now</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <div className="text-xl font-display text-foreground">32</div>
                      <div className="text-xs font-body text-foreground/60">Live Sessions</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
