export default function Home() {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="bg-blue-900 py-24 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Barangay Luyang</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Providing efficient government services and digital accessibility to every resident.
        </p>
        <button className="bg-yellow-500 text-blue-950 font-bold px-8 py-3 rounded-lg hover:bg-yellow-400 transition">
          Online Document Request
        </button>
      </section>

      {/* Quick Services */}
      <section className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-2">Barangay Clearance</h3>
          <p className="text-slate-600">Fast-track your clearance and permit applications online.</p>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-2">Health Center</h3>
          <p className="text-slate-600">Schedule check-ups and view available medicine updates.</p>
        </div>
        <div className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition">
          <h3 className="font-bold text-xl mb-2">Announcements</h3>
          <p className="text-slate-600">Stay updated with the latest community news and events.</p>
        </div>
      </section>
    </div>
  );
}
