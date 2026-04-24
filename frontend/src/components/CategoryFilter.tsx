"use client";

interface CategoryFilterProps {
  categories: { key: string; label: string }[];
  activeCategory: string;
  onSelect: (key: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <section id="catalog" className="mb-8 scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
        🗂️ Filter Kategori
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              id={`cat-${cat.key}`}
              onClick={() => onSelect(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-white/5 text-blue-300 border-white/10 hover:bg-white/10 hover:border-blue-400/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
