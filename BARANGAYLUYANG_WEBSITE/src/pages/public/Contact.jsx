import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_nzf0jks";
const EMAILJS_TEMPLATE_ID = "template_xhjr4vm";
const EMAILJS_PUBLIC_KEY = "4qDEWLrgO9aDkNoK0";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    }

    setSending(false);
  }

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
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin className="w-5 h-5 text-blue-600" />, label: "Address", value: "Barangay Luyang Hall, Bayombong, Nueva Vizcaya", bg: "bg-blue-50" },
                { icon: <Phone className="w-5 h-5 text-green-600" />, label: "Phone", value: "+63 912 345 6789", bg: "bg-green-50" },
                { icon: <Mail className="w-5 h-5 text-yellow-600" />, label: "Email", value: "blguluyang03@gmail.com", bg: "bg-yellow-50" },
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

              {/* SUCCESS STATE */}
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center">
                  <CheckCircle className="w-14 h-14 text-emerald-500" />
                  <h3 className="text-lg font-bold text-slate-800">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} required
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} required
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                    <input
                      type="text" name="subject" value={form.subject}
                      onChange={handleChange} required
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} required
                      className="w-full p-3 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 hover:scale-[1.01] transition-all duration-200 shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}