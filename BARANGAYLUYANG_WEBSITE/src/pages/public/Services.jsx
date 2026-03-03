import { FileText, HeartPulse, Megaphone, Users } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Barangay Clearance",
    desc: "Request barangay clearance and certificates online. Fast and secure process for residents. You can track the status of your requests here.",
    icon: <FileText className="w-8 h-8 text-blue-700" />,
    linkText: "Apply Now",
    linkTo: "/services/clearance"
  },
  {
    title: "Health Services",
    desc: "Check schedules, announcements, and programs at the Barangay Health Center. Stay updated with medical outreach, vaccinations, and health programs.",
    icon: <HeartPulse className="w-8 h-8 text-green-600" />,
    linkText: "View Details",
    linkTo: "/services/health"
  },
  {
    title: "Announcements",
    desc: "Stay updated with barangay news, events, and community notices. We ensure residents are informed about all local activities.",
    icon: <Megaphone className="w-8 h-8 text-yellow-500" />,
    linkText: "See Updates",
    linkTo: "/services/announcements"
  },
  {
    title: "Resident Records",
    desc: "Manage and view resident information efficiently through the digital system. Only authorized personnel can access sensitive data.",
    icon: <Users className="w-8 h-8 text-purple-600" />,
    linkText: "View Records",
    linkTo: "/services/residents"
  }
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">

      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center">
        Our Services
      </h1>
      <p className="text-center text-slate-600 max-w-2xl mx-auto">
        We provide digital access to barangay services, making it easier for residents to request clearances, check health programs, view announcements, and manage records securely.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl bg-white hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
            <p className="text-slate-600 mb-4">{service.desc}</p>
            <Link
              to={service.linkTo}
              className="inline-flex items-center text-blue-700 font-medium hover:underline"
            >
              {service.linkText} →
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}