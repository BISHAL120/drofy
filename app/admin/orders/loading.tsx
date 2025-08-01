import { Download, Search } from "lucide-react";

// Skeleton component for reusable shimmer effect
const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

// Skeleton for badges
const SkeletonBadge = () => (
  <div className="inline-block">
    <Skeleton className="h-5 w-16 rounded-full" />
  </div>
);

// Skeleton for product tags
const SkeletonProductTags = () => (
  <div className="flex flex-wrap gap-1">
    <Skeleton className="h-5 w-20 rounded-full" />
    <Skeleton className="h-5 w-16 rounded-full" />
    <Skeleton className="h-5 w-12 rounded-full" />
  </div>
);

// Skeleton table row component
const SkeletonTableRow = () => (
  <tr className="border-b border-gray-200">
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-24" />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-4 py-3 max-w-[200px]">
      <SkeletonProductTags />
    </td>
    <td className="px-4 py-3">
      <SkeletonBadge />
    </td>
    <td className="px-4 py-3">
      <SkeletonBadge />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-16" />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-12" />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-20" />
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-8 w-8 rounded" />
    </td>
  </tr>
);

export default function OrdersLoadingPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 h-10 px-4 py-2 opacity-50 cursor-not-allowed"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Card Header */}
          <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-200">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>

          {/* Card Content */}
          <div className="p-6">
            {/* Filters Section */}
            <div className="flex flex-col space-y-4 mb-6 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID or Reseller..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm opacity-50 cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <select
                  disabled
                  className="w-full sm:w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-md opacity-50 cursor-not-allowed"
                >
                  <option>Filter by status</option>
                </select>
                <select
                  disabled
                  className="w-full sm:w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-md opacity-50 cursor-not-allowed"
                >
                  <option>Payment method</option>
                </select>
                <button
                  disabled
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white opacity-50 cursor-not-allowed"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="rounded-md border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reseller
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Generate multiple skeleton rows */}
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonTableRow key={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Loading state message */}
            <div className="text-center py-8 text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>Loading orders...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
