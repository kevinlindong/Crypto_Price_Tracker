"use client"

import { useCryptoData } from "@/hooks/useCryptoData"
import { CryptoCard } from "@/components/CryptoCard"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { CoinSelector } from "@/components/CoinSelector"
import { PriceChart } from "@/components/PriceChart"
import { Header } from "@/components/Header"

export default function Home() {
  const {
    allCoins,
    selectedCoins,
    selectedCoinIds,
    isLoading,
    isError,
    refetch,
    isRefetching,
    searchTerm,
    setSearchTerm,
    toggleCoin,
  } = useCryptoData()

  return (
    <main className="min-h-screen bg-background pb-12">
      <Header />
      <div className="container mx-auto px-4 py-8">

        <div className="flex justify-end mb-6">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            {isRefetching ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Refreshing...
              </>
            ) : (
              "Refresh Prices"
            )}
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-center text-red-500 my-10">
            <p className="mb-2">Sorry, there was an error fetching cryptocurrency data.</p>
            <p className="mb-4 text-sm text-red-400">
              The CoinGecko API may be rate limited. Please wait a moment and try again.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <CoinSelector allCoins={allCoins} selectedCoinIds={selectedCoinIds} toggleCoin={toggleCoin} />
            </div>

            {selectedCoins.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400 my-10">
                <p>No cryptocurrencies selected. Please select coins from the dropdown above.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {selectedCoins.map((crypto) => (
                  <div key={crypto.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-6">
                          <CryptoCard crypto={crypto} />
                        </div>
                        <div className="w-full lg:w-2/3">
                          <PriceChart
                            coinId={crypto.id}
                            coinName={crypto.name}
                            color={crypto.price_change_percentage_24h >= 0 ? "#10B981" : "#EF4444"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

