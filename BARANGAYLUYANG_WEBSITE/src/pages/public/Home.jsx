import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  HeartPulse,
  Megaphone,
  Users,
  ArrowRight
} from "lucide-react";
import announcements from "../../data/announcements";

// SERVICES DATA
const services = [
  {
    title: "Barangay Clearance",
    desc: "Request barangay clearance and certificates online quickly and securely.",
    icon: <FileText className="w-10 h-10 text-blue-700" />,
    link: "/services/clearance"
  },
  {
    title: "Health Services",
    desc: "Check programs, schedules, and announcements at the Health Center.",
    icon: <HeartPulse className="w-10 h-10 text-green-600" />,
    link: "/services/health"
  },
  {
    title: "Announcements",
    desc: "Stay updated with news, events, and community notices.",
    icon: <Megaphone className="w-10 h-10 text-yellow-500" />,
    link: "/services/announcements"
  },
  {
    title: "Resident Records",
    desc: "Manage resident information securely and efficiently.",
    icon: <Users className="w-10 h-10 text-purple-600" />,
    link: "/services/residents"
  }
];

// STATISTICS
const stats = [
  { icon: <Users className="w-8 h-8 text-blue-600" />, label: "Registered Residents", value: 1858 },
  { icon: <FileText className="w-8 h-8 text-green-600" />, label: "Clearances Issued", value: 870 },
  { icon: <Megaphone className="w-8 h-8 text-yellow-500" />, label: "Announcements", value: announcements.length }
];

// TESTIMONIALS
const testimonials = [
  { name: "Juan Dela Cruz", comment: "The online system is very efficient. I got my clearance in minutes!" },
  { name: "Maria Santos", comment: "Love the transparency and easy access to announcements." },
  { name: "Pedro Reyes", comment: "Managing resident records has never been easier for barangay staff." }
];

// MOTION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="relative overflow-hidden">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900
                         text-white py-20 px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-400">Barangay Luyang</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Digital access to barangay services, transparent governance, and community engagement for every resident.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/services"
              className="bg-yellow-500 text-blue-950 font-semibold px-8 py-3 rounded-lg
                         hover:bg-yellow-400 hover:scale-105 transition duration-300 shadow-md"
            >
              Online Services
            </Link>
            <Link
              to="/about"
              className="border border-white px-8 py-3 rounded-lg
                         hover:bg-white hover:text-blue-900 hover:scale-105 transition duration-300 shadow-md"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        {/* Decorative shapes */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-yellow-400 opacity-20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute -top-16 -left-16 w-72 h-72 bg-white opacity-10 rounded-full"
        />
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-900">
          Our Services
        </h2>
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 border rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition transform duration-300"
              variants={cardVariants}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-slate-600 mb-4">{service.desc}</p>
              <Link
                to={service.link}
                className="inline-flex items-center text-blue-700 font-medium hover:underline"
              >
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
          Barangay at a Glance
        </h2>
        <motion.div
          className="grid sm:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center"
              variants={cardVariants}
            >
              {stat.icon}
              <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
              <p className="text-slate-600 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
          Latest Announcements
        </h2>
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {announcements.map((ann, idx) => (
            <motion.div
              key={idx}
              className="p-6 border rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition transform duration-300"
              variants={cardVariants}
            >
              <h3 className="font-semibold text-xl mb-2">{ann.title}</h3>
              <p className="text-slate-500 text-sm">{ann.date}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-900">
          What Residents Say
        </h2>
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="p-6 border-l-4 border-blue-500 bg-white rounded-xl shadow-md italic"
              variants={cardVariants}
            >
              <p className="text-slate-700">"{t.comment}"</p>
              <p className="mt-3 font-semibold text-blue-900">- {t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT BANNER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-16 px-6 mt-16 rounded-xl text-center max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Committed to Transparency & Community
        </h2>
        <p className="text-slate-700 text-lg max-w-2xl mx-auto">
          Barangay Luyang ensures all residents have easy access to digital services,
          timely announcements, and transparent governance. Join us in building a
          digitally empowered community.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-block bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg
                     hover:bg-blue-800 transition duration-300 shadow-md"
        >
          Learn More About Us
        </Link>
      </motion.section>

    </div>
  );
}