# Crypto Price Tracker

A simple dashboard to track cryptocurrency prices in real-time with theme switching support.

## Project Structure

This repository contains two main components:

- `/web-app` - Next.js application for displaying cryptocurrency prices
- `/docs` - Docusaurus documentation explaining the project implementation

## Features

- Display real-time prices of top cryptocurrencies
- Filter cryptocurrencies using a search/selection interface
- Manually refresh prices with a dedicated button
- Responsive design for mobile and desktop
- Light and dark mode support
- Interactive price charts

## Web App Technical Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Data Visualization**: Chart.js
- **API**: CoinGecko public API

## Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Internet connection (for API calls)

## Setup Instructions

### Getting Started

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/kevinlindong/Crypto_Price_Tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd crypto_price_tracker
   ```

### Setting up the Web App

1. Navigate to the web app directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the web-app directory and add your CoinGecko API key (if required):
   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```
   Note: The free tier of CoinGecko API may work without an API key, but with lower rate limits.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the crypto price tracker.

6. For production builds:
   ```bash
   npm run build
   npm run start
   # or
   yarn build
   yarn start
   ```

### Setting up the Documentation

1. From the project root, navigate to the docs directory:
   ```bash
   cd docs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the documentation development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the documentation.

   Note: If the web app is already running on port 3000, Docusaurus will automatically use port 3001. Check your terminal for the correct URL.

5. For building the documentation for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

6. To serve the built documentation:
   ```bash
   npm run serve
   # or
   yarn serve
   ```

## Troubleshooting

- **Port Conflicts**: If port 3000 is already in use, the application will automatically try to use the next available port. Check the terminal output for the correct URL.

- **API Rate Limiting**: This application uses the public CoinGecko API which has rate limits. If you encounter errors related to API rate limiting, please wait a few minutes before trying again.

- **Node.js Version**: If you encounter issues with dependencies, ensure you are using Node.js version 18 or higher. You can check your Node.js version with `node -v`.

## Development Notes

- The web app uses Next.js 14 features, including the App Router and React Server Components.
- The documentation site uses Docusaurus 2, which is built on React.
- Both applications can be run simultaneously on different ports for a complete development environment.

## API Usage Notes

This application uses the public CoinGecko API which has rate limits. If you encounter errors related to API rate limiting, please wait a few minutes before trying again :D

## License

MIT License
