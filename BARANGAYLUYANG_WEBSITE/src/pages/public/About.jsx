// src/pages/public/About.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceModal from "../../components/common/ServiceModal";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const services = [
  {
    title: "Online Barangay Clearance",
    data: [
      "Requirements: Valid ID",
      "Processing Time: 10–15 minutes",
      "Fee: ₱50"
    ]
  },
  {
    title: "Resident Information System",
    data: [
      "Population: 5000+",
      "Digital resident records available"
    ]
  },
  {
    title: "Health & Community Announcements",
    data: [
      "Free checkup schedules",
      "Vaccination announcements"
    ]
  },
  {
    title: "Katarungang Pambarangay Records",
    data: [
      "Mediation records",
      "Settlement reports"
    ]
  },
  {
    title: "Reports on Collection (ROCAD)",
    data: [
      "Monthly collection reports",
      "Financial transparency records"
    ]
  },
  {
    title: "Secure Admin Access",
    data: [
      "Barangay staff login",
      "System management dashboard"
    ]
  }
];

export default function About() {
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  const openService = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const closeService = () => {
    setOpen(false);
  };

  // Temporary placeholder for modal if service is null
  const tempService = selectedService || {
    title: "Loading Service...",
    data: [
      "Please wait, temporary data is displayed.",
      "This is placeholder information."
    ]
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* HEADER */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            About Barangay Luyang
          </h1>
          <p className="text-slate-600 text-lg">
            Committed to transparent governance, efficient public service,
            and digital innovation for the betterment of every resident.
          </p>
        </motion.section>

        {/* STATISTICS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Barangay Overview
            </h2>
            <p className="text-slate-500 mt-2">
              Key figures reflecting our digital governance and public service.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "5,000+", label: "Residents" },
              { number: "100%", label: "Digital Records" },
              { number: "24/7", label: "Online Access" },
              { number: "1", label: "Secure Admin System" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition transform"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-blue-900">
                  {stat.number}
                </h3>
                <p className="text-slate-500 mt-3 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* MISSION & VISION */}
        <motion.section
          className="grid md:grid-cols-2 gap-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Mission
            </h2>
            <p className="text-slate-600">
              <b>
                To encourage all Barangay Officials and members, serve as a model or example 
                to the next generation as a good leader to them.
              </b>
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Vision
            </h2>
            <p className="text-slate-600">
              <b>
                Barangay Luyang, main producer of quality agricultural products in Bayombong, committed 
                to living in a peaceful, safe and progressive community, 
                governed by active, self-reliant, responsible and participative citizenry.
              </b>
            </p>
          </div>
        </motion.section>

        {/* DIGITAL SERVICES */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
            Digital Barangay Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                onClick={() => openService(service)}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition transform cursor-pointer"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <p className="text-slate-700 font-medium">
                  ✔ {service.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TRANSPARENCY */}
        <motion.section
          className="bg-blue-900 text-white p-10 rounded-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Transparency & Accountability
          </h2>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Our digital platform ensures organized records, accessible
            financial reports, and streamlined services — promoting
            open governance and public trust.
          </p>
        </motion.section>

      </div>

      {/* Animated Modal with Temporary Data */}
  <AnimatePresence>
  {open && (
    <motion.div
      key={tempService.title}  // ensures animation runs for every service
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* POP-UP MODAL */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0 }}       // start small
        animate={{ scale: 1 }}       // pop up to full size
        exit={{ scale: 0 }}          // shrink on close
        transition={{ type: "spring", stiffness: 300, damping: 20 }}  // spring bounce
      >
        <ServiceModal
          isOpen={open}
          onClose={closeService}
          service={tempService}
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}