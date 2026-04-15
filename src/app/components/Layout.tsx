import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/morning", label: "Morning" },
    { path: "/movement", label: "Movement" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <nav className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-display text-xl">N</span>
              </div>
              <span className="font-display text-2xl text-foreground tracking-tight">
                NaturalRhythms
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-6 py-2.5 font-body text-[15px] text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-muted rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Member Login Button */}
              <button className="ml-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-body text-[15px] hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                <User className="w-4 h-4" />
                Member Login
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-display text-xl">N</span>
                </div>
                <span className="font-display text-2xl text-foreground tracking-tight">
                  NaturalRhythms
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-md">
                A holistic wellness program helping you maintain health through natural daily routines.
                Build sustainable habits, one rhythm at a time.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/morning" className="hover:text-foreground transition-colors">Morning Practices</Link></li>
                <li><Link to="/movement" className="hover:text-foreground transition-colors">Movement Guide</Link></li>
                <li><Link to="/profile" className="hover:text-foreground transition-colors">Your Profile</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg mb-4">Community</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Join Live Sessions</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Connect & Bloom</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
            © 2026 NaturalRhythms. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
