// src/components/common/ServiceModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

export default function ServiceModal({ isOpen, onClose, service }) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        // BACKDROP
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >

          {/* MODAL */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >

            {/* HEADER */}
            <div className="flex justify-between items-center border-b p-6">
              <div className="flex items-center gap-3">
                <Info className="text-blue-700" />
                <h2 className="text-2xl font-bold text-blue-900">
                  {service.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition-transform hover:scale-110"
              >
                <X />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              <p className="text-slate-600">
                Information related to this digital barangay service.
              </p>

              {/* Service Data with staggered animation */}
              <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                {service.data.map((item, index) => (
                  <motion.p
                    key={index}
                    className="text-slate-700 flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4, ease: "easeInOut" }}
                  >
                    <span className="text-blue-600">•</span>
                    {item}
                  </motion.p>
                ))}
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}