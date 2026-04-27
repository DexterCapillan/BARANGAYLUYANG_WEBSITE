import { useState, useRef } from "react";
import { useGallery } from "../../context/useGallery";
import { Image, Upload, X, Trash2, Loader } from "lucide-react";

const CLOUD_NAME = "docfy1wj6";
const UPLOAD_PRESET = "barangay_images";

export default function AdminGallery() {
  const { photos, addPhoto, deletePhoto } = useGallery();
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      await addPhoto(data.secure_url, caption);
      setCaption("");
      setPreview(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  }

  function handleCancel() {
    setPreview(null);
    setSelectedFile(null);
    setCaption("");
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Image className="w-6 h-6 text-blue-600" /> Photo Gallery
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Upload photos to display on the public home page.
        </p>
      </div>

      {/* UPLOAD AREA */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Upload Photo</h2>

        {!preview ? (
          <div
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
          >
            <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Click to select a photo</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP supported</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden max-h-64">
              <img src={preview} alt="preview" className="w-full h-64 object-cover" />
              <button
                onClick={handleCancel}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60"
              >
                {uploading ? (
                  <><Loader className="w-4 h-4 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PHOTOS GRID */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">
          Uploaded Photos ({photos.length})
        </h2>
        {photos.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-10">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1.5">
                    <p className="text-white text-xs truncate">{photo.caption}</p>
                  </div>
                )}
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}