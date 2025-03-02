---
sidebar_position: 5
---

# Challenges & Solutions

This section outlines the key challenges encountered during the development of the Crypto Price Tracker application and the solutions implemented to address them.

## API Rate Limiting

### Challenge

The CoinGecko API has rate limiting on its free tier, which could lead to failed requests and error states when users refresh frequently or when the application has many users.

### Solution

1. **Caching with React Query**: Implemented proper caching using React Query to reduce the number of API calls.
2. **User Feedback**: Added clear error messages to inform users when rate limits are hit.
3. **Retry Button**: Provided a retry mechanism for users to attempt the request again after waiting.
4. **Optimistic Updates**: Applied optimistic UI updates to maintain a responsive experience even when API requests are delayed.

```tsx
// React Query configuration with caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

// User-friendly error message
{isError && (
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
)}
```

## Theme Implementation

### Challenge

Implementing a theme system that switches between light and dark modes while ensuring:
1. No flash of incorrect theme on page load
2. Persistence of user preference
3. Respect for system preference when no user preference is set

### Solution

1. **Theme Provider**: Created a dedicated ThemeProvider using React Context.
2. **Local Storage**: Stored user preference in localStorage.
3. **Media Query**: Used system preference as the default when no user preference is stored.
4. **CSS Variables**: Defined theme colors as CSS variables for easy switching.
5. **Hydration Handling**: Added `suppressHydrationWarning` to avoid hydration mismatches.

```tsx
// Theme Provider implementation
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (defaultTheme === "system") {
      setTheme("system")
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }
    
    root.classList.add(theme)
  }, [theme])

  // ...rest of the provider
}
```

## Responsive Design

### Challenge

Creating a responsive design that works well on screens of all sizes, from mobile phones to large desktop monitors, while maintaining a good user experience and visual consistency.

### Solution

1. **Mobile-First Approach**: Started with mobile designs and added complexity for larger screens.
2. **Tailwind Breakpoints**: Utilized Tailwind's responsive breakpoints for consistent media queries.
3. **Flexible Layouts**: Used flexbox and grid for adaptive layouts.
4. **Dynamic Typography**: Scaled font sizes based on screen size.
5. **Component Adaptation**: Designed components to adapt their layout based on available space.

```tsx
// Example of responsive design in the cryptocurrency card component
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
```

## Click-Outside Detection

### Challenge

Implementing a dropdown menu for cryptocurrency selection that closes when users click outside of it, improving usability and matching expected behavior.

### Solution

1. **useRef Hook**: Used a ref to track the dropdown DOM element.
2. **Event Listener**: Added a global click event listener to detect clicks outside the dropdown.
3. **Cleanup**: Properly removed the event listener on component unmount to prevent memory leaks.
4. **Accessibility**: Ensured the dropdown is accessible with keyboard navigation.

```tsx
export function CoinSelector() {
  const [isOpen, setIsOpen] = useState(false)
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
  
  // Rest of the component
}
```

## Next.js Configuration

### Challenge

Setting up Next.js configuration correctly, particularly for:
1. Image domains for remote images from the CoinGecko API
2. Module resolution for aliased imports
3. Proper ESM/CommonJS module compatibility

### Solution

1. **Remote Patterns**: Used `remotePatterns` in Next.js config for more secure image domains.
2. **Path Aliases**: Configured path aliases in tsconfig.json for cleaner imports.
3. **ES Modules**: Ensured all configuration files use the correct module format.

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
}

export default nextConfig;
```

## Lessons Learned

Through addressing these challenges, several key learnings emerged:

1. **API Resilience**: Design applications to be resilient against API limitations and failures.
2. **Progressive Enhancement**: Start with core functionality and enhance as resources allow.
3. **Performance Considerations**: Balance real-time data updates with performance and API constraints.
4. **User Experience**: Prioritize user experience with clear feedback and intuitive interfaces.
5. **Technical Debt Management**: Address technical issues early to prevent compounding problems.