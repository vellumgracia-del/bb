export default function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/8 p-4"
        >
          {/* Cover skeleton */}
          <div className="w-24 h-36 rounded-lg shimmer mb-3" />
          {/* Chip skeleton */}
          <div className="w-16 h-4 rounded-md shimmer mb-2" />
          {/* Title skeleton */}
          <div className="w-full h-3 rounded shimmer mb-1" />
          <div className="w-3/4 h-3 rounded shimmer mb-2" />
          {/* Author skeleton */}
          <div className="w-1/2 h-2.5 rounded shimmer mb-3" />
          {/* Button skeleton */}
          <div className="w-full h-8 rounded-lg shimmer" />
        </div>
      ))}
    </div>
  );
}
