---
sidebar_position: 1
---

# Architecture

This section provides an overview of the Crypto Price Tracker web application architecture.

## Project Structure

The web application follows a standard Next.js project structure with some organization enhancements:

```
web-app/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # App providers
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   └── utils/           # Utility functions
├── next.config.mjs      # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## Component Architecture

The application follows a component-based architecture where each UI element is encapsulated in its own component. Here are the key components:

### Root Layout

The `app/layout.tsx` file defines the root layout that wraps all pages. It includes:

- Font loading
- ThemeProvider integration
- Global styles

```tsx
// app/layout.tsx
import { Providers } from "./providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClasses} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

### Providers

The `app/providers.tsx` file sets up React Query and the ThemeProvider:

```tsx
// app/providers.tsx
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({...}))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="crypto-tracker-theme">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

### Main Page

The `app/page.tsx` file is the main entry point for the application. It:

1. Uses the `useCryptoData` hook to fetch and manage cryptocurrency data
2. Renders the Header, CoinSelector, and cryptocurrency cards
3. Handles loading and error states

### Components

Key components include:

- **Header**: Contains the app title and theme toggle
- **CoinSelector**: Allows users to select which cryptocurrencies to display
- **CryptoCard**: Displays information about a single cryptocurrency
- **PriceChart**: Shows price history chart for a cryptocurrency
- **LoadingSpinner**: Displayed during data loading
- **ThemeToggle**: Allows switching between light and dark themes

## Data Flow

The application follows a unidirectional data flow:

1. Data is fetched from the CoinGecko API using React Query
2. The `useCryptoData` hook manages state and provides data to components
3. User interactions (coin selection, refresh, etc.) trigger state updates
4. UI components re-render to reflect the updated state

## Responsive Design

The application is built with a mobile-first approach using Tailwind CSS. Key responsive design features include:

- Fluid layouts that adapt to different screen sizes
- Responsive typography
- Mobile-optimized navigation and controls
- Responsive grid for cryptocurrency cards