export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="text-4xl font-bold text-blue-900 mb-6">Contact Us</h1>
        <p className="text-slate-600 mb-8 text-lg">Have questions about barangay services? Send us a message or visit the Barangay Hall.</p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-700">📍</div>
            <div>
              <p className="font-bold text-slate-800">Address</p>
              <p className="text-slate-600">Barangay Luyang Hall, Main Street, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-700">📞</div>
            <div>
              <p className="font-bold text-slate-800">Phone</p>
              <p className="text-slate-600">+63 912 345 6789</p>
            </div>
          </div>
        </div>
      </div>

      <form className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your inquiry..."></textarea>
        </div>
        <button className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">Send Message</button>
      </form>
    </div>
  );
}
