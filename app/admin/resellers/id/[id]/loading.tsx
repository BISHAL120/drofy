export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 animate-pulse"></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                  <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-7 bg-slate-200 rounded-full w-20 animate-pulse"></div>
                    <div className="h-7 bg-slate-200 rounded-full w-24 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
                    <div>
                      <div className="h-4 bg-slate-200 rounded w-20 animate-pulse mb-1"></div>
                      <div className="h-6 bg-slate-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-8 bg-slate-200 rounded-lg w-16 animate-pulse"></div>
                    <div className="h-8 bg-slate-200 rounded-lg w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
                  <div className="h-8 bg-slate-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-slate-200 rounded w-12 animate-pulse"></div>
                    <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Info Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-44 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-1">
                  <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                  <div className="h-5 bg-slate-200 rounded w-36 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-36 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                    <div className="h-5 bg-slate-200 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="h-6 bg-slate-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
