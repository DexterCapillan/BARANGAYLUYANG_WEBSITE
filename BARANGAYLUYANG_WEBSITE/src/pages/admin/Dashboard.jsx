// src/pages/admin/Dashboard.jsx
export default function Dashboard() {
  const stats = [
    { label: "Registered Residents", value: 1858, color: "bg-blue-600" },
    { label: "Clearances Issued", value: 870, color: "bg-green-600" },
    { label: "Announcements", value: 32, color: "bg-yellow-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Admin Dashboard
      </h1>
      <p className="text-slate-700 mb-8">
        Welcome to the Barangay Luyang Admin Panel. Manage residents, announcements, and certificates here.
      </p>

      {/* STATS CARDS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl shadow-md flex flex-col items-center justify-center ${stat.color} text-white`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="mt-2 text-center">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* PLACEHOLDER SECTION */}
      <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Quick Actions
        </h2>
        <p className="text-slate-700">
          Use the sidebar to manage residents, certificates, and announcements. Future modules will include analytics and reporting.
        </p>
      </div>
    </div>
  );
}