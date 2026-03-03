// components/common/Footer.jsx
import { Link } from "react-router-dom"; // only import once at the top
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Barangay Info */}
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-4">
            Barangay Luyang
          </h3>
          <p className="text-sm leading-relaxed text-blue-200">
            Providing transparent governance, efficient public service,
            and digital innovation for every resident of the community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
            </li>
            <li>
              <Link to="/officials" className="hover:text-yellow-400 transition">Officials</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Barangay Luyang Hall, Bayombong</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>+63 912 345 6789</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span>barangayluyang@email.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 text-center py-4 text-sm text-blue-300">
        © {new Date().getFullYear()} Barangay Luyang. All Rights Reserved.
      </div>
    </footer>
  );
}