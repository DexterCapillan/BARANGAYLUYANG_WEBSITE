// src/pages/public/About.jsx
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
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
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
            <p className="text-slate-600"><b>
              To encourage all Barangay Officials and members, serve as a model or example 
              to the next generation as a good leader to them.
            </b></p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Vision
            </h2>
            <p className="text-slate-600"><b>
              Barangay Luyang, main producer of quality agricultural products in Bayombong, committed 
              to living in a peaceful, safe and progressive community, 
              governed by active, self-reliant, responsible and participative citizenry.
            </b></p>
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
            {[
              "Online Barangay Clearance",
              "Resident Information System",
              "Health & Community Announcements",
              "Katarungang Pambarangay Records",
              "Reports on Collection (ROCAD)",
              "Secure Admin Access",
            ].map((service, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-slate-700 font-medium">
                  ✔ {service}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TRANSPARENCY SECTION */}
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
    </div>
  );
}