export default function Officials() {
  const officials = [
    { name: "Hon. Juan Dela Cruz", role: "Punong Barangay", image: "/images/official1.webp" },
    { name: "Hon. Maria Clara", role: "Barangay Kagawad", image: "/images/official2.webp" },
    // Add more officials here
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-12 text-center underline decoration-yellow-500">Barangay Council 2026</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {officials.map((person, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="h-64 bg-slate-100 flex items-center justify-center">
              <span className="text-slate-400">Photo</span>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-xl text-slate-800">{person.name}</h3>
              <p className="text-blue-600 font-medium">{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
