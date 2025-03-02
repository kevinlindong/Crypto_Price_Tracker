export function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center my-12">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-primary dark:border-t-primary"></div>
      <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">Loading data...</p>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

