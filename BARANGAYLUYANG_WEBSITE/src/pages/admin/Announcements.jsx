// src/pages/admin/Announcements.jsx
import { useState } from "react";
import { useAnnouncements } from "../../context/useAnnouncements";

export default function Announcements() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncements();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    addAnnouncement({ title, date, preview, content });
    setTitle("");
    setDate("");
    setPreview("");
    setContent("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-slate-800">Announcements</h1>
        <p className="mt-1 text-sm text-slate-500">
          Post a new announcement and it will appear on the public page immediately.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-base font-medium text-slate-800 mb-4">New announcement</h2>
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
            required
          />
          <input
            type="text"
            placeholder="Date (e.g. July 14, 2025)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
            required
          />
          <input
            type="text"
            placeholder="Short preview"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
            required
          />
          <textarea
            placeholder="Full content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
            required
          />
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-blue-800 transition-colors"
          >
            Post announcement
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {announcements.length === 0 && (
          <p className="text-sm text-slate-400">No announcements yet.</p>
        )}
        {[...announcements].reverse().map((ann) => (
          <div key={ann.id} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-slate-800">{ann.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{ann.date}</p>
                <p className="text-sm text-slate-600 mt-2">{ann.preview}</p>
              </div>
              <button
                onClick={() => deleteAnnouncement(ann.id)}
                className="shrink-0 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}