---
sidebar_position: 2
---

# API Integration

This section explains how the Crypto Price Tracker integrates with cryptocurrency data APIs.

## API Provider

The application uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to fetch cryptocurrency data. CoinGecko provides a free tier that includes:

- Market data for thousands of cryptocurrencies
- Historical price data
- Metadata like images and descriptions

## Data Fetching Strategy

### React Query for API Integration

The application uses React Query (TanStack Query) to fetch, cache, and manage cryptocurrency data. React Query provides several benefits:

- Automatic caching and refetching
- Loading, error, and success states
- Background data updates
- Easy manual refetching

Here's how React Query is implemented in the application:

```tsx
import { useQuery } from "@tanstack/react-query"

export function useCryptoData() {
  // Other state management...

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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
      )

      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data")
      }

      return response.json()
    },
  })

  // Process and return data...
}
```

## API Endpoints Used

### Cryptocurrency Market Data

The application fetches market data using the `/coins/markets` endpoint:

```
GET https://api.coingecko.com/api/v3/coins/markets
```

Parameters:
- `vs_currency=usd`: Price data in USD
- `order=market_cap_desc`: Ordered by market cap (highest first)
- `per_page=100`: Fetch up to 100 cryptocurrencies
- `page=1`: First page of results

This endpoint returns an array of cryptocurrency objects containing:
- Basic information (id, name, symbol)
- Current price
- 24h price change
- Market cap
- Volume
- Image URLs

### Chart Data

For price history charts, the application uses the `/coins/{id}/market_chart` endpoint:

```
GET https://api.coingecko.com/api/v3/coins/{id}/market_chart
```

Parameters:
- `vs_currency=usd`: Price data in USD
- `days=7`: Last 7 days of data
- `interval=daily`: Daily intervals

This endpoint returns price data that's used to render the chart for each cryptocurrency.

## Error Handling

The application implements robust error handling for API interactions:

1. **API Request Errors**: Caught and presented to the user with retry options
2. **Rate Limiting**: User-friendly messages when API rate limits are reached
3. **Network Issues**: Graceful handling of network connectivity problems

Example error handling:

```tsx
{isError ? (
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
  // Normal content rendering
)}
```

## Data Caching

React Query provides automatic caching of API responses:

- Default stale time is set to 60 seconds
- Fresh data is served from cache without network requests
- Background refetching occurs when stale data is accessed
- Manual refreshing is available with the Refresh button

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})
```

## API Limitations

The CoinGecko free API has some limitations to be aware of:

1. **Rate Limiting**: 10-50 calls per minute depending on server load
2. **No API Key**: The free tier doesn't require authentication
3. **Limited Historical Data**: Only short-term historical data is available
4. **No Websockets**: Real-time updates aren't available, requires polling

The application is designed to work within these constraints while providing a good user experience.