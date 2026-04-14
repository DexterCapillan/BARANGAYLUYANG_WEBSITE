import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Leaf, Shield, Clock, Wifi } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const services = [
  { title: "Online Barangay Clearance", data: ["Requirements: Valid ID", "Processing Time: 10–15 minutes", "Fee: ₱50"], icon: "📄" },
  { title: "Resident Information System", data: ["Population: 1,800+", "Digital resident records available"], icon: "👥" },
  { title: "Health & Community Announcements", data: ["Free checkup schedules", "Vaccination announcements"], icon: "🏥" },
  { title: "Katarungang Pambarangay Records", data: ["Mediation records", "Settlement reports"], icon: "⚖️" },
  { title: "Reports on Collection (ROCAD)", data: ["Monthly collection reports", "Financial transparency records"], icon: "📊" },
  { title: "Secure Admin Access", data: ["Barangay staff login", "System management dashboard"], icon: "🔐" },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24 px-6 text-white overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
        />
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-6 leading-tight">
            About Barangay <span className="text-yellow-400">Luyang</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Committed to transparent governance, efficient public service,
            and digital innovation for the betterment of every resident.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">By The Numbers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Barangay Overview</h2>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {[
            { number: "1,800+", label: "Residents", icon: <Wifi className="w-6 h-6 text-blue-500" /> },
            { number: "100%", label: "Digital Records", icon: <Shield className="w-6 h-6 text-green-500" /> },
            { number: "24/7", label: "Online Access", icon: <Clock className="w-6 h-6 text-yellow-500" /> },
            { number: "6+", label: "Digital Services", icon: <Leaf className="w-6 h-6 text-purple-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={i} variants={cardVariants}
              className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center group"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-4xl font-extrabold text-blue-900">{stat.number}</h3>
              <p className="text-slate-500 mt-2 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Mission & Vision</h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <motion.div variants={cardVariants} className="relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-l-2xl" />
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To encourage all Barangay Officials and members, serve as a model or example
                to the next generation as good leaders to them.
              </p>
            </motion.div>
            <motion.div variants={cardVariants} className="relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-2xl" />
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                Barangay Luyang, main producer of quality agricultural products in Bayombong, committed
                to living in a peaceful, safe and progressive community,
                governed by active, self-reliant, responsible and participative citizenry.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DIGITAL SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Digital Barangay Services</h2>
          <p className="text-slate-500 mt-3">Click any service to learn more.</p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i} variants={cardVariants}
              onClick={() => setSelected(service)}
              className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-slate-800 font-semibold">{service.title}</p>
              </div>
              <p className="text-xs text-blue-500 mt-3 font-medium group-hover:text-blue-700 transition-colors">View details →</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TRANSPARENCY BANNER */}
      <section className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white overflow-hidden">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute -right-20 -bottom-20 w-72 h-72 border-4 border-yellow-400/10 rounded-full"
        />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Our Commitment</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Transparency & Accountability</h2>
          <p className="text-blue-200 leading-relaxed text-lg">
            Our digital platform ensures organized records, accessible
            financial reports, and streamlined services — promoting
            open governance and public trust.
          </p>
        </motion.div>
      </section>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selected.icon}</span>
                  <h3 className="text-white font-bold text-lg">{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="text-blue-200 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-3">
                {selected.data.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}