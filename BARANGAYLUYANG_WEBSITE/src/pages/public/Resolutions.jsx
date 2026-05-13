import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Download, Search, X } from "lucide-react";
import { useLegislation } from "../../context/useLegislation";
import LegislationModal from "../../components/common/LegislationModal";

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

export default function Resolutions() {
  const { resolutions } = useLegislation();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");

  const filtered = [...resolutions]
    .filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.date?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "az") return a.title?.localeCompare(b.title);
      if (sortOrder === "za") return b.title?.localeCompare(a.title);
      if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="bg-white pt-24">
      <LegislationModal item={selected} onClose={() => setSelected(null)} accentColor="bg-teal-900" />

      {/* HERO */}
      <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <FileText className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Official Decisions</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Resolutions</h1>
          <p className="text-teal-200 text-lg max-w-xl mx-auto">
            Official resolutions adopted by the Sangguniang Barangay of Barangay Luyang.
          </p>
        </motion.div>
      </section>

      {/* SEARCH & SORT */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-0">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resolutions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
          >
            <option value="az">Title A – Z</option>
            <option value="za">Title Z – A</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        {search && (
          <p className="text-xs text-slate-400 mt-2 ml-1">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
          </p>
        )}
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{search ? `No results for "${search}".` : "No resolutions posted yet."}</p>
          </div>
        ) : (
          <motion.div
  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
  variants={containerVariants} initial="hidden" animate="visible"
>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => setSelected(item)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                {item.imageUrl ? (
                  <div className="h-44 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-teal-300" />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-medium">{item.date}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-2 bg-teal-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}