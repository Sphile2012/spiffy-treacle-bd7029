import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Award, MapPin, Clock, Star, Users, GraduationCap } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    label: "Precision",
    desc: "Every set is crafted with care and meticulous attention to detail — no shortcuts, ever.",
  },
  {
    icon: Heart,
    label: "Passion",
    desc: "We genuinely love what we do, and that passion shows in every single client's nails.",
  },
  {
    icon: Award,
    label: "Quality",
    desc: "Only premium, professional-grade products are used on every service we offer.",
  },
];

const stats = [
  { icon: Star, value: "100%", label: "Client Satisfaction" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: GraduationCap, value: "50+", label: "Students Trained" },
  { icon: Clock, value: "8am–4pm", label: "Open Daily" },
];

const team = [
  {
    name: "She Is The Best Team",
    role: "Professional Nail Artists",
    image:
      "https://media.base44.com/images/public/69c85189646ba632d738f811/c8cd671aa_WhatsAppImage2026-03-29at1611561.jpg",
    bio: "Our dedicated team of nail artists brings creativity, precision, and warmth to every appointment. We stay up to date with the latest trends and techniques so you always leave looking your best.",
  },
];

export default function About() {
  return (
    <div className="py-12 sm:py-20">

      {/* ── Hero Banner ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            About{" "}
            <span className="text-primary font-black">She Is The Best</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Born from a deep love for nail art and a passion for empowering women through beauty —
            based at Sangro House in the heart of Durban.
          </p>
        </motion.div>
      </div>

      {/* ── Our Story ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="https://media.base44.com/images/public/69c85189646ba632d738f811/c8cd671aa_WhatsAppImage2026-03-29at1611561.jpg"
                alt="She Is The Best — our salon work"
                loading="lazy"
                decoding="async"
                className="w-full h-[480px] object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-2xl p-5 shadow-xl border border-border/50 text-center"
            >
              <p className="font-heading text-4xl font-black text-primary">100%</p>
              <p className="text-xs text-muted-foreground mt-1">Client Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
              Who We Are
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Where Beauty Meets Skill
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              She Is The Best was born from a deep love for nail art and a passion for empowering
              women through beauty. Based at Sangro House in Durban, we offer a warm, professional
              salon experience that goes far beyond just nails.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're coming in for a fresh set, treating yourself to a pedicure, or ready to
              start your own career through our beginner nail course — you are in exactly the right
              place.
            </p>

            <div className="space-y-4 mb-10">
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{v.label}</p>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/book">
                <Button
                  size="lg"
                  className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                >
                  Book With Us
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/5"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-primary py-16 px-4 sm:px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <s.icon className="w-7 h-7 mx-auto mb-3 opacity-80" />
                <p className="font-heading text-3xl sm:text-4xl font-black mb-1">{s.value}</p>
                <p className="text-sm opacity-75 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
            The People Behind the Magic
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Meet Our Team
          </h2>
        </motion.div>

        <div className="flex justify-center">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow max-w-sm w-full"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Location ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/40 border border-primary/10 rounded-3xl p-8 sm:p-12 text-center"
        >
          <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Find Us
          </h2>
          <p className="text-muted-foreground mb-2">
            <strong className="text-foreground">Sangro House, Durban</strong>
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Mon – Sun · 8am – 4pm
          </p>
          <a
            href="https://maps.google.com/?q=Sangro+House+Durban"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/5"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-10 sm:p-14 text-center text-white"
        >
          <span className="text-5xl block mb-6">💅</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
            Ready to experience She Is The Best?
          </h2>
          <p className="opacity-90 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Book your appointment today or enrol in our beginner nail course and start your beauty
            journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full px-8 text-primary font-semibold"
              >
                Book Appointment
              </Button>
            </Link>
            <Link to="/nail-course">
              <Button
                size="lg"
                className="rounded-full px-8 bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                View Nail Course
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
