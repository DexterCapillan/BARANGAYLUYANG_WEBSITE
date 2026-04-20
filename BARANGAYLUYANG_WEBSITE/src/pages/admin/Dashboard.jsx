// src/pages/admin/Dashboard.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useResidents } from "../../context/useResidents";
import { useAnnouncements } from "../../context/useAnnouncements";
import { useHealth } from "../../context/useHealth";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const quickActions = [
  { label: "Add resident", path: "/admin/residents" },
  { label: "Post announcement", path: "/admin/announcements" },
  { label: "Health services", path: "/admin/health" },
];

function getWeekCounts(items) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const counts = Array(7).fill(0);
  items.forEach((item) => {
    let date = null;
    if (item.createdAt?.toDate) {
      date = item.createdAt.toDate();
    } else if (item.createdAt) {
      date = new Date(item.createdAt);
    }
    if (!date) return;
    if (date >= startOfWeek && date <= today) {
      counts[date.getDay()]++;
    }
  });
  return counts;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { residents } = useResidents();
  const { announcements } = useAnnouncements();
  const { posts } = useHealth();

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const resCounts = getWeekCounts(residents);
  const annCounts = getWeekCounts(announcements);
  const healthCounts = getWeekCounts(posts);
  const weeklyActivity = DAY_LABELS.map((_, i) => resCounts[i] + annCounts[i] + healthCounts[i]);
  const maxY = Math.max(10, Math.ceil(Math.max(...weeklyActivity) / 5) * 5 + 5);

  const stats = [
    {
      label: "Registered residents",
      value: residents.length,
      badge: "Residents",
      badgeClass: "bg-blue-100 text-blue-800",
    },
    {
      label: "Announcements",
      value: announcements.length,
      badge: "Notices",
      badgeClass: "bg-amber-100 text-amber-800",
    },
    {
      label: "Health posts",
      value: posts.length,
      badge: "Health",
      badgeClass: "bg-green-100 text-green-800",
    },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: DAY_LABELS,
        datasets: [
          {
            label: "Activity",
            data: weeklyActivity,
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
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y} activities`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 12 }, color: "#888780" },
          },
          y: {
            grid: { color: "rgba(136,135,128,0.15)" },
            ticks: { font: { size: 12 }, color: "#888780", stepSize: 1 },
            min: 0,
            max: maxY,
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [weeklyActivity.join(",")]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-800">Admin dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome to the Barangay Luyang admin panel. Manage residents,
          announcements, and health services here.
        </p>
      </div>

      {/* STAT CARDS */}
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

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-medium text-slate-800 mb-1">
          Quick actions
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Use the sidebar to manage residents, announcements, and health services.
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

      {/* WEEKLY ACTIVITY CHART */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-medium text-slate-800 mb-1">
          Weekly activity
        </h2>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
            <span className="text-xs text-slate-500">Residents added + announcements posted + health posts</span>
          </div>
        </div>
        <div className="relative h-48">
          <canvas
            ref={chartRef}
            role="img"
            aria-label="Bar chart of weekly activity from Sunday to Saturday."
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Live weekly activity — updates automatically when data is added.
        </p>
      </div>
    </div>
  );
}