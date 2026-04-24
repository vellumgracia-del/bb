"use client";

import { useState } from "react";
import Image from "next/image";

interface Book {
  key: string;
  title: string;
  authors: string;
  cover_id: number | null;
  ia: string | null;
  subject: string;
}

interface BookCardProps {
  book: Book;
  index: number;
  subjectLabel: string;
}

const COVER_BASE = "https://covers.openlibrary.org/b/id/";
const READ_BASE = "https://archive.org/details/";
const BOOK_BASE = "https://openlibrary.org";

export default function BookCard({ book, index, subjectLabel }: BookCardProps) {
  const [imgError, setImgError] = useState(false);

  const coverUrl = book.cover_id
    ? `${COVER_BASE}${book.cover_id}-M.jpg`
    : null;

  const readUrl = book.ia
    ? `${READ_BASE}${book.ia}`
    : `${BOOK_BASE}${book.key}`;

  const isReadable = !!book.ia;

  return (
    <div
      className="fade-in-up group relative flex flex-col items-center rounded-2xl bg-white/5 border border-white/8 p-4 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={() => window.open(readUrl, "_blank")}
    >
      {/* Cover */}
      <div className="relative w-24 h-36 rounded-lg overflow-hidden mb-3 shadow-lg shadow-black/30">
        {coverUrl && !imgError ? (
          <Image
            src={coverUrl}
            alt={book.title}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl">
            📖
          </div>
        )}
      </div>

      {/* Category chip */}
      <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[0.65rem] font-semibold mb-2">
        {subjectLabel}
      </span>

      {/* Title */}
      <h3 className="text-sm font-semibold text-white text-center leading-tight line-clamp-2 mb-1">
        {book.title}
      </h3>

      {/* Author */}
      <p className="text-xs text-blue-300/60 text-center line-clamp-1 mb-3">
        {book.authors}
      </p>

      {/* Action */}
      <a
        href={readUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`w-full text-center py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
          isReadable
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02]"
            : "bg-white/5 border border-white/15 text-blue-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        {isReadable ? "📖 Baca Sekarang" : "🔎 Lihat Detail"}
      </a>
    </div>
  );
}
