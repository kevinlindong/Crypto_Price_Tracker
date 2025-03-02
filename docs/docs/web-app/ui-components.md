---
sidebar_position: 4
---

# UI Components

This section provides details about the key UI components used in the Crypto Price Tracker application.

## Component Overview

The application is built using a component-based architecture with the following key components:

- **Header**: App title, theme toggle
- **CoinSelector**: Selection interface for cryptocurrencies
- **CryptoCard**: Displays cryptocurrency details
- **PriceChart**: Chart visualization of price history
- **LoadingSpinner**: Loading indicator
- **ThemeToggle**: Light/dark mode toggle

## Header Component

The Header component displays the application title and includes the theme toggle:

```tsx
export function Header() {
  return (
    <header className="w-full py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
        
        <div className="flex items-center">
          <div className="relative w-10 h-10 mr-3">
            <Image 
              src="/file.svg" 
              alt="Crypto Icon"
              width={40}
              height={40}
              className="dark:invert"
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Crypto Price Tracker
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track the latest cryptocurrency prices in real-time
            </p>
          </div>
        </div>
        
        <div className="w-20">
          {/* Empty div for spacing */}
        </div>
      </div>
    </header>
  )
}
```

## CoinSelector Component

The CoinSelector component allows users to select which cryptocurrencies to display:

```tsx
export function CoinSelector({ allCoins, selectedCoinIds, toggleCoin }: CoinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Click outside handler
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

  // Filter coins based on search query
  const filteredCoins = allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative">
      {/* Dropdown UI */}
    </div>
  )
}
```

Key features:
- Dropdown for selecting cryptocurrencies
- Search functionality
- Checkboxes for multiple selection
- Click-outside handling to close the dropdown

## CryptoCard Component

The CryptoCard component displays detailed information about a cryptocurrency:

```tsx
export function CryptoCard({ crypto }: CryptoCardProps) {
  return (
    <div className="relative h-full">
      <div className="flex items-center mb-4">
        <div className="relative h-10 w-10 mr-3">
          <Image
            src={crypto.image || "/placeholder.svg"}
            alt={crypto.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{crypto.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${crypto.current_price.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
          <p
            className={`text-lg font-semibold ${
              crypto.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="text-lg text-gray-900 dark:text-gray-100">
            ${crypto.market_cap.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Volume (24h)</p>
          <p className="text-lg text-gray-900 dark:text-gray-100">
            ${crypto.total_volume.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
```

Key features:
- Displays cryptocurrency logo, name, and symbol
- Shows current price and 24h price change
- Displays market cap and trading volume
- Color coding for positive/negative price changes

## PriceChart Component

The PriceChart component displays a price history chart for a cryptocurrency:

```tsx
export function PriceChart({ coinId, coinName, color }: PriceChartProps) {
  // Chart implementation using Chart.js
}
```

Key features:
- Line chart showing price history
- Responsive design that adapts to container size
- Color coding based on price trend (green/red)
- Proper axes and labels

## ThemeToggle Component

The ThemeToggle component allows switching between light and dark modes:

```tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2.5 text-sm font-medium dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary relative"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
```

Key features:
- Toggles between light and dark modes
- Animated transition between sun and moon icons
- Accessible with proper aria attributes

## Styling Approach

The application uses Tailwind CSS for styling with the following approach:

1. **Utility Classes**: Component styling is done with Tailwind utility classes
2. **Dark Mode**: Dark mode is implemented using Tailwind's dark variant
3. **Responsive Design**: Mobile-first approach with responsive classes
4. **Custom Variables**: CSS variables for theme colors and other design tokens
5. **Semantic HTML**: Proper HTML elements for accessibility and SEO