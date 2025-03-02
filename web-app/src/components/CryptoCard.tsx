"use client"

import Image from "next/image"
import { formatCurrency } from "@/utils/formatters"

interface CryptoCardProps {
  crypto: {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    price_change_percentage_1h_in_currency?: number
    price_change_percentage_24h: number
    price_change_percentage_7d_in_currency?: number
    market_cap: number
    total_volume: number
  }
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const getPriceChangeColor = (value: number | undefined) => {
    if (value === undefined) return "text-gray-500"
    return value >= 0 ? "text-green-500" : "text-red-500"
  }

  const formatPriceChange = (value: number | undefined) => {
    if (value === undefined) return "N/A"
    return (
      <span className="flex items-center">
        {value >= 0 ? "↑" : "↓"}{Math.abs(value).toFixed(2)}%
      </span>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="relative h-10 w-10 mr-3">
          <Image
            src={crypto.image || "/placeholder.svg"}
            alt={crypto.name}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{crypto.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {formatCurrency(crypto.current_price)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-100 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">1h</p>
          <p className={`text-sm font-medium ${getPriceChangeColor(crypto.price_change_percentage_1h_in_currency)}`}>
            {formatPriceChange(crypto.price_change_percentage_1h_in_currency)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">24h</p>
          <p className={`text-sm font-medium ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
            {formatPriceChange(crypto.price_change_percentage_24h)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">7d</p>
          <p className={`text-sm font-medium ${getPriceChangeColor(crypto.price_change_percentage_7d_in_currency)}`}>
            {formatPriceChange(crypto.price_change_percentage_7d_in_currency)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(crypto.market_cap)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Volume (24h)</p>
          <p className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(crypto.total_volume)}</p>
        </div>
      </div>
    </div>
  )
}

