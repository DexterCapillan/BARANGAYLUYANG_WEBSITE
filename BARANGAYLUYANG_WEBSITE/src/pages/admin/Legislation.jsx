import { useState, useRef } from "react";
import { useLegislation } from "../../context/useLegislation";
import { ScrollText, Landmark, FileText, Plus, X, Trash2, Upload, Loader2, ImageIcon, FileUp, BookOpen } from "lucide-react";
import { uploadFile } from "../../services/storage";

const TABS = [
  { key: "executiveOrders", label: "Executive Orders", icon: ScrollText, color: "text-blue-600" },
  { key: "ordinances", label: "Ordinances", icon: Landmark, color: "text-indigo-600" },
  { key: "resolutions", label: "Resolutions", icon: FileText, color: "text-teal-600" },
  { key: "citizensCharter", label: "Citizens Charter", icon: BookOpen, color: "text-emerald-600" },
];

const EMPTY_FORM = {
  title: "", date: "", description: "", images: [], pdfUrl: "",
};

export default function Legislation() {
  const {
    executiveOrders, ordinances, resolutions,
    charterImages, addItem, deleteItem,
    addCharterImage, deleteCharterImage,
  } = useLegislation();

  const [activeTab, setActiveTab] = useState("executiveOrders");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [charterFile, setCharterFile] = useState(null);
  const [charterPreview, setCharterPreview] = useState(null);
  const [uploadingCharter, setUploadingCharter] = useState(false);
  const [confirmDeleteCharter, setConfirmDeleteCharter] = useState(null);

  const imageRef = useRef();
  const pdfRef = useRef();
  const charterRef = useRef();

  const dataMap = { executiveOrders, ordinances, resolutions };
  const items = dataMap[activeTab] ?? [];
  const activeTabInfo = TABS.find((t) => t.key === activeTab);

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    const remaining = 5 - imageFiles.length;
    const allowed = files.slice(0, remaining);
    setImageFiles((prev) => [...prev, ...allowed]);
    setImagePreviews((prev) => [...prev, ...allowed.map((f) => URL.createObjectURL(f))]);
    e.target.value = "";
  }

  function removeImage(index) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handlePdfChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setPdfFile(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Upload images to Supabase
      const images = [];
      for (const file of imageFiles) {
        const url = await uploadFile(file, "images");
        images.push(url);
      }

      // Upload PDF to Supabase
      let pdfUrl = form.pdfUrl;
      if (pdfFile) {
        pdfUrl = await uploadFile(pdfFile, "documents");
      }

      await addItem(activeTab, {
        ...form, images, pdfUrl,
        createdAt: new Date().toISOString(),
      });
      setForm(EMPTY_FORM);
      setImageFiles([]);
      setImagePreviews([]);
      setPdfFile(null);
      setShowForm(false);
    } catch (err) {
      console.error("Save error:", err);
    }
    setSaving(false);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setImageFiles([]);
    setImagePreviews([]);
    setPdfFile(null);
    setShowForm(false);
  }

  // CHARTER HANDLERS
  function handleCharterFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setCharterFile(f);
    setCharterPreview(URL.createObjectURL(f));
    e.target.value = "";
  }

  async function handleCharterUpload() {
    if (!charterFile) return;
    setUploadingCharter(true);
    try {
      // Upload charter image to Supabase
      const url = await uploadFile(charterFile, "images");
      await addCharterImage(url);
      setCharterFile(null);
      setCharterPreview(null);
    } catch (err) {
      console.error("Charter upload error:", err);
    }
    setUploadingCharter(false);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Legislation</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage Executive Orders, Ordinances, Resolutions, and Citizens Charter.</p>
        </div>
        {activeTab !== "citizensCharter" && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? "Cancel" : `Add ${activeTabInfo?.label.slice(0, -1)}`}
          </button>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
        {TABS.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); resetForm(); }}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === key
                ? `border-blue-600 ${color}`
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            {key !== "citizensCharter" && (
              <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full">
                {dataMap[key]?.length ?? 0}
              </span>
            )}
            {key === "citizensCharter" && (
              <span className="ml-1 bg-slate-100 text-slate-600 text-xs px-1.5 py-0.5 rounded-full">
                {charterImages.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* CITIZENS CHARTER TAB */}
      {activeTab === "citizensCharter" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-slate-800">Upload Charter Page</h2>
              <p className="text-sm text-slate-500 mt-0.5">Upload scanned pages of the Citizens Charter one at a time.</p>
            </div>

            <input ref={charterRef} type="file" accept="image/*" className="hidden" onChange={handleCharterFileChange} />
            <button
              onClick={() => charterRef.current.click()}
              className="flex items-center gap-2 text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
            >
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Choose Image
            </button>

            {charterPreview && (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img src={charterPreview} alt="Preview" className="w-full object-contain max-h-64" />
              </div>
            )}

            {charterFile && !uploadingCharter && (
              <button
                onClick={handleCharterUpload}
                className="flex items-center gap-2 bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors"
              >
                <Upload className="w-4 h-4" /> Upload Page
              </button>
            )}

            {uploadingCharter && (
              <button disabled className="flex items-center gap-2 bg-emerald-700/60 text-white px-6 py-2 rounded-lg text-sm cursor-not-allowed">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </button>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              Charter Pages ({charterImages.length})
            </h2>
            {charterImages.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                No pages uploaded yet.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {charterImages.map((src, i) => (
                  <div key={i} className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <img src={src} alt={`Page ${i + 1}`} className="w-full object-contain" />
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Page {i + 1}</span>
                      {confirmDeleteCharter === i ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { deleteCharterImage(i); setConfirmDeleteCharter(null); }}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmDeleteCharter(null)}
                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteCharter(i)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADD FORM */}
      {activeTab !== "citizensCharter" && showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">
            Add {activeTabInfo?.label.slice(0, -1)}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Title *</label>
                <input
                  name="title" value={form.title} onChange={handleFormChange} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Executive Order No. 001"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Date *</label>
                <input
                  name="date" type="date" value={form.date} onChange={handleFormChange} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Description *</label>
              <textarea
                name="description" value={form.description} onChange={handleFormChange} required
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Brief description of this document..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Images ({imageFiles.length}/5)</label>
                <input ref={imageRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                {imageFiles.length < 5 && (
                  <button
                    type="button"
                    onClick={() => imageRef.current.click()}
                    className="flex items-center gap-2 text-sm border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 w-full"
                  >
                    <ImageIcon className="w-4 h-4 text-blue-500" />
                    Add Images (max 5)
                  </button>
                )}
                {imagePreviews.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden border border-slate-200 h-20">
                        <img src={src} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">PDF Document</label>
                <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={handlePdfChange} />
                <button
                  type="button"
                  onClick={() => pdfRef.current.click()}
                  className="flex items-center gap-2 text-sm border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 w-full"
                >
                  <FileUp className="w-4 h-4 text-red-500" />
                  {pdfFile ? pdfFile.name : "Choose PDF"}
                </button>
                {pdfFile && (
                  <p className="text-xs text-emerald-600 mt-1">✓ {pdfFile.name} selected</p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors disabled:opacity-60"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Save & Publish</>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ITEMS LIST */}
      {activeTab !== "citizensCharter" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 && (
            <div className="col-span-3 py-16 text-center text-slate-400 text-sm">
              No {activeTabInfo?.label.toLowerCase()} yet. Click "Add" to create one.
            </div>
          )}
          {[...items].reverse().map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {item.images?.[0] ? (
                <div className="h-36 overflow-hidden">
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-36 bg-slate-50 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}
              <div className="p-4 space-y-2">
                {item.images?.length > 1 && (
                  <span className="text-xs text-slate-400">{item.images.length} images</span>
                )}
                <p className="text-xs text-slate-400">{item.date}</p>
                <h3 className="font-semibold text-slate-800 text-sm leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between pt-2">
                  {item.pdfUrl ? (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FileUp className="w-3.5 h-3.5" /> View PDF
                    </a>
                  ) : (
                    <span className="text-xs text-slate-300">No PDF</span>
                  )}
                  {confirmDelete === item.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { deleteItem(activeTab, item.id); setConfirmDelete(null); }}
                        className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}