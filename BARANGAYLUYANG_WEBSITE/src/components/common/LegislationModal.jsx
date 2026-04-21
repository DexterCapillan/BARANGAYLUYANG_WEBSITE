import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Download } from "lucide-react";

export default function LegislationModal({ item, onClose, accentColor = "bg-blue-900" }) {
  if (!item) return null;

  const images = item.images?.length > 0 ? item.images : item.imageUrl ? [item.imageUrl] : [];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-1.5 shadow-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          {/* ALL IMAGES STACKED */}
          {images.length > 0 && (
            <div className="w-full rounded-t-2xl overflow-hidden">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Page ${i + 1}`}
                  className="w-full object-contain block"
                />
              ))}
            </div>
          )}

          {/* CONTENT */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-semibold text-slate-500">{item.date}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 leading-snug">{item.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>

            {item.pdfUrl && (
            <a  
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${accentColor} text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity`}
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}