export default function ProjectCardSkeleton() {
  return (
    <div className="block p-6 bg-gray-800/20 border border-gray-700 rounded-lg shadow-lg">
      <div className="animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
        
        {/* Status Skeleton */}
        <div className="flex items-center justify-end">
          <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
