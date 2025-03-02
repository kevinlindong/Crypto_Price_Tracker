---
sidebar_position: 2
---

# Configuration

This section covers how to configure the Crypto Price Tracker application for your needs.

## Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the `web-app` directory with the following variables:

```env
# API Configuration (optional - default is CoinGecko public API)
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

# Number of cryptocurrencies to show by default (optional)
NEXT_PUBLIC_DEFAULT_COINS=5
```

## Customizing the Application

### Default Cryptocurrencies

By default, the application displays the top 5 cryptocurrencies by market cap. You can modify this behavior in the `src/hooks/useCryptoData.ts` file:

```typescript
useEffect(() => {
  if (allCoins.length > 0 && selectedCoinIds.length === 0) {
    // Change the number 5 to show more or fewer cryptocurrencies by default
    setSelectedCoinIds(allCoins.slice(0, 5).map((coin) => coin.id))
  }
}, [allCoins, selectedCoinIds.length])
```

### Theming

The application supports both light and dark themes. The theme system is implemented using CSS variables and React context.

#### Tailwind Configuration

You can customize the colors and other theme variables in the `web-app/tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      // Customize your colors here
      primary: {...},
      secondary: {...},
      // ...
    },
  },
}
```

#### CSS Variables

Theme-specific variables are defined in the `web-app/app/globals.css` file:

```css
:root {
  /* Light theme variables */
  --background: 0 0% 100%;
  /* ... other variables ... */
}

.dark {
  /* Dark theme variables */
  --background: 222.2 84% 4.9%;
  /* ... other variables ... */
}
```

## API Configuration

### Using a Different API

The application is configured to use the CoinGecko API by default. If you want to use a different API, you'll need to update the fetch logic in `src/hooks/useCryptoData.ts`:

```typescript
const { data: allCoins = [], isLoading, isError, refetch, isRefetching } = useQuery<Coin[]>({
  queryKey: ["cryptoData"],
  queryFn: async () => {
    // Replace this with your API endpoint
    const response = await fetch("YOUR_API_ENDPOINT")
    
    if (!response.ok) {
      throw new Error("Failed to fetch cryptocurrency data")
    }
    
    const data = await response.json()
    
    // Transform the data to match the expected format if necessary
    return transformData(data)
  },
})
```

### API Rate Limiting

The CoinGecko public API has rate limits. If you encounter issues with rate limiting, consider:

1. Implementing caching strategies
2. Reducing the frequency of requests
3. Using a different API provider
4. Signing up for a paid API plan

## Next.js Configuration

The Next.js configuration is defined in `web-app/next.config.mjs`. You can modify this file to adjust settings like image domains:

```javascript
export default {
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
      // Add more domains as needed
    ],
  },
  // Other Next.js configuration options
}
```