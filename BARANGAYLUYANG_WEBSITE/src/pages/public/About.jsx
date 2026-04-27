import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CheckCircle, Leaf, Shield, Clock, Wifi,
  MapPin, Users, Zap, Droplets, Car, Heart,
  FileText, BarChart2, DollarSign, BookOpen
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const services = [
  { title: "Online Barangay Clearance", data: ["Requirements: Valid ID", "Processing Time: 10–15 minutes", "Fee: ₱50"], icon: "📄" },
  { title: "Resident Information System", data: ["Population: 1,858", "Digital resident records available"], icon: "👥" },
  { title: "Health & Community Announcements", data: ["Free checkup schedules", "Vaccination announcements"], icon: "🏥" },
  { title: "Katarungang Pambarangay Records", data: ["Mediation records", "Settlement reports"], icon: "⚖️" },
  { title: "Reports on Collection (ROCAD)", data: ["Monthly collection reports", "Financial transparency records"], icon: "📊" },
  { title: "Secure Admin Access", data: ["Barangay staff login", "System management dashboard"], icon: "🔐" },
];

const puroks = [
  { name: "Purok I", title: "Raniag", desc: "Meaning 'light' — the first purok of Barangay Luyang." },
  { name: "Purok II", title: "Rang-ay", desc: "Meaning 'wellness' — the heart of the barangay community." },
  { name: "Purok III", title: "Namnama", desc: "Meaning 'hope' — representing the future of Barangay Luyang." },
];

const boundaries = [
  { direction: "North", place: "La Torre North & La Torre South" },
  { direction: "South", place: "Don Mariano Perez" },
  { direction: "East", place: "San Nicolas" },
  { direction: "West", place: "Bonfal West" },
];

