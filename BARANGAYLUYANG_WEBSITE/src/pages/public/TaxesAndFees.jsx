import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Receipt, ChevronDown, ChevronUp, Search } from "lucide-react";

export default function TaxesAndFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "taxesAndFees"), orderBy("category"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setFees(data);
      // Open all categories by default
      const open = {};
      [...new Set(data.map((f) => f.category))].forEach((c) => (open[c] = true));
      setOpenCategories(open);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleCategory = (cat) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const filtered = fees.filter(
    (f) =>
      f.nature?.toLowerCase().includes(search.toLowerCase()) ||
      f.category?.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(filtered.map((f) => f.category))];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="bg-blue-900 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold">Taxes & Fees</h1>
          </div>
          <p className="text-blue-200 text-sm">
            Various Barangay Clearances, Fees, Permits, Filing Fees and Other Charges
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto px-6 -mt-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search fees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {loading ? (
          <p className="text-center text-slate-400 py-16">Loading fees...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No fees found.</p>
        ) : (
          categories.map((cat) => {
            const items = filtered.filter((f) => f.category === cat);
            const isOpen = openCategories[cat];
            return (
              <div key={cat} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {/* CATEGORY HEADER */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                >
                  <span className="font-semibold text-sm uppercase tracking-wide">{cat}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* ITEMS */}
                {isOpen && (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nature</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => (
                        <tr
                          key={item.id}
                          className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                        >
                          <td className="px-6 py-3 text-sm text-slate-700">{item.nature}</td>
                          <td className="px-6 py-3 text-sm text-right font-semibold text-blue-900">
                            ₱{Number(item.amount).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                            {item.unit ? <span className="text-xs text-slate-400 font-normal ml-1">/ {item.unit}</span> : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })
        )}

        <p className="text-center text-xs text-slate-400 pt-4">
          For inquiries, please visit the Barangay Hall or contact the Barangay Secretary.
        </p>
      </div>
    </div>
  );
}