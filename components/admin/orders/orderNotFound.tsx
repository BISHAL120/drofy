import React from 'react'

const OrderNotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-8">
        <div className="animate-bounce mb-8">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
          No Orders Found
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          We couldn&apos;t find any orders matching your criteria. Try adjusting your filters or create a new order.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default OrderNotFound