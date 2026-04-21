// src/pages/public/CitizensCharter.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLegislation } from "../../context/useLegislation";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CitizensCharter() {
  const { charterImages } = useLegislation();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  function openLightbox(i) { setLightboxIndex(i); }
  function closeLightbox() { setLightboxIndex(null); }
  function prev() { setLightboxIndex((i) => (i > 0 ? i - 1 : charterImages.length - 1)); }
  function next() { setLightboxIndex((i) => (i < charterImages.length - 1 ? i + 1 : 0)); }

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-700 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-4 rounded-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest">Barangay Luyang</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Citizens Charter</h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            Our commitment to quality service. View the official Citizens Charter of Barangay Luyang.
          </p>
        </motion.div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={charterImages[lightboxIndex]}
                alt={`Page ${lightboxIndex + 1}`}
                className="w-full rounded-xl object-contain max-h-[80vh]"
              />
              <div className="absolute top-3 right-3">
                <button onClick={closeLightbox} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button onClick={prev} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition ml-2">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={next} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition mr-2">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-white/60 text-sm mt-3">
                Page {lightboxIndex + 1} of {charterImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {charterImages.length === 0 ? (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center py-24">
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">The Citizens Charter has not been uploaded yet.</p>
            <p className="text-slate-300 text-sm mt-1">Please check back soon.</p>
          </motion.div>
        ) : (
          <>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-slate-800">Charter Pages</h2>
              <p className="text-slate-500 text-sm mt-1">Click any page to view it full size.</p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {charterImages.map((src, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  onClick={() => openLightbox(i)}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="overflow-hidden">
                    <img
                      src={src}
                      alt={`Page ${i + 1}`}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Page {i + 1}</span>
                    <span className="text-xs text-emerald-600 font-medium group-hover:underline">View full size</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </section>

    </div>
  );
}