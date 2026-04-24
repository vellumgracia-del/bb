"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Catalog", href: "#catalog" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <span className="text-2xl">📚</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                LibrAspire
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/main"
                className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200"
              >
                📖 My Library
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              id="hamburgerBtn"
            >
              <span
                className={`block w-6 h-0.5 bg-blue-300 rounded transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-blue-300 rounded transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-blue-300 rounded transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass border-b border-white/10 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60 py-3" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-blue-200 hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/main"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
          >
            📖 My Library
          </a>
        </div>
      </div>
    </>
  );
}
