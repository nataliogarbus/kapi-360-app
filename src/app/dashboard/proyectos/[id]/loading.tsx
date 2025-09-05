import MessagingFeedSkeleton from "@/components/MessagingFeedSkeleton";

export default function LoadingProjectDetail() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
        <div className="h-9 bg-gray-700 rounded w-1/2"></div>
      </div>

      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
        <MessagingFeedSkeleton />
        <div className="mt-8 border-t border-gray-700 pt-6 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="flex-1 h-24 bg-gray-900 rounded-lg"></div>
            <div className="h-10 w-24 bg-indigo-600/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
