import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const location = useLocation();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Nail Course", to: "/nail-course" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 border-primary/20 shadow-sm shadow-primary/5"
            : "bg-white/80 border-primary/10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-primary font-black">She Is</span>
                <span
                  className="text-foreground/50 font-light ml-1.5 hidden sm:inline tracking-widest uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                >
                  The Best
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors relative group ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Admin
                  </Button>
                </Link>
              )}
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full gap-1.5 text-muted-foreground"
                  onClick={logout}
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </Button>
              ) : (
                <Link to="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Login
                  </Button>
                </Link>
              )}
              <Link to="/book">
                <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-foreground hover:bg-primary/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="block h-0.5 w-full bg-current rounded-full origin-center"
                />
                <motion.span
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.18 }}
                  className="block h-0.5 w-full bg-current rounded-full"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="block h-0.5 w-full bg-current rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Slide-down menu panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden bg-white border-b border-primary/15 shadow-xl shadow-primary/10 px-4 pb-6 pt-3"
            >
              <nav className="space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(link.to)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      {isActive(link.to) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-border/60 space-y-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-primary/30 text-primary gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                    </Button>
                  </Link>
                )}
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl gap-2 text-muted-foreground"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                ) : (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-primary/30 text-primary gap-2"
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </Button>
                  </Link>
                )}
                <Link to="/book">
                  <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 mt-1">
                    Book Now 💅
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
