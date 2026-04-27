// components/common/Footer.jsx
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100">

      {/* TOP ACCENT BAR */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">

          {/* BRANDING */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shadow-md">
                <span className="text-blue-950 font-black text-sm">BL</span>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-none">Barangay Luyang</p>
                <p className="text-blue-400 text-xs mt-0.5">Bayombong, Nueva Vizcaya</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-blue-300 mb-5">
              Transparent governance, efficient public service, and digital
              innovation for every resident of our community.
            </p>
            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-blue-950 text-blue-200 flex items-center justify-center transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-blue-950 text-blue-200 flex items-center justify-center transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-yellow-400 hover:text-blue-950 text-blue-200 flex items-center justify-center transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/officials", label: "Officials" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-blue-300 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
<div>
  <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
    Services
  </h3>
  <ul className="space-y-2.5">
    {[
      { label: "Legislation", to: "/services" },
      { label: "Health Services", to: "/health" },
      { label: "Announcements", to: "/services/announcements" },
      { label: "Resident Records", to: "/services/residents" },
    ].map(({ label, to }) => (
      <li key={label}>
        <Link
          to={to}
          className="text-sm text-blue-300 hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
        >
          <span className="w-1 h-1 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          {label}
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-400 mb-0.5">Address</p>
                  <p className="text-sm text-blue-200">Barangay Luyang Hall, Bayombong, Nueva Vizcaya</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-400 mb-0.5">Phone</p>
                  <p className="text-sm text-blue-200">+63 912 345 6789</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-400 mb-0.5">Email</p>
                  <p className="text-sm text-blue-200">blguluyang03@email.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-blue-400">
            © {new Date().getFullYear()} Barangay Luyang. All Rights Reserved.
          </p>
          <p className="text-xs text-blue-500">
            Powered by the Barangay Luyang Digital Team
          </p>
        </div>
      </div>

    </footer>
  );
}