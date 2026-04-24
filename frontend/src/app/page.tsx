"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryFilter from "@/components/CategoryFilter";
import BookCard from "@/components/BookCard";
import BookGridSkeleton from "@/components/BookGridSkeleton";
import Footer from "@/components/Footer";

// ── Constants ──
const BOOK_BASE = "https://openlibrary.org";

const CATEGORIES = [
  { key: "all", label: "Semua" },
  { key: "fiction", label: "Fiction" },
  { key: "science", label: "Science" },
  { key: "history", label: "History" },
  { key: "technology", label: "Technology" },
  { key: "philosophy", label: "Philosophy" },
  { key: "biography", label: "Biography" },
  { key: "children", label: "Children" },
];

const SUBJECT_LABELS: Record<string, string> = {};
CATEGORIES.forEach((c) => (SUBJECT_LABELS[c.key] = c.label));

interface Book {
  key: string;
  title: string;
  authors: string;
  cover_id: number | null;
  ia: string | null;
  subject: string;
}

const DEFAULT_SUBJECT = "fiction";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState(DEFAULT_SUBJECT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBooks = useCallback(async (subject: string) => {
    setLoading(true);
    setError(false);
    setBooks([]);

    try {
      const url =
        subject === "all"
          ? `${BOOK_BASE}/search.json?q=classic+books&limit=24&fields=key,title,author_name,cover_i,subject,ia`
          : `${BOOK_BASE}/subjects/${encodeURIComponent(subject)}.json?limit=24`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response not ok");
      const data = await res.json();

      const parsed: Book[] = data.works
        ? data.works.map(
            (w: {
              key: string;
              title: string;
              authors?: { name: string }[];
              cover_id?: number;
              cover_edition_key?: string;
              ia?: string;
            }) => ({
              key: w.key,
              title: w.title,
              authors: w.authors
                ? w.authors.map((a) => a.name).join(", ")
                : "Unknown",
              cover_id: w.cover_id || null,
              ia: w.ia || null,
              subject,
            })
          )
        : data.docs.map(
            (d: {
              key: string;
              title: string;
              author_name?: string[];
              cover_i?: number;
              ia?: string[];
            }) => ({
              key: d.key,
              title: d.title,
              authors: d.author_name ? d.author_name.join(", ") : "Unknown",
              cover_id: d.cover_i || null,
              ia: d.ia ? d.ia[0] : null,
              subject,
            })
          );

      setBooks(parsed);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(DEFAULT_SUBJECT);
  }, [fetchBooks]);

  const handleCategorySelect = (key: string) => {
    setActiveCategory(key);
    fetchBooks(key);
  };

  const sectionTitle = SUBJECT_LABELS[activeCategory] || activeCategory;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />

        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />

        {/* Book Section */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            📖{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              {sectionTitle}
            </span>
            {!loading && (
              <span className="text-xs font-normal text-blue-400/50 ml-2">
                {books.length} buku
              </span>
            )}
          </h2>

          {/* Loading */}
          {loading && <BookGridSkeleton />}

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-2xl bg-red-500/10 border border-red-400/20 p-6 text-center">
              <p className="text-red-300 text-sm font-semibold">
                ⚠️ Gagal memuat buku. Periksa koneksi internet kamu dan coba
                lagi.
              </p>
              <button
                onClick={() => fetchBooks(activeCategory)}
                className="mt-3 px-6 py-2 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-bold hover:bg-red-500/30 transition-colors cursor-pointer"
              >
                🔄 Coba Lagi
              </button>
            </div>
          )}

          {/* No results */}
          {!loading && !error && books.length === 0 && (
            <div className="mt-8 text-center py-12">
              <p className="text-blue-300/50 text-sm italic">
                Tidak ada buku ditemukan.
              </p>
            </div>
          )}

          {/* Book grid */}
          {!loading && !error && books.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
              {books.map((book, i) => (
                <BookCard
                  key={book.key}
                  book={book}
                  index={i}
                  subjectLabel={sectionTitle}
                />
              ))}
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
}
