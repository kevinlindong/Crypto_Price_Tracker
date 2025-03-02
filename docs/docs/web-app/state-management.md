---
sidebar_position: 3
---

# State Management

This section explains the state management approach used in the Crypto Price Tracker application.

## State Management Strategy

The application uses a combination of React Query and React hooks for state management. This approach was chosen because:

1. **Simplicity**: Avoids boilerplate associated with more complex state management libraries
2. **Performance**: React Query efficiently handles server state with caching and background updates
3. **Separation of Concerns**: Separates server state from UI state
4. **Developer Experience**: Easy to implement and understand

## React Query for Server State

React Query is used to manage all server state, including:

- Fetching cryptocurrency data
- Caching responses
- Handling loading and error states
- Managing data freshness and refetching

### Key React Query Features Used

```tsx
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
```

- **QueryKey**: The `["cryptoData"]` key is used to identify and cache the query
- **QueryFn**: The function that fetches data when needed
- **Data**: The actual data returned from the API
- **Status Indicators**: `isLoading` and `isError` for UI state
- **Manual Controls**: `refetch` to trigger a refresh and `isRefetching` to show refresh status

## React Hooks for UI State

React's built-in hooks (`useState`, `useEffect`) are used to manage local UI state:

```tsx
// Selected cryptocurrencies
const [selectedCoinIds, setSelectedCoinIds] = useState<string[]>([])

// Search term for filtering
const [searchTerm, setSearchTerm] = useState("")

// Open/closed state for dropdowns
const [isOpen, setIsOpen] = useState(false)
```

## Custom Hooks

The application uses custom hooks to encapsulate and reuse state logic:

### useCryptoData Hook

This is the main hook that provides cryptocurrency data and UI state:

```tsx
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
    // Query configuration...
  })

  // Default selection logic
  useEffect(() => {
    if (allCoins.length > 0 && selectedCoinIds.length === 0) {
      setSelectedCoinIds(allCoins.slice(0, 5).map((coin) => coin.id))
    }
  }, [allCoins, selectedCoinIds.length])

  // Filtered data
  const selectedCoins = allCoins.filter((coin) => selectedCoinIds.includes(coin.id))

  // UI interaction handler
  const toggleCoin = (coinId: string) => {
    setSelectedCoinIds((prev) => 
      (prev.includes(coinId) 
        ? prev.filter((id) => id !== coinId) 
        : [...prev, coinId])
    )
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
```

### useTheme Hook

A custom hook that manages the theme state (light/dark mode):

```tsx
export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
}
```

## Why Not Use Redux or Other State Management Libraries?

The decision to use React Query and React hooks instead of Redux or other state management libraries was based on:

1. **Application Size**: This is a relatively small application that doesn't require complex global state
2. **Type of State**: Most state is either server data (best handled by React Query) or local UI state (best handled by useState)
3. **Reduced Boilerplate**: Less setup and maintenance code
4. **Modern React Patterns**: Aligns with current React best practices
5. **Performance**: Avoids unnecessary re-renders and state updates

For a larger application with more complex state requirements, other solutions like Redux, Zustand, or Jotai might be more appropriate.