---
sidebar_position: 1
---

# Installation

This guide will walk you through the process of setting up the Crypto Price Tracker application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm (usually comes with Node.js) or yarn
- Git (for cloning the repository)

## Clone the Repository

```bash
git clone https://github.com/kevinlindong/Crypto_Price_Tracker.git
cd crypto-price-tracker
```

## Setting Up the Web App

1. Navigate to the web app directory:

```bash
cd web-app
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Setting Up the Documentation

1. Navigate to the docs directory from the project root:

```bash
cd docs
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Start the documentation site:

```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the documentation

## Building for Production

### Web App

To build the web application for production, run:

```bash
cd web-app
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm start
# or
yarn start
```

### Documentation

To build the documentation site for production, run:

```bash
cd docs
npm run build
# or
yarn build
```

This will generate static files in the `build` directory which you can deploy to any static site hosting service.