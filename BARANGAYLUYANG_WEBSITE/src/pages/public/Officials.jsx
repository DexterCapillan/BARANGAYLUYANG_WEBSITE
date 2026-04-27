import { motion } from "framer-motion";
import official1 from "../../assets/01_L2.jpg";
import official2 from "../../assets/11_L.jpg";
import official3 from "../../assets/10_L.jpg";
import official4 from "../../assets/09_L.jpg";
import official5 from "../../assets/08_L.jpg";
import official6 from "../../assets/07_L.jpg";
import official7 from "../../assets/06_L.jpg";
import official8 from "../../assets/05_L.jpg";
import official9 from "../../assets/04_L.jpg";
import official10 from "../../assets/02_L.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Officials() {
  const officials = [
    { name: "Hon. OLIVER T. GERONIMO", role: "Punong Barangay", image: official1, featured: true },
    { name: "Hon. JERRY L. TILA", role: "Barangay Kagawad", image: official2 },
    { name: "Hon. FRANKLIN F. ALEJO", role: "Barangay Kagawad", image: official3 },
    { name: "Hon. MARVIN T. TUPIÑO", role: "Barangay Kagawad", image: official4 },
    { name: "Hon. MARILOU C. DACUMOS", role: "Barangay Kagawad", image: official5 },
    { name: "Hon. GEORGE T. CALUYA", role: "Barangay Kagawad", image: official6 },
    { name: "Hon. SANDY B. SARENO", role: "Barangay Kagawad", image: official7 },
    { name: "Hon. WILLIAM M. TOMAS", role: "Barangay Kagawad", image: official8 },
    { name: "Hon. JUSTIN PAUL D. TOMAS", role: "SK Chairperson", image: official9 },
    { name: "MERLE F. MARCOS", role: "Barangay Secretary", image: official10 },
  ];

  const [captain, ...rest] = officials;

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Your Leaders</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">Barangay Council 2026</h1>
          <p className="text-blue-200 text-lg">Meet the dedicated officials serving Barangay Luyang.</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">

        {/* CAPTAIN — FEATURED */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-center">
          <div className="group relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-sm w-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-yellow-400 text-blue-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Punong Barangay
              </span>
            </div>
            <div className="h-96 overflow-hidden">
              <motion.img
                src={captain.image} alt={captain.name}
                className="w-full h-full object-cover object-top"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/90 to-transparent p-6">
              <h3 className="font-extrabold text-white text-lg">{captain.name}</h3>
              <p className="text-yellow-400 font-semibold text-sm">{captain.role}</p>
            </div>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Council Members</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* REST OF OFFICIALS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rest.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-slate-100">
                <motion.img
                  src={person.image} alt={person.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-bold text-slate-800 text-sm leading-snug">{person.name}</h3>
                <p className="text-blue-600 font-semibold text-xs mt-1">{person.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}