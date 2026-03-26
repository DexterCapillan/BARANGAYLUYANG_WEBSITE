// src/features/residents/residentsPage.jsx

export default function ResidentsPage() { // <--- Added "default"
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Resident Management</h1>
      {/* Your table code here */}
    </div>
  );
}
// src/features/residents/residentsPage.jsx
import { useState, useEffect } from 'react';
import { residentsApi } from './residents.api.js';

export default function ResidentsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await residentsApi.getStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Loading residents...</div>;
  }

  if (!stats) {
    return <div className="p-6 text-center text-red-500">Failed to load stats</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Residents</h1>
      <p className="text-slate-600 text-sm mb-6">
        Overview of registered residents. Last updated: {new Date(stats.updatedAt).toLocaleDateString()}
      </p>

      {/* STATS CARDS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Residents", value: stats.total, color: "from-blue-500 to-blue-600" },
          { label: "Males", value: stats.males, color: "from-cyan-500 to-cyan-600" },
          { label: "Females", value: stats.females, color: "from-pink-500 to-pink-600" },
          { label: "Adults (18+)", value: stats.adults, color: "from-green-500 to-emerald-600" },
          { label: "Children (<18)", value: stats.children, color: "from-amber-400 to-amber-600" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:-translate-y-1 transition-transform duration-200`}
          >
            <p className="text-2xl font-extrabold drop-shadow-sm">
              {stat.value?.toLocaleString() || '0'}
            </p>
            <p className="mt-1 text-xs text-center opacity-90 drop-shadow-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* GENDER LEGEND */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Gender Distribution</h2>
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
            <span className="text-slate-700">Males: {stats.males}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
            <span className="text-slate-700">Females: {stats.females}</span>
          </div>
        </div>
      </div>
    </div>
  );
}