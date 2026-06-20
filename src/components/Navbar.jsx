import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogIn, LogOut, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Nail Course", to: "/nail-course" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-primary/20"
            : "bg-white/90 backdrop-blur-lg border-primary/10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <span className="font-heading text-xl font-bold tracking-tight">
                <span className="text-primary font-black">She Is</span>
                <span
                  className="text-foreground/40 font-light ml-1.5 tracking-widest uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.22em" }}
                >
                  The Best
                </span>
              </span>
            </Link>

            {/* Hamburger — all screen sizes */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl text-foreground hover:bg-primary/10 transition-colors active:scale-95"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Drawer backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Drawer panel — slides in from right ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
          <span className="font-heading text-lg font-bold">
            <span className="text-primary font-black">She Is</span>
            <span className="text-foreground/40 font-light ml-1 text-xs tracking-widest uppercase">
              The Best
            </span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 pb-8 pt-4 border-t border-border/60 space-y-2">
          {isAdmin && (
            <Link to="/admin">
              <Button variant="outline" className="w-full rounded-xl border-primary/30 text-primary gap-2">
                <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
              </Button>
            </Link>
          )}
          {isLoggedIn ? (
            <Button
              variant="ghost"
              className="w-full rounded-xl gap-2 text-muted-foreground"
              onClick={() => { logout(); setOpen(false); }}
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          ) : (
            <Link to="/admin">
              <Button variant="outline" className="w-full rounded-xl border-primary/30 text-primary gap-2">
                <LogIn className="w-4 h-4" /> Login
              </Button>
            </Link>
          )}
          <Link to="/book">
            <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">
              Book Now 💅
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
