import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sun } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/morning", label: "Morning" },
    { path: "/movement", label: "Movement" },
    { path: "/profile", label: "Wellness Dashboard" },
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
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl text-foreground tracking-tight">Solara</span>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-2xl text-foreground tracking-tight">Solara</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 leading-relaxed max-w-md">
                A holistic wellness program helping you maintain health through natural daily routines. Build
                sustainable habits, one rhythm at a time.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-display text-xl md:text-2xl text-foreground mb-4">Resources</h4>
              <ul className="space-y-2  text-sm md:text-base text-muted-foreground">
                <li>
                  <Link to="/morning" className="hover:text-foreground transition-colors duration-200">
                    Morning Practices
                  </Link>
                </li>
                <li>
                  <Link to="/movement" className="hover:text-foreground transition-colors duration-200">
                    Movement Guide
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-foreground transition-colors duration-200">
                    Wellness Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-display text-xl md:text-2xl text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Join Live Sessions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    The Solara Circle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors duration-200">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-display text-xl md:text-2xl text-foreground mb-4">Get the app</h4>
              <div className="flex flex-row flex-wrap items-center gap-3">
                <a
                  href="#"
                  aria-label="Download on the App Store"
                  className="inline-block transition-transform duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 40" width="130" height="auto">
                    <rect
                      width="135"
                      height="40"
                      rx="6"
                      fill="transparent"
                      stroke="hsl(var(--border))"
                      strokeWidth="1.5"
                    />
                    <g fill="hsl(var(--foreground))">
                      <path d="M27.7 20.3c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.6.9-.7 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.7-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.9zm-2.3-7.2c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2-.5 2.7-1.3z" />
                      <text x="46" y="17" fontFamily="Helvetica, Arial, sans-serif" fontSize="7">
                        Download on the
                      </text>
                      <text x="46" y="30" fontFamily="Helvetica, Arial, sans-serif" fontSize="12" fontWeight="600">
                        App Store
                      </text>
                    </g>
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label=" Download on Google Play"
                  className="inline-block transition-transform duration-200 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 40" width="130" height="auto">
                    <rect
                      width="135"
                      height="40"
                      rx="6"
                      fill="transparent"
                      stroke="hsl(var(--border))"
                      strokeWidth="1.5"
                    />
                    <g transform="translate(10 9)">
                      <path
                        d="M0 1.2v21.6c0 .5.2.9.5 1.1l11.6-11.9L.5.1C.2.3 0 .7 0 1.2z"
                        fill="hsl(var(--foreground))"
                      />
                      <path
                        d="M16.3 8.4L12.1 12l4.2 4.2 5-2.8c1.4-.8 1.4-2.8 0-3.6l-5-2.8z"
                        fill="hsl(var(--foreground))"
                      />
                      <path d="M.5 24c.3.2.8.2 1.3-.1l14.5-8.2-4.2-4.1L.5 24z" fill="hsl(var(--foreground))" />
                      <path d="M.5.1l11.6 11.9 4.2-3.6L1.8.2C1.3-.1.8-.1.5.1z" fill="hsl(var(--foreground))" />
                    </g>
                    <text
                      x="46"
                      y="17"
                      fontFamily="Helvetica, Arial, sans-serif"
                      fontSize="7"
                      fill="hsl(var(--foreground))"
                    >
                      Download on
                    </text>
                    <text
                      x="46"
                      y="30"
                      fontFamily="Helvetica, Arial, sans-serif"
                      fontSize="12"
                      fontWeight="600"
                      fill="hsl(var(--foreground))"
                    >
                      Google Play
                    </text>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-xs md:text-sm text-muted-foreground ">
            © 2026 Solara. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
