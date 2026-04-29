import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Settings as SettingsIcon, Upload, ImageIcon, Check, Loader2, Trash2 } from "lucide-react";
import { uploadFile } from "../../services/storage";

export default function Settings() {
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "settings", "heroImage"));
      if (snap.exists()) setCurrentImage(snap.data().url);
    }
    load();
  }, []);

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSaved(false);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress since Supabase doesn't have progress events
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) { clearInterval(interval); return 90; }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase
      const downloadURL = await uploadFile(file, "images");

      clearInterval(interval);
      setProgress(100);

      // Save URL to Firebase
      await setDoc(doc(db, "settings", "heroImage"), { url: downloadURL });
      setCurrentImage(downloadURL);
      setPreview(null);
      setFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteDoc(doc(db, "settings", "heroImage"));
    setCurrentImage("");
    setConfirmDelete(false);
    setDeleting(false);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-blue-600" /> Site Settings
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage public-facing content and appearance.</p>
      </div>

      {/* HERO IMAGE CARD */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Hero Background Image</h2>
          <p className="text-sm text-slate-500 mt-0.5">This image appears as the background on the Home page hero section.</p>
        </div>

        {/* CURRENT IMAGE */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Current Image</p>
          {currentImage ? (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-52">
              <img src={currentImage} alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-lg">
                Live on homepage
              </span>

              {/* DELETE BUTTON */}
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors shadow"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
                  <p className="text-xs text-slate-700 font-medium">Remove image?</p>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition-colors"
                  >
                    {deleting ? "Removing..." : "Yes, remove"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-52 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50">
              <div className="text-center text-slate-400">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No image set. Default image will show on homepage.</p>
              </div>
            </div>
          )}
        </div>

        {/* UPLOAD NEW */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Upload New Image</p>
          <input
            ref={fileRef} type="file" accept="image/*"
            className="hidden" onChange={handleFileChange}
          />
          <button
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 text-sm border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
          >
            <Upload className="w-4 h-4 text-blue-600" />
            Choose Image
          </button>

          {/* PREVIEW */}
          {preview && (
            <div className="rounded-xl overflow-hidden border border-slate-200 h-52">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          {/* PROGRESS BAR */}
          {uploading && (
            <div className="space-y-1">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{progress}% uploaded...</p>
            </div>
          )}

          {file && !uploading && (
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors"
            >
              <Upload className="w-4 h-4" /> Save & Publish
            </button>
          )}

          {uploading && (
            <button disabled className="flex items-center gap-2 bg-blue-900/60 text-white px-6 py-2 rounded-lg text-sm cursor-not-allowed">
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </button>
          )}

          {saved && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <Check className="w-4 h-4" /> Image saved and published successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}