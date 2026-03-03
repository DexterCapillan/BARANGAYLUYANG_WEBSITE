export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6 space-y-12">

      {/* Contact + Map + Form Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Left Column: Contact Info + Map */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-6">Contact Us</h1>
            <p className="text-slate-600 mb-8 text-lg">
              Have questions about barangay services? Send us a message or visit the Barangay Hall.
            </p>

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

          {/* Google Map */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7651.264847375769!2d121.14432059141146!3d16.49413983699432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339047b99367c187%3A0xd1989c17d219bd11!2sLuyang%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1772503247777!5m2!1sen!2sph"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your inquiry..."
            ></textarea>
          </div>
          <button className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}