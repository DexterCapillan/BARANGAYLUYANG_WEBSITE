// src/pages/admin/HealthServices.jsx
import { useState } from "react";
import { useHealth } from "../../context/useHealth";
import { Trash2, Plus, HeartPulse, Calendar, BookOpen } from "lucide-react";

const TABS = [
  { key: "posts", label: "Announcements", icon: HeartPulse },
  { key: "schedules", label: "Schedules", icon: Calendar },
  { key: "programs", label: "Programs", icon: BookOpen },
];

const EMPTY_POST = { title: "", date: "", content: "" };
const EMPTY_SCHEDULE = { title: "", day: "", time: "", location: "", note: "" };
const EMPTY_PROGRAM = { title: "", description: "", targetGroup: "" };

export default function HealthServices() {
  const { posts, addPost, deletePost, schedules, addSchedule, deleteSchedule, programs, addProgram, deleteProgram } = useHealth();
  const [tab, setTab] = useState("posts");

  const [postForm, setPostForm] = useState(EMPTY_POST);
  const [scheduleForm, setScheduleForm] = useState(EMPTY_SCHEDULE);
  const [programForm, setProgramForm] = useState(EMPTY_PROGRAM);

  async function handleAddPost(e) {
    e.preventDefault();
    await addPost(postForm);
    setPostForm(EMPTY_POST);
  }

  async function handleAddSchedule(e) {
    e.preventDefault();
    await addSchedule(scheduleForm);
    setScheduleForm(EMPTY_SCHEDULE);
  }

  async function handleAddProgram(e) {
    e.preventDefault();
    await addProgram(programForm);
    setProgramForm(EMPTY_PROGRAM);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-medium text-slate-800 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-green-600" /> Health Services
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage health announcements, clinic schedules, and community programs.
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === key
                ? "bg-white text-slate-800 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ── ANNOUNCEMENTS TAB ── */}
      {tab === "posts" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-base font-medium text-slate-800 mb-4">New health announcement</h2>
            <form onSubmit={handleAddPost} className="space-y-3">
              <input
                type="text" placeholder="Title"
                value={postForm.title}
                onChange={(e) => setPostForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <input
                type="text" placeholder="Date (e.g. April 20, 2026)"
                value={postForm.date}
                onChange={(e) => setPostForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <textarea
                placeholder="Content"
                value={postForm.content}
                onChange={(e) => setPostForm((p) => ({ ...p, content: e.target.value }))}
                rows={3}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <div className="flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  <Plus className="w-4 h-4" /> Post Announcement
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3">
            {posts.length === 0 && <p className="text-sm text-slate-400">No announcements yet.</p>}
            {posts.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-slate-800">{p.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.date}</p>
                  <p className="text-sm text-slate-600 mt-2">{p.content}</p>
                </div>
                <button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SCHEDULES TAB ── */}
      {tab === "schedules" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-base font-medium text-slate-800 mb-4">New schedule</h2>
            <form onSubmit={handleAddSchedule} className="space-y-3">
              <input
                type="text" placeholder="Title (e.g. Vaccination Drive)"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" placeholder="Day / Date"
                  value={scheduleForm.day}
                  onChange={(e) => setScheduleForm((p) => ({ ...p, day: e.target.value }))}
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                  required
                />
                <input
                  type="text" placeholder="Time (e.g. 8:00 AM – 12:00 PM)"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm((p) => ({ ...p, time: e.target.value }))}
                  className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                  required
                />
              </div>
              <input
                type="text" placeholder="Location"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm((p) => ({ ...p, location: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <input
                type="text" placeholder="Additional note (optional)"
                value={scheduleForm.note}
                onChange={(e) => setScheduleForm((p) => ({ ...p, note: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
              />
              <div className="flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  <Plus className="w-4 h-4" /> Add Schedule
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3">
            {schedules.length === 0 && <p className="text-sm text-slate-400">No schedules yet.</p>}
            {schedules.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-5 flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-slate-800">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.day} · {s.time}</p>
                  <p className="text-xs text-slate-500">{s.location}</p>
                  {s.note && <p className="text-xs text-slate-400 mt-1 italic">{s.note}</p>}
                </div>
                <button onClick={() => deleteSchedule(s.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PROGRAMS TAB ── */}
      {tab === "programs" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-base font-medium text-slate-800 mb-4">New program</h2>
            <form onSubmit={handleAddProgram} className="space-y-3">
              <input
                type="text" placeholder="Program name"
                value={programForm.title}
                onChange={(e) => setProgramForm((p) => ({ ...p, title: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <input
                type="text" placeholder="Target group (e.g. Senior Citizens, Infants)"
                value={programForm.targetGroup}
                onChange={(e) => setProgramForm((p) => ({ ...p, targetGroup: e.target.value }))}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <textarea
                placeholder="Description"
                value={programForm.description}
                onChange={(e) => setProgramForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                required
              />
              <div className="flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-green-600 transition-colors">
                  <Plus className="w-4 h-4" /> Add Program
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-3">
            {programs.length === 0 && <p className="text-sm text-slate-400">No programs yet.</p>}
            {programs.map((pg) => (
              <div key={pg.id} className="bg-white rounded-xl border border-slate-200 p-5 flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-slate-800">{pg.title}</p>
                  <span className="inline-block mt-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    {pg.targetGroup}
                  </span>
                  <p className="text-sm text-slate-600 mt-2">{pg.description}</p>
                </div>
                <button onClick={() => deleteProgram(pg.id)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}