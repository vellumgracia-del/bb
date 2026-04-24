export default function Footer() {
  return (
    <footer id="about" className="mt-16 scroll-mt-24">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl bg-white/5 border border-white/8 p-6 hover:bg-white/8 transition-colors duration-300">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">📌</span> Tentang
          </h2>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            LibrAspire menggunakan{" "}
            <strong className="text-blue-300">Open Library API</strong> untuk
            menyediakan koleksi buku gratis yang bisa dibaca online. Project ini
            menggunakan <strong className="text-cyan-300">Next.js</strong>{" "}
            sebagai frontend dan{" "}
            <strong className="text-cyan-300">Laravel</strong> sebagai backend
            API.
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/8 p-6 hover:bg-white/8 transition-colors duration-300">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-xl">🔗</span> Sumber
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://openlibrary.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
              >
                Open Library
                <span className="text-xs opacity-50">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://archive.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
              >
                Internet Archive
                <span className="text-xs opacity-50">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-6 border-t border-white/5">
        <p className="text-xs text-blue-300/40">
          © 2026 LibrAspire · Powered by Open Library API · Built with Next.js &
          Laravel
        </p>
      </div>
    </footer>
  );
}
