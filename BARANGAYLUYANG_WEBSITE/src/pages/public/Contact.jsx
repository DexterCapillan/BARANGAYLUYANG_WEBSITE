import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Contact() {
  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Contact Us</h1>
          <p className="text-blue-200 text-lg">
            Have questions about barangay services? We're here to help.
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT: INFO + MAP */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">

            {/* INFO CARDS */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin className="w-5 h-5 text-blue-600" />, label: "Address", value: "Barangay Luyang Hall, Bayombong, Nueva Vizcaya", bg: "bg-blue-50" },
                { icon: <Phone className="w-5 h-5 text-green-600" />, label: "Phone", value: "+63 912 345 6789", bg: "bg-green-50" },
                { icon: <Mail className="w-5 h-5 text-yellow-600" />, label: "Email", value: "barangayluyang@email.com", bg: "bg-yellow-50" },
                { icon: <Clock className="w-5 h-5 text-purple-600" />, label: "Office Hours", value: "Mon–Fri, 8AM–5PM", bg: "bg-purple-50" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-4 rounded-2xl`}>
                  <div className="mb-2">{item.icon}</div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-slate-800 text-sm font-medium mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* MAP */}
            <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7651.264847375769!2d121.14432059141146!3d16.49413983699432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339047b99367c187%3A0xd1989c17d219bd11!2sLuyang%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1772503247777!5m2!1sen!2sph"
                width="100%" height="100%" className="border-0"
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Send a Message</span>
                <h2 className="text-2xl font-bold text-blue-900 mt-1">We'd love to hear from you</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 hover:scale-[1.01] transition-all duration-200 shadow-md">
                Send Message
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}