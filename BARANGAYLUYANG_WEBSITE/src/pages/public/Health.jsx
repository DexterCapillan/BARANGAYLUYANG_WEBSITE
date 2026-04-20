// src/pages/public/Health.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Calendar, BookOpen, Clock, MapPin, Users, X, ChevronRight } from "lucide-react";
import { useHealth } from "../../context/useHealth";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Health() {
  const { posts, schedules, programs } = useHealth();
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-4 rounded-2xl">
              <HeartPulse className="w-10 h-10 text-white" />
            </div>
          </div>
          <span className="text-xs font-semibold text-green-200 uppercase tracking-widest">Barangay Luyang</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Health Services</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Stay updated with health announcements, clinic schedules, and community programs from the Barangay Health Center.
          </p>
        </motion.div>
      </section>

      {/* ANNOUNCEMENT MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <div className="absolute inset-0 bg-green-950 bg-opacity-60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-green-800 to-emerald-600 px-6 pt-6 pb-8 relative">
                <button onClick={() => setSelectedPost(null)} className="absolute top-4 right-4 text-green-200 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="w-4 h-4 text-green-200" />
                  <span className="text-xs font-semibold text-green-200 uppercase tracking-widest">Health Announcement</span>
                </div>
                <h2 className="text-xl font-bold text-white leading-snug pr-6">{selectedPost.title}</h2>
                <p className="text-green-200 text-sm mt-2">{selectedPost.date}</p>
              </div>
              <div className="px-6 py-5">
                <p className="text-slate-600 text-sm leading-relaxed">{selectedPost.content}</p>
              </div>
              <div className="px-6 pb-5">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANNOUNCEMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <HeartPulse className="w-5 h-5 text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Health Announcements</h2>
          </div>
          <p className="text-slate-500 text-sm ml-12">Latest news and updates from the Barangay Health Center.</p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-slate-400 text-sm ml-12">No announcements at the moment.</p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                onClick={() => setSelectedPost(post)}
                className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-green-600 to-emerald-400" />
                <div className="p-5">
                  <p className="text-xs text-slate-400 mb-2">{post.date}</p>
                  <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-green-700 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.content}</p>
                  <div className="flex items-center gap-1 text-green-700 text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>Read more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* SCHEDULES SECTION */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Clinic Schedules</h2>
            </div>
            <p className="text-slate-500 text-sm ml-12">Upcoming health activities and clinic hours.</p>
          </motion.div>

          {schedules.length === 0 ? (
            <p className="text-slate-400 text-sm ml-12">No schedules posted yet.</p>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"
              variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {schedules.map((s) => (
                <motion.div
                  key={s.id} variants={cardVariants}
                  className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-slate-800 mb-3">{s.title}</h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{s.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{s.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{s.location}</span>
                    </div>
                    {s.note && (
                      <p className="text-xs text-slate-400 italic mt-2 pt-2 border-t border-slate-100">{s.note}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Health Programs</h2>
          </div>
          <p className="text-slate-500 text-sm ml-12">Community health programs available to Barangay Luyang residents.</p>
        </motion.div>

        {programs.length === 0 ? (
          <p className="text-slate-400 text-sm ml-12">No programs listed yet.</p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {programs.map((pg) => (
              <motion.div
                key={pg.id} variants={cardVariants}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-slate-800 leading-snug">{pg.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {pg.targetGroup}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{pg.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

    </div>
  );
}