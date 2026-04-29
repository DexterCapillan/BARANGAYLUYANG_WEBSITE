import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection, onSnapshot, query, orderBy,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { Receipt, Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Barangay Clearances",
  "Certifications",
  "Filing Fees",
  "Business Clearance",
  "Rental Barangay Facilities/Equipment",
  "Used of Covered Court by Private",
  "Garbage Fees",
  "Other Fees",
];

const EMPTY_FORM = { category: CATEGORIES[0], nature: "", amount: "", unit: "" };

export default function AdminTaxesAndFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "taxesAndFees"), orderBy("category"));
    const unsub = onSnapshot(q, (snap) => {
      setFees(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEdit(fee) {
    setEditId(fee.id);
    setForm({ category: fee.category, nature: fee.nature, amount: fee.amount, unit: fee.unit || "" });
    setShowForm(true);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        category: form.category,
        nature: form.nature,
        amount: parseFloat(form.amount),
        unit: form.unit,
        updatedAt: serverTimestamp(),
      };
      if (editId) {
        await updateDoc(doc(db, "taxesAndFees", editId), payload);
      } else {
        await addDoc(collection(db, "taxesAndFees"), { ...payload, createdAt: serverTimestamp() });
      }
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, "taxesAndFees", id));
    setConfirmDelete(null);
  }

  const categories = ["All", ...CATEGORIES];
  const filtered = activeCategory === "All"
    ? fees
    : fees.filter((f) => f.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-blue-600" /> Taxes & Fees
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage barangay fees and charges.</p>
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setEditId(null); setForm(EMPTY_FORM); }}
          className="flex items-center gap-2 text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Fee"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            {editId ? "Edit Fee" : "Add New Fee"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Category *</label>
                <select
                  name="category" value={form.category} onChange={handleChange} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Nature / Description *</label>
                <input
                  name="nature" value={form.nature} onChange={handleChange} required
                  placeholder="e.g. For Scholarship"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Amount (₱) *</label>
                <input
                  name="amount" type="number" value={form.amount} onChange={handleChange} required
                  placeholder="e.g. 100"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Unit (optional)</label>
                <input
                  name="unit" value={form.unit} onChange={handleChange}
                  placeholder="e.g. day, cropping, loading"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={resetForm}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> Save</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CATEGORY FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
            <span className="ml-1 opacity-70">
              ({cat === "All" ? fees.length : fees.filter((f) => f.category === cat).length})
            </span>
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center text-slate-400 py-16">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No fees yet. Click "Add Fee" to start.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nature</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fee, i) => (
                <tr key={fee.id} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                  <td className="px-6 py-3 text-xs text-slate-500">{fee.category}</td>
                  <td className="px-6 py-3 text-sm text-slate-700">{fee.nature}</td>
                  <td className="px-6 py-3 text-sm text-right font-semibold text-blue-900">
                    ₱{Number(fee.amount).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    {fee.unit ? <span className="text-xs text-slate-400 font-normal ml-1">/ {fee.unit}</span> : ""}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(fee)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {confirmDelete === fee.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(fee.id)}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                            Confirm
                          </button>
                          <button onClick={() => setConfirmDelete(null)}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-200">
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(fee.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}