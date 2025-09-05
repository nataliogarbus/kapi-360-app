const SkeletonMessage = ({ isKapiSender = false }) => (
  <div className={`flex items-start gap-4 ${isKapiSender ? '' : 'flex-row-reverse'}`}>
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700"></div>
    <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg">
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export default function MessagingFeedSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <SkeletonMessage isKapiSender={true} />
      <SkeletonMessage isKapiSender={false} />
      <SkeletonMessage isKapiSender={true} />
      <SkeletonMessage isKapiSender={false} />
    </div>
  );
}
