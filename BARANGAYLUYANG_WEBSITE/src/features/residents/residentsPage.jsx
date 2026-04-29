import { useState, useRef } from "react";
import { useResidents } from "../../context/useResidents";
import * as XLSX from "xlsx";
import {
  Users, Upload, Plus, X, Search, Trash2,
  ChevronLeft, ChevronRight, FileSpreadsheet, Filter
} from "lucide-react";

const EMPTY_FORM = {
  idNo: "", lastName: "", firstName: "", middleInitial: "",
  householdId: "", householdRole: "", ext: "", no: "",
  streetName: "", purok: "", placeOfBirth: "", birthDate: "",
  age: "", sex: "", civilStatus: "", citizenship: "", occupation: "",
};

const PAGE_SIZE = 20;

// Calculate real current age from birthDate string
function getAge(birthDate) {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  if (isNaN(birth)) return null;
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (today.getDate() < birth.getDate()) months--;
  if (years === 0) return { years: 0, months: ((today.getMonth() - birth.getMonth() + 12) % 12) };
  return { years, months: 0 };
}

function displayAge(birthDate, fallbackAge) {
  const age = getAge(birthDate);
  if (!age) return fallbackAge || "—";
  if (age.years === 0) return `${age.months}mo`;
  return `${age.years}`;
}

function getAgeYears(birthDate, fallbackAge) {
  const age = getAge(birthDate);
  if (!age) return parseInt(fallbackAge) ?? null;
  return age.years;
}

function getAgeMonths(birthDate) {
  const age = getAge(birthDate);
  if (!age) return null;
  if (age.years > 0) return null;
  return age.months;
}

