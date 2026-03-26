import { useState } from "react";
import announcementsData from "../../data/announcements";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const newAnn = {
      id: announcements.length + 1,
      title,
      date,
      preview,
      content,
      image: "https://via.placeholder.com/600x300"
    };
    const updated = [...announcements, newAnn];
    setAnnouncements(updated);

    // Clear form
    setTitle(""); setDate(""); setPreview(""); setContent("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Announcements</h1>

      {/* FORM TO ADD ANNOUNCEMENT */}
      <form onSubmit={handleAdd} className="space-y-4 mb-8 border p-4 rounded-lg shadow-sm bg-white">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Preview"
          value={preview}
          onChange={e => setPreview(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          placeholder="Full Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Add Announcement
        </button>
      </form>

      {/* LIST OF ANNOUNCEMENTS */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-semibold text-xl">{ann.title}</h3>
            <p className="text-sm text-gray-500">{ann.date}</p>
            <p className="mt-2">{ann.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}