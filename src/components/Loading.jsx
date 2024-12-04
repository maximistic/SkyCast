export default function Loading() {
    return (
      <div className="space-y-6 p-6 animate-pulse">
        
        <div className="h-8 bg-gray-300 rounded-md w-1/3"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-300 rounded-md"></div>
          <div className="h-24 bg-gray-300 rounded-md"></div>
          <div className="h-24 bg-gray-300 rounded-md"></div>
          <div className="h-24 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  }
  