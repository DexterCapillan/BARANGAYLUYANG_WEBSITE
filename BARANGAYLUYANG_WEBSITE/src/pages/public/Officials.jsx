// src/pages/public/Officials.jsx
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

export default function Officials() {

  const officials = [
    { name: "Hon. OLIVER T. GERONIMO", role: "Punong Barangay", image: official1 },
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

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">

      {/* Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-900 mb-12 text-center underline decoration-yellow-500"
      >
        Barangay Council 2026
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {officials.map((person, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition"
          >

            <div className="h-80 bg-slate-100 overflow-hidden">

              <motion.img
                src={person.image}
                alt={person.name}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

            </div>

            <div className="p-6 text-center">
              <h3 className="font-bold text-xl text-slate-800">
                {person.name}
              </h3>
              <p className="text-blue-600 font-medium">{person.role}</p>
            </div>

          </motion.div>

        ))}
      </div>
    </div>
  );
}