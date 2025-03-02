// CoinGecko API typings
export interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export interface ChartData {
  prices: [number, number][] // [timestamp, price]
}

// API URL
const API_URL = "https://api.coingecko.com/api/v3"

/**
 * Fetches cryptocurrency data from CoinGecko API
 */
export const getCryptocurrencies = async (): Promise<Coin[]> => {
  try {
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`)

    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency data")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error)
    throw new Error("Failed to fetch cryptocurrency data. Please try again later.")
  }
}

/**
 * Fetches historical price data for a specific coin
 */
export const getCoinHistory = async (coinId: string, days = 7): Promise<ChartData> => {
  try {
    const response = await fetch(`${API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch price history data for ${coinId}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching history for ${coinId}:`, error)
    throw new Error(`Failed to fetch price history data for ${coinId}. Please try again later.`)
  }
}

