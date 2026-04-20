// src/pages/public/Announcements.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Search, X, Calendar, ChevronRight } from "lucide-react";
import { useAnnouncements } from "../../context/useAnnouncements";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Announcements() {
  const { announcements } = useAnnouncements();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = [...announcements]
    .reverse()
    .filter((ann) =>
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.preview.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-white pt-24">

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
            <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-6 pb-8 relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-blue-200 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
                    Announcement
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white leading-snug pr-6">
                  {selected.title}
                </h2>
                <div className="flex items-center gap-1.5 mt-2 text-blue-200 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selected.date}</span>
                </div>
              </div>
              <div className="px-6 py-5">
                {selected.preview && (
                  <p className="text-blue-900 font-medium text-sm mb-3 leading-relaxed">
                    {selected.preview}
                  </p>
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

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Stay Informed</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Announcements</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Stay up to date with the latest news, events, and notices from Barangay Luyang.
          </p>
        </motion.div>
      </section>

      {/* SEARCH + LIST */}
      <section className="max-w-4xl mx-auto px-6 py-16">

        {/* SEARCH BAR */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm mb-10">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>

        {/* RESULTS COUNT */}
        <p className="text-sm text-slate-400 mb-6">
          {filtered.length} {filtered.length === 1 ? "announcement" : "announcements"} found
        </p>

        {/* LIST */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              {search ? "No announcements match your search." : "No announcements yet."}
            </p>
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((ann, idx) => (
              <motion.div
                key={ann.id ?? idx}
                variants={cardVariants}
                onClick={() => setSelected(ann)}
                className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-blue-700 to-yellow-400" />
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{ann.date}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base mb-1 leading-snug group-hover:text-blue-800 transition-colors">
                      {ann.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {ann.preview}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 shrink-0 mt-1 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}