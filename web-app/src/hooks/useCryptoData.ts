"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

interface Coin {
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

export function useCryptoData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([])

  const {
    data: allCoins = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<Coin[]>({
    queryKey: ["cryptoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=1h,24h,7d",
      )

      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data")
      }

      return response.json()
    },
  })

  useEffect(() => {
    if (allCoins.length > 0 && selectedCoinIds.length === 0) {
      setSelectedCoinIds(allCoins.slice(0, 5).map((coin) => coin.id))
    }
  }, [allCoins, selectedCoinIds.length])

  const selectedCoins = allCoins.filter((coin) => selectedCoinIds.includes(coin.id))

  const toggleCoin = (coinId: string) => {
    setSelectedCoinIds((prev) => (prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]))
  }

  return {
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
  }
}

