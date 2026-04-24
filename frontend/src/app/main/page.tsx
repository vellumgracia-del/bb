"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string | null;
  status: string;
}

export default function MainPage() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/books`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBooks(data);
    } catch {
      setError(
        "Gagal terhubung ke server. Pastikan Laravel backend berjalan di port 8000."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("libraspire_name");
    if (savedName) {
      setName(savedName);
      setEntered(true);
    }
  }, []);

  useEffect(() => {
    if (entered) fetchBooks();
  }, [entered, fetchBooks]);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("libraspire_name", name.trim());
      setEntered(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("libraspire_name");
    setName("");
    setEntered(false);
    setBooks([]);
  };

  const categories = ["all", ...new Set(books.map((b) => b.category || "Umum"))];
  const filteredBooks =
    activeCategory === "all"
      ? books
      : books.filter((b) => (b.category || "Umum") === activeCategory);

  // ── Landing state ──
  if (!entered) {
    return (
      <>
        <Navbar />
        <main className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="rounded-3xl glass p-10">
            <div className="text-6xl mb-6">📚</div>
            <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Selamat Datang!
            </h1>
            <p className="text-blue-200/70 text-sm mb-8">
              Sebelum kita mulai, bolehkah kami tahu nama Anda?
            </p>
            <form onSubmit={handleEnter} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                required
                autoComplete="off"
                className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-blue-300/40 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                Masuk →
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  // ── Main library ──
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting Bar */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-5 mb-8 flex items-center justify-between shadow-lg shadow-blue-900/30">
          <span className="text-sm sm:text-base text-white">
            👋 Halo,{" "}
            <strong className="text-cyan-200">{name}</strong>!
            Selamat datang di LibrAspire.
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-blue-200/70 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Ganti Nama
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total Buku", value: books.length, icon: "📚" },
            {
              label: "Tersedia",
              value: books.filter(
                (b) => b.status?.toLowerCase() === "available"
              ).length,
              icon: "✅",
            },
            {
              label: "Dipinjam",
              value: books.filter(
                (b) => b.status?.toLowerCase() !== "available"
              ).length,
              icon: "📖",
            },
            {
              label: "Kategori",
              value: new Set(books.map((b) => b.category || "Umum")).size,
              icon: "🗂️",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white/5 border border-white/8 p-4 text-center hover:bg-white/8 transition-colors"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-blue-300/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-blue-300 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat === "all" ? "Semua" : cat}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-6 text-center mb-6">
            <p className="text-red-300 text-sm font-semibold">⚠️ {error}</p>
            <button
              onClick={fetchBooks}
              className="mt-3 px-6 py-2 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-bold hover:bg-red-500/30 transition-colors cursor-pointer"
            >
              🔄 Coba Lagi
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-12">
            <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin glow-pulse" />
            <span className="text-blue-300 text-sm">
              Memuat buku dari server...
            </span>
          </div>
        )}

        {/* Book Grid */}
        {!loading && !error && (
          <>
            <h2 className="text-lg font-bold text-white mb-4">
              📖 Koleksi Buku ({filteredBooks.length})
            </h2>
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-blue-300/50 text-sm italic">
                  {books.length === 0
                    ? "Belum ada buku di database. Tambahkan via API!"
                    : "Tidak ada buku dalam kategori ini."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredBooks.map((book, i) => (
                  <div
                    key={book.id}
                    className="fade-in-up flex flex-col items-center rounded-2xl bg-white/5 border border-white/8 p-4 hover:bg-white/10 hover:border-blue-400/30 hover:-translate-y-1 transition-all duration-300"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Cover placeholder */}
                    <div className="relative w-24 h-36 rounded-lg overflow-hidden mb-3 shadow-lg shadow-black/30">
                      <Image
                        src={`https://covers.openlibrary.org/b/olid/${book.title.replace(/\s+/g, "+")}-M.jpg`}
                        alt={book.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl">📖</div>';
                          }
                        }}
                      />
                    </div>

                    <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[0.65rem] font-semibold mb-2">
                      {book.category || "Umum"}
                    </span>

                    <h3 className="text-sm font-semibold text-white text-center leading-tight line-clamp-2 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-blue-300/60 text-center mb-2">
                      {book.author}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        book.status?.toLowerCase() === "available"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-red-500/20 text-red-300 border border-red-400/30"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <Footer />
      </main>
    </>
  );
}
