"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"

interface Coin {
  id: string
  name: string
  symbol: string
}

interface CoinSelectorProps {
  allCoins: Coin[]
  selectedCoinIds: string[]
  toggleCoin: (coinId: string) => void
}

export function CoinSelector({ allCoins, selectedCoinIds, toggleCoin }: CoinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const filteredCoins = allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto flex items-center justify-between px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="text-gray-800 dark:text-gray-100">Select Cryptocurrencies</span>
        <ChevronDown className="ml-2 h-4 w-4 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="absolute z-10 mt-1 w-full md:w-96 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coins..."
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredCoins.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">No coins found</div>
            ) : (
              filteredCoins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => toggleCoin(coin.id)}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 mr-3 flex items-center justify-center border rounded ${
                      selectedCoinIds.includes(coin.id)
                        ? "bg-primary border-primary"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedCoinIds.includes(coin.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{coin.name}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Close
            </button>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              {selectedCoinIds.length} selected
            </div>
          </div>
        </div>
      )}

      {selectedCoinIds.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {allCoins
            .filter((coin) => selectedCoinIds.includes(coin.id))
            .map((coin) => (
              <div
                key={coin.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {coin.name}
                <button
                  onClick={() => toggleCoin(coin.id)}
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

