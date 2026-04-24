export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 sm:p-12 mb-10 shadow-2xl shadow-blue-900/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

      {/* Floating emoji */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 text-7xl sm:text-8xl opacity-20 float-anim select-none pointer-events-none">
        📚
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-100 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open Library API · Gratis
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
          📖 Temukan &amp;{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent">
            Baca Buku
          </span>
        </h1>
        <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed max-w-md">
          Koleksi buku gratis dari Open Library. Baca langsung tanpa mendaftar —
          kapan saja, di mana saja.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg shadow-white/20 hover:shadow-white/30 hover:scale-105 transition-all duration-200"
          >
            🔍 Jelajahi Katalog
          </a>
          <a
            href="/main"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
          >
            📖 My Library
          </a>
        </div>
      </div>
    </section>
  );
}
