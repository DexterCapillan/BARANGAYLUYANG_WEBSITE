// src/features/residents/residentsPage.jsx
import { useState } from "react";
import { useResidents } from "../../context/useResidents";

export default function ResidentsPage() {
  const { residents, stats, addResident, deleteResident, updateStats } = useResidents();

  // editing state
  const [editing, setEditing] = useState(false);
  const [editVals, setEditVals] = useState({ males: stats.males, females: stats.females, children: stats.children });

  // add resident form
  const [name, setName] = useState("");
  const [purok, setPurok] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleSaveStats() {
    updateStats({
      males: Number(editVals.males),
      females: Number(editVals.females),
      children: Number(editVals.children),
    });
    setEditing(false);
  }

  function handleAdd(e) {
    e.preventDefault();
    addResident({ name, purok });
    setName("");
    setPurok("");
    setShowForm(false);
  }

  const statCards = [
    { label: "Total Residents", value: stats.total, color: "from-blue-500 to-blue-600", key: null },
    { label: "Males", value: stats.males, color: "from-cyan-500 to-cyan-600", key: "males" },
    { label: "Females", value: stats.females, color: "from-pink-500 to-pink-600", key: "females" },
    { label: "Adults (18+)", value: stats.adults, color: "from-green-500 to-emerald-600", key: null },
    { label: "Children (<18)", value: stats.children, color: "from-amber-400 to-amber-600", key: "children" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-slate-800">Residents</h1>
          <p className="mt-1 text-sm text-slate-500">
            Last updated: {new Date(stats.updatedAt).toLocaleDateString()}
          </p>
        </div>
        {!editing ? (
          <button
            onClick={() => { setEditing(true); setEditVals({ males: stats.males, females: stats.females, children: stats.children }); }}
            className="text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Edit Stats
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveStats}
              className="text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
          >
            {editing && stat.key ? (
              <input
                type="number"
                value={editVals[stat.key]}
                onChange={(e) => setEditVals((prev) => ({ ...prev, [stat.key]: e.target.value }))}
                className="w-full text-2xl font-extrabold bg-white/20 rounded-lg px-2 py-1 text-white placeholder-white/70 outline-none"
              />
            ) : (
              <p className="text-2xl font-extrabold">{stat.value?.toLocaleString() || "0"}</p>
            )}
            <p className="mt-1 text-xs opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ADD RESIDENT */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium text-slate-800">Resident List</h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {showForm ? "Cancel" : "+ Add Resident"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 border border-slate-200 rounded-lg text-sm"
              required
            />
            <input
              type="text"
              placeholder="Purok"
              value={purok}
              onChange={(e) => setPurok(e.target.value)}
              className="flex-1 p-3 border border-slate-200 rounded-lg text-sm"
              required
            />
            <button
              type="submit"
              className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
            >
              Add
            </button>
          </form>
        )}

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700 text-sm">Name</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Purok</th>
                <th className="p-4 font-semibold text-slate-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {residents.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-sm text-slate-400 text-center">No residents yet.</td>
                </tr>
              )}
              {residents.map((res) => (
                <tr key={res.id} className="border-b border-slate-100 hover:bg-blue-50/30">
                  <td className="p-4 text-sm">{res.name}</td>
                  <td className="p-4 text-sm">{res.purok}</td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteResident(res.id)}
                      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}