// src/pages/admin/Dashboard.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const stats = [
  {
    label: "Registered residents",
    value: 1858,
    badge: "Residents",
    badgeClass: "bg-blue-100 text-blue-800",
  },
  {
    label: "Clearances issued",
    value: 870,
    badge: "Clearances",
    badgeClass: "bg-green-100 text-green-800",
  },
  {
    label: "Announcements",
    value: 32,
    badge: "Notices",
    badgeClass: "bg-amber-100 text-amber-800",
  },
];

const weeklyData = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 60 },
  { label: "Wed", value: 35 },
  { label: "Thu", value: 70 },
  { label: "Fri", value: 50 },
  { label: "Sat", value: 30 },
  { label: "Sun", value: 25 },
];

const quickActions = [
  { label: "Add resident", path: "/admin/residents" },
  { label: "Issue clearance", path: "/admin/clearances/new" },
  { label: "Post announcement", path: "/admin/announcements" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: weeklyData.map((d) => d.label),
        datasets: [
          {
            label: "Activity",
            data: weeklyData.map((d) => d.value),
            backgroundColor: "#378ADD",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 12 }, color: "#888780" },
          },
          y: {
            grid: { color: "rgba(136,135,128,0.15)" },
            ticks: { font: { size: 12 }, color: "#888780", stepSize: 20 },
            min: 0,
            max: 80,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-800">Admin dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome to the Barangay Luyang admin panel. Manage residents,
          announcements, and certificates here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-medium text-slate-800">
              {stat.value.toLocaleString()}
            </p>
            <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded ${stat.badgeClass}`}>
              {stat.badge}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-medium text-slate-800 mb-1">
          Quick actions
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Use the sidebar to manage residents, certificates, and announcements.
          Future modules will include analytics and reporting.
        </p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="text-sm px-4 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-medium text-slate-800 mb-1">
          Weekly activity
        </h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
          <span className="text-xs text-slate-500">
            Clearances &amp; announcements
          </span>
        </div>
        <div className="relative h-48">
          <canvas
            ref={chartRef}
            role="img"
            aria-label="Bar chart of weekly activity from Monday to Sunday."
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Example weekly activity — clearances issued and announcements posted.
        </p>
      </div>
    </div>
  );
}