export default function ResidentsPage() {
  const { residents, stats, addResident, deleteResident, updateStats } = useResidents();

  const [search, setSearch] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [infantsOnly, setInfantsOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [importing, setImporting] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingStats, setEditingStats] = useState(false);
  const fileRef = useRef();

  // --- FILTER LOGIC ---
  const filtered = residents.filter((r) => {
    const full = `${r.firstName} ${r.lastName}`.toLowerCase();
    const matchesName = full.includes(search.toLowerCase());

    if (infantsOnly) {
      const months = getAgeMonths(r.birthDate);
      const years = getAgeYears(r.birthDate, r.age);
      return matchesName && (months !== null || years === 0);
    }

    const years = getAgeYears(r.birthDate, r.age);
    const min = minAge !== "" ? parseInt(minAge) : null;
    const max = maxAge !== "" ? parseInt(maxAge) : null;

    let matchesAge = true;
    if (min !== null && max !== null) {
      matchesAge = years !== null && years >= min && years <= max;
    } else if (min !== null) {
      matchesAge = years !== null && years >= min;
    } else if (max !== null) {
      matchesAge = years !== null && years <= max;
    }

    return matchesName && matchesAge;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isFiltered = infantsOnly || minAge !== "" || maxAge !== "";

  function resetFilters() {
    setMinAge("");
    setMaxAge("");
    setInfantsOnly(false);
    setPage(1);
  }

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddResident(e) {
    e.preventDefault();
    await addResident(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: "", range: 1 });
      const mapped = rows.map((row) => ({
        idNo: row["Id No"] ?? row["ID No"] ?? "",
        lastName: row["Last Name"] ?? "",
        firstName: row["First Name"] ?? "",
        middleInitial: row["Middle Initial"] ?? "",
        householdId: row["Household Id"] ?? "",
        householdRole: row["Household Role"] ?? "",
        ext: row["Ext"] ?? "",
        no: row["No"] ?? "",
        streetName: row["Street Name"] ?? "",
        purok: row["Name of Subdivision/Zone/ SMO/Purok"] ?? row["Purok"] ?? "",
        placeOfBirth: row["Place of Birth"] ?? "",
        birthDate: row["Birth Date"] ?? "",
        age: row["Age"] ?? "",
        sex: row["Sex"] ?? "",
        civilStatus: row["Civil Status"] ?? "",
        citizenship: row["Citizenship"] ?? "",
        occupation: row["Occupation"] ?? "",
      }));
      setImportPreview(mapped);
      setShowImportModal(true);
    };
    reader.readAsBinaryString(file);
    e.target.value = "";
  }

  async function handleConfirmImport() {
    setImporting(true);
    for (const resident of importPreview) {
      await addResident(resident);
    }
    setImporting(false);
    setShowImportModal(false);
    setImportPreview([]);
  }

  function handleExport(data, filename) {
    const exportData = data.map((r) => ({
      "Id No": r.idNo,
      "Last Name": r.lastName,
      "First Name": r.firstName,
      "Middle Initial": r.middleInitial,
      "Household Id": r.householdId,
      "Household Role": r.householdRole,
      "Ext": r.ext,
      "No": r.no,
      "Street Name": r.streetName,
      "Purok/Zone": r.purok,
      "Place of Birth": r.placeOfBirth,
      "Birth Date": r.birthDate,
      "Age (Calculated)": displayAge(r.birthDate, r.age),
      "Sex": r.sex,
      "Civil Status": r.civilStatus,
      "Citizenship": r.citizenship,
      "Occupation": r.occupation,
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Residents");
    XLSX.writeFile(wb, filename);
  }

  function getExportFilename() {
    if (infantsOnly) return "residents_0_to_11_months.xlsx";
    if (minAge !== "" && maxAge !== "") return `residents_age_${minAge}_to_${maxAge}.xlsx`;
    if (minAge !== "") return `residents_age_${minAge}_and_above.xlsx`;
    if (maxAge !== "") return `residents_age_0_to_${maxAge}.xlsx`;
    return "all_residents.xlsx";
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> Residents
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {residents.length.toLocaleString()} total residents registered
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />
          <button
            onClick={() => handleExport(filtered, getExportFilename())}
            className="flex items-center gap-2 text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            {isFiltered ? `Export (${filtered.length})` : "Export All"}
          </button>
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            Import Excel
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : "Add Resident"}
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-blue-600 rounded-xl p-4 text-white shadow">
          <p className="text-2xl font-extrabold">{stats.total?.toLocaleString() ?? 0}</p>
          <p className="text-xs opacity-80 mt-0.5">Total</p>
        </div>
        <div className="bg-cyan-500 rounded-xl p-4 text-white shadow">
          <p className="text-2xl font-extrabold">{stats.males?.toLocaleString() ?? 0}</p>
          <p className="text-xs opacity-80 mt-0.5">Males</p>
          {editingStats && (
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateStats({ males: Math.max(0, stats.males - 1) })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">−</button>
              <button onClick={() => updateStats({ males: stats.males + 1 })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">+</button>
            </div>
          )}
        </div>
        <div className="bg-pink-500 rounded-xl p-4 text-white shadow">
          <p className="text-2xl font-extrabold">{stats.females?.toLocaleString() ?? 0}</p>
          <p className="text-xs opacity-80 mt-0.5">Females</p>
          {editingStats && (
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateStats({ females: Math.max(0, stats.females - 1) })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">−</button>
              <button onClick={() => updateStats({ females: stats.females + 1 })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">+</button>
            </div>
          )}
        </div>
        <div className="bg-emerald-500 rounded-xl p-4 text-white shadow">
          <p className="text-2xl font-extrabold">{stats.adults?.toLocaleString() ?? 0}</p>
          <p className="text-xs opacity-80 mt-0.5">Adults</p>
        </div>
        <div className="bg-amber-500 rounded-xl p-4 text-white shadow">
          <p className="text-2xl font-extrabold">{stats.children?.toLocaleString() ?? 0}</p>
          <p className="text-xs opacity-80 mt-0.5">Children</p>
          {editingStats && (
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateStats({ children: Math.max(0, stats.children - 1) })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">−</button>
              <button onClick={() => updateStats({ children: stats.children + 1 })} className="bg-white/20 hover:bg-white/30 rounded px-2 py-0.5 text-sm font-bold">+</button>
            </div>
          )}
        </div>
      </div>

      {/* EDIT STATS TOGGLE */}
      <div className="flex justify-end -mt-3">
        <button onClick={() => setEditingStats((v) => !v)} className="text-xs text-slate-400 hover:text-slate-600 underline">
          {editingStats ? "Done editing stats" : "Edit stats manually"}
        </button>
      </div>

      {/* AGE FILTER */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">Filter by Age</span>
            {isFiltered && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {isFiltered && (
            <button onClick={resetFilters} className="text-xs text-red-500 hover:text-red-700 underline">
              Clear filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Min age (years)</label>
            <input
              type="number" min="0" max="150"
              value={minAge}
              onChange={(e) => { setMinAge(e.target.value); setInfantsOnly(false); setPage(1); }}
              placeholder="e.g. 1"
              className="w-28 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-slate-400 text-sm pb-2">to</span>
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Max age (years)</label>
            <input
              type="number" min="0" max="150"
              value={maxAge}
              onChange={(e) => { setMaxAge(e.target.value); setInfantsOnly(false); setPage(1); }}
              placeholder="e.g. 5"
              className="w-28 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-slate-300 text-sm pb-2">or</span>
          <div className="pb-0.5">
            <button
              onClick={() => { setInfantsOnly((v) => !v); setMinAge(""); setMaxAge(""); setPage(1); }}
              className={`text-xs px-4 py-2 rounded-lg border font-medium transition-colors ${
                infantsOnly ? "bg-blue-900 text-white border-blue-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              0 – 11 months (Infants)
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400">
          Ages are calculated automatically from birth date. Tip: enter the same number in both fields for a specific age.
        </p>
      </div>

      {/* MANUAL FORM */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Add New Resident</h2>
          <form onSubmit={handleAddResident}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "idNo", label: "ID No" },
                { name: "lastName", label: "Last Name" },
                { name: "firstName", label: "First Name" },
                { name: "middleInitial", label: "M.I." },
                { name: "householdId", label: "Household ID" },
                { name: "householdRole", label: "Household Role" },
                { name: "ext", label: "Ext" },
                { name: "no", label: "No" },
                { name: "streetName", label: "Street Name" },
                { name: "purok", label: "Purok/Zone" },
                { name: "placeOfBirth", label: "Place of Birth" },
                { name: "birthDate", label: "Birth Date" },
                { name: "age", label: "Age (fallback)" },
                { name: "citizenship", label: "Citizenship" },
                { name: "occupation", label: "Occupation" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="text-xs text-slate-500 mb-1 block">{label}</label>
                  <input
                    name={name} value={form[name]} onChange={handleFormChange}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Sex</label>
                <select name="sex" value={form.sex} onChange={handleFormChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Civil Status</label>
                <select name="civilStatus" value={form.civilStatus} onChange={handleFormChange} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                  <option>Separated</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">
                Save Resident
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text" placeholder="Search by name..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {["ID No", "Full Name", "Age", "Sex", "Civil Status", "Purok/Zone", "Occupation", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-sm text-slate-400 text-center">
                    {isFiltered || search ? "No residents match your filters." : "No residents yet. Import an Excel file or add manually."}
                  </td>
                </tr>
              )}
              {paginated.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-500">{r.idNo || "—"}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">
                    {`${r.lastName}, ${r.firstName} ${r.middleInitial ?? ""}`.trim()}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {displayAge(r.birthDate, r.age)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.sex || "—"}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.civilStatus || "—"}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.purok || "—"}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.occupation || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteResident(r.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {filtered.length === 0 ? 0 : Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()} residents
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-600 px-2">Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* IMPORT PREVIEW MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-600" /> Import Preview
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">{importPreview.length.toLocaleString()} residents found in file</p>
              </div>
              <button onClick={() => setShowImportModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="overflow-auto flex-1 p-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["ID No", "Last Name", "First Name", "Age", "Sex", "Purok"].map((h) => (
                      <th key={h} className="px-3 py-2 text-xs font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {importPreview.slice(0, 10).map((r, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-500">{r.idNo}</td>
                      <td className="px-3 py-2">{r.lastName}</td>
                      <td className="px-3 py-2">{r.firstName}</td>
                      <td className="px-3 py-2">{displayAge(r.birthDate, r.age)}</td>
                      <td className="px-3 py-2">{r.sex}</td>
                      <td className="px-3 py-2">{r.purok}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {importPreview.length > 10 && (
                <p className="text-xs text-slate-400 text-center mt-3">...and {importPreview.length - 10} more residents</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button
                onClick={handleConfirmImport}
                disabled={importing}
                className="px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {importing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Importing...
                  </>
                ) : (
                  <><Upload className="w-4 h-4" /> Confirm Import</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}