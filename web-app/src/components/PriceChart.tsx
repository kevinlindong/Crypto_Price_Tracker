"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { formatCurrency } from "@/utils/formatters"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface PriceChartProps {
  coinId: string
  coinName: string
  color: string
}

type TimeRange = "1d" | "7d" | "30d" | "90d" | "1y"

interface ChartData {
  prices: [number, number][]
}

export function PriceChart({ coinId, coinName, color }: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Always use 7 days for the chart
  const days = 7

  useEffect(() => {
    const fetchChartData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch chart data")
        }

        const data = await response.json()
        setChartData(data)
      } catch (err) {
        setError("Could not load chart data. The API may be rate limited.")
        console.error("Chart data fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [coinId])

  const formatChartData = () => {
    if (!chartData) return null

    const prices = chartData.prices

    // Filter to a reasonable number of data points for a 7-day chart
    const filteredPrices = prices.filter((_, index) => index % 4 === 0)

    // Format dates for 7-day view
    const labels = filteredPrices.map(([timestamp]) => {
      const date = new Date(timestamp)
      return date.toLocaleDateString([], { weekday: "short" })
    })

    const priceData = filteredPrices.map(([, price]) => price)

    return {
      labels,
      datasets: [
        {
          label: `${coinName} Price`,
          data: priceData,
          borderColor: color,
          backgroundColor: `${color}20`,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.1,
          fill: true,
        },
      ],
    }
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            return formatCurrency(context.parsed.y)
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        position: "right",
        grid: {
          color: "rgba(200, 200, 200, 0.1)",
        },
        ticks: {
          callback: (value) => {
            return formatCurrency(value as number)
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  }

  const formattedData = formatChartData()

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">7-Day Price History</h3>
      </div>

      <div className="h-64 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500 text-center">
            <p>{error}</p>
          </div>
        ) : formattedData ? (
          <div className="h-full w-full">
            <Line data={formattedData} options={chartOptions} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No chart data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

