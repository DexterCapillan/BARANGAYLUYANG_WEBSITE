// src/pages/public/Residents.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, User, Baby, HeartHandshake } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PublicResidents() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "stats"), (snap) => {
      if (snap.exists()) setStats(snap.data());
    });
    return () => unsub();
  }, []);

  const total = stats ? stats.males + stats.females : 0;
  const adults = stats ? total - stats.children : 0;

  const cards = [
    {
      label: "Total Residents",
      value: total,
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "from-blue-500 to-blue-700",
    },
    {
      label: "Males",
      value: stats?.males ?? 0,
      icon: <User className="w-8 h-8 text-white" />,
      bg: "from-cyan-500 to-cyan-700",
    },
    {
      label: "Females",
      value: stats?.females ?? 0,
      icon: <User className="w-8 h-8 text-white" />,
      bg: "from-pink-500 to-pink-700",
    },
    {
      label: "Adults (18+)",
      value: adults,
      icon: <HeartHandshake className="w-8 h-8 text-white" />,
      bg: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Children (<18)",
      value: stats?.children ?? 0,
      icon: <Baby className="w-8 h-8 text-white" />,
      bg: "from-amber-400 to-amber-600",
    },
  ];

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Community Data</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Resident Records</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            An overview of registered residents in Barangay Luyang. Personal data is kept private and secure.
          </p>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Population at a Glance</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Last updated by barangay admin. Data reflects current registered residents.
          </p>
        </motion.div>

        {stats === null ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading data...</div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${card.bg} p-5 flex flex-col items-center text-center`}>
                  <div className="mb-3">{card.icon}</div>
                  <p className="text-3xl font-extrabold text-white">
                    {card.value?.toLocaleString() ?? 0}
                  </p>
                  <p className="text-xs text-white/80 mt-1">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* GENDER DISTRIBUTION */}
        {stats && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-6">Gender Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Males</span>
                  <span className="text-cyan-600 font-bold">{stats.males?.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stats.males / total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 font-medium">Females</span>
                  <span className="text-pink-600 font-bold">{stats.females?.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(stats.females / total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PRIVACY NOTE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center"
        >
          <p className="text-blue-800 text-sm leading-relaxed">
            Personal resident information is strictly confidential and only accessible to authorized barangay personnel.
            This page only displays aggregate statistical data for community transparency.
          </p>
        </motion.div>
      </section>
    </div>
  );
}