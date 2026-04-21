// src/pages/public/Services.jsx
import { motion } from "framer-motion";
import { FileText, HeartPulse, Megaphone, Users, ArrowRight, ScrollText, Landmark, Receipt, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

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

const services = [
  {
    title: "Executive Orders",
    desc: "View and access official executive orders issued by the Barangay Captain. Stay informed about directives and policies affecting the community.",
    icon: <ScrollText className="w-8 h-8" />,
    linkText: "View Orders",
    linkTo: "/services/executive-orders",
    color: "from-blue-500 to-blue-700",
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    title: "Health Services",
    desc: "Check schedules, announcements, and programs at the Barangay Health Center. Stay updated with medical outreach and vaccinations.",
    icon: <HeartPulse className="w-8 h-8" />,
    linkText: "View Details",
    linkTo: "/health",
    color: "from-green-500 to-emerald-700",
    bg: "from-green-50 to-emerald-100",
    border: "border-green-200",
    text: "text-green-700",
  },
  {
    title: "Announcements",
    desc: "Stay updated with barangay news, events, and community notices. We ensure residents are informed about all local activities.",
    icon: <Megaphone className="w-8 h-8" />,
    linkText: "See Updates",
    linkTo: "/services/announcements",
    color: "from-yellow-400 to-amber-600",
    bg: "from-yellow-50 to-amber-100",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  {
    title: "Resident Records",
    desc: "Manage and view resident information efficiently through the digital system. Only authorized personnel can access sensitive data.",
    icon: <Users className="w-8 h-8" />,
    linkText: "View Records",
    linkTo: "/services/residents",
    color: "from-purple-500 to-purple-700",
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  {
    title: "Ordinances",
    desc: "Browse barangay ordinances passed by the Sangguniang Barangay. Understand the local laws and regulations governing our community.",
    icon: <Landmark className="w-8 h-8" />,
    linkText: "Browse Ordinances",
    linkTo: "/services/ordinances",
    color: "from-indigo-500 to-indigo-700",
    bg: "from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    text: "text-indigo-700",
  },
  {
    title: "Taxes & Fees",
    desc: "Learn about barangay taxes, fees, and charges. Find out payment schedules, rates, and how to settle your obligations conveniently.",
    icon: <Receipt className="w-8 h-8" />,
    linkText: "View Rates",
    linkTo: "/services/taxes-and-fees",
    color: "from-rose-500 to-rose-700",
    bg: "from-rose-50 to-rose-100",
    border: "border-rose-200",
    text: "text-rose-700",
  },
  {
    title: "Resolutions",
    desc: "Access official resolutions adopted by the Sangguniang Barangay. Review decisions and positions taken on community matters.",
    icon: <FileText className="w-8 h-8" />,
    linkText: "View Resolutions",
    linkTo: "/services/resolutions",
    color: "from-teal-500 to-teal-700",
    bg: "from-teal-50 to-teal-100",
    border: "border-teal-200",
    text: "text-teal-700",
  },
  {
    title: "Citizens Charter",
    desc: "View the official Citizens Charter of Barangay Luyang. Our commitment to quality service for every resident.",
    icon: <BookOpen className="w-8 h-8" />,
    linkText: "View Charter",
    linkTo: "/citizens-charter",
    color: "from-emerald-500 to-emerald-700",
    bg: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
];

export default function Services() {
  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">What We Offer</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Our Services</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Digital access to barangay services — making it easier for every resident to get what they need.
          </p>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index} variants={cardVariants}
              className={`group p-7 border ${service.border} rounded-2xl bg-gradient-to-br ${service.bg} hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} text-white w-fit shadow-md mb-5`}>
                {service.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{service.desc}</p>
              <Link
                to={service.linkTo}
                className={`inline-flex items-center gap-1.5 ${service.text} text-sm font-semibold group-hover:gap-3 transition-all`}
              >
                {service.linkText} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Need Help?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Can't find what you're looking for?</h2>
          <p className="text-blue-200 mb-8">Visit the barangay hall or send us a message and we'll assist you right away.</p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-blue-950 font-bold px-8 py-3.5 rounded-xl hover:bg-yellow-300 hover:scale-105 transition duration-300 shadow-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
}