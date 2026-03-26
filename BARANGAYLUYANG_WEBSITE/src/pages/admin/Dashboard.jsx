// src/pages/admin/Dashboard.jsx
export default function Dashboard() {
  const stats = [
    { label: "Registered Residents", value: 1858, color: "from-blue-500 to-blue-600" },
    { label: "Clearances Issued", value: 870, color: "from-green-500 to-emerald-600" },
    { label: "Announcements", value: 32, color: "from-amber-400 to-amber-600" },
  ];

  return (
    <div>
      {/* HEADER WITHIN MAIN */}
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
      <p className="text-slate-600 text-sm mb-6">
        Welcome to the Barangay Luyang Admin Panel. Manage residents, announcements, and certificates here.
      </p>

      {/* STATS CARDS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:-translate-y-1 transition-transform duration-200`}
          >
            <p className="text-3xl font-extrabold drop-shadow-sm">
              {stat.value.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-center opacity-90 drop-shadow-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">
            Quick Actions
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Use the sidebar to manage residents, certificates, and announcements. 
            Future modules will include analytics and reporting.
          </p>
        </div>
      </div>

      {/* ACTIVITY OVERVIEW (BAR CHART) */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Weekly Activity
          </h2>

          <div className="grid grid-cols-7 gap-3">
            {[
              { label: "Mon", value: 45 },
              { label: "Tue", value: 60 },
              { label: "Wed", value: 35 },
              { label: "Thu", value: 70 },
              { label: "Fri", value: 50 },
              { label: "Sat", value: 30 },
              { label: "Sun", value: 25 },
            ].map((day, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md mb-1"
                  style={{ height: `${day.value}px`, width: "100%" }}
                />
                <span className="text-xs text-slate-500">{day.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Example weekly activity (e.g., clearances issued, announcements posted).
          </p>
        </div>
      </div>
    </div>
  );
}