const timeline = [
  { year: "Early Times", title: "First Settlers Arrive", desc: "A group of Ilocanos from Piddig, Ilocos Norte traveled in a caravan and settled in the area, attracted by the fertile soil and abundant food sources." },
  { year: "Settlement Era", title: "Permanent Community Forms", desc: "The settlers cleared the area, built their huts, and began planting root crops. More families migrated after hearing of the ideal farming conditions." },
  { year: "Name Origin", title: "The Name 'Luyang'", desc: "The name was derived from the Ilocano word 'Luyong' meaning 'das-das' — a place travelers passed through on their journey to permanent settlement. The letter 'o' was later changed to 'a', forming 'Luyang'." },
  { year: "1981", title: "Official Barangay Creation", desc: "Pursuant to Presidential Decree No. 86, Barangay Luyang was officially created and recognized as a legal barangay unit." },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white pt-24">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24 px-6 text-white overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 10 }} className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Who We Are</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-3 mb-6 leading-tight">
            About Barangay <span className="text-yellow-400">Luyang</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Committed to transparent governance, efficient public service, and digital innovation for the betterment of every resident.
          </p>
        </motion.div>
      </section>

      {/* BARANGAY PROFILE */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Official Data</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Barangay Profile</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* POLITICAL INFO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-blue-100 p-2 rounded-lg"><FileText className="w-5 h-5 text-blue-700" /></div>
                <h3 className="font-bold text-slate-800">Political Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Legal Basis of Creation", value: "Presidential Decree No. 86" },
                  { label: "Date of Ratification", value: "1981" },
                  { label: "No. of Registered Voters", value: "720" },
                  { label: "No. of Precincts", value: "3" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* PHYSICAL INFO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-100 p-2 rounded-lg"><MapPin className="w-5 h-5 text-green-700" /></div>
                <h3 className="font-bold text-slate-800">Physical Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Land Area", value: "177 hectares" },
                  { label: "Residential Area", value: "20 hectares" },
                  { label: "Agricultural Area", value: "157 hectares" },
                  { label: "Classification", value: "Agricultural / Rural" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DEMOGRAPHIC INFO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-purple-100 p-2 rounded-lg"><Users className="w-5 h-5 text-purple-700" /></div>
                <h3 className="font-bold text-slate-800">Demographic Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Population", value: "1,858" },
                  { label: "Male", value: "933" },
                  { label: "Female", value: "925" },
                  { label: "Number of Families", value: "530" },
                  { label: "Number of Households", value: "530" },
                  { label: "Labor Force", value: "650" },
                  { label: "Unemployed", value: "145" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FISCAL INFO */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-yellow-100 p-2 rounded-lg"><DollarSign className="w-5 h-5 text-yellow-700" /></div>
                <h3 className="font-bold text-slate-800">Fiscal Information</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Income", value: "₱3,519,373.00" },
                  { label: "Internal Revenue Allotment", value: "₱3,137,373.00" },
                  { label: "RPT Share", value: "₱90,000.00" },
                  { label: "Fees & Charges", value: "₱290,000.00" },
                  { label: "Others", value: "₱2,000.00" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ECONOMIC ACTIVITY */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-emerald-100 p-2 rounded-lg"><BarChart2 className="w-5 h-5 text-emerald-700" /></div>
                <h3 className="font-bold text-slate-800">Major Economic Activity</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Farming", value: "80%", width: "80%" },
                  { label: "Employed", value: "15%", width: "15%" },
                  { label: "Business", value: "5%", width: "5%" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-semibold text-slate-800">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BASIC UTILITIES */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-sky-100 p-2 rounded-lg"><Zap className="w-5 h-5 text-sky-700" /></div>
                <h3 className="font-bold text-slate-800">Basic Utilities & Services</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Power Supply</p>
                    <p className="text-xs text-slate-500">NUVELCO — 530 families with electricity access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Water Supply</p>
                    <p className="text-xs text-slate-500">530 families with access to potable water (Level 3)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Transportation</p>
                    <p className="text-xs text-slate-500">Tricycles, private vehicles, motorcycles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wifi className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Communication</p>
                    <p className="text-xs text-slate-500">Telephones and mobile phones</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RELIGIOUS AFFILIATIONS */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-rose-100 p-2 rounded-lg"><BookOpen className="w-5 h-5 text-rose-700" /></div>
              <h3 className="font-bold text-slate-800">Religious Affiliations</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Roman Catholic", value: "70%" },
                { label: "Iglesia ni Cristo", value: "5%" },
                { label: "Protestants", value: "5%" },
                { label: "Baptist", value: "5%" },
              ].map((item, i) => (
                <div key={i} className="text-center bg-slate-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-blue-900">{item.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HEALTH DATA */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-red-100 p-2 rounded-lg"><Heart className="w-5 h-5 text-red-600" /></div>
              <h3 className="font-bold text-slate-800">Health Information</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-slate-500 font-medium">Indicator</th>
                    <th className="text-center py-2 text-slate-500 font-medium">2023</th>
                    <th className="text-center py-2 text-slate-500 font-medium">2024</th>
                    <th className="text-left py-2 text-slate-500 font-medium">Leading Causes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { indicator: "Morbidity", y2023: 5, y2024: 11, causes: "Hypertension, Acute Respiratory Infection, Old Age" },
                    { indicator: "Mortality", y2023: 5, y2024: 11, causes: "Hypertension, Myocardial Infarction, Diabetes" },
                    { indicator: "Infant Mortality", y2023: 0, y2024: 0, causes: "None recorded" },
                    { indicator: "Maternal Mortality", y2023: 0, y2024: 0, causes: "None recorded" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 font-medium text-slate-700">{row.indicator}</td>
                      <td className="py-3 text-center text-slate-600">{row.y2023}</td>
                      <td className="py-3 text-center">
                        <span className={`font-semibold ${row.y2024 > row.y2023 ? "text-red-500" : "text-green-600"}`}>
                          {row.y2024}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 text-xs">{row.causes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>
      </section>

      {/* HISTORY SECTION */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 py-24 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Our Roots</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">History of Barangay Luyang</h2>
            <p className="text-blue-200 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
              Barangay Luyang is known by its neighboring barangays and throughout the Province of Nueva Vizcaya as a community built on resilience, unity, and rich cultural heritage.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/20 md:-translate-x-px" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-yellow-400 border-2 border-blue-900 -translate-x-1 md:-translate-x-1.5 mt-1.5" />
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block bg-yellow-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-2">{item.year}</span>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & PUROKS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Geography</span>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Location & Puroks</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg"><MapPin className="w-5 h-5 text-blue-700" /></div>
              <h3 className="text-lg font-bold text-slate-800">Boundaries</h3>
            </div>
            <div className="space-y-3">
              {boundaries.map((b, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-semibold text-blue-700 w-16">{b.direction}</span>
                  <span className="text-sm text-slate-600 text-right">{b.place}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-4">
            {puroks.map((p, i) => (
              <motion.div key={i} variants={cardVariants} className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex items-start gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex-shrink-0">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{p.name}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-sm font-bold text-slate-800">{p.title}</span>
                  </div>
                  <p className="text-sm text-slate-500">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2">Mission & Vision</h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={cardVariants} className="relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-700 rounded-l-2xl" />
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Mission</h2>
              <p className="text-slate-600 leading-relaxed">To encourage all Barangay Officials and members, serve as a model or example to the next generation as good leaders to them.</p>
            </motion.div>
            <motion.div variants={cardVariants} className="relative bg-white p-10 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-l-2xl" />
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Vision</h2>
              <p className="text-slate-600 leading-relaxed">Barangay Luyang, main producer of quality agricultural products in Bayombong, committed to living in a peaceful, safe and progressive community, governed by active, self-reliant, responsible and participative citizenry.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    {/* DIGITAL SERVICES */}
<section className="max-w-6xl mx-auto px-6 py-24">
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
    <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">What We Offer</span>
    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-2 mb-4">Digital Barangay Services</h2>
    <p className="text-slate-500 max-w-xl mx-auto mb-8">
      Barangay Luyang offers a range of digital services for every resident — from health updates and legislation to announcements and the Citizens Charter.
    </p>
    <Link
      to="/services"
      className="inline-flex items-center gap-2 bg-blue-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-800 hover:scale-105 transition duration-300 shadow-lg"
    >
      View All Services <ArrowRight className="w-5 h-5" />
    </Link>
  </motion.div>
</section>
      {/* TRANSPARENCY BANNER */}
      <section className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 py-20 px-6 text-white overflow-hidden">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="absolute -right-20 -bottom-20 w-72 h-72 border-4 border-yellow-400/10 rounded-full" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Our Commitment</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Transparency & Accountability</h2>
          <p className="text-blue-200 leading-relaxed text-lg">Our digital platform ensures organized records, accessible financial reports, and streamlined services — promoting open governance and public trust.</p>
        </motion.div>
      </section>

      {/* SERVICE MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selected.icon}</span>
                  <h3 className="text-white font-bold text-lg">{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="text-blue-200 hover:text-white transition"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-3">
                {selected.data.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                    <p className="text-slate-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button onClick={() => setSelected(null)} className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}