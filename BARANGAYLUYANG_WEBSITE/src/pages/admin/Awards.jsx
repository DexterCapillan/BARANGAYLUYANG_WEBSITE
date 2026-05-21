import { useState, useRef } from "react";
import { useAwards } from "../../context/useAwards";
import { Trophy, Plus, X, Trash2, Upload, Loader2, ImageIcon, Pencil } from "lucide-react";

const CLOUDINARY_CLOUD_NAME = "docfy1wj6";
const CLOUDINARY_UPLOAD_PRESET = "barangay_images";

const EMPTY_FORM = { name: "", year: "", description: "", imageUrl: "" };

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  return data.secure_url;
}

export default function Awards() {
  const { awards, addAward, deleteAward, updateAward } = useAwards();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // EDIT STATE
  const [editingAward, setEditingAward] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editSaving, setEditSaving] = useState(false);

  const imageRef = useRef();
  const editImageRef = useRef();

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleEditFormChange(e) {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImageChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  }

  function handleEditImageChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setEditImageFile(f);
    setEditImagePreview(URL.createObjectURL(f));
  }

  function openEdit(award) {
    setEditingAward(award);
    setEditForm({
      name: award.name,
      year: award.year,
      description: award.description,
      imageUrl: award.imageUrl || "",
    });
    setEditImageFile(null);
    setEditImagePreview(null);
  }

  function closeEdit() {
    setEditingAward(null);
    setEditForm(EMPTY_FORM);
    setEditImageFile(null);
    setEditImagePreview(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = form.imageUrl;
      if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
      await addAward({ ...form, imageUrl, createdAt: new Date().toISOString() });
      setForm(EMPTY_FORM);
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    setEditSaving(true);
    try {
      let imageUrl = editForm.imageUrl;
      if (editImageFile) imageUrl = await uploadToCloudinary(editImageFile);
      await updateAward(editingAward.id, { ...editForm, imageUrl });
      closeEdit();
    } catch (err) {
      console.error(err);
    }
    setEditSaving(false);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" /> Awards
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage barangay awards and recognitions.</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 text-sm bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Award"}
        </button>
      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-slate-800 mb-4">Add New Award</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Award Name *</label>
                <input
                  name="name" value={form.name} onChange={handleFormChange} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Best Barangay Award"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Year *</label>
                <input
                  name="year" value={form.year} onChange={handleFormChange} required
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2024"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Description *</label>
              <textarea
                name="description" value={form.description} onChange={handleFormChange} required
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Brief description of the award..."
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Award Image</label>
              <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <button
                type="button" onClick={() => imageRef.current.click()}
                className="flex items-center gap-2 text-sm border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
              >
                <ImageIcon className="w-4 h-4 text-yellow-500" />
                {imageFile ? imageFile.name : "Choose Image"}
              </button>
              {imagePreview && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-40">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit" disabled={saving}
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors disabled:opacity-60"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Upload className="w-4 h-4" /> Save Award</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* AWARDS LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards.length === 0 && (
          <div className="col-span-3 py-16 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
            <Trophy className="w-10 h-10 mx-auto mb-2 opacity-30" />
            No awards yet. Click "Add Award" to create one.
          </div>
        )}
        {[...awards].reverse().map((award) => (
          <div key={award.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {award.imageUrl ? (
              <div className="h-40 overflow-hidden">
                <img src={award.imageUrl} alt={award.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-40 bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-yellow-400" />
              </div>
            )}
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">{award.year}</span>
                <div className="flex items-center gap-1">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => openEdit(award)}
                    className="text-blue-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {/* DELETE BUTTON */}
                  {confirmDelete === award.id ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => { deleteAward(award.id); setConfirmDelete(null); }} className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Confirm</button>
                      <button onClick={() => setConfirmDelete(null)} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md hover:bg-slate-200">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(award.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-sm leading-snug">{award.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{award.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeEdit} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-blue-600" /> Edit Award
              </h2>
              <button onClick={closeEdit}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Award Name *</label>
                  <input
                    name="name" value={editForm.name} onChange={handleEditFormChange} required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Year *</label>
                  <input
                    name="year" value={editForm.year} onChange={handleEditFormChange} required
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Description *</label>
                <textarea
                  name="description" value={editForm.description} onChange={handleEditFormChange} required
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Image</label>

                {/* CURRENT IMAGE */}
                {editForm.imageUrl && !editImagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 h-40 mb-2">
                    <img src={editForm.imageUrl} alt="Current" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setEditForm((prev) => ({ ...prev, imageUrl: "" }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-lg">Current image</span>
                  </div>
                )}

                {/* NEW IMAGE PREVIEW */}
                {editImagePreview && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 h-40 mb-2">
                    <img src={editImagePreview} alt="New" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setEditImageFile(null); setEditImagePreview(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-lg">New image</span>
                  </div>
                )}

                <input ref={editImageRef} type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                <button
                  type="button" onClick={() => editImageRef.current.click()}
                  className="flex items-center gap-2 text-sm border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
                >
                  <ImageIcon className="w-4 h-4 text-yellow-500" />
                  {editImageFile ? editImageFile.name : "Change Image"}
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeEdit} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit" disabled={editSaving}
                  className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors disabled:opacity-60"
                >
                  {editSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Upload className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}