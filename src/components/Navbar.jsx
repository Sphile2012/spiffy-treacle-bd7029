import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Nail Course", to: "/nail-course" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${scrolled ? 'bg-background/95 border-border/60 shadow-sm shadow-foreground/5' : 'bg-background/70 border-border/30'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              <span className="text-primary font-black">She Is The Best</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="rounded-full px-4 gap-1.5 border-primary/30 text-primary hover:bg-primary/5">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Admin
                </Button>
              </Link>
            )}
            {isLoggedIn ? (
              <Button variant="ghost" size="sm" className="rounded-full gap-1.5 text-muted-foreground" onClick={logout}>
                <LogOut className="w-3.5 h-3.5" /> Logout
              </Button>
            ) : (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5">
                  <LogIn className="w-3.5 h-3.5" /> Login
                </Button>
              </Link>
            )}
            <Link to="/book">
              <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-6 pt-2 space-y-1">
          {links.map((link) => (
            <Link key={link.to} to={link.to}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full rounded-full mt-2 border-primary/30 text-primary gap-2">
                <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
              </Button>
            </Link>
          )}
          {isLoggedIn ? (
            <Button variant="ghost" className="w-full rounded-full mt-2 gap-2 text-muted-foreground" onClick={logout}>
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          ) : (
            <Link to="/admin" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full rounded-full mt-2 border-primary/30 text-primary gap-2">
                <LogIn className="w-4 h-4" /> Login
              </Button>
            </Link>
          )}
          <Link to="/book" onClick={() => setOpen(false)}>
            <Button className="w-full rounded-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
