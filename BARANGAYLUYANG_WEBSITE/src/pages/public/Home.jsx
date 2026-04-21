import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Megaphone,
  Users,
  ArrowRight,
  X,
  Calendar,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  ScrollText,
  FileText,
  BookOpen
} from "lucide-react";
import { useAnnouncements } from "../../context/useAnnouncements";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1598714805247-5dd7fe699792?w=1600&q=80";

const services = [
  {
    title: "Health Services",
    desc: "Check programs, schedules, and announcements at the Health Center.",
    icon: <HeartPulse className="w-10 h-10 text-green-600" />,
    link: "/health",
    color: "from-green-50 to-green-100",
    border: "border-green-200"
  },
  {
    title: "Announcements",
    desc: "Stay updated with news, events, and community notices.",
    icon: <Megaphone className="w-10 h-10 text-yellow-500" />,
    link: "/services/announcements",
    color: "from-yellow-50 to-yellow-100",
    border: "border-yellow-200"
  },
  {
    title: "Legislation",
    desc: "Access executive orders, ordinances, and resolutions from the barangay.",
    icon: <ScrollText className="w-10 h-10 text-blue-600" />,
   link: "/services",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-200"
  },
  {
    title: "Citizens Charter",
    desc: "View our commitment to quality service for every resident of Barangay Luyang.",
    icon: <BookOpen className="w-10 h-10 text-emerald-600" />,
    link: "/citizens-charter",
    color: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200"
  },
];

const testimonials = [
  { name: "Juan Dela Cruz", comment: "The online system is very efficient. I got my clearance in minutes!", purok: "Purok 1" },
  { name: "Maria Santos", comment: "Love the transparency and easy access to announcements.", purok: "Purok 2" },
  { name: "Pedro Reyes", comment: "Managing resident records has never been easier for barangay staff.", purok: "Purok 3" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function Home() {
  const { announcements } = useAnnouncements();
  const [residentCount, setResidentCount] = useState(1858);
  const [heroImage, setHeroImage] = useState(FALLBACK_IMAGE);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "public", "residentCount"), (snap) => {
      if (snap.exists()) setResidentCount(snap.data().total);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "heroImage"), (snap) => {
      if (snap.exists() && snap.data().url) {
        setHeroImage(snap.data().url);
      }
    });
    return () => unsub();
  }, []);

  const stats = [
    { icon: <Users className="w-8 h-8 text-white" />, label: "Registered Residents", value: residentCount, bg: "from-blue-500 to-blue-700" },
    { icon: <Megaphone className="w-8 h-8 text-white" />, label: "Announcements", value: announcements.length, bg: "from-yellow-400 to-yellow-600" },
    { icon: <FileText className="w-8 h-8 text-white" />, label: "Services Available", value: 8, bg: "from-green-500 to-green-700" }
  ];

  return (
    <div className="relative overflow-hidden">

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-blue-950 bg-opacity-60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-6 pb-8 relative">
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-blue-200 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Announcement</span>
                </div>
                <h2 className="text-xl font-bold text-white leading-snug pr-6">{selected.title}</h2>
                <div className="flex items-center gap-1.5 mt-2 text-blue-200 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selected.date}</span>
                </div>
              </div>
              <div className="px-6 py-5">
                {selected.preview && (
                  <p className="text-blue-900 font-medium text-sm mb-3 leading-relaxed">{selected.preview}</p>
                )}
                <p className="text-slate-600 text-sm leading-relaxed">{selected.content}</p>
              </div>
              <div className="px-6 pb-5">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/75 to-blue-950/90" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />

        <motion.div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-100">
            <MapPin className="w-3.5 h-3.5 text-yellow-400" />
            Cagayan Valley, Philippines
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-yellow-400 drop-shadow-lg">Barangay Luyang</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Digital access to barangay services, transparent governance, and community engagement for every resident.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link to="/services" className="bg-yellow-400 text-blue-950 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 hover:scale-105 transition duration-300 shadow-lg shadow-yellow-400/20">
              Online Services
            </Link>
            <Link to="/about" className="border-2 border-white/50 backdrop-blur-sm px-8 py-3.5 rounded-xl hover:bg-white hover:text-blue-900 hover:scale-105 transition duration-300">
              Learn More
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-8 max-w-xl mx-auto">
            {[
              { value: residentCount, label: "Residents" },
              { value: announcements.length, label: "Announcements" },
              { value: 8, label: "Services" }
            ].map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-2xl font-extrabold text-yellow-400">{s.value?.toLocaleString()}</p>
                <p className="text-xs text-blue-200 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Our Services</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">Everything you need from your barangay, now available online.</p>
        </motion.div>
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`p-6 border ${service.border} rounded-2xl bg-gradient-to-br ${service.color} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group`}
              variants={cardVariants}
            >
              <div className="mb-4 p-3 bg-white rounded-xl w-fit shadow-sm">{service.icon}</div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{service.desc}</p>
              <Link to={service.link} className="inline-flex items-center text-blue-700 font-semibold text-sm hover:gap-2 gap-1 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <span className="text-sm font-semibold text-yellow-400 uppercase tracking-widest">By The Numbers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Barangay at a Glance</h2>
        </motion.div>
        <motion.div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {stats.map((stat, idx) => (
            <motion.div key={idx} className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/20 transition-colors" variants={cardVariants}>
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bg} shadow-lg mb-4`}>{stat.icon}</div>
              <h3 className="text-4xl font-extrabold text-white">{stat.value?.toLocaleString()}</h3>
              <p className="text-blue-200 mt-1 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Stay Informed</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Latest Announcements</h2>
        </motion.div>
        {announcements.length === 0 ? (
          <p className="text-center text-slate-500">No announcements yet.</p>
        ) : (
          <motion.div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[...announcements].slice(0, 3).map((ann, idx) => (
              <motion.div
                key={idx}
                className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                variants={cardVariants}
                onClick={() => setSelected(ann)}
              >
                <div className="h-1.5 bg-gradient-to-r from-blue-700 to-yellow-400" />
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ann.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2 leading-snug group-hover:text-blue-800 transition-colors">{ann.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{ann.preview}</p>
                  <div className="flex items-center gap-1 text-blue-700 text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 py-24 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Community Voices</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">What Residents Say</h2>
        </motion.div>
        <motion.div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {testimonials.map((t, idx) => (
            <motion.div key={idx} className="p-7 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow relative" variants={cardVariants}>
              <div className="text-5xl text-blue-100 font-serif absolute top-4 left-5">"</div>
              <p className="text-slate-600 italic leading-relaxed pt-4 relative z-10">{t.comment}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.purok}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT BANNER */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 px-6 text-center"
      >
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute -right-20 -top-20 w-72 h-72 bg-yellow-400 opacity-10 rounded-full blur-2xl" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-yellow-400 uppercase tracking-widest">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Committed to Transparency & Community</h2>
          <p className="text-blue-200 text-lg leading-relaxed">
            Barangay Luyang ensures all residents have easy access to digital services, timely announcements, and transparent governance.
          </p>
          <Link to="/about" className="mt-8 inline-block bg-yellow-400 text-blue-950 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 hover:scale-105 transition duration-300 shadow-lg">
            Learn More About Us
          </Link>
        </div>
      </motion.section>

      {/* CONTACT FOOTER BAR */}
      <section className="bg-blue-950 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-blue-300 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>Barangay Luyang, Cagayan Valley, Philippines</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-blue-700" />
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>+63 XXX XXX XXXX</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-blue-700" />
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-yellow-400" />
            <span>barangayluyang@email.com</span>
          </div>
        </div>
      </section>

    </div>
  );
